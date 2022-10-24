<script lang="ts">
  import { laceToAdaString, shortenStakeAddr } from "../util/utils";
  import { getDelegatorAssets, getDelegators } from "../data/koios";
  import cf from "../../public/cf.json";
  import type { DelegatorInfo } from "src/types/types";
  let delegators: DelegatorInfo[] = [];
  //let delegators = getDelegators();
  (async () => {
    delegators = await getDelegators();
    console.log("boo");
    delegators = await getDelegatorAssets(delegators);
    delegators = delegators;
  })();
</script>

<div id="delegators">
  {#each delegators.sort((a, b) => b.lace - a.lace) as delegator}
    {#if delegator.lace > 0}
      <div class="card mx-auto blend p-2 max-w-sm mt-4">
        {#if cf.includes(delegator.stake_address)}
          <p class="text text-center font-bold text-slate-800">
            🐋 Cardano Foundation wallet
          </p>
        {/if}
        {#if delegator.stake_address === "stake1u8ag3gtdgtuj6hud7km4z0u0pcqvfndtq9fcckjvvc6yjdswaksu2"}
          <p class="text text-center font-bold text-slate-800">
            🌚 Pool Wallet
          </p>
        {/if}
        <p class="text text-center text-slate-800">
          {shortenStakeAddr(delegator.stake_address)}
        </p>
        <p class="text text-center text-slate-800">
          {laceToAdaString(delegator.lace.toString())}
        </p>
        <p class="text text-center text-slate-800">
          {delegator.assetsLoading.toString()}
        </p>
      </div>
    {/if}
  {/each}
</div>

<style>
  .blend {
    background: linear-gradient(-90deg, #fe706d, #fedf6d);
    background-size: 200% 100%;
    animation: gradient 6s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
