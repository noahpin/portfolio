<script context="module">
	import { client } from '$lib/graphql-client';
	import { projectQuery } from '$lib/graphql-queries';
	import { marked } from 'marked';
	import StarIcon from '../../lib/components/star-icon.svelte';

	export const load = async ({ params }) => {
		const { slug } = params;
		const variables = { slug };
		const { project } = await client.request(projectQuery, variables);

		return {
			props: {
				project
			}
		};
	};
</script>

<script>
	export let project;
</script>

<svelte:head>
	<title>WORK | {project.name.toUpperCase()}</title>
</svelte:head>

<img class="coverImage" src={project.image[0].url} alt={project.title} />

<h1>{project.name}</h1>

<div class="projectTags">
	{#if project.tags}
		{#each project.tags as tag, i}
			<a href="/work#{tag.replace(' ', ' ').toLowerCase()}">{tag}</a>
			{#if project.tags.length - 1 > i}
				<span style="width: 20px" />
				<StarIcon fill="var(--white)" size="7" />
				<span style="width: 20px" />
			{/if}
		{/each}
	{/if}
</div>

<div class="viewProjectButton">
	<a href={project.viewProject}>View Project</a>
</div>

<article class="postContent">
	{@html marked(project.description)}
</article>

<style>
	h1 {
		margin-top: 50px;
	}
</style>
