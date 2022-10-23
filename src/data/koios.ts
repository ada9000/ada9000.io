import type { Delegator, EpochInfo, PoolInfo, Tip } from "../types/koios";

const ApiUrl = "https://api.koios.rest/api/v0";
const PoolBech32 = "pool1fu6ppur5uumrpydpeswzrvfg4epr68xw39aar9rcu56tk5ukat3";

export async function getEpoch(): Promise<EpochInfo> {
  const tip: Tip = await fetch(`${ApiUrl}/tip`, {}).then(async (res) => {
    return res.json().then((x) => {
      return x[0];
    });
  });

  console.log(tip);

  const epoch = await fetch(
    `${ApiUrl}/epoch_info?_epoch_no=${tip.epoch_no}`,
    {}
  ).then(async (res) => {
    return res.json().then((x) => {
      return x[0];
    });
  });
  return epoch;
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
