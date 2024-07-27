<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import CreateCourseDialog from './create/create-course-dialog.svelte';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Courses</Card.Title>
		<Card.Description>Manage your courses list</Card.Description>
	</Card.Header>
	<Button onclick={() => {open = true}}>Add Course</Button>
</div>
<Card.Content>
	<p>Card Content</p>
</Card.Content>

<CreateCourseDialog bind:open data={data.courseForm} />