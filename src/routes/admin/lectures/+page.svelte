<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { MoreVerticalIcon } from 'lucide-svelte';
	import CreateLectureDialog from './create/create-lecture-dialog.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Lecture</Card.Title>
		<Card.Description>Manage your lecture list</Card.Description>
	</Card.Header>
	<Button
		onclick={() => {
			open = true;
		}}>Add Lecture</Button
	>
</div>
<Card.Content>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Semester</Table.Head>
				<Table.Head>Professor</Table.Head>
				<Table.Head>Course</Table.Head>
				<Table.Head></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#await data.lectureList}
				<Table.Row>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
					<Table.Cell>Loading ...</Table.Cell>
				</Table.Row>
			{:then lectureList}
				{#each lectureList as lecture}
					<Table.Row>
						<Table.Cell>{lecture.semester}</Table.Cell>
						<Table.Cell>{lecture.professorId}</Table.Cell>
						<Table.Cell>{lecture.courseId}</Table.Cell>
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
									<form method="POST" action="/admin/lectures/{lecture.id}?/delete" use:enhance>
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

{#await Promise.allSettled([data.professorList, data.courseList]) then promises}
	{#if promises[0].status === 'fulfilled' && promises[1].status === 'fulfilled'}
		<CreateLectureDialog
			bind:open
			professorList={promises[0].value.map((professor) => ({
				id: professor.id,
				name: professor.user?.name ?? 'UNDEFINED'
			}))}
			courseList={promises[1].value}
			data={data.lectureForm}
		/>
	{/if}
{/await}
