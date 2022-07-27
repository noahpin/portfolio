<script context="module">
	import { client } from '$lib/graphql-client';
	import { authorsQuery } from '$lib/graphql-queries';
	import { marked } from 'marked';

	export const load = async () => {
		const { authors } = await client.request(authorsQuery);

		return {
			props: {
				authors
			}
		};
	};
</script>

<script>
	export let authors;
	const {
		name,
		intro,
		bio,
		picture: { url }
	} = authors[0];
</script>

<svelte:head>
	<title>ABOUT ME</title>
</svelte:head>

<h1 class="">CONTACT</h1>
