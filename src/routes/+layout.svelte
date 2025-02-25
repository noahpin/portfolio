<script>
	import Footer from "$lib/components/footer.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import "$lib/styles/app.css";
	import "$lib/styles/font.css";
	import { onMount } from "svelte";
	import { afterNavigate } from "$app/navigation";
	import { beforeNavigate } from "$app/navigation";
	import { page } from "$app/stores";

	export let data;
	let { authors } = data;
	$: ({ authors } = data); // so it stays in sync when `data` changes
	let home = $page.route.id == '/';
	$: home = $page.route.id == '/';
	onMount(() => {
		page.subscribe(() => {
			document.body.scrollTo({ top: 0 });
		});
	});
	let w, h, sy;
	let svgh;
	let breakpoint = false;
	$: svgh = h + sy;
	$: breakpoint = w <= 950;
</script>

<svelte:window bind:innerWidth={w}  bind:innerHeight={h} bind:scrollY={sy}/>

<main>
	<!-- <Navbar {authors} width={w} {breakpoint} {home} /> -->
	<div>
		<slot {sy} />
	</div>
	{#if breakpoint}
		<!-- <Footer {authors} width={w}{breakpoint}></Footer> -->
	{/if}
</main>