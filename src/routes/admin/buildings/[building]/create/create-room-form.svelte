<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createRoomSchema } from './create-room-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateRoomFormType } from './index.js';

	const {
		data,
		onresult = () => {},
		class: className = '',
		buildingId,
	}: {
		data: CreateRoomFormType;
		onresult?: () => void;
		class?:string,
		buildingId: string
	} = $props();
	
	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createRoomSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your room is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Room ...');
		},
		delayMs: 100,
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form class={className} method="POST" use:enhance action="/admin/buildings/{buildingId}/create">
	<Form.Field {form} name="number">
		<Form.Control let:attrs>
			<Form.Label>Room Number</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.number} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="capacity">
		<Form.Control let:attrs>
			<Form.Label>Room Capacity</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.capacity} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<input type="hidden" name="buildingId" value={buildingId}>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New Room</Form.Button>
</form>
