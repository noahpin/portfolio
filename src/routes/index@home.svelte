<script context="module">
	import ProjectCard from '$lib/components/project-card.svelte';
	import { client } from '$lib/graphql-client';
	import { projectsQuery } from '$lib/graphql-queries';

	import { onMount } from 'svelte';

	export const load = async () => {
		const { projects } = await client.request(projectsQuery);

		return {
			props: {
				projects
			}
		};
	};
</script>

<script>
	let background = '';
	export let projects;
	console.log(projects);
	//create image visibility array for each project
	let imageVisibility = new Array(projects.length).fill(false);
	imageVisibility[0] = true;
	let index = 0;
	let counter = 0;
	let interval = setInterval(() => {
		inc();
	}, 5000);
	function inc() {
		index++;
		if (index >= projects.length) {
			index = 0;
		}
	}
	$: {
		imageVisibility = new Array(projects.length).fill(false);
		imageVisibility[index] = true;
		counter = 0;
		clearInterval(interval);
		interval = setInterval(() => {
			inc();
		}, 5000);
	}
</script>

<div id="backgrounds">
	{#each projects as { image }, i}
		<img src={image[0].url} class={imageVisibility[i] ? 'imageVisible' : ''} alt="" />
	{/each}
</div>

<svelte:head>
	<title>NOAH</title>
</svelte:head>
<div id="projectList">
	{#each projects as { name, slug, image, projectTags, timestamp }, i}
		<a
			class={imageVisibility[i] ? 'project highlight' : 'project'}
			href={'work/' + slug}
			on:mouseover={() => {
				index = i;
			}}
			on:focus={() => {
				index = i;
			}}
		>
			<span>{name}</span>
			<span class="timestamp">{timestamp}</span>
		</a>
	{/each}
</div>

<style>
	#backgrounds {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 0;
		background-size: cover;
		background-position: center;
		transition: 0.3s background-image;
		overflow: hidden;
	}
	#backgrounds img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.imageVisible {
		opacity: 1 !important;
	}
	.project {
		font-size: 13px;
		text-transform: uppercase;
		transition: 0.3s background-size;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		padding: 5px;
		margin-left: -5px;
		transition: background 0.2s;
	}
	.highlight {
		background: white;
	}
	.highlight * {
		color: black;
	}
	a {
		text-decoration: none;
	}
	.timestamp {
		opacity: 0.5;
	}
	#projectList {
		position: absolute;
		max-width: 500px;
		width: 100%;
		gap: 0;
		z-index: 10;
		float: right;
		bottom: 0;
	}
</style>
