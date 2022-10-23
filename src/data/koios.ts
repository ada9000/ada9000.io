import type {
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
): Promise<Delegator[]> {
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

  return res;
}
