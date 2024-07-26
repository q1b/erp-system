<script>
	import { button } from '../../design-system/css';
	import Heading from '../../design-system/typography/heading.svelte';
	import SubHeading from '../../design-system/typography/sub-heading.svelte';
</script>

<div class="flex justify-between items-center">
	<div class="flex flex-col gap-y-2">
		<Heading>Courses</Heading>
		<SubHeading>Manage your courses list</SubHeading>
	</div>
	<button class={button}>Add Course</button>
</div>
