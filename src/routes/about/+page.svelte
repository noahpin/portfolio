<script>
	import { marked } from "marked";

	export let data;
	let { authors } = data;
	$: ({ authors } = data); // so it stays in sync when `data` changes

	$: console.log({ authors });
	var author = authors[0];
	import { onMount } from "svelte";
</script>

<svelte:head>
	<title>About Me ✧ Noah Pinales</title>
</svelte:head>

<article class="postContent">
	<h1>{@html author.intro}</h1>
	<div id="horizontal">
		<div class="section">
			{@html marked(author.bio)}
		</div>
		<div class="section">
			{#if author.contacts.length > 0}
				<div class="particle">
					<span class="bold">CONTACTS</span>
					{#each author.contacts as { title, description, link }}<br />
						<span style="text-transform: lowercase">{description} /</span>
						<a href={link}>
							{title}
						</a>
					{/each}
				</div>
			{/if}
			{#if author.expertise.length > 0}
				<div class="particle">
					<span class="bold">EXPERTISE</span>
					{#each author.expertise as expertise}<br />
						<span style="text-transform: lowercase">{expertise}</span>
					{/each}
				</div>
			{/if}
			{#if author.skills.length > 0}
				<div class="particle">
					<span class="bold">SKILLS</span>
					{#each author.skills as skill}<br />
						<span style="text-transform: lowercase">{skill}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</article>

<style>
	.particle {
		margin-bottom: 30px;
	}
	h1 {
		margin-top: 100px;
		text-align: left;
		max-width: 1000px;
		margin-bottom: 30px;
		word-break: normal;
		hyphens: auto;
	}
	.particle {
		min-width: 160px;
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
		max-width: 800px;
		width: 100%;
		margin-right: 60px;
		display: flex;
		justify-content: left;
		gap: 50px;
	}
	#horizontal {
		display: flex;
		justify-content: left;
		align-items: baseline;
		gap: 40px;
	}
	a:hover {
		opacity: 0.5;
		color: var(--accent);
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
