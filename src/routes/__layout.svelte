<script>
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';
	import '$lib/styles/app.css';
	import '$lib/styles/font.css';
	onMount(async () => {
		console.log('a');
	});
</script>

<Navbar />
<main class="container max-w-3xl mx-auto px-4 mb-20">
	<slot />
</main>
