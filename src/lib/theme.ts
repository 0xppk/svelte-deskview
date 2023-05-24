import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

const userTheme = browser && localStorage.getItem('color-scheme');
export const theme = writable(userTheme || 'light');

export function toggleTheme() {
	theme.update((cur) => {
		const newTheme = cur === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('color-scheme', newTheme);
		localStorage.setItem('color-scheme', newTheme);
		return newTheme;
	});
}

export function setTheme(newTheme: Theme) {
	theme.set(newTheme);
}
