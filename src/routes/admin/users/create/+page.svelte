<script lang="ts">
	import { ArrowLeftCircleIcon } from "lucide-svelte";
	import * as Card from '$lib/components/ui/card/index.js';
	import CreateUserForm from "./create-user-form.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
<Button variant="link" href="/admin/courses">
	<ArrowLeftCircleIcon class="mr-2" />
	Go Back
</Button>

<Card.Root class="mx-auto max-w-sm w-full">
	<Card.Header>
		<Card.Title class="text-2xl">New User</Card.Title>
		<Card.Description>Create a New User</Card.Description>
	</Card.Header>
	<Card.Content>
<CreateUserForm data={data.courseForm} />
</Card.Content>
</Card.Root>
</main>