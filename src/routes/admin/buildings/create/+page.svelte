<script lang="ts">
    import { ArrowLeftCircleIcon } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import CreateBuildingForm from "./create-building-form.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
    <Button variant="link" href="/admin/buildings">
        <ArrowLeftCircleIcon class="mr-2" />
        Go Back
    </Button>

    <Card.Root class="mx-auto max-w-sm w-full">
        <Card.Header>
            <Card.Title class="text-2xl">Building</Card.Title>
            <Card.Description>Building contains multiple rooms, each room has some lecture going on, or booked for some other purpose like office</Card.Description>
        </Card.Header>
        <Card.Content>
            <CreateBuildingForm data={data.buildingForm} />
        </Card.Content>
    </Card.Root>
</main>
