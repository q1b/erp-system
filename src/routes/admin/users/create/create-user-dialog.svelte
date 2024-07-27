<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateUserFormType } from '.';
	import CreateUserForm from './create-user-form.svelte';

    let { data, open = $bindable(), }: {
        open?: boolean;
        data: CreateUserFormType;
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
			<CreateUserForm onresult={() => (open = false)} data={data} />
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
			<CreateUserForm class="px-4" onresult={() => (open = false)} data={data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}