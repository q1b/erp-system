<script lang="ts">
	import { LeafIcon } from 'lucide-svelte';
	import { button } from '../design-system/css';
	import * as Card from '$lib/components/ui/card';
	let { data } = $props();
</script>

<div class="flex p-6 items-center justify-between">
	<div class="flex justify-between gap-x-5">
		<LeafIcon class="size-20" />
		<Card.Header class="p-0">
			<Card.Description>Welcome back,</Card.Description>
			<Card.Title>{data.user.name}</Card.Title>
			<!-- <Card.Content>Human Resources Manager</Card.Content> -->
		</Card.Header>
	</div>
	<a href="#" class={button}>View profile</a>
</div>
