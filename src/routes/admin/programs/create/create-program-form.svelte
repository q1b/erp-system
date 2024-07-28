<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createProgramSchema } from './create-program-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateProgramFormType } from './index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	const {
		data,
		onresult = () => {},
		class: className = ''
	}: {
		data: CreateProgramFormType;
		onresult?: () => void;
		class?:string
	} = $props();
	
	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createProgramSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your program is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Program ...');
		},
		delayMs: 100,
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form class={className} method="POST" use:enhance action="/admin/programs/create">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Program Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New Program</Form.Button>
</form>
