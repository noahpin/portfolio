<script context="module">
	import { client } from '$lib/graphql-client';
	import ProjectCard from '$lib/components/project-card.svelte';
	import MediaQuery from '../lib/components/media-query.svelte';
	import ScrollingFooter from '$lib/components/scrolling-footer.svelte';
	import { authorsQuery, projectsQuery } from '$lib/graphql-queries';

	export const load = async () => {
		const [authorReq, projectsReq] = await Promise.all([
			client.request(authorsQuery),
			client.request(projectsQuery)
		]);
		const { authors } = authorReq;
		const { projects } = projectsReq;
		return {
			props: {
				projects,
				authors
			}
		};
	};
</script>

<script>
	export let projects;
	export let authors;
</script>

<svelte:head>
	<title>NOAH</title>
</svelte:head>

<h1 class="home-title">
	A <span class="color-green">MULTI&shy;DISCIPLI&shy;NARY</span><br />
	<span class="color-green">ARTIST</span>
	OBSESSED<br /> WITH CREATING <span class="color-green">MAGIC</span>
</h1>

<ScrollingFooter />
