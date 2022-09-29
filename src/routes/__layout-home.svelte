<script>
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';
	import '$lib/styles/app.css';
	import '$lib/styles/font.css';
</script>

<Navbar />
<main class="">
	<slot />
</main>

<style>
	main {
		width: 100%;
		min-height: 100vh;
	}
</style>
