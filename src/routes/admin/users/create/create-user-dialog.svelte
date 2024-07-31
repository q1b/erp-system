<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { type CreateUserFormType } from '.';
	import CreateUserForm from './create-user-form.svelte';

	let {
		data,
		open = $bindable(),
		roleList
	}: {
		open?: boolean;
		data: CreateUserFormType;
		roleList: {id:string;label:string}[]
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
				<Dialog.Title>New User</Dialog.Title>
				<Dialog.Description>Add a new user</Dialog.Description>
			</Dialog.Header>
			<CreateUserForm roleList={roleList} onresult={() => (open = false)} {data} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>New User</Drawer.Title>
				<Drawer.Description>Add a new user</Drawer.Description>
			</Drawer.Header>
			<CreateUserForm roleList={roleList} class="px-4" onresult={() => (open = false)} {data} />
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
