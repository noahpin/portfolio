<script>
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Background from '../lib/components/background.svelte';
	import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import '$lib/styles/app.css';
	import '$lib/styles/font.css';
	let y;
	let scrollY
onMount(()=> {
	page.subscribe(() => {
		document.body.scrollTo({top: 0, behavior: 'smooth'});
	});

})

</script>

<svelte:window bind:innerWidth={y} bind:scrollY   />
<main on:scroll={(e) => console.log(e.target.scrollTop)} >
	<Navbar width={y} />
	<slot scrollY={scrollY}  />
	<Footer></Footer>
	
</main>

<Background ></Background>
