<script>
	import { page } from "$app/stores";
	import Icon from "svelte-icons-pack/Icon.svelte";
	import RiSystemMenu3Fill from "svelte-icons-pack/ri/RiSystemMenu3Fill";
	import RiSystemCloseFill from "svelte-icons-pack/ri/RiSystemCloseFill";
	import VscClose from "svelte-icons-pack/vsc/VscClose";
	import { onMount } from "svelte/internal";

	import { Hamburger } from "svelte-hamburgers";

	import NavfooterSharedContent from "./navfooter-shared-content.svelte";

	let open;
	export let authors;
	let author = authors[0];
	$: author = authors[0];
	let fill = "var(--white)";
	let fill2 = "var(--accent)";
	export let breakpoint = false;
	export let home = false;
</script>

<div class="nav-wrapper">
	<div class="nav">
		<a id="logotype" href="/">
			<svg
				id="b"
				data-name="Layer 2"
				xmlns="http://www.w3.org/2000/svg"
				width="180"
				viewBox="0 0 527.796 207.976"
			>
				<g id="c" data-name="Layer 1">
					<g>
						<path
							d="M92.564,169.704h0c-2.95,0-5.341-2.391-5.341-5.341V0H0v207.976h38.271V43.612c0-2.95,2.391-5.341,5.341-5.341h0c2.95,0,5.341,2.391,5.341,5.341v164.364h87.224V0h-38.271v164.364c0,2.95-2.391,5.341-5.341,5.341Z"
							{fill}
							stroke-width="0"
						/>
						<path
							d="M146.857,207.976h87.224V0h-87.224v207.976ZM190.469,38.271h0c2.95,0,5.341,2.391,5.341,5.341v120.752c0,2.95-2.391,5.341-5.341,5.341h0c-2.95,0-5.341-2.391-5.341-5.341V43.612c0-2.95,2.391-5.341,5.341-5.341Z"
							{fill}
							stroke-width="0"
						/>
						<path
							d="M244.762,207.976h38.271v-43.612c0-2.95,2.391-5.341,5.341-5.341h0c2.95,0,5.341,2.391,5.341,5.341v43.612h38.271V0h-87.224v207.976ZM288.374,38.271h0c2.95,0,5.341,2.391,5.341,5.341v71.799c0,2.95-2.391,5.341-5.341,5.341h0c-2.95,0-5.341-2.391-5.341-5.341V43.612c0-2.95,2.391-5.341,5.341-5.341Z"
							{fill}
							stroke-width="0"
						/>
						<path
							d="M386.279,120.752h0c-2.95,0-5.341-2.391-5.341-5.341V0S342.667,0,342.667,0v207.976h38.271v-43.612c0-2.95,2.391-5.341,5.341-5.341h0c2.95,0,5.341,2.391,5.341,5.341v43.612s38.271,0,38.271,0V0h-38.271v115.411c0,2.95-2.391,5.341-5.341,5.341Z"
							{fill}
							stroke-width="0"
						/>
						<path
							d="M440.572,0v207.976h38.271v-48.952h48.952V0h-87.224ZM484.184,120.752h0c-2.95,0-5.341-2.391-5.341-5.341V43.612c0-2.95,2.391-5.341,5.341-5.341h0c2.95,0,5.341,2.391,5.341,5.341v71.799c0,2.95-2.391,5.341-5.341,5.341Z"
							{fill}
							stroke-width="0"
						/>
						<rect
							x="489.524"
							y="169.704"
							width="38.271"
							height="38.271"
							fill={fill2}
							stroke-width="0"
						/>
					</g>
				</g>
			</svg>
		</a>
		<a class="particle" href="/">WORK</a>
		<a class="particle" href="/about">ABOUT</a>
	</div>
</div>

<style>
	.nav-wrapper {
		position: relative;
		margin-right: 40px;
		width: 220px;
		height: 100px;
		flex-shrink: 0;
	}
	.nav {
		position: fixed;
		opacity: 1;
		display: flex;
		align-items: center;
		transition: 0.3s opacity;
		padding-right: 40px;
		width: 180px;
		z-index: 999999999999999999999;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-shrink: 0;
		flex-grow: 1;
		align-self: stretch;
		flex: 1;
		margin-bottom: auto;
		gap: 40px;
	}
	#logotype {
		margin: 0;
		cursor: pointer;
		padding: 0;
	}
	#logotype:hover {
		opacity: 0.75;
	}

	/* @media (max-width: 950px) { */
	.nav-wrapper {
		margin-right: 0px;
		width: 100%;
		height: fit-content;
		margin-bottom: 8px;
		padding: 8px;
	}
	.nav {
		position: relative;
		padding-right: 0px;
		width: 100%;
		border: none;
	}
	.nav-content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 40px;
	}
	.nav-content .particle {
		flex: 1 1 160px;
		margin-bottom: 0;
	}
	.contact-block {
		display: flex;
		justify-content: flex-start;
		gap: 16px;
	}
	a {
		font-weight: bold;
	}
	/* } */
</style>
