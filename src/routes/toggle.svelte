<script lang="ts">
	import { toggleTheme, theme } from '$lib/theme';
	import { Moon, Sun } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
</script>

<button on:click={toggleTheme}>
	{#if $theme === 'light'}
		<div in:fly={{ y: 10 }}>
			<Sun />
			<span>Light</span>
		</div>
	{:else}
		<div in:fly={{ y: -10 }}>
			<Moon />
			<span>Dark</span>
		</div>
	{/if}
</button>

<style>
	button {
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: none;
	}

	button > * {
		display: flex;
		gap: var(--size-2);
	}
</style>
