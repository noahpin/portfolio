<script>
	import { createPopperActions } from "svelte-popperjs";
	import { onMount } from "svelte";
	import { marked } from "marked";
	import ProjectElement from "../lib/components/project-element.svelte";
	import ThreeThing from "../lib/components/three-thing.svelte";
	import HomePixelOverlay from "../lib/components/home-pixel-overlay.svelte";

	const [popperRef, popperContent, getInstance] = createPopperActions({
		placement: "right",
		strategy: "fixed",
	});

	const extraOpts = {
		modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
	};

	let showTooltip = false;

	let background = "";
	export let data;
	let { projects, authors } = data;
	$: ({ projects, authors } = data); // so it stays in sync when `data` changes
	var author = authors[0];

	let columns = 3;
	//3 breakpoints
	$: columns = w <= 600 ? 1 : w <= 1150 ? 2 : 3;
	let w;
	export let sy;
</script>
<HomePixelOverlay {sy}></HomePixelOverlay>
<svelte:window bind:innerWidth={w}  />

<svelte:head>
	<title>Noah Pinales - Designer and Developer</title>
</svelte:head>
<ThreeThing></ThreeThing>
<div
	id="projectList"
	style:columns={columns}
	class={showTooltip ? "hovered" : ""}
	on:mouseenter={() => (showTooltip = true)}
	on:mouseleave={() => (showTooltip = false)}
>
<!-- using the columns, skip every other so that we can fill row first -->
{#each projects as project}
<ProjectElement {project} {w} {columns} />
{/each}
</div>

<style>
	
	#projectList {
		position: relative;
		width: 100%;
		gap: 0;
		z-index: 10;
		float: right;
		bottom: 0;
		margin-top: 0;
		columns: 3;
	}
</style>
