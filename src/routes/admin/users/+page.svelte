<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Table from '$lib/components/ui/table';
	import { MoreVerticalIcon } from 'lucide-svelte';
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
	<Button onclick={() => {open = true}}>New User</Button>
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
								<DropdownMenu.Content sideOffset={2} >
									<Button type="submit" variant="ghost" size="sm" class="w-full flex justify-between">
										More Info
									</Button>
									<form method="POST" action="/admin/courses/{user.id}?/delete" use:enhance>
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

<CreateUserDialog bind:open data={data.createUserForm} />