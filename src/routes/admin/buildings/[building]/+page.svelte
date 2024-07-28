<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import {
		MoreVerticalIcon
	} from 'lucide-svelte';
	import CreateRoomDialog from './create/create-room-dialog.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>
			{#await data.building}
				Loading ...
			{:then building}
				Manage rooms of {building?.name}
			{/await}
		</Card.Title>
		<Card.Description>
			{#await data.building}
				Loading ...
			{:then building}
				{building?.description}
			{/await}
		</Card.Description>
	</Card.Header>
	<Button onclick={() => {open = true;}}>
		Add Room
	</Button>
</div>
<Card.Content>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Number</Table.Head>
				<Table.Head>Capacity</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#await data.roomList}
				<Table.Row>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
				</Table.Row>
			{:then roomList}
				{#each roomList as room}
					<Table.Row>
						<Table.Cell>{room.number}</Table.Cell>
						<Table.Cell>{room.capacity}</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<MoreVerticalIcon size="20" />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content sideOffset={2} >
									<Button type="submit" variant="ghost" size="sm" class="w-full flex justify-between">
										More Info
									</Button>
									<form method="POST" action="/admin/buildings/{$page.params.building}/{room.id}?/delete" use:enhance>
										<Button type="submit" variant="ghost" size="sm" class="w-full flex justify-between">
											Delete
										</Button>
									</form>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			{/await}
		</Table.Body>
	</Table.Root>
</Card.Content>

<CreateRoomDialog buildingId={$page.params.building} bind:open data={data.roomForm} />
