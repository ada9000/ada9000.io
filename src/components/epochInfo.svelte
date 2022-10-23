<script lang="ts">
  import { onMount } from 'svelte';
  import {getPoolBlocks, getEpoch} from "../data/koios"
  const epoch = getEpoch();
  const blocks = getPoolBlocks();
  var currentTime = Math.floor(Date.now() / 1000)

  function secondsToDhms(seconds:number): string {
    seconds = Number(seconds);
    var days = Math.floor(seconds / (3600*24));
    var hours = Math.floor(seconds % (3600*24) / 3600).toString().padStart(2,"0");
    var mins = Math.floor(seconds % 3600 / 60).toString().padStart(2,"0");
    var secs = Math.floor(seconds % 60).toString().padStart(2,"0");
    return days > 0 ? `${(days > 1 ? `${days} days` : `${days} day`)} ${hours}:${mins}:${secs}` : `${hours}:${mins}:${secs}`
  }

	onMount(() => {
		const interval = setInterval(() => {
			currentTime = Math.floor(Date.now() / 1000);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<div id="epoch">
  <div class="card shadow-xl blend p-4 m-4 mx-auto max-w-2xl">
      {#await epoch}
        <p class="text text-xl text-center p-2">Loading current epoch...</p>
        <progress class="progress mx-auto"/>
      {:then epoch}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p class="text text-xl font-bold mx-auto my-auto">Epoch <span class="badge badge-lg">{epoch.epoch_no}</span></p>
          <progress class="progress mx-auto my-auto h-4" value={(epoch.end_time - epoch.start_time) - (epoch.end_time - currentTime)} max={(epoch.end_time - epoch.start_time)}/>
          <p/>
          <p class="text text-xl text-center">ends in {secondsToDhms((epoch.end_time - currentTime))}</p>
        </div>
      {:catch error}
        <p class="text text-xl self-center font-bold">Issue fetching epoch data</p>
      {/await}
  </div>

  <div class="card shadow-xl blend2 p-4 m-4 mx-auto max-w-2xl">
  {#await blocks}
    <p class="text text-xl text-center p-2">Looking for blocks...</p>
    <progress class="progress mx-auto"/>
  {:then blocks}
    <p class="text text-xl text-center font-bold">Epoch block status</p>
    {#if blocks && blocks.length}
      <p class="text text-lg text-center">{blocks.length === 1 ? `Minted a block` : `Minted ${blocks.length} blocks`}
      {#each blocks as block}
        <a href={`https://cardanoscan.io/block/${block.block_height}`} target="_blank" rel="noopener noreferrer" class="link link-hover text-lg">🧊</a>
      {/each}
      </p>
    {:else}
        <p class="text text-lg text-center">No blocks yet this epoch 🫠</p>
    {/if}  
  {:catch error}
    <p class="text text-xl self-center font-bold">Issue fetching block data</p>
  {/await}
  </div>
</div>

<style>
.blend {
    background: linear-gradient(-45deg, #cf52ee,  #23a6d5);
    background-size: 400% 400%;
    animation: gradient 4s ease infinite;
}

.blend2 {
  background: linear-gradient(-45deg,  #23a6d5,#cf52ee);
  background-size: 400% 400%;
  animation: gradient 4s ease infinite;
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