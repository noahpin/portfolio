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
	console.log(project);
</script>

<svelte:head>
	<title>WORK | {project.name.toUpperCase()}</title>
</svelte:head>

<h1>{project.name}</h1>

<div class="projectTags">
	{#if project.projectTags}
		{#each project.projectTags.tags as tag, i}
			<a href="/work#{tag.replace(' ', ' ').toLowerCase()}">{tag}</a>
			{#if project.projectTags.tags.length - 1 > i}
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

	{#if project.image}
		<h1>gallery</h1>
		<div class="gallery">
			{#each project.image as image, i}
				<img src={image.url} alt="" />
			{/each}
		</div>
	{/if}
</article>

<style>
	h1 {
		margin-top: 150px;
	}
</style>
