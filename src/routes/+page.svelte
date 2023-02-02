<script lang="ts">
	import Cheveron from 'assets/icons/cheveron.svelte';
	import Pool from './9000/poolInfo.svelte';
	import EpochInfo from './9000/epochInfo.svelte';
	import Delegators from './9000/delegators.svelte';
</script>

<!--TODO: MIGRATE TO ALLOW ANY POOL -->
<div id="intro">
	<Pool />
	<EpochInfo />
	<div class="flex justify-center">
		<a href="#delegators" class="p-1 mx-auto w-max"><Cheveron /></a>
	</div>
	<Delegators />
</div>
