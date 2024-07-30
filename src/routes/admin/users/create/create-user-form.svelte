<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { createUserSchema } from './create-user-schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { CreateUserFormType } from '.';

	const {
		data,
		onresult = () => {},
		class: className = ''
	}: {
		data: CreateUserFormType;
		onresult?: () => void;
		class?: string;
	} = $props();

	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(createUserSchema),
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

	let selectedRole = $derived(
		$formData.role
			? {
					label: $formData.role,
					value: $formData.role
				}
			: undefined
	);
</script>

<form class={className} method="POST" use:enhance action="/admin/courses/create/?default">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input type="text" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email Address</Form.Label>
			<Input type="email" {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="role">
		<Form.Control let:attrs>
			<Form.Label>Role</Form.Label>
			<Select.Root
				selected={selectedRole}
				onSelectedChange={(v) => {
					v && ($formData.role = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a Role" />
				</Select.Trigger>
				<Select.Content>
					{#each ['faculty', 'student', 'admin', 'user'] as role}
						<Select.Item value={role} label={role} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.email} name={attrs.name} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Add New User</Form.Button>
</form>
