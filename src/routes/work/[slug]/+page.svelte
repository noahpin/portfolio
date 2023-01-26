<script>
	import { marked } from "marked";
	import Background from "../../../lib/components/background.svelte";
	import StarIcon from "../../../lib/components/star-icon.svelte";

	export let data;
	let { project } = data;
	$: ({ project } = data); // so it stays in sync when `data` changes

	$: console.log({ project });
	import { onMount } from "svelte";
	onMount(() => {
		document.documentElement.style.cssText = `--background: ${project.background.hex}; --text: ${project.text.hex};  `;
	});
	export let scrollY = 9
</script>

<svelte:head>
	<title>{project.name}</title>
</svelte:head>

<article  class="postContent" >
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
						<p style="text-transform: lowercase">
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
<Background ></Background>
<svelte:window  ></svelte:window>

<style>
	:global(body) {
		/*--white: var(--text)*/
	}
	.particle {
		margin-bottom: 30px;
	}
	h1 {
		margin-top: 100px;
		text-align: left;
		max-width: 700px;
		margin-bottom: 30px;
		hyphens: auto;
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
