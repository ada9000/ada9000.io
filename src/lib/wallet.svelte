<script lang="ts">
  import { getAccountAssets } from "../data/koios";
  import type { AccountAsset } from "../types/koios";


  export let addr : string | undefined;
  let assets : Promise<AccountAsset[]> = getAccountAssets([addr]);

</script>

<!-- What to add...
  ADA
  REWARDS
  DELEGATION
  NFTS
  Transcation history  -->

<div class="mx-auto p-2">
  <p>Addr = {addr}</p>
  {#await assets}
  <p>loading</p>
  {:then asset}
  {#if asset.length !== 0}
  <p>{JSON.stringify(asset[0])} </p>
  {:else}
  <p>No assets</p>
  {/if}
  {/await}
</div>