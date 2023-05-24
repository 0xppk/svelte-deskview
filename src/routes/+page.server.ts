import type { TPost } from '$lib/types.js';

export const load = async ({ fetch }) => {
	const res = await fetch('/api/posts');
	const posts: TPost[] = await res.json();

	return { posts };
};
