<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createBuildingSchema } from './create-building-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateBuildingFormType } from './index.js';

	const {
		data,
		onresult = () => {},
		class: className = ''
	}: {
		data: CreateBuildingFormType;
		onresult?: () => void;
		class?: string;
	} = $props();

	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createBuildingSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your building is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Building ...');
		},
		delayMs: 100
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form class={className} method="POST" use:enhance action="/admin/buildings/create?/default">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New Building</Form.Button>
</form>
