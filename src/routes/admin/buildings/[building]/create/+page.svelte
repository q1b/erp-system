<script lang="ts">
	import { ArrowLeftCircleIcon } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import CreateRoomForm from './create-room-form.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
	const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
	<Button variant="link" href="/admin/buildings/{$page.params.building}">
		<ArrowLeftCircleIcon class="mr-2" />
		Go Back
	</Button>

	<Card.Root class="mx-auto max-w-sm w-full">
		<Card.Header>
			<Card.Title class="text-2xl">Room</Card.Title>
			<Card.Description>Add new room info to the building</Card.Description>
		</Card.Header>
		<Card.Content>
			<CreateRoomForm buildingId={$page.params.building} data={data.roomForm} />
		</Card.Content>
	</Card.Root>
</main>
