<script lang="ts">
	import { ArrowLeftCircleIcon } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import CreateCourseForm from './create-course-form.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
	<Button variant="link" href="/admin/courses">
		<ArrowLeftCircleIcon class="mr-2" />
		Go Back
	</Button>

	<Card.Root class="mx-auto max-w-sm w-full">
		<Card.Header>
			<Card.Title class="text-2xl">Add New Course</Card.Title>
			<Card.Description>Give your course a name</Card.Description>
		</Card.Header>
		<Card.Content>
			<CreateCourseForm data={data.courseForm} />
		</Card.Content>
	</Card.Root>
</main>
