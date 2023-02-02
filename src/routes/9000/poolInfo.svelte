<script lang="ts">
	import { getPool } from 'data/koios';
	let pool = getPool();
	import Ada9000Fire from './ada9000.svelte';
	import Cheveron from 'assets/icons/cheveron.svelte';
	import InfoIcon from 'assets/icons/info.svelte';
	import { laceToAdaString } from '../../../src/lib/util/utils';

	function refetch() {
		pool = getPool();
		pool = pool;
	}
</script>

<div id="pool" class="max-w-2xl mx-auto">
	<Ada9000Fire />
	<div class="mx-auto content-center grid gap-2">
		{#await pool}
			<p class="text text-xl text-center p-2">Loading pool details...</p>
			<progress class="progress w-56 mx-auto" />
		{:then pool}
			<p class="text text-4xl font-bold text-center">{pool.meta_json.ticker}</p>
			<p class="text text-2xl font-bold text-center text-primary">
				{laceToAdaString(pool.live_stake)}
			</p>
			<p class="text text-xl font-bold text-center">🧙 {pool.live_delegators} delegators</p>
			<p class="text text-xl font-bold text-center">🔥 {pool.block_count} blocks</p>
			<p class="text text-md text-center">{pool.meta_json.description}</p>

			<a href="#stats" class="p-1 mx-auto"><Cheveron /></a>

			<div id="stats" class="grid sm:grid-cols-3 cols-1 p-2 gap-x-6 gap-y-2">
				<div class="grid grid-rows-2 mx-auto gap-2">
					<p class="text text-xl font-bold mx-auto my-auto">Margin</p>
					<div
						class="tooltip text-xl tooltip-secondary"
						data-tip="Pool operators fee. Allows 9000 to maintain a high quality operation."
					>
						<span class="badge badge-lg w-40"
							>{(pool.margin * 100).toFixed(2)}%
							<InfoIcon />
						</span>
					</div>
				</div>
				<div class="grid grid-rows-2 mx-auto gap-2">
					<p class="text text-xl font-bold mx-auto my-auto">Fixed</p>
					<div
						class="tooltip text-xl tooltip-secondary"
						data-tip="Amount charged if the pool mints a single block. 340 is current minimum allowed."
					>
						<span class="badge badge-lg w-40"
							>{laceToAdaString(pool.fixed_cost.toString())}
							<InfoIcon />
						</span>
					</div>
				</div>
				<div class="grid grid-rows-2 mx-auto gap-2">
					<p class="text text-xl font-bold mx-auto my-auto">Pledge</p>
					<div
						class="tooltip text-xl tooltip-secondary"
						data-tip="Amount of ada 9000 has pleged (aka skin in the game)."
					>
						<span class="badge badge-lg w-40"
							>{laceToAdaString(pool.pledge)}
							<InfoIcon />
						</span>
					</div>
				</div>
			</div>
		{:catch error}
			<div class="p-6 flex flex-col items-center">
				<p class="text text-lg text-center font-bold p-2">
					Sorry there was an issue fetching pool data
				</p>
				<button class="btn content-center" on:click={refetch}>Try again</button>
			</div>
		{/await}
	</div>
</div>
