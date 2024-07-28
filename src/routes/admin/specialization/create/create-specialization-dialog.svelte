<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateSpecializationFormType } from './index.js';
	import CreateSpecializationForm from './create-specialization-form.svelte';
	import type { ProgramTableType } from '$lib/table-types.js';

    let { data, open = $bindable(), programs }: {
        open?: boolean;
        data: CreateSpecializationFormType;
		programs: Omit<ProgramTableType,'description'>[];
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
				<Dialog.Title>Specialization</Dialog.Title>
				<Dialog.Description>Ex: Artificial Intelligence, Cyber Security comes under B.tech Computer Science</Dialog.Description>
			</Dialog.Header>
			<CreateSpecializationForm programs={programs} onresult={() => (open = false)} data={data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Specialization</Drawer.Title>
				<Drawer.Description>
					Ex: Artificial Intelligence, Cyber Security comes under B.tech Computer Science
				</Drawer.Description>
			</Drawer.Header>
			<CreateSpecializationForm programs={programs} class="px-4" onresult={() => (open = false)} data={data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}