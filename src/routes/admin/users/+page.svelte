<script>
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Table from '$lib/components/ui/table';
	import { MoreVerticalIcon, Trash2Icon } from 'lucide-svelte';
	import CreateUserDialog from './create/create-user-dialog.svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Users</Card.Title>
		<Card.Description>Manage your users list</Card.Description>
	</Card.Header>
	<Button
		onclick={() => {
			open = true;
		}}>New User</Button
	>
</div>
<Card.Content>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Role</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#await data.users}
				<Table.Row>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
				</Table.Row>
			{:then users}
				{#each users as user}
					<Table.Row>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell>{user.email}</Table.Cell>
						<Table.Cell>{user.role}</Table.Cell>
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
											  This action cannot be undone. This will permanently delete your account
											  and remove your data from our servers.
											</AlertDialog.Description>
										  </AlertDialog.Header>
										  <AlertDialog.Footer>
											<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
											<form method="POST" action="/admin/users/{user.id}?/delete" use:enhance>
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

{#await data.roleList then roleList}
	<CreateUserDialog roleList={roleList} bind:open data={data.createUserForm} />	
{/await}