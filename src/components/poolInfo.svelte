<script lang="ts">
  import {getPool, getTip} from "../data/koios.ts"
  const pool = getPool();
  const tip = getTip();
</script>

<div class="card bg-blue-400">
    {#await tip }
      <p>loading tip</p>
    {:then tip}
      <p class="text-red-700 self-center">2: {tip[0].epoch_no}</p>
    {/await}

    {#await pool}
      <p>loading pool</p>
      {:then pool}
      <p class="text-green-700 self-center">3: {pool[0].meta_json.ticker}</p>
    {/await}
</div>