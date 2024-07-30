<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createCourseSchema } from './create-course-schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateCourseFormType } from './index';

	const {
		data,
		onresult = () => {},
		class: className = ''
	}: {
		data: CreateCourseFormType;
		onresult?: () => void;
		class?: string;
	} = $props();

	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createCourseSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your course is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Course ...');
		}
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form class={className} method="POST" use:enhance action="/admin/courses/create?/default">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="code">
		<Form.Control let:attrs>
			<Form.Label>Course Code ( Optional )</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.code} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add Course</Form.Button>
</form>
