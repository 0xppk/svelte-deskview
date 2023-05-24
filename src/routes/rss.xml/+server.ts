import { metaConfig } from '$lib/config';
import type { TPost } from '$lib/types';

export const prerender = true;

export async function GET({ fetch }) {
	const response = await fetch('api/posts');
	const posts: TPost[] = await response.json();

	const headers = { 'Content-Type': 'application/xml' };

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${metaConfig.title}</title>
				<description>${metaConfig.description}</description>
				<link>${metaConfig.url}</link>
				<atom:link href="${metaConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${metaConfig.url}/${post.slug}</link>
							<guid isPermaLink="true">${metaConfig.url}/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
}
