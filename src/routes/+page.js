import { client } from "$lib/graphql-client";
import { projectsQuery, authorsQuery } from "$lib/graphql-queries";

export const load = async () => {
	const { authors } = await client.request(authorsQuery);
	const { projects } = await client.request(projectsQuery);

	return {
		projects,authors
	};
};
