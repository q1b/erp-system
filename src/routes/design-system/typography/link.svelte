<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, ...others }: { children: Snippet } = $props();
</script>

<a {...others}>
	{@render children()}
</a>

<style>
	a {
	}
</style>
