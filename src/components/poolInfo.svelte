<script lang="ts">
  import { laceToAdaString } from "../util/utils";
  import {getPool} from "../data/koios"
  const pool = getPool();
  import Ada9000Fire from "./ada9000.svelte"
</script>

<div id="pool" class="max-w-2xl mx-auto">
  <Ada9000Fire/>
  <div class="mx-auto content-center grid gap-2">
    {#await pool}
      <p class="text text-xl text-center">Loading pool details...</p>
      <progress class="progress w-56 mx-auto"></progress>
    {:then pool}
      <p class="text text-4xl font-bold text-center">{pool.meta_json.ticker}</p>
      <p class="text text-4xl font-bold text-center text-primary">{laceToAdaString(pool.live_stake)}</p>
      <p class="text text-2xl font-bold text-center">🧙 {pool.live_delegators} delegators</p>
      <p class="text text-2xl font-bold text-center">🔥 {pool.block_count} blocks</p>
      <p class="text text-lg text-center">{pool.meta_json.description}</p>
    {:catch error}
      <p class="text text-xl self-center font-bold">Sorry there was an issue...</p>
    {/await}
  </div>
</div>