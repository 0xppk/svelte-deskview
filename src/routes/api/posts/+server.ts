import { json, type RequestHandler } from '@sveltejs/kit';
import type { TPost } from '$lib/types';

export const prerender = true;

async function getPosts() {
	let posts: TPost[] = [];

	const paths = import.meta.glob('/src/posts/**/*.md', {
		eager: true
	});

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<TPost, 'slug'>;
			const post = { ...metadata, slug } satisfies TPost;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export const GET: RequestHandler = async () => {
	const posts = await getPosts();

	return json(posts);
};
