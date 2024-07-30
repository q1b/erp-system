<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateProgramFormType } from './index.js';
	import CreateProgramForm from './create-program-form.svelte';

	let {
		data,
		open = $bindable()
	}: {
		open?: boolean;
		data: CreateProgramFormType;
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
				<Dialog.Title>Program Form</Dialog.Title>
				<Dialog.Description>Fill the following fields</Dialog.Description>
			</Dialog.Header>
			<CreateProgramForm onresult={() => (open = false)} {data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Program Form</Drawer.Title>
				<Drawer.Description>Fill the following fields</Drawer.Description>
			</Drawer.Header>
			<CreateProgramForm class="px-4" onresult={() => (open = false)} {data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
