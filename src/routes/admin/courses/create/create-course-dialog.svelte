<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateCourseFormType } from '.';
	import CreateCourseForm from './create-course-form.svelte';

	let {
		data,
		open = $bindable()
	}: {
		open?: boolean;
		data: CreateCourseFormType;
	} = $props();

	let isDesktop = $state(true);
	$effect(() => {
		isDesktop = window.matchMedia('(min-width: 768px)').matches;
	});
</script>

{#if isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Add Course</Dialog.Title>
				<Dialog.Description>Add a new course to your list</Dialog.Description>
			</Dialog.Header>
			<CreateCourseForm onresult={() => (open = false)} {data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Add Course</Drawer.Title>
				<Drawer.Description>Add a new course to your list</Drawer.Description>
			</Drawer.Header>
			<CreateCourseForm class="px-4" onresult={() => (open = false)} {data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
