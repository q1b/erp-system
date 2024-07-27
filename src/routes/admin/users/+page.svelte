<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import CreateUserDialog from './create/create-user-dialog.svelte';

	let { data } = $props();
	let open = $state(false);
</script>

<div class="flex justify-between items-center p-6">
	<Card.Header class="p-0">
		<Card.Title>Users</Card.Title>
		<Card.Description>Manage your users list</Card.Description>
	</Card.Header>
	<Button onclick={() => {open = true}}>New User</Button>
</div>
<Card.Content>
	<p>User Details</p>
</Card.Content>

<CreateUserDialog bind:open data={data.createUserForm} />