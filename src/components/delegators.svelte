<script lang="ts">
  import { laceToAdaString, shortenStakeAddr } from "../util/utils";
  import { getDelegatorAssets, getDelegators } from "../data/koios";
  import cf from "../../public/cf.json";
  import type { DelegatorInfo } from "src/types/types";
  import { handle_promise } from "svelte/internal";
  import Adahandle from "../assets/icons/adahandle.svelte";
  let delegators: DelegatorInfo[] = [];
  (async () => {
    delegators = await getDelegators();
    console.log("boo");
    delegators = await getDelegatorAssets(delegators);
    delegators = delegators;
  })();
</script>

<div id="delegators" class="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
  {#each delegators.sort((a, b) => b.lace - a.lace) as delegator}
    {#if delegator.lace > 0}
      <div class="card mx-auto p-2 mt-4 shadow-lg max-w-sm w-10/12 bg-base-300 ">
        <!-- Show if foundation or pool wallet -->
        {#if cf.includes(delegator.stake_address)}
          <p class="text text-center font-bold">
            🐋 Cardano Foundation
          </p>
        {/if}
        {#if delegator.stake_address === "stake1u8ag3gtdgtuj6hud7km4z0u0pcqvfndtq9fcckjvvc6yjdswaksu2"}
          <p class="text text-center font-bold">
            OWNER
          </p>
        {/if}
        
        <!-- Show handle or shortened stake address -->
        {#if delegator.handles && delegator.handles.length}
        <p class="text text-center text-lg font-bold">
          <span class="inline-block h-3.5"><Adahandle/></span>
          {delegator.handles[0]}
        </p>
        {:else}
          <p class="text text-center text-lg font-bold text-primary">
            {shortenStakeAddr(delegator.stake_address)}
          </p>
        {/if}
        
        <p class="text text-center">
          {laceToAdaString(delegator.lace.toString())}
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
