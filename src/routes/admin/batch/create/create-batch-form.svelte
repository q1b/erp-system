<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createBatchSchema } from './create-batch-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateBatchFormType } from './index.js';
	import * as Select from '$lib/components/ui/select';

	const {
		data,
		onresult = () => {},
		class: className = '',
		programList = [],
		specializationList = []
	}: {
		data: CreateBatchFormType;
		onresult?: () => void;
		class?: string;
		programList: { name: string; id: string }[];
		specializationList: { name: string; id: string; programId: string | null }[];
	} = $props();

	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createBatchSchema),
		onResult: () => {
			toast.dismiss(toastId);
			toast.message('Your batch is being created');
			onresult();
		},
		onSubmit: () => {
			toastId = toast.loading('Creating Batch ...');
		},
		delayMs: 100
	});
	const { form: formData, enhance, delayed } = form;

	let selectedProgramId = $derived(
		$formData.programId
			? {
					label: $formData.programId,
					value: $formData.programId
				}
			: undefined
	);

	let selectedSpecializationId = $derived(
		$formData.specializationId
			? {
					label: $formData.specializationId,
					value: $formData.specializationId
				}
			: undefined
	);
</script>

<form
	class={className}
	method="POST"
	use:enhance
	action="/admin/batch/create"
>
	<Form.Field {form} name="year">
		<Form.Control let:attrs>
			<Form.Label>Year</Form.Label>
			<Input type="number" {...attrs} bind:value={$formData.year} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="programId">
		<Form.Control let:attrs>
			<Form.Label>Program Id</Form.Label>
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
					{#each programList as program}
						<Select.Item value={program.id} label={program.name} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.programId} name={attrs.name} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	{#if $formData.programId}
		<Form.Field {form} name="specializationId">
			<Form.Control let:attrs>
				<Form.Label>Specialization Id</Form.Label>
				<Select.Root
					selected={selectedSpecializationId}
					onSelectedChange={(v) => {
						v && ($formData.specializationId = v.value);
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select a Specialization" />
					</Select.Trigger>
					<Select.Content>
						{#each specializationList.filter((specialization) => specialization.programId === $formData.programId) as specialization}
							<Select.Item value={specialization.id} label={specialization.name} />
						{/each}
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.specializationId} name={attrs.name} />
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>
	{/if}
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New Batch</Form.Button>
</form>
