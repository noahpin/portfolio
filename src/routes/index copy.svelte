<script context="module">
	import { client } from '$lib/graphql-client';
	import ProjectCard from '$lib/components/project-card.svelte';
	import { authorsQuery, projectsQuery } from '$lib/graphql-queries';

	export const load = async () => {
		const [authorReq, projectsReq] = await Promise.all([
			client.request(authorsQuery),
			client.request(projectsQuery)
		]);
		const { authors } = authorReq;
		const { projects } = projectsReq;
		return {
			props: {
				projects,
				authors
			}
		};
	};
</script>

<script>
	export let projects;
	export let authors;
</script>

<svelte:head>
	<title>ABOUT ME</title>
</svelte:head>

<h1 class="home-title">
	A <span class="color-green">MULTIDISCIPLINARY</span> <br />
	<span class="color-green">ARTIST</span>
	OBSESSED <br />
	WITH CREATING <span class="color-green">MAGIC</span>
</h1>

{#each authors as { name, intro, picture: { url } }}
	<div class="flex mb-40 items-end">
		<div class="mr-6">
			<h2 class="text-3xl mb-4 font-bold tracking-wider">{name}</h2>
			<p class="text-xl mb-4">{intro}</p>
		</div>

		<img class="mask mask-squircle h-48" src={url} alt={name} />
	</div>
{/each}

<div class="grid gap-10 md:grid-cols-4 md:px-10 lg:grid-cols-6 lg:-mx-52">
	{#each projects as { name, slug, description, image }}
		<ProjectCard {name} {description} url={image[0].url} {slug} />
	{/each}
</div>
<div class="gridBackground">
	<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
				<path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" />
			</pattern>
		</defs>

		<rect width="100%" height="100%" fill="url(#grid)" />
	</svg>
</div>

<style>
	.gridBackground {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		visibility: hidden;
	}
</style>
