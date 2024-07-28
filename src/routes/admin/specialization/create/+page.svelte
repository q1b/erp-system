<script lang="ts">
    import { ArrowLeftCircleIcon } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import CreateSpecializationForm from "./create-specialization-form.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
    <Button variant="link" href="/admin/specialization">
        <ArrowLeftCircleIcon class="mr-2" />
        Go Back
    </Button>

    <Card.Root class="mx-auto max-w-sm w-full">
        <Card.Header>
            <Card.Title class="text-2xl">Specialization</Card.Title>
            <Card.Description>Ex: Artificial Intelligence, Cyber Security comes under B.tech Computer Science</Card.Description>
        </Card.Header>
        <Card.Content>
            <CreateSpecializationForm programs={data.programs} data={data.specializationForm} />
        </Card.Content>
    </Card.Root>
</main>
