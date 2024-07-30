<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { MoreVerticalIcon } from 'lucide-svelte';
	import CreateTimetableDialog from './create/create-timetable-dialog.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Timetable</Card.Title>
		<Card.Description>Manage your timetable list</Card.Description>
	</Card.Header>
	<Button
		onclick={() => {
			open = true;
		}}>Add Timetable</Button
	>
</div>
<Card.Content>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Id</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#await data.timetableList}
				<Table.Row>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
				</Table.Row>
			{:then timetableList}
				{#each timetableList as timetable}
					<Table.Row>
						<Table.Cell>{timetable.id}</Table.Cell>
						<Table.Cell>{timetable.name}</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<MoreVerticalIcon size="20" />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content sideOffset={2}>
									<Button
										type="submit"
										variant="ghost"
										size="sm"
										class="w-full flex justify-between"
									>
										More Info
									</Button>
									<form method="POST" action="/admin/timetable/{timetable.id}?/delete" use:enhance>
										<Button
											type="submit"
											variant="ghost"
											size="sm"
											class="w-full flex justify-between"
										>
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

<CreateTimetableDialog bind:open data={data.timetableForm} />
