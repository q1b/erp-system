<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import {
		MoreVerticalIcon
	} from 'lucide-svelte';
	import CreateCourseDialog from './create/create-course-dialog.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Courses</Card.Title>
		<Card.Description>Manage your courses list</Card.Description>
	</Card.Header>
	<Button
		onclick={() => {
			open = true;
		}}>Add Course</Button
	>
</div>
<Card.Content>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Code</Table.Head>
				<Table.Head>Created At</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#await data.courses}
				<Table.Row>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
				</Table.Row>
			{:then courses}
				{#each courses as course}
					<Table.Row>
						<Table.Cell>{course.name}</Table.Cell>
						<Table.Cell>{course.code}</Table.Cell>
						<Table.Cell>{course.createdAt}</Table.Cell>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<MoreVerticalIcon size="20" />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content sideOffset={2} >
									<Button type="submit" variant="ghost" size="sm" class="w-full flex justify-between">
										More Info
									</Button>
									<form method="POST" action="/admin/courses/{course.id}?/delete" use:enhance>
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

<CreateCourseDialog bind:open data={data.courseForm} />
