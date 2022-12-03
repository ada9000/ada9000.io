<script lang="ts">
  import { formatNumber, laceToAdaString, shortenStakeAddr } from "../../util/utils";
  import { getDelegatorAssets, getDelegators } from "../../data/koios";
  import cf from "../../../public/cf.json";
  import type { DelegatorInfo } from "src/types/types";
  import Adahandle from "../../assets/icons/adahandle.svelte";
  import { navigate } from "svelte-navigator";
  let hoskyLogo = 'images/hosky.png'
  let loading = true
  let loadingAssets = true
  let delegators: DelegatorInfo[] = [];
  let unfilteredDelegators: DelegatorInfo[] = []; // for hosky...

  (async () => {
    delegators = await getDelegators()
      .then((d)=>{return d.sort((a, b) => b.lace - a.lace)});
    loading = false;
    delegators = await getDelegatorAssets(delegators)
      .then((d)=>{return d.sort((a, b) => b.lace - a.lace)});
    loadingAssets = false;
  })();

  let showHosky = false;
  function handleHosky(){
    showHosky = !showHosky;
    if(showHosky){
      unfilteredDelegators = delegators;
      let hoskyHolders = delegators.filter(x => x.hosky).sort((a, b) => b.hosky - a.hosky);
      delegators = hoskyHolders;
    } else {
      delegators = unfilteredDelegators;
    }
  }

  function laceWithoutCF()
  {
    const delegatorsWithoutCf = delegators.filter((x)=>{return !cf.includes(x.stake_address)});
    let res = 0;
    delegatorsWithoutCf.forEach(x => {
      //@ts-ignore
      res += parseInt(x.lace)
    });
    return laceToAdaString(res.toString());
  }

</script>


<div id="delegators">
  {#if loading && delegators.length === 0}
    <p class="text text-xl text-center p-2">Loading delegators...</p>
    <progress class="progress mx-auto"/>
  {:else}

    <!-- Show stake minus CF whale amount -->
    <div class="card py-4 shadow-lg max-w-sm mx-auto bg-base-300" >
      <p class="text text-md font-bold text-center text-primary">
        {laceWithoutCF()}
      </p>
      <p class="text text-center">
        active stake
      </p>
      <p class="text text-center text-xs">
        without Cardano Foundation whale included
      </p>
    </div>


    <p class="text-center text-md my-4">
      <a href="https://app.tosidrop.io/" target="_blank" rel="noopener noreferrer" class="link link-hover">Free tokens ☂️</a>
    </p>

    <!-- Options -->
    <div class="card py-4 shadow-lg max-w-sm mx-auto bg-base-300 mt-4" >
      <p class="text text-center">Filtering Options</p>
      
      <!-- Hosky toggle -->
      {#if loadingAssets}
      <div class="my-auto mx-auto mt-4 my-4 h-10">
        <progress class="progress mx-auto"/>
        <p class="text text-sm text-center">Loading assets</p>
      </div>
      {:else}
      <div class="w-12 my-auto mx-auto mt-4 my-4 h-10">
        <button on:click={handleHosky} disabled={loadingAssets}>
          {#if showHosky}
          <img src={hoskyLogo} alt="Hosky token logo. A pixel art of a Husky dog" class="hoskyOn banana"/>
          {:else}
          <img src={hoskyLogo} alt="Hosky token logo. A pixel art of a Husky dog" class="hoskyOff"/>
          {/if}
        </button>
      </div>
      {/if}
    </div>
  {/if}

  <div class="grid gap-x-4 gap-y-2 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    {#each delegators as delegator}
      {#if delegator.lace > 0}
        <button class="card mx-auto p-2 mt-4 shadow-lg max-w-sm bg-base-300 w-full items-center hover:bg-secondary group" 
          on:click={() => {
            navigate(delegator.stake_address);
          }}
        >
          <!-- Show if foundation or pool wallet -->
          {#if cf.includes(delegator.stake_address)}
            <p class="text text-center font-bold">
              🐋 Cardano Foundation
            </p>
          {:else if delegator.stake_address === "stake1u8ag3gtdgtuj6hud7km4z0u0pcqvfndtq9fcckjvvc6yjdswaksu2"}
            <p class="text text-center font-bold">
              OWNER
            </p>
          {/if}
          
          <!-- Show handle or shortened stake address -->
          {#if delegator.handles && delegator.handles.length}
          <p class="text text-center text-lg font-bold group-hover:text-xl">
            <span class="inline-block h-4"><Adahandle/></span> {delegator.handles[0]}
          </p>
          {:else}
            <p class="text text-center text-lg font-bold text-primary group-hover:text-xl">
              {shortenStakeAddr(delegator.stake_address)}
            </p>
          {/if}
          
          {#if !showHosky}
            <p class="text text-center">
              {laceToAdaString(delegator.lace.toString())}
            </p>
          {/if}
          
          <!-- Hosky toggle -->
          {#if showHosky && delegator.hosky}
          <div class="flex flex-col mx-auto my-auto p-2">
            <div class="w-10 my-auto mx-auto">
              <img src={hoskyLogo} alt="Hosky token logo. A pixel art of a Husky dog"/>
            </div>
            <p class="text text-center p-1">
              {formatNumber(delegator.hosky.toString())}
            </p>
          </div>
          {/if}

        </button>
      {/if}
    {/each}
  </div>
</div>

<style>

  .hoskyOn {
      filter: drop-shadow(0px 0px 12px lightblue)
  }

  .hoskyOff{
    filter: saturate(0%);
  }

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
