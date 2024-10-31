<script>
	import { createPopperActions } from "svelte-popperjs";
	import { onMount } from "svelte";
	import { marked } from "marked";

	const [popperRef, popperContent, getInstance] = createPopperActions({
		placement: "right",
		strategy: "fixed",
	});

	const extraOpts = {
		modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
	};

	let showTooltip = false;

	let background = "";
	export let data;
	let { projects, authors } = data;
	$: ({ projects, authors } = data); // so it stays in sync when `data` changes
	var author = authors[0];

	$: console.log({ projects });
	function getFormattedDate(date) {
		let year = date.getFullYear();
		let month = (1 + date.getMonth()).toString().padStart(2, "0");
		let day = date.getDate().toString().padStart(2, "0");

		return month + "-" + day + "-" + year;
	}
</script>

<svelte:head>
	<title>Noah Pinales - Designer and Developer</title>
</svelte:head>
<div
	id="projectList"
	class={showTooltip ? "hovered" : ""}
	on:mouseenter={() => (showTooltip = true)}
	on:mouseleave={() => (showTooltip = false)}
>
	{#each projects as { name, slug, image, disciplines, timestamp, description }, i}
		<a class="home-project" href={"work/" + slug}>
			<img src={image[0].url} alt="" />
			<div class="project-text">
				<h3>{name}</h3>
				<div class="bottom">
					{#each disciplines as tag}
						<p>{tag}</p>
					{/each}
					<p>{getFormattedDate(new Date(timestamp))}</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.home-project {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 30px;
		gap: 40px;
	}
	.home-project img {
		width: 60%;
		aspect-ratio: 16/9;
		object-fit: cover;
		/**blue offset dashed outline*/
	}
	a {
		text-decoration: none;
	}
	.home-project:focus {
		outline: 2px dashed var(--white);
		outline-offset: 5px;
	}
	.project-text {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 20px;
		width: 30%;
	}
	.home-project:hover h3,
	.home-project:focus h3 {
		text-decoration: underline wavy;
		text-decoration-color: var(--accent);
		text-decoration-thickness: 2px;
	}
	#projectList {
		position: relative;
		width: 100%;
		gap: 0;
		z-index: 10;
		float: right;
		bottom: 0;
		margin-top: 0;
	}
	@media (max-width: 800px) {
		.home-project {
			flex-direction: column;
			gap: 10px;
			margin-bottom: 40px;
		}
		.home-project img {
			width: 100%;
		}
		.project-text {
			width: 100%;

			gap: 10px;
		}
	}
</style>
