<script lang="ts">
	import { ArrowLeftCircleIcon } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import CreateLectureForm from './create-lecture-form.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
	<Button variant="link" href="/admin/lectures">
		<ArrowLeftCircleIcon class="mr-2" />
		Go Back
	</Button>

	<Card.Root class="mx-auto max-w-sm w-full">
		<Card.Header>
			<Card.Title class="text-2xl">Lecture</Card.Title>
			<Card.Description
				>Lectures are are assigned to professors, one professor can take multiple lectures at
				different time slots for different batchs</Card.Description
			>
		</Card.Header>
		<Card.Content>
			{#await Promise.allSettled([data.professorList, data.courseList]) then promises}
				{#if promises[0].status === 'fulfilled' && promises[1].status === 'fulfilled'}
					<CreateLectureForm
						professorList={promises[0].value.map((professor) => ({
							id: professor.id,
							name: professor.user?.name ?? 'UNDEFINED'
						}))}
						courseList={promises[1].value}
						data={data.lectureForm}
					/>
				{/if}
			{/await}
		</Card.Content>
	</Card.Root>
</main>
