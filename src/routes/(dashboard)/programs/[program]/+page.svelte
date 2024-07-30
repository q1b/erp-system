<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import * as Card from '$lib/components/ui/card';
	import groupBy from 'just-group-by';

	let { data } = $props();
</script>

<div class="min-h-screen w-full max-w-7xl py-4 px-4 xl:px-0">
	<Breadcrumb
		items={[
			{ href: '/', label: 'Home' },
			{ href: '/programs', label: 'Programs' },
			{ label: $page.params.program }
		]}
	/>
	<div class="mt-6 mb-12">
		<h2 class="text-3xl font-semibold text-gray-900 mb-6">
			{#await data.program}
				Loading ...
			{:then program}
				{program?.name}
			{/await}
		</h2>
		<p class="max-w-prose">
			{#await data.program}
				Loading ...
			{:then program}
				{program?.description}
			{/await}
		</p>
	</div>
	<div class="mb-12">
		<h3 class="text-2xl font-semibold text-gray-900 mb-6">Specializations</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{#await data.specializations}
				Loading List of Specializations
			{:then specializations}
				{#each specializations as specialization}
					<Card.Root>
						<Card.Header>
							<Card.Title>{specialization.name}</Card.Title>
						</Card.Header>
					</Card.Root>
				{/each}
			{/await}
		</div>
	</div>
	<div>
		<h3 class="text-2xl font-semibold text-gray-900 mb-6">Batches</h3>
		<div class="flex flex-col gap-6">
			{#await data.batches}
				Loading List of Batches
			{:then batches}
				{@const groupedByYear = groupBy(batches, (batch) => batch.year)}
				<div>
					{#each Object.keys(groupedByYear) as year}
						<h3 class="text-xl font-medium mb-4">{year}</h3>
						<div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
							{#each groupedByYear[+`${year}`] as batch}
								<Card.Root>
									<Card.Header>
										<Card.Title>{batch.specialization?.name}</Card.Title>
									</Card.Header>
								</Card.Root>
							{/each}
						</div>
					{/each}
				</div>
			{/await}
		</div>
	</div>
</div>
