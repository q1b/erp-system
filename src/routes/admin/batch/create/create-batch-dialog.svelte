<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateBatchFormType } from './index.js';
	import CreateBatchForm from './create-batch-form.svelte';

    let { data, open = $bindable(),programList,specializationList }: {
        open?: boolean;
        data: CreateBatchFormType;
		programList: {name:string;id:string}[];
		specializationList: {name:string;id:string;programId:string|null;}[];
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
				<Dialog.Title>Create Batch</Dialog.Title>
				<Dialog.Description>batch is used to group students based on the year of joining, registered program and what specialization they choose</Dialog.Description>
			</Dialog.Header>
			<CreateBatchForm {programList} {specializationList} onresult={() => (open = false)} data={data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Create Batch</Drawer.Title>
				<Drawer.Description>
					batch is used to group students based on the year of joining, registered program and what specialization they choose
				</Drawer.Description>
			</Drawer.Header>
			<CreateBatchForm {programList} {specializationList} class="px-4" onresult={() => (open = false)} data={data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}