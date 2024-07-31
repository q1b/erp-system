<script lang="ts">
    import { ArrowLeftCircleIcon } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import CreateRoleForm from "./create-role-form.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
    <Button variant="link" href="/admin/roles">
        <ArrowLeftCircleIcon class="mr-2" />
        Go Back
    </Button>

    <Card.Root class="mx-auto max-w-sm w-full">
        <Card.Header>
            <Card.Title class="text-2xl">Role</Card.Title>
            <Card.Description>Role Form Description</Card.Description>
        </Card.Header>
        <Card.Content>
            <CreateRoleForm data={data.roleForm} />
        </Card.Content>
    </Card.Root>
</main>
