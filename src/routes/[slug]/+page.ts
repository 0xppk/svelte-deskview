import { error } from '@sveltejs/kit';

export const load = async ({ params: { slug } }) => {
	try {
		const post = await import(`../../posts/${slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		console.error((e as Error).message);
		throw error(404, `Could not find ${slug}`);
	}
};
