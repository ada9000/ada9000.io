<script lang="ts">
  import { laceToAdaString } from "../util/utils";
  import {getPool} from "../data/koios"
  const pool = getPool();
  import Ada9000Fire from "./ada9000.svelte"
  import Cheveron from "../assets/icons/cheveron.svelte";
</script>

<div id="pool" class="max-w-2xl mx-auto">
  <Ada9000Fire/>
  <div class="mx-auto content-center grid gap-2">
    {#await pool}
      <p class="text text-xl text-center">Loading pool details...</p>
      <progress class="progress w-56 mx-auto"></progress>
    {:then pool}
      <p class="text text-4xl font-bold text-center">{pool.meta_json.ticker}</p>
      <p class="text text-2xl font-bold text-center text-primary">{laceToAdaString(pool.live_stake)}</p>
      <p class="text text-xl font-bold text-center">🧙 {pool.live_delegators} delegators</p>
      <p class="text text-xl font-bold text-center">🔥 {pool.block_count} blocks</p>
      <p class="text text-md text-center">{pool.meta_json.description}</p>

      <a href="/#stats" class="p-1 mx-auto"><Cheveron/></a>

      <div id="stats" class="grid sm:grid-cols-3 cols-1 p-2 gap-x-6 gap-y-2">
        <div class="grid grid-rows-2 mx-auto gap-2">
          <p class="text text-xl font-bold mx-auto my-auto">Margin</p><span class="badge badge-lg w-32">{(pool.margin * 100).toFixed(2)}%</span>
        </div>
        <div class="grid grid-rows-2 mx-auto gap-2">
          <p class="text text-xl font-bold mx-auto my-auto">Fixed</p><span class="badge badge-lg w-32">{laceToAdaString(pool.fixed_cost.toString())}</span>
        </div>
        <div class="grid grid-rows-2 mx-auto gap-2">
          <p class="text text-xl font-bold mx-auto my-auto">Pledge</p><span class="badge badge-lg w-32">{laceToAdaString(pool.pledge)}</span>
        </div>
      </div>

    {:catch error}
      <p class="text text-xl self-center font-bold">Sorry there was an issue...</p>
    {/await}
  </div>
</div>