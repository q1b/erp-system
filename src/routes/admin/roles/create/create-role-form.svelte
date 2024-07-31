<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createRoleSchema } from './create-role-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateRoleFormType } from './index.js';

	const {
		data,
		onresult = () => {},
		class: className = ''
	}: {
		data: CreateRoleFormType;
		onresult?: () => void;
		class?:string
	} = $props();
	
	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createRoleSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your role is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Role ...');
		},
		delayMs: 100,
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form class={className} method="POST" use:enhance action="/admin/roles/create">
	<Form.Field {form} name="slug">
		<Form.Control let:attrs>
			<Form.Label>Unique Identifier</Form.Label>
			<Input required type="text" {...attrs} bind:value={$formData.slug} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="label">
		<Form.Control let:attrs>
			<Form.Label>Label</Form.Label>
			<Input required type="text" {...attrs} bind:value={$formData.label} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description ( Optional ) </Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New Role</Form.Button>
</form>
