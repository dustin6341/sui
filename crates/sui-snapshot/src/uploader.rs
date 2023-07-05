// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use crate::writer::StateSnapshotWriterV1;
use anyhow::Result;
use bytes::Bytes;
use object_store::DynObjectStore;
use oneshot::channel;
use prometheus::{register_int_gauge_with_registry, IntGauge, Registry};
use std::num::NonZeroUsize;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;
use sui_core::authority::authority_store_tables::AuthorityPerpetualTables;
use sui_core::db_checkpoint_handler::{STATE_SNAPSHOT_COMPLETED_MARKER, SUCCESS_MARKER};
use sui_protocol_config::ProtocolConfig;
use sui_storage::object_store::util::{
    find_all_dirs_with_epoch_prefix, find_missing_epochs_dirs, path_to_filesystem, put,
};
use sui_storage::object_store::{ObjectStoreConfig, ObjectStoreType};
use sui_storage::FileCompression;
use tokio::sync::oneshot;
use tokio::sync::oneshot::Sender;
use tracing::{error, info};

pub struct StateSnapshotUploaderMetrics {
    pub first_missing_state_snapshot_epoch: IntGauge,
}

impl StateSnapshotUploaderMetrics {
    pub fn new(registry: &Registry) -> Arc<Self> {
        let this = Self {
            first_missing_state_snapshot_epoch: register_int_gauge_with_registry!(
                "first_missing_state_snapshot_epoch",
                "First epoch for which we have no state snapshot in remote store",
                registry
            )
            .unwrap(),
        };
        Arc::new(this)
    }
}

pub struct StateSnapshotUploader {
    /// Directory path on local disk where db checkpoints are stored
    local_input_path: PathBuf,
    /// Directory on local disk where db checkpoints are stored
    local_input_store: Arc<DynObjectStore>,
    /// Directory path on local disk where state snapshots are staged for upload
    local_staging_path: PathBuf,
    /// Directory on local disk where state snapshots are staged for upload
    local_staging_store: Arc<DynObjectStore>,
    /// Bucket on cloud object store where state snapshots are uploaded to
    remote_snapshot_store: Arc<DynObjectStore>,
    /// Time interval to check for presence of new db checkpoint
    interval: Duration,
    metrics: Arc<StateSnapshotUploaderMetrics>,
}

impl StateSnapshotUploader {
    pub fn new(
        input_path: &std::path::Path,
        local_staging_path: &std::path::Path,
        remote_snapshot_config: ObjectStoreConfig,
        interval_s: u64,
        registry: &Registry,
    ) -> Result<Self> {
        let input_store_config = ObjectStoreConfig {
            object_store: Some(ObjectStoreType::File),
            directory: Some(input_path.to_path_buf()),
            ..Default::default()
        };
        let local_staging_config = ObjectStoreConfig {
            object_store: Some(ObjectStoreType::File),
            directory: Some(local_staging_path.to_path_buf()),
            ..Default::default()
        };
        Ok(StateSnapshotUploader {
            local_input_path: input_path.to_path_buf(),
            local_input_store: input_store_config.make()?,
            local_staging_path: local_staging_path.to_path_buf(),
            local_staging_store: local_staging_config.make()?,
            remote_snapshot_store: remote_snapshot_config.make()?,
            interval: Duration::from_secs(interval_s),
            metrics: StateSnapshotUploaderMetrics::new(registry),
        })
    }

    pub fn start(self) -> Sender<()> {
        let (sender, mut recv) = channel::<()>();
        let mut interval = tokio::time::interval(self.interval);
        tokio::task::spawn(async move {
            info!("State snapshot uploader loop started");
            loop {
                tokio::select! {
                    _now = interval.tick() => {
                        if let Ok(epochs) = find_missing_epochs_dirs(&self.remote_snapshot_store, SUCCESS_MARKER).await {
                            self.metrics.first_missing_state_snapshot_epoch.set(epochs.first().cloned().map(|x| x as i64).unwrap_or(0));
                            if let Err(err) = self.upload_state_snapshot_to_object_store(epochs).await {
                                error!("Failed to upload state snapshot to remote store with err: {:?}", err);
                            }
                        } else {
                            error!("Failed to find missing state snapshot in remote store");
                        }
                    },
                    _ = &mut recv => break,
                }
            }
        });
        sender
    }

    async fn upload_state_snapshot_to_object_store(&self, missing_epochs: Vec<u32>) -> Result<()> {
        let last_missing_epoch = missing_epochs.last().cloned().unwrap_or(0);
        let local_checkpoints_by_epoch =
            find_all_dirs_with_epoch_prefix(&self.local_input_store).await?;
        let mut dirs: Vec<_> = local_checkpoints_by_epoch.iter().collect();
        dirs.sort_by_key(|(epoch_num, _path)| *epoch_num);
        for (epoch, db_path) in dirs {
            if missing_epochs.contains(epoch) || *epoch >= last_missing_epoch {
                let include_wrapped_tombstone =
                    !ProtocolConfig::get_for_max_version().simplified_unwrap_then_delete();
                let state_snapshot_writer = StateSnapshotWriterV1::new_from_store(
                    *epoch as u64,
                    &self.local_staging_path,
                    &self.local_staging_store,
                    &self.remote_snapshot_store,
                    FileCompression::Zstd,
                    NonZeroUsize::new(20).unwrap(),
                    include_wrapped_tombstone,
                )
                .await?;
                let db = Arc::new(AuthorityPerpetualTables::open(
                    &path_to_filesystem(self.local_input_path.clone(), db_path)?,
                    None,
                ));
                state_snapshot_writer.write(db).await?;
                // Drop marker in the output directory that upload completed successfully
                let bytes = Bytes::from_static(b"success");
                let success_marker = db_path.child(SUCCESS_MARKER);
                put(
                    &success_marker,
                    bytes.clone(),
                    self.remote_snapshot_store.clone(),
                )
                .await?;
                let bytes = Bytes::from_static(b"success");
                let state_snapshot_completed_marker =
                    db_path.child(STATE_SNAPSHOT_COMPLETED_MARKER);
                put(
                    &state_snapshot_completed_marker,
                    bytes.clone(),
                    self.local_input_store.clone(),
                )
                .await?;
            }
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use crate::tests::insert_keys;
    use crate::uploader::StateSnapshotUploader;
    use prometheus::Registry;
    use std::fs;
    use std::time::Duration;
    use sui_core::authority::authority_store_tables::AuthorityPerpetualTables;
    use sui_storage::object_store::{ObjectStoreConfig, ObjectStoreType};
    use tempfile::TempDir;

    #[tokio::test]
    async fn test_basic() -> anyhow::Result<()> {
        let db_checkpoint_dir = TempDir::new()?;
        let store = db_checkpoint_dir.path().join("epoch_0").join("store");
        fs::create_dir_all(&store)?;
        let perpetual_db = AuthorityPerpetualTables::open(&store, None);
        insert_keys(&perpetual_db, 1000)?;
        drop(perpetual_db);
        tokio::time::sleep(Duration::from_secs(5)).await;

        let local_staging_dir = TempDir::new()?;
        let local_staging_dir_path = local_staging_dir.path();

        let remote_checkpoint_dir = TempDir::new()?;
        let remote_checkpoint_dir_path = remote_checkpoint_dir.path();

        let output_store_config = ObjectStoreConfig {
            object_store: Some(ObjectStoreType::File),
            directory: Some(remote_checkpoint_dir_path.to_path_buf()),
            ..Default::default()
        };

        let state_snapshot_uploader = StateSnapshotUploader::new(
            db_checkpoint_dir.path(),
            local_staging_dir_path,
            output_store_config,
            20,
            &Registry::default(),
        )?;
        state_snapshot_uploader
            .upload_state_snapshot_to_object_store(vec![0])
            .await?;
        assert!(
            dir_diff::is_different(remote_checkpoint_dir_path, local_staging_dir_path).unwrap()
        );
        Ok(())
    }
}
