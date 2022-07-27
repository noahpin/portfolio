<script>
	import { each } from 'svelte/internal';

	import Marquee from './marquee.svelte';
	import StarIcon from './star-icon.svelte';
	var links = [
		{ name: 'web dev', url: '/work' },
		{ name: '3d art', url: '/work' },
		{ name: 'graphic design', url: '/work' },
		{ name: 'photography', url: '/work' }
	];
</script>

<Marquee>
	{#each links as { name, url }}
		<a href={url}>{name}</a><span style="width: 20px" /><StarIcon fill="var(--black)" size="25" />
		<span style="width: 20px" />
	{/each}
</Marquee>

<style>
	* {
		font-family: 'Akira';
		font-size: 50px;
		text-decoration: none;
		color: var(--black);
	}
	a:hover {
		text-decoration: underline;
	}
</style>
