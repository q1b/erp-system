<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, level = 1 }: { children: Snippet; level?: 1 | 2 } = $props();
</script>

<svelte:element this={`h${level}`}>
	{@render children()}
</svelte:element>

<style>
</style>
