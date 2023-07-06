// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import {
	type KioskContents,
	type OriginByteKioskContents,
	getKioskIdFromDynamicFields,
	hasDisplayData,
	useGetKioskContents,
} from '@mysten/core';
import { getObjectDisplay, type SuiObjectResponse } from '@mysten/sui.js';
import cl from 'classnames';

import { type NFTDisplayCardProps } from '.';
import { useActiveAddress } from '../../hooks';
import { Text } from '../../shared/text';
import { NftImage } from './NftImage';

type KioskProps = {
	object: SuiObjectResponse;
} & Partial<NFTDisplayCardProps>;

const styles: Record<number, string> = {
	0: 'group-hover:scale-95 shadow-md z-20 -top-[0px] group-hover:shadow-blurXl',
	1: 'scale-[0.975] group-hover:-rotate-6 group-hover:-translate-x-6 group-hover:-translate-y-3 z-10 -top-[6px] group-hover:shadow-lg',
	2: 'scale-95 group-hover:rotate-6 group-hover:translate-x-6 group-hover:-translate-y-3 z-0 -top-[12px] group-hover:shadow-xl',
};

export function Kiosk({ object, ...nftDisplayCardProps }: KioskProps) {
	const address = useActiveAddress();
	const { data: kioskData, isLoading } = useGetKioskContents(address);

	if (isLoading) return null;

	const kioskId = getKioskIdFromDynamicFields(object);
	const suiKiosk = kioskData?.kiosks.sui.get(kioskId) as KioskContents;
	const obKiosk = kioskData?.kiosks.originByte.get(kioskId) as OriginByteKioskContents;
	const items = (suiKiosk?.items ?? obKiosk.items).sort((item) => (hasDisplayData(item) ? -1 : 1));

	return (
		<div className="relative hover:bg-transparent group transition-all flex justify-between h-36 w-36 rounded-xl transform-gpu">
			<div className="absolute z-0">
				{items.length &&
					items.slice(0, 3).map((item, idx) => {
						const display = getObjectDisplay(item)?.data;
						if (!display) return null;
						return (
							<div
								className={cl(
									items.length > 1 ? styles[idx] : 'group-hover:scale-105',
									'absolute transition-all ease-ease-out-cubic duration-250 rounded-xl',
								)}
							>
								<NftImage
									src={display.image_url}
									borderRadius={nftDisplayCardProps.borderRadius}
									size={nftDisplayCardProps.size}
									name="Kiosk"
									showLabel
								/>
							</div>
						);
					})}
			</div>
			<div className="right-1.5 bottom-1.5 flex items-center justify-center absolute h-6 w-6 bg-gray-100 text-white rounded-md">
				<Text variant="subtitle" weight="medium">
					{items?.length}
				</Text>
			</div>
		</div>
	);
}
