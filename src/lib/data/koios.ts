import type { Delegator } from "../types/koios";

const ApiUrl = "https://api.koios.rest/api/v0";

export async function getDelegators(
  poolBech32: string = "pool1fu6ppur5uumrpydpeswzrvfg4epr68xw39aar9rcu56tk5ukat3"
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
