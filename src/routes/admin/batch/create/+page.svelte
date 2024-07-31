<script lang="ts">
    import { ArrowLeftCircleIcon } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import CreateBatchForm from "./create-batch-form.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
    <Button variant="link" href="/admin/batch">
        <ArrowLeftCircleIcon class="mr-2" />
        Go Back
    </Button>

    <Card.Root class="mx-auto max-w-sm w-full">
        <Card.Header>
            <Card.Title class="text-2xl">Create Batch</Card.Title>
            <Card.Description>batch is used to group students based on the year of joining, registered program and what specialization they choose</Card.Description>
        </Card.Header>
        <Card.Content>
            {#await Promise.allSettled([data.programList,data.specializationList]) then promises}
                {#if promises[0].status === 'fulfilled' && promises[1].status === 'fulfilled'}
                    <CreateBatchForm programList={promises[0].value} specializationList={promises[1].value}  data={data.batchForm} />                
                {/if}
            {/await}
        </Card.Content>
    </Card.Root>
</main>
