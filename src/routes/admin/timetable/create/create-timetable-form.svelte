<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createTimetableSchema } from './create-timetable-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateTimetableFormType } from './index.js';

	const {
		data,
		onresult = () => {},
		class: className = ''
	}: {
		data: CreateTimetableFormType;
		onresult?: () => void;
		class?: string;
	} = $props();

	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createTimetableSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your timetable is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Timetable ...');
		},
		delayMs: 100
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form class={className} method="POST" use:enhance action="/admin/timetable/create">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New Timetable</Form.Button>
</form>
