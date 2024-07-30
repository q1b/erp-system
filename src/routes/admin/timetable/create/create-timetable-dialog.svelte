<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateTimetableFormType } from './index.js';
	import CreateTimetableForm from './create-timetable-form.svelte';

    let { data, open = $bindable(), }: {
        open?: boolean;
        data: CreateTimetableFormType;
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
				<Dialog.Title>Time Table</Dialog.Title>
				<Dialog.Description>Time Table Description</Dialog.Description>
			</Dialog.Header>
			<CreateTimetableForm onresult={() => (open = false)} data={data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Time Table</Drawer.Title>
				<Drawer.Description>
					Time Table Description
				</Drawer.Description>
			</Drawer.Header>
			<CreateTimetableForm class="px-4" onresult={() => (open = false)} data={data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}