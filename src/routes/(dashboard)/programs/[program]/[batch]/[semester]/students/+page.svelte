<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
        <Card.Title>List of Students</Card.Title>
</div>
<Card.Content>
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
</Card.Content>