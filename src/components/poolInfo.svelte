<script lang="ts">
  import { laceToAdaString } from "../util/utils";
  import {getPool, getTip} from "../data/koios"
  const pool = getPool();
  const tip = getTip();
  import Ada9000Fire from "./ada9000.svelte"
</script>

<div>
  <Ada9000Fire/>

  <div class="mx-auto content-center grid gap-2 m-2">
    {#await pool}
      <p class="text text-xl text-center">Loading pool details...</p>
      <progress class="progress w-56 mx-auto"></progress>
    {:then pool}
      <p class="text text-4xl font-bold text-center">{pool.meta_json.ticker}</p>
      <p class="text text-4xl font-bold text-center text-primary">{laceToAdaString(pool.live_stake)}</p>
      <p class="text text-2xl font-bold text-center">🧙 {pool.live_delegators} delegators</p>
      <p class="text text-2xl font-bold text-center">🔥 {pool.block_count} blocks</p>
      <p class="text text-xl text-center">{pool.meta_json.description}</p>
    {:catch error}
      <p class="text text-4xl self-center font-bold">Sorry there was an issue...</p>
    {/await}
    
    {#await tip}
      <p class="text text-xl text-center">Loading current epoch...</p>
      <progress class="progress w-56 mx-auto"></progress>
    {:then tip}
      <p class="text text-xl font-bold text-center">epoch <span class="badge badge-lg">{tip.epoch_no}</span></p>
    {/await}
  </div>


</div>

<!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
  <div class="card shadow-lg p-2 bg-primary">
      {#await pool}
        <p  class="text text-4xl self-center font-bold">loading pool</p>
        {:then pool}
        <p class="text text-4xl self-center font-bold">3: {pool.meta_json.ticker}</p>
      {/await}
  </div>

  <div class="card shadow-lg p-2 bg-secondary">
    <h1>Updates</h1>
    b
  </div>
</div> -->

<style>
.blend {
    background: linear-gradient(-45deg, #cf52ee,  #23a6d5);
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