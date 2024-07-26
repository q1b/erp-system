<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, level = 2 }: { children: Snippet, level?: 1 | 2 | 3 | 4  } = $props();
</script>

<svelte:element this={`h${level}`} class="text-3xl font-semibold mb-2">
	{@render children()}
</svelte:element>

<style>
</style>