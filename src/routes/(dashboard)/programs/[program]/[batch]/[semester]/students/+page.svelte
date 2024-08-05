<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();
	let view = $state<'grid' | 'table'>('grid');
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Users</Card.Title>
		<Card.Description>Manage your users list</Card.Description>
	</Card.Header>
	<Button
		onclick={() => {
			if (view === 'grid') view = 'table';
			else view = 'grid';
		}}>{(view === 'grid' ? 'table' : 'grid').toLocaleUpperCase()}</Button
	>
</div>
{#if view === 'table'}
<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Created At</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#await data.studentList}
				<Table.Row>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
				</Table.Row>
			{:then students}
				{#each students as student}
					<Table.Row>
						<Table.Cell>{student.user?.name}</Table.Cell>
						<Table.Cell>{student.user?.email}</Table.Cell>
						<Table.Cell>{student.user?.createdAt}</Table.Cell>
					</Table.Row>
				{/each}
			{/await}
		</Table.Body>
	</Table.Root>
{:else}
	{#await data.studentList}
		<p>Loading ...</p>
	{:then students}
	<Card.Content class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
		{#each students as student}
			<Card.Root>
				<Card.Header>
					<Card.Title>{student.user?.name}</Card.Title>
					<Card.Description class="truncate">{student.user?.email}</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
		</Card.Content>
	{/await}
{/if}
