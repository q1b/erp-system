<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';

	let { data } = $props();
</script>
<div class="w-full min-h-screen flex flex-col items-center p-4 sm:p-6">
	<div class="w-full max-w-7xl mb-12">
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
	<div class="w-full max-w-7xl">
		<h3 class="text-2xl font-semibold text-gray-900 mb-6">Batches</h3>
		<div class="flex flex-col gap-6">
			{#await data.batches}
				Loading List of Batches
			{:then batches}
				<div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
					{#each batches as batch}
					<a href="./{$page.params.program}/{batch.id}">
						<Card.Root>
							<Card.Header>
								<Card.Title>{batch.year}</Card.Title>
							</Card.Header>
						</Card.Root>
					</a>
					{/each}
				</div>
			{/await}
		</div>
	</div>
</div>