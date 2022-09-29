<script>
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';
	import '$lib/styles/app.css';
	import '$lib/styles/font.css';
	let y;

</script>

<Navbar scroll={y} />

<svelte:window bind:scrollY={y} />
<main class="container max-w-3xl mx-auto px-4 mb-20">
	<slot />
</main>
<Footer />
