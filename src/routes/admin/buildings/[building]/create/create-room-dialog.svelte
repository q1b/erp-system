<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateRoomFormType } from './index.js';
	import CreateRoomForm from './create-room-form.svelte';

	let {
		data,
		open = $bindable(),
		buildingId
	}: {
		open?: boolean;
		data: CreateRoomFormType;
		buildingId: string;
	} = $props();

	let isDesktop = $state(true);
	$effect(() => {
		isDesktop = window.matchMedia('(min-width: 768px)').matches;
	});
</script>

{#if isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Room</Dialog.Title>
				<Dialog.Description>Add new room info to the building</Dialog.Description>
			</Dialog.Header>
			<CreateRoomForm {buildingId} onresult={() => (open = false)} {data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Room</Drawer.Title>
				<Drawer.Description>Add new room info to the building</Drawer.Description>
			</Drawer.Header>
			<CreateRoomForm {buildingId} class="px-4" onresult={() => (open = false)} {data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
