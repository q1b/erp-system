<script>
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { MoreVerticalIcon, Trash2Icon } from 'lucide-svelte';
	import CreateBatchDialog from './create/create-batch-dialog.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Batch</Card.Title>
		<Card.Description>Manage your batch list</Card.Description>
	</Card.Header>
	<Button
		onclick={() => {
			open = true;
		}}>Add Batch</Button
	>
</div>
<Card.Content>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Year</Table.Head>
				<Table.Head>Program ID</Table.Head>
				<Table.Head>Specialization ID</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#await data.batchList}
				<Table.Row>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
				</Table.Row>
			{:then batchList}
				{#each batchList as batch}
					<Table.Row>
						<Table.Cell>{batch.year}</Table.Cell>
						<Table.Cell>{batch.programId}</Table.Cell>
						<Table.Cell>{batch.specializationId}</Table.Cell>
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
									<AlertDialog.Root>
										<AlertDialog.Trigger asChild let:builder>
										  <Button class="gap-x-4 w-full" builders={[builder]} variant="destructive">
											<Trash2Icon size={20}/> Delete 
											</Button>
										</AlertDialog.Trigger>
										<AlertDialog.Content>
										  <AlertDialog.Header>
											<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
											<AlertDialog.Description>
											  This action cannot be undone. 
											  This will permanently delete all the students within this batch will get deleted alongside the batch sections, and corresponding lectures mapped to the batch.
											</AlertDialog.Description>
										  </AlertDialog.Header>
										  <AlertDialog.Footer>
											<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
											<form method="POST" action="/admin/batch/{batch.id}?/delete" use:enhance>
												<Button
													type="submit"
													variant="default"
													class="w-full flex justify-between"
												>
													Confirm
												</Button>
											</form>
										  </AlertDialog.Footer>
										</AlertDialog.Content>
									  </AlertDialog.Root>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			{/await}
		</Table.Body>
	</Table.Root>
</Card.Content>

{#await Promise.allSettled([data.programList, data.specializationList]) then promises}
	{#if promises[0].status === 'fulfilled' && promises[1].status === 'fulfilled'}
		<CreateBatchDialog
			bind:open
			programList={promises[0].value}
			specializationList={promises[1].value}
			data={data.batchForm}
		/>
	{/if}
{/await}
