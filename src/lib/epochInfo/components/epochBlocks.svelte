<script lang="ts">
  import type { PoolBlocks } from "src/types/koios";
  export let blocks:Promise<PoolBlocks[]> | PoolBlocks[];
</script>

<div>
  {#await blocks}
    <p class="text text-xl text-center p-2">Looking for blocks...</p>
    <progress class="progress mx-auto"/>
  {:then blocks}
    <!-- BLOCK DISPLAY -->
    <p class="text text-xl text-center font-bold">Epoch block status</p>
    {#if blocks && blocks.length}
      <p class="text text-lg text-center">{blocks.length === 1 ? `Minted a block` : `Minted ${blocks.length} blocks`}
      {#each blocks as block}
        <a href={`https://cardanoscan.io/block/${block.block_height}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          class="link link-hover text-lg tooltip"
          data-tip={`Slot ${block.abs_slot}`}

        >
          🧊
        </a>
      {/each}
      </p>
    {:else}
        <p class="text text-lg text-center">No blocks yet this epoch 🫠</p>
    {/if}  
  {:catch error}
    <p class="text text-xl self-center font-bold">Issue fetching block data</p>
  {/await}
</div>
