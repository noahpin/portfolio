<script>
	import LogotypeNav from './logotype-nav.svelte';
	import Logoicon from './logoicon.svelte';
	import { page } from '$app/stores';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiSystemMenu3Fill from 'svelte-icons-pack/ri/RiSystemMenu3Fill';
	import RiSystemCloseFill from 'svelte-icons-pack/ri/RiSystemCloseFill';
	import VscClose from 'svelte-icons-pack/vsc/VscClose';
	import { onMount } from 'svelte/internal';

	import { Hamburger } from 'svelte-hamburgers';

	let open;
	export let pathName = $page.url.pathname.replace('/', '');
	console.log(pathName);
	var pa = '';
	page.subscribe(() => {
		pathName = $page.url.pathname.replace('/', '');
		console.log(pathName);
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
	<LogotypeNav size="50" visible={navVisible} />
	<Logoicon size="50" />
	<div class={open ? 'nav-btns' : 'nav-btns btns-hidden'}>
		<button
			class={open ? 'hamburger-close ' : 'hamburger-close hamburger-hidden'}
			on:click={() => {
				open = !open;
			}}
		>
			<Icon size="48" color="var(--black)" className="icon-button" src={VscClose} />
		</button>
		<a href="/" class={pathName == '' ? 'selected' : ''}> Home </a>
		<a href="/work" class={pathName.startsWith('work') ? 'selected' : ''}>Work</a>
		<a href="/about" class={pathName.startsWith('about') ? 'selected' : ''}>About</a>
		<a href="/blog" class={pathName.startsWith('blog') ? 'selected' : ''}>Blog</a>
		<a href="/contact" class={pathName.startsWith('contact') ? 'selected' : ''}>Contact</a>
	</div>
	<button
		class={open ? 'hamburger-open hamburger-hidden' : 'hamburger-open'}
		on:click={() => {
			open = !open;
		}}
	>
		<Icon size="32" color="var(--green)" className="icon-button" src={RiSystemMenu3Fill} />
	</button>
</div>

<style>
	.hamburger-open {
		margin: 0 50px;
		margin-right: 40px;
		position: absolute;
		right: 0;
		opacity: 0;
		pointer-events: none;
		background: none;
		border: none;
		outline: none;
	}
	.hamburger-hidden {
		opacity: 0 !important;
		pointer-events: none !important;
	}
	.hamburger-close {
		right: 40px;
		top: 15px;
		padding: 0;
		position: absolute;
		pointer-events: none;
		background: none;
		border: none;
		outline: none;
	}
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
		z-index: 999999999999999999999;
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

	@media screen and (max-width: 900px) {
		.hamburger-open {
			opacity: 1;
			pointer-events: all;
		}
		.hamburger-close {
			opacity: 1;
			pointer-events: all;
		}
		.nav-hidden .nav-btns {
			opacity: unset;
		}
		.nav {
			opacity: 1;
			display: flex;
			align-items: center;
			position: fixed;
			left: 0;
			transform: none;
			width: calc(100vw - 40px);
			margin-left: 40px;
			transition: 0.3s opacity;
			z-index: 999999999999999999999;
		}
		.nav-btns {
			position: fixed;
			height: 100vh;
			left: 0;
			top: 0;
			margin: 0;
			width: 100vw;
			transition: 0.3s opacity;
			background: var(--green);
			display: flex;
			align-content: center;
			flex-wrap: wrap;
			gap: 50px 6000px;
			opacity: 1;
			pointer-events: all;
		}

		.nav-btns.btns-hidden {
			opacity: 0;
			pointer-events: none;
		}
		.selected {
			color: var(--black);
			background-size: 100% 5px;
		}
		a {
			width: fit-content;
			margin: auto;
			font-family: 'Akira';
			font-size: 50px;
			color: var(--black);
			display: block;
			background-position: 0px 50px;
			background-size: 0% 5px;
			background-attachment: local;
			background-image: linear-gradient(to right, var(--black) 0%, var(--black) 100%);
		}
		a:hover {
			background-size: 100% 5px;
		}
	}
</style>
