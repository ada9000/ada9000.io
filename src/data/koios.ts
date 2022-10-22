import type { Delegator, PoolInfo, Tip } from "../types/koios";

const ApiUrl = "https://api.koios.rest/api/v0";
const PoolBech32 = "pool1fu6ppur5uumrpydpeswzrvfg4epr68xw39aar9rcu56tk5ukat3";

export async function getTip(): Promise<Tip[]> {
  const res = await fetch(`${ApiUrl}/tip`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });

  return res;
}

export async function getPool(
  poolBech32: string = PoolBech32
): Promise<PoolInfo[]> {
  const res = await fetch(`${ApiUrl}/pool_info`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _pool_bech32_ids: [poolBech32],
    }),
  }).then((res) => {
    return res.json();
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
