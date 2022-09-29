<script context="module">
	import ProjectCard from '$lib/components/project-card.svelte';
	import CardGrid from '../../lib/components/card-grid.svelte';
	import { client } from '$lib/graphql-client';
	import { projectsQuery } from '$lib/graphql-queries';

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
	export let projects;
	console.log(projects)
</script>

<svelte:head>
	<title>WORK</title>
</svelte:head>

<h1>my work</h1>

<CardGrid>
	{#each projects as { name, slug, shortDescription, image, projectTags }}
		<ProjectCard href={`/work/${slug}`} {name} {shortDescription} url={image[0].url} {slug} tags={projectTags.tags} />
	{/each}
</CardGrid>
