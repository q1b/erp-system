<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createLectureSchema } from './create-lecture-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateLectureFormType } from './index.js';
	import * as Select from '$lib/components/ui/select';

	const {
		data,
		onresult = () => {},
		class: className = '',
		professorList,
		courseList
	}: {
		data: CreateLectureFormType;
		onresult?: () => void;
		class?:string;
		professorList: {id:string;name:string}[];
		courseList: {id:string;name:string}[];
	} = $props();
	
	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createLectureSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your lecture is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Lecture ...');
		},
		delayMs: 100,
	});
	const { form: formData, enhance, delayed } = form;

	let selectedProfessorId = $derived(
		$formData.professorId
			? {
					label: $formData.professorId,
					value: $formData.professorId
				}
			: undefined
	);

	let selectedCourseId = $derived(
		$formData.courseId
			? {
					label: $formData.courseId,
					value: $formData.courseId
				}
			: undefined
	);
</script>

<form class={className} method="POST" use:enhance action="/admin/lectures/create">
	<Form.Field {form} name="semester">
		<Form.Control let:attrs>
			<Form.Label>Semester</Form.Label>
			<Input type="number" {...attrs} bind:value={$formData.semester} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="professorId">
		<Form.Control let:attrs>
			<Form.Label>Professor</Form.Label>
			<Select.Root
				selected={selectedProfessorId}
				onSelectedChange={(v) => {
					v && ($formData.professorId = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a Professor" />
				</Select.Trigger>
				<Select.Content>
					{#each professorList as professor}
						<Select.Item value={professor.id} label={professor.name} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.professorId} name={attrs.name} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="courseId">
		<Form.Control let:attrs>
			<Form.Label>Course</Form.Label>
			<Select.Root
				selected={selectedCourseId}
				onSelectedChange={(v) => {
					v && ($formData.courseId = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a Course" />
				</Select.Trigger>
				<Select.Content>
					{#each courseList as course}
						<Select.Item value={course.id} label={course.name} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.courseId} name={attrs.name} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New Lecture</Form.Button>
</form>
