<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createSpecializationSchema } from './create-specialization-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateSpecializationFormType } from './index.js';
	import { type ProgramTableType } from '$lib/table-types.js';
	import * as Select from '$lib/components/ui/select';

	const {
		data,
		onresult = () => {},
		class: className = '',
		programs
	}: {
		data: CreateSpecializationFormType;
		onresult?: () => void;
		class?: string;
		programs: Omit<ProgramTableType,'description'>[];
	} = $props();

	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createSpecializationSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your specialization is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Specialization ...');
		},
		delayMs: 100
	});
	const { form: formData, enhance, delayed } = form;

	let selectedProgramId = $derived(
		$formData.programId
			? {
					label: $formData.name,
					value: $formData.programId
			  }
			: undefined
	);
</script>

<form
	class={className}
	method="POST"
	use:enhance
	action="/admin/specialization/create"
>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="shortName">
		<Form.Control let:attrs>
			<Form.Label>Shortname</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.shortName} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="programId">
		<Form.Control let:attrs>
			<Form.Label>Program</Form.Label>
			<Select.Root
				selected={selectedProgramId}
				onSelectedChange={(v) => {
					v && ($formData.programId = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a Program" />
				</Select.Trigger>
				<Select.Content>
					{#each programs as program}
						<Select.Item value={program.id} label={program.name} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.programId} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button type="submit" class="w-full mt-2" disabled={$delayed}>Add New Specialization</Form.Button>
</form>
