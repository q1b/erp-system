<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { button } from '../../design-system/css';
	import CreateCourseForm from './create/create-course-form.svelte';

	let open = $state(false);
	let isDesktop = $state(true);
	$effect(() => {
		isDesktop = window.matchMedia('(min-width: 768px)').matches;
	});
	let { data } = $props();
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Courses</Card.Title>
		<Card.Description>Manage your courses list</Card.Description>
	</Card.Header>
	<Button onclick={() => {open = true}}>Add Course</Button>
	<!-- <button onclick={() => (open = true)} class={button}>Add Course</button> -->
</div>
<Card.Content>
	<p>Card Content</p>
</Card.Content>

{#if isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Add Course</Dialog.Title>
				<Dialog.Description>Add a new course to your list</Dialog.Description>
			</Dialog.Header>
			<CreateCourseForm onresult={() => (open = false)} data={data.courseForm} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>
					Make changes to your profile here. Click save when you're done.
				</Drawer.Description>
			</Drawer.Header>
			<CreateCourseForm class="px-4" onresult={() => (open = false)} data={data.courseForm} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
