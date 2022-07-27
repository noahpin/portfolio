<script>
	import Logotype from './logotype.svelte';
	import Logoicon from './logoicon.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte/internal';
	export let pathName = $page.url.pathname.replace('/', '');
	console.log(pathName);
	var pa = '';

	onMount(() => {
		return () => {
			pathName = $page.url.pathname.replace('/', '');
		};
	});
	export let scroll = 0;
	$: scrollChange(scroll);
	let previousScroll = 0;
	let scrollDelta = 0;
	let currentSign = 0;
	let previousSign = 0;
	let scrollOnSignChange = 0;
	let navVisible = false;
	function scrollChange(scr) {
		scroll = scr;
		scrollDelta = scroll - previousScroll;
		previousScroll = scroll;
		currentSign = Math.sign(scrollDelta);
		//console.log(scrollDelta, currentSign, previousSign);
		if (currentSign != previousSign) {
			console.log('changed directions');
			scrollOnSignChange = scroll;
		}
		previousSign = currentSign;
		if (Math.abs(scrollOnSignChange - scroll) > 0 && scroll > 50) {
			navVisible = currentSign == 1;
		}
	}
</script>

<div class={navVisible ? 'nav nav-hidden' : 'nav'}>
	<Logotype size="50" visible={navVisible} />
	<Logoicon size="50" />
	<div class="nav-btns">
		<a href="/" class={pathName == '' ? 'selected' : ''}> Home </a>
		<a href="/work" class={pathName.startsWith('work') ? 'selected' : ''}>Work</a>
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
		opacity: 1;
		display: flex;
		align-items: center;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		top: 20px;
		width: calc(100% - 80px);
		transition: 0.3s opacity;
	}
	.nav-hidden .nav-btns {
		opacity: 0;
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
		/*text-shadow: 0px 0px 35px rgb(0, 0, 0);*/
	}
	.nav-btns {
		margin: 0 50px;
		margin-right: 0;
		position: absolute;
		right: 0;
		transition: 0.3s opacity;
	}
	a:hover {
		background-size: 100% 2px;
	}
</style>
