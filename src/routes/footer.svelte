<script lang="ts">
	import { metaConfig } from '../lib/config';
</script>

<footer>
	<p>{metaConfig.title} &copy {new Date().getFullYear()}</p>
</footer>

<style>
	footer {
		padding-block: var(--size-7);
		border-top: 1px solid var(--border);
	}

	p {
		color: var(--text-2);
	}
</style>
