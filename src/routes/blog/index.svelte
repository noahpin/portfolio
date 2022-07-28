<script context="module">
	import ProjectCard from '$lib/components/project-card.svelte';
	import CardGrid from '../../lib/components/card-grid.svelte';
	import { client } from '$lib/graphql-client';
	import { postsQuery } from '$lib/graphql-queries';
	import { marked } from 'marked';

	export const load = async () => {
		const { posts } = await client.request(postsQuery);

		return {
			props: {
				posts
			}
		};
	};
</script>

<script>
	export let posts;
</script>

<svelte:head>
	<title>BLOG</title>
</svelte:head>
<h1>Blog posts</h1>

<CardGrid>
	{#each posts as { title, slug, shortDescription, coverImage, tags }}
		<ProjectCard
			href={`/blog/${slug}`}
			name={title}
			{shortDescription}
			{tags}
			url={coverImage.url}
			{slug}
			readButton={true}
		/>
	{/each}
</CardGrid>
<!--
{#each posts as { title, slug, content, coverImage, tags }}
	<div class="card text-center shadow-2xl mb-20">
		<figure class="">
			<img class="" src={coverImage.url} alt={`Cover image for ${title}`} />
		</figure>
		<div class="card-body prose">
			<h2 class="title">{title}</h2>
			{@html marked(content).slice(0, 150)}
			<div class="flex justify-center mt-5 space-x-2">
				{#each tags as tag}
					<span class="badge badge-primary">{tag}</span>
				{/each}
			</div>
			<div class="justify-center card-actions">
				<a href={`/blog/${slug}`} class="btn btn-outline btn-primary">Read &rArr;</a>
			</div>
		</div>
	</div>
{/each}
-->
