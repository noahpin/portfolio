<script>
	import Logotype from './logotype.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte/internal';
	export let pathName = $page.url.pathname.replace('/', '');
	console.log(pathName);

	onMount(() => {
		return () => {
			pathName = $page.url.pathname.replace('/', '');
		};
	});
</script>

<div class="nav">
	<Logotype size="200" />
	<div class="nav-btns">
		<a href="/" class={pathName == '' ? 'selected' : ''}> Home </a>
		<a href="/posts" class={pathName.startsWith('work') ? 'selected' : ''}>Work</a>
		<a href="/about" class={pathName.startsWith('about') ? 'selected' : ''}>About</a>
		<a href="/blog" class={pathName.startsWith('blog') ? 'selected' : ''}>Blog</a>
		<a href="/contact" class={pathName.startsWith('contact') ? 'selected' : ''}>Contact</a>
	</div>
</div>

<style>
	.selected {
		color: var(--green);
	}
	.nav {
		display: flex;
		align-items: center;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		top: 20px;
		width: calc(100% - 80px);
	}
	a {
		margin-left: 50px;
		font-weight: bold;
		text-transform: uppercase;
		text-decoration: none;
		transition: 0.3s background-size;
		background-image: linear-gradient(to right, var(--green) 0%, var(--green) 100%);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: 0px 19px;
		background-size: 0% 2px;
	}
	.nav-btns {
		margin: 0 50px;
		margin-right: 0;
		position: absolute;
		right: 0;
	}
	a:hover {
		background-size: 100% 2px;
	}
</style>
