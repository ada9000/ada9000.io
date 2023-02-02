<script lang="ts">
	import type { PoolBlocks } from 'types/koios';
	import { onMount } from 'svelte';
	import { getPoolBlocks, getEpoch } from 'data/koios';
	import EpochBlocks from './epochBlocks.svelte';

	let epoch = getEpoch();
	let blocks = getPoolBlocks();
	let lastBlocks: PoolBlocks[] | undefined;
	let initBlockLoadingDone = false;
	var currentTime = Math.floor(Date.now() / 1000);

	function secondsToDhms(seconds: number): string {
		seconds = Number(seconds);
		var days = Math.floor(seconds / (3600 * 24));
		var hours = Math.floor((seconds % (3600 * 24)) / 3600)
			.toString()
			.padStart(2, '0');
		var mins = Math.floor((seconds % 3600) / 60)
			.toString()
			.padStart(2, '0');
		var secs = Math.floor(seconds % 60)
			.toString()
			.padStart(2, '0');
		return days > 0
			? `${days > 1 ? `${days} days` : `${days} day`} ${hours}:${mins}:${secs}`
			: `${hours}:${mins}:${secs}`;
	}

	onMount(async () => {
		// update time every seconds + check for new epochs if required
		const everySecond = setInterval(async () => {
			currentTime = Math.floor(Date.now() / 1000);
			const e = await epoch;
			const secondsLeft = e.end_time - currentTime;
			if (secondsLeft < 0) {
				epoch = getEpoch();
				blocks = getPoolBlocks();
				epoch = epoch;
				blocks = blocks;
				// wait 15 seconds before trying again to prevent multiple api calls
				await new Promise((resolve) => setTimeout(resolve, 15000));
			}
		}, 1000);
		// check for new blocks every 2 min
		const blockChecks = setInterval(async () => {
			lastBlocks = await blocks;
			blocks = getPoolBlocks();
			blocks = blocks;
		}, 1200000);
		// cleanup
		return () => {
			clearInterval(everySecond);
			clearInterval(blockChecks);
		};
	});
</script>

<div id="epoch">
	<div class="card shadow-xl blend1 p-4 m-4 mx-auto max-w-2xl">
		{#await epoch}
			<p class="text text-xl text-center p-2">Loading current epoch...</p>
			<progress class="progress mx-auto" />
		{:then epoch}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
				<p class="text text-xl font-bold mx-auto my-auto">
					Epoch <span class="badge badge-lg">{epoch.epoch_no}</span>
				</p>
				<progress
					class="progress mx-auto my-auto h-4"
					value={epoch.end_time - epoch.start_time - (epoch.end_time - currentTime)}
					max={epoch.end_time - epoch.start_time}
				/>
				<p />
				<p class="text text-md text-center">
					Ends in {secondsToDhms(epoch.end_time - currentTime)}
				</p>
			</div>
		{:catch error}
			<p class="text text-md self-center font-bold">
				Issue fetching epoch data, try again on boundries...
			</p>
		{/await}
	</div>

	<!-- BLOCK DISPLAY -->
	<div id="epochBlocks" class="card shadow-xl blend2 p-4 m-4 mx-auto max-w-2xl">
		{#await blocks}
			{#if lastBlocks}
				<EpochBlocks blocks={lastBlocks} />
			{:else}
				<EpochBlocks {blocks} />
			{/if}
		{:then blocks}
			<EpochBlocks {blocks} />
		{:catch}
			<EpochBlocks {blocks} />
		{/await}
	</div>
</div>

<style>
	.blend1 {
		background: linear-gradient(-45deg, #cf52ee, #23a6d5);
		background-size: 200% 100%;
		animation: gradient 6s ease infinite;
	}

	.blend2 {
		background: linear-gradient(-45deg, #23a6d5, #cf52ee);
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
