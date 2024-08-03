<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateLectureFormType } from './index.js';
	import CreateLectureForm from './create-lecture-form.svelte';

    let { data, open = $bindable(), professorList, courseList }: {
        open?: boolean;
        data: CreateLectureFormType;
		professorList: {id:string;name:string}[];
		courseList: {id:string;name:string}[];
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
				<Dialog.Title>Lecture</Dialog.Title>
				<Dialog.Description>Lectures are are assigned to professors, one professor can take multiple lectures at different time slots for different batchs</Dialog.Description>
			</Dialog.Header>
			<CreateLectureForm {courseList} {professorList} onresult={() => (open = false)} data={data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Lecture</Drawer.Title>
				<Drawer.Description>
					Lectures are are assigned to professors, one professor can take multiple lectures at different time slots for different batchs
				</Drawer.Description>
			</Drawer.Header>
			<CreateLectureForm {courseList} {professorList} class="px-4" onresult={() => (open = false)} data={data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}