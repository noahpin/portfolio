import { gql } from 'graphql-request';
export const authorsQuery = gql`
	query GetAuthors {
		authors {
			name
			intro
			bio
			expertise
			experiences {
				description
				link
				title
			}
			contacts {
				title
				link
				description
			}
		}
	}
`;
const PROJECT_FRAGMENT = gql`
	fragment ProjectDetails on Project {
		name
		slug
		description
		timestamp
		projectTags {
			tags
		}
		image {
			url
		}
		projectLinks {
			... on Link {
				link
				title
			}
		}
	}
`;
const POST_FRAGMENT = gql`
	fragment PostDetails on Post {
		title
		slug
		date
		content
		shortDescription
		postTags
		coverImage {
			url
		}
		authors {
			name
		}
	}
`;
export const projectsQuery = gql`
	${PROJECT_FRAGMENT}
	query GetProjects {
		projects(orderBy: timestamp_DESC) {
			...ProjectDetails
		}
	}
`;

export const projectQuery = gql`
	${PROJECT_FRAGMENT}
	query GetProject($slug: String!) {
		project(where: { slug: $slug }) {
			...ProjectDetails
		}
	}
`;

export const postsQuery = gql`
	${POST_FRAGMENT}
	query GetPosts {
		posts {
			...PostDetails
		}
	}
`;

export const postQuery = gql`
	${POST_FRAGMENT}
	query GetPost($slug: String!) {
		post(where: { slug: $slug }) {
			...PostDetails
		}
	}
`;
