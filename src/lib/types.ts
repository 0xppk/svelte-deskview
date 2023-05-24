export type Categories = "sveltekit" | "svelte"

export type TPost = {
	title: string;
	description: string;
	slug: string;
	date: string;
	categories: Categories[];
	published: boolean;
};