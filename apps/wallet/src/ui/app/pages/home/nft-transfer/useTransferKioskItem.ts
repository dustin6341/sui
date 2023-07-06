// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
	ORIGINBYTE_KIOSK_MODULE,
	ORIGINBYTE_KIOSK_OWNER_TOKEN,
	getKioskIdFromDynamicFields,
	useGetKioskContents,
	useGetObject,
	useRpcClient,
} from '@mysten/core';
import { take } from '@mysten/kiosk';
import { type SuiAddress, TransactionBlock } from '@mysten/sui.js';
import { useMutation } from '@tanstack/react-query';

import { useActiveAddress, useSigner } from '_src/ui/app/hooks';

export function useTransferKioskItem({
	objectId,
	objectType,
}: {
	objectId: string;
	objectType?: string;
}) {
	const rpc = useRpcClient();
	const signer = useSigner();
	const address = useActiveAddress();

	const kiosk = useGetKioskContents(address);
	const objectData = useGetObject(objectId);

	return useMutation({
		mutationFn: async (to: SuiAddress) => {
			if (!to || !signer || !objectType) {
				throw new Error('Missing data');
			}

			const kioskId = kiosk.data?.lookup.get(objectId);
			const suiKiosk = kiosk.data?.kiosks.sui.get(kioskId);
			const isObKiosk = kiosk.data?.kiosks.originByte.get(kioskId);

			if (!kioskId || (!suiKiosk && !isObKiosk)) {
				throw new Error('Failed to find object in a kiosk');
			}

			if (suiKiosk && objectData.data?.data?.type && suiKiosk?.ownerCap) {
				const tx = new TransactionBlock();
				// take item out of kiosk
				const obj = await take(
					tx,
					objectData.data?.data?.type,
					kioskId,
					suiKiosk?.ownerCap,
					objectId,
				);
				// transfer as usual
				tx.transferObjects([obj], tx.pure(address));
				return signer.signAndExecuteTransactionBlock({
					transactionBlock: tx,
					options: {
						showInput: true,
						showEffects: true,
						showEvents: true,
					},
				});
			}

			if (isObKiosk) {
				const tx = new TransactionBlock();
				const recipientKiosks = await rpc.getOwnedObjects({
					owner: to,
					options: { showContent: true },
					filter: { StructType: ORIGINBYTE_KIOSK_OWNER_TOKEN },
				});
				const recipientKiosk = recipientKiosks.data[0];
				const recipientKioskId = getKioskIdFromDynamicFields(recipientKiosk);

				if (kioskId) {
					console.log('here');
					tx.moveCall({
						target: `${ORIGINBYTE_KIOSK_MODULE}::p2p_transfer`,
						typeArguments: [objectType],
						arguments: [tx.object(kioskId), tx.object(recipientKioskId), tx.pure(objectId)],
					});
					console.log('here');
				} else {
					tx.moveCall({
						target: `${ORIGINBYTE_KIOSK_MODULE}::p2p_transfer_and_create_target_kiosk`,
						typeArguments: [objectType],
						arguments: [tx.object(kioskId), tx.pure(to), tx.pure(objectId)],
					});
				}
				return signer.signAndExecuteTransactionBlock({
					transactionBlock: tx,
					options: {
						showInput: true,
						showEffects: true,
						showEvents: true,
					},
				});
			}
		},
	});
}
