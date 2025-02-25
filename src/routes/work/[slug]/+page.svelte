<script>
	import { marked } from "marked";
	import StarIcon from "../../../lib/components/star-icon.svelte";

	export let data;
	let { project } = data;
	$: ({ project } = data); // so it stays in sync when `data` changes

	import { onMount } from "svelte";
	
	function getFormattedDate(date) {
		let year = date.getFullYear();
		let month = (1 + date.getMonth()).toString().padStart(2, "0");
		let day = date.getDate().toString().padStart(2, "0");

		return month + "-" + day + "-" + year;
	}
</script>

<svelte:head>
	<title>{project.name}</title>
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
					<span><em>when</em></span>
					<p>
						{getFormattedDate(new Date(project.timestamp))}
					</p>
				</div>
			{/if}
			{#if project.disciplines}
				<div class="particle">
					<span><em>disciplines</em></span>
					{#each project.disciplines as disc}
						<p style="text-transform: lowercase">
							{disc}
						</p>
					{/each}
				</div>
			{/if}
			{#if project.projectLinks.length > 0}
				<div class="particle">
					<span><em>links</em></span>
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
<svelte:window />

<style>
	.particle {
	}
	h1 {
		margin-top: 0;
		text-align: left;
		max-width: 700px;
		margin-bottom: 30px;
		hyphens: auto;
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
		gap: 20px;
		flex-direction: column;
	}
	a:hover {
		opacity: 0.5;
		color: var(--accent);
	}
	@media (max-width: 1300px) {
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
