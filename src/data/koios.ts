import type { DelegatorInfo } from "src/types/types";
import { writable } from "svelte/store";
import type {
  AccountAsset,
  Delegator,
  EpochInfo,
  PoolBlocks,
  PoolInfo,
  Tip,
} from "../types/koios";

const ApiUrl = "https://api.koios.rest/api/v0";
const PoolBech32 = "pool1fu6ppur5uumrpydpeswzrvfg4epr68xw39aar9rcu56tk5ukat3";

export async function getTip(): Promise<Tip> {
  const tip: Tip = await fetch(`${ApiUrl}/tip`, {}).then(async (res) => {
    return res.json().then((x) => {
      return x[0];
    });
  });
  return tip;
}

export async function getEpoch(): Promise<EpochInfo> {
  const tip = await getTip();
  const epoch: EpochInfo = await fetch(
    `${ApiUrl}/epoch_info?_epoch_no=${tip.epoch_no}`
  ).then(async (res) => {
    return res.json().then((x) => {
      return x[0];
    });
  });
  return epoch;
}

export async function getPoolBlocks(): Promise<PoolBlocks[]> {
  const tip = await getTip();
  const blocks: PoolBlocks[] = await fetch(
    `${ApiUrl}/pool_blocks?_epoch_no=${tip.epoch_no}&_pool_bech32=${PoolBech32}`
  ).then(async (res) => {
    return res.json();
  });
  return blocks;
}

export async function getPool(
  poolBech32: string = PoolBech32
): Promise<PoolInfo> {
  const res = await fetch(`${ApiUrl}/pool_info`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _pool_bech32_ids: [poolBech32],
    }),
  }).then((res) => {
    return res.json().then((x) => {
      return x[0];
    });
  });

  return res;
}

export async function getDelegators(
  poolBech32: string = PoolBech32
): Promise<DelegatorInfo[]> {
  const res = await fetch(`${ApiUrl}/pool_delegators`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _pool_bech32: poolBech32,
    }),
  }).then((res) => {
    return res.json();
  });

  const delegators: DelegatorInfo[] = [];
  res.forEach((delegator) => {
    delegators.push({
      stake_address: delegator.stake_address,
      lace: delegator.amount,
      assetsLoading: true,
    });
  });

  return delegators;
}

//@ts-no-check
/*
export function getDelegatorWithInfo() {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    set,
    init: async () => {
      const delegators = await getDelegators();
      set(delegators);
    },
  };
}
*/

/*
export async function getDelegatorAssets(): Promise<DelegatorInfo[]> {
  const delegators = await getDelegators();
  const addresses: string[] = [];
  delegators.forEach((delegator) => {
    addresses.push(delegator.stake_address);
  });

  const res: AccountAsset[] = await fetch(`${ApiUrl}/account_assets`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _stake_addresses: [addresses],
    }),
  }).then((res) => {
    return res.json();
  });

  // const updatedDelegators: DelegatorInfo[] = [];
  // res.forEach((delegator) => {
  //   updatedDelegators.push({
  //     stake_address: delegator.stake_address,
  //     lace: delegator.amount,
  //     assetsLoading: false,
  //   });
  // });

  //return updatedDelegators;
}
*/
