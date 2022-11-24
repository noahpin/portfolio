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
		open = false;
	});
	export let width = 0;
	$: widthChange(width);
	let fill = 'var(--green)';
	let bigEnough = false;
	function widthChange(w) {
		if (w > 900) {
			bigEnough = true;
		} else {
			bigEnough = false;
		}
	}
</script>

<div class="nav">
	{#if bigEnough}
		<a id="logotype" href="/">
			<svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 381.05955 104.19497">
				<g>
					<path
						d="M360.268,44.8667l0,0a4.80949,4.80949,0,0,1-4.16748,2.40879H309.67074a2.7039,2.7039,0,0,1-2.34164-4.05586l8.3538-14.469a2.70391,2.70391,0,0,0-2.34164-4.05587h-3.65743a4.80949,4.80949,0,0,0-4.1651,2.40468L277.60582,75.44418a2.7039,2.7039,0,0,0,2.34162,4.05589h22.27221a2.7039,2.7039,0,0,0,2.34185-4.0555L298.033,64.13305a4.8095,4.8095,0,0,1-.002-4.80477l.00007-.00012a4.80947,4.80947,0,0,1,4.1675-2.40884h46.42974A2.7039,2.7039,0,0,1,350.97,60.97518l-8.35381,14.469a2.7039,2.7039,0,0,0,2.34164,4.05586h3.65741a4.80948,4.80948,0,0,0,4.16509-2.40467l27.91294-48.34468a2.7039,2.7039,0,0,0-2.34162-4.05589H356.07941a2.7039,2.7039,0,0,0-2.34185,4.0555L360.266,40.06189A4.8095,4.8095,0,0,1,360.268,44.8667Z"
						style="fill:  {fill}"
					/>
					<path
						d="M2.70793,79.49811h22.273a2.70389,2.70389,0,0,0,2.34164-4.05584l-6.52869-11.308a4.80948,4.80948,0,0,1,0-4.80948L32.8836,38.38469a2.7039,2.7039,0,0,1,4.68329,0l37.215,64.45832a2.70389,2.70389,0,0,0,4.68329,0L122.24122,28.7527a2.7039,2.7039,0,0,0-2.34165-4.05585h-22.273a2.7039,2.7039,0,0,0-2.34165,4.05585l6.52866,11.308a4.8095,4.8095,0,0,1,0,4.80949l-12.08972,20.94a2.7039,2.7039,0,0,1-4.68329,0L47.82564,1.352a2.7039,2.7039,0,0,0-4.68329,0L.36629,75.44227A2.70389,2.70389,0,0,0,2.70793,79.49811Z"
						style="fill:  {fill}"
					/>
					<path
						d="M125.73,59.32135l13.03223-22.57293a4.80947,4.80947,0,0,1,4.16515-2.40477h38.96085a4.80948,4.80948,0,0,1,4.16549,2.40534l1.91064,3.31043a4.80951,4.80951,0,0,1-.00014,4.80852l-13.0329,22.57821a4.80949,4.80949,0,0,1-4.16535,2.40511H131.80973a4.80951,4.80951,0,0,1-4.165-2.40452L125.73015,64.131A4.80948,4.80948,0,0,1,125.73,59.32135Zm80.32138-34.62652H137.37861a4.80948,4.80948,0,0,0-4.16509,2.40467L105.30058,75.44418a2.7039,2.7039,0,0,0,2.34162,4.05589H176.315a4.80949,4.80949,0,0,0,4.1651-2.40467L208.393,28.75072A2.7039,2.7039,0,0,0,206.05139,24.69483Z"
						style="fill:  {fill}"
					/>
					<path
						d="M229.07955,34.34365h38.9563a4.80947,4.80947,0,0,1,4.16548,2.40534l1.91207,3.31291a4.80948,4.80948,0,0,1,.002,4.8048l0,0a4.80948,4.80948,0,0,1-4.16748,2.40881H223.51876a2.70389,2.70389,0,0,1-2.34147-4.05614l3.73743-6.47152A4.80949,4.80949,0,0,1,229.07955,34.34365ZM292.204,24.69483H223.53124a4.80948,4.80948,0,0,0-4.1651,2.40467L191.4532,75.44418a2.7039,2.7039,0,0,0,2.34162,4.05589H216.067a2.7039,2.7039,0,0,0,2.34184-4.0555L211.8804,64.13305a4.80948,4.80948,0,0,1-.002-4.80477l.00006-.00012a4.80949,4.80949,0,0,1,4.16751-2.40884h46.42974a2.7039,2.7039,0,0,1,2.34164,4.05586l-8.35381,14.469a2.7039,2.7039,0,0,0,2.34164,4.05586h3.66242a4.80948,4.80948,0,0,0,4.1651-2.40467l27.91294-48.34468A2.7039,2.7039,0,0,0,292.204,24.69483Z"
						style="fill:  {fill}"
					/>
				</g>
			</svg>
		</a>
	{/if}
	{#if !bigEnough}
		<a id="logomark" href="/">
			<svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 144.67137 122.9454">
				<path
					d="M3.19524,93.80422h26.2811a3.19048,3.19048,0,0,0,2.763-4.78572l-7.70356-13.343a5.675,5.675,0,0,1,0-5.675L38.80118,45.29222a3.19047,3.19047,0,0,1,5.52607,0l43.912,76.05794a3.19047,3.19047,0,0,0,5.52607,0L144.23917,33.9269a3.19048,3.19048,0,0,0-2.763-4.78572H115.195a3.19048,3.19048,0,0,0-2.763,4.78572l7.70352,13.34289a5.675,5.675,0,0,1,0,5.675l-14.26533,24.7083a3.19048,3.19048,0,0,1-5.52608,0L56.43211,1.59524a3.19047,3.19047,0,0,0-5.52607,0L.4322,89.0185A3.19048,3.19048,0,0,0,3.19524,93.80422Z"
					style="fill: {fill}"
				/>
			</svg>
		</a>
	{/if}
	<div>
		<a href="/">Work</a>
		<a href="/about">About</a>
	</div>
</div>

<style>
	.nav {
		opacity: 1;
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		transition: 0.3s opacity;
		z-index: 999999999999999999999;
		display: flex;
		justify-content: space-between;
	}
	a {
		margin-left: 50px;
		padding: 5px;
		font-size: 13px;
		text-transform: uppercase;
		text-decoration: none;
		transition: 0.3s background-size;
		background-image: linear-gradient(to right, var(--green) 0%, var(--green) 100%);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: 0px 19px;
		background-size: 0% 2px;
	}
	a:hover {
		opacity: 0.5;
	}
	#logotype,
	#logomark {
		margin: 0;
		cursor: pointer;
	}
	#logotype:hover,
	#logomark:hover {
		opacity: 0.75;
	}

	@media (max-width: 900px) {
		a {
			margin-left: 20px;
		}
	}
</style>
