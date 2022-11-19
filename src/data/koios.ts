import type Delegators from "src/lib/delegators/delegators.svelte";
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
    cache: "force-cache",
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

export async function getDelegatorAssets(
  delegators: DelegatorInfo[]
): Promise<DelegatorInfo[]> {
  const updatedDelegators: DelegatorInfo[] = JSON.parse(
    JSON.stringify(delegators)
  );

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

  res.forEach((account) => {
    const idx = updatedDelegators.findIndex((d) => {
      return d.stake_address === account.stake_address;
    });

    // update assets
    updatedDelegators[idx].assets = account.asset_list;

    const handlePolicy =
      "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a";
    const hoskyPolicy =
      "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235";

    // handle handles ;)
    let handles: string[] = [];
    if (account.asset_list.length > 0) {
      account.asset_list.forEach((a) => {
        if (a.policy_id === handlePolicy) {
          handles.push(a.asset_name);
        }
        if (a.policy_id === hoskyPolicy) {
          updatedDelegators[idx.toString()].hosky = a.quantity;
        }
      });
    }
    updatedDelegators[idx.toString()].handles = handles;
  });
  return updatedDelegators;
}
