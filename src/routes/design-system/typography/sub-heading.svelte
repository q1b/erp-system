<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, level = 2 }: { children: Snippet; level?: 2 | 3 | 4 | 5 } = $props();
</script>

<svelte:element this={`h${level}`} class="text-xl">
	{@render children()}
</svelte:element>

<style>
</style>
