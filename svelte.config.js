import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import shiki from 'shiki';
import remarkToc from 'remark-toc';
import remarkUnWrapImages from 'remark-unwrap-images';
import rehypeSlugs from 'rehype-slug';

/** @type {import("mdsvex").MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: './src/routes/mdsvex.svelte'
	},
	remarkPlugins: [
		remarkUnWrapImages,
		[
			remarkToc,
			{
				tight: true
			}
		]
	],
	rehypePlugins: [rehypeSlugs],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await shiki.getHighlighter({
				theme: 'dracula-soft'
			});

			const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));

			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		alias: { $lib: './src/lib' }
	}
};

export default config;
