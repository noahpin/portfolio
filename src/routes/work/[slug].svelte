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
	import { onMount } from 'svelte';
	console.log(project);
	onMount(() => {
		document.documentElement.style.cssText = `--background: ${project.background.hex}; --text: ${project.text.hex};  `;
	});
</script>

<svelte:head>
	<title>{project.name.toUpperCase()}</title>
</svelte:head>

<article class="postContent">
	<h1>{project.name}</h1>
	<div id="horizontal">
		<div class="section">
			{@html marked(project.description)}
		</div>
		<div class="section">
			{#if project.timestamp}
				<div class="particle">
					<span class="bold">WHEN</span>
					<p>
						{project.timestamp}
					</p>
				</div>
			{/if}
			{#if project.disciplines}
				<div class="particle">
					<span class="bold">DISCIPLINES</span>
					{#each project.disciplines as disc}
						<p>
							{disc}
						</p>
					{/each}
				</div>
			{/if}
			{#if project.projectLinks.length > 0}
				<div class="particle">
					<span class="bold">LINKS</span>
					{#each project.projectLinks as { link, title }}
						<p>
							<a target="_blank" href={link}>{title}</a>
						</p>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	{#if project.image}
		<div class="gallery">
			{#each project.image as image, i}
				<img src={image.url} alt="" />
			{/each}
		</div>
	{/if}
</article>

<style>
	:global(body) {
		--white: var(--text);
	}
	.particle {
		margin-bottom: 30px;
	}
	h1 {
		margin-top: 20px;
		text-align: left;
		max-width: 700px;
		margin-bottom: 30px;
	}
	.projectTimestamp {
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.projectTags {
		margin-top: 0;
		margin-bottom: 30px;
	}
	.gallery {
		margin-top: 50px;
	}
	.section {
		max-width: 700px;
		width: 100%;
		margin-right: 60px;
		display: flex;
		justify-content: left;
		gap: 100px;
	}
	#horizontal {
		display: flex;
		justify-content: left;
		align-items: baseline;
		gap: 40px;
	}
	a:hover {
		opacity: 0.5;
	}
	@media (max-width: 1300px) {
		#horizontal {
			flex-direction: column;
		}
		.section {
			max-width: none;
			width: 100%;
		}
	}
	@media (max-width: 800px) {
		.section {
			gap: 50px;
		}
	}
	@media (max-width: 600px) {
		.section {
			flex-direction: column;
			gap: 0;
		}
	}
	img {
		width: 100%;
	}
</style>
