<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';
	const year = new Date().getFullYear();
</script>

<div class="container mx-auto px-4 flex flex-col h-screen">
	<Header />

	<main>
		<slot />
	</main>

	<div class="flex-grow" />

	<footer class="container mx-auto flex w-full p-4">
		<div class="items-center mx-auto">
			<p>©{year} ada9000.io</p>
		</div>
	</footer>
</div>
