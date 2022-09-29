<script context="module">
	import SvelteMarkdown from 'svelte-markdown';

	import { client } from '$lib/graphql-client';
	import { postQuery } from '$lib/graphql-queries';
	import { marked } from 'marked';
	import StarIcon from '../../lib/components/star-icon.svelte';
	import CodeBlock from '../../lib/components/code-block.svelte';

	export const load = async ({ params }) => {
		const { slug } = params;
		const variables = { slug };
		const { post } = await client.request(postQuery, variables);

		return {
			props: {
				post
			}
		};
	};
</script>

<script>
	export let post;

	const { title, date, postTags, content, coverImage } = post;
</script>

<svelte:head>
	<title>BLOG | {title.toUpperCase()}</title>
</svelte:head>
<img class="coverImage" src={coverImage.url} alt={title} />

<h1>{title}</h1>

<p class="postMetadata">
	{new Date(date).toDateString()}
</p>

<div class="projectTags">
	{#if postTags}
		{#each postTags as tag, i}
			<a href="/blog#{tag.replace(' ', ' ').toLowerCase()}">{tag}</a>
			{#if postTags.length - 1 > i}
				<span style="width: 20px" />
				<StarIcon fill="var(--white)" size="7" />
				<span style="width: 20px" />
			{/if}
		{/each}
	{/if}
</div>

<article class="postContent">
	<SvelteMarkdown source={content} renderers={{ code: CodeBlock }} />
</article>

<style>
	h1 {
		margin-top: 50px;
		margin-bottom: 5px;
	}
</style>
