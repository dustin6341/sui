// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use clap::Parser;
use insta::assert_json_snapshot;
use sui::{client_commands::WalletContext, sui_commands::SuiCommand};
use sui_macros::sim_test;
use test_utils::network::TestClusterBuilder;

// special constants for substitution in commands
const ME: &str = "{ME}";

async fn run_one(
    test: Vec<&str>,
    context: &mut WalletContext,
) -> Result<Vec<serde_json::Value>, anyhow::Error> {
    let mut test_output = Vec::new();
    let active_addr = context.active_address()?.to_string();
    for cli_cmd in test {
        let mut cli_cmd_vec = cli_cmd.split(' ').collect::<Vec<&str>>();
        for word in cli_cmd_vec.iter_mut() {
            if *word == ME {
                *word = &active_addr
            }
        }
        test_output.push(serde_json::Value::String(cli_cmd.to_string()));
        let c = SuiCommand::try_parse_from(cli_cmd_vec)?;
        match c {
            SuiCommand::Client { cmd, .. } => {
                if let Some(client_cmd) = cmd {
                    match client_cmd.execute(context).await {
                        Ok(output) => {
                            if let Some(block_response) = output.tx_block_response() {
                                test_output.push(serde_json::to_value(block_response)?);
                            } else if let Some(objects_response) = output.objects_response() {
                                test_output.push(serde_json::to_value(objects_response)?)
                            }
                        }
                        Err(e) => test_output.push(serde_json::Value::String(e.to_string())),
                    }
                }
            }
            SuiCommand::Move {
                package_path: _,
                build_config: _,
                cmd: _,
            } => unimplemented!("Supporting Move publish and upgrade commands"),
            _ => panic!("Command {:?} not supported by RPC snapshot tests", cli_cmd),
        }
    }
    Ok(test_output)
}

#[sim_test]
async fn basic_read_cmd_snapshot_tests() -> Result<(), anyhow::Error> {
    let mut test_cluster = TestClusterBuilder::new().build().await?;
    let context = &mut test_cluster.wallet;

    let cmds = vec![
        "sui client objects {ME}", // valid addr
        "sui client objects 0x0000000000000000000000000000000000000000000000000000000000000000", // empty addr
        "sui client object 0xf0eeb3838dd35213759daeb9dce88ede333c16963d32f3df35fe528bb8da91a0", // valid object
        "sui client object 0xf0eeb3838dd35213759daeb9dce88ede333c16963d32f3df35fe528bb8da91a0 --bcs", // valid object BCS
        "sui client object 0x0000000000000000000000000000000000000000000000000000000000000000", // non-existent object
        "sui client tx-block DgMTHQygMi6SRsBqrPHAEKZCNrpShXurCp9rcb9qbSg8", // valid tx digest
        "sui client tx-block EgMTHQygMi6SRsBqrPHAEKZCNrpShXurCp9rcb9qbSg8", // non-existent tx digest
    ];
    assert_json_snapshot!(run_one(cmds, context).await?);
    Ok(())
}
