<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	let { data } = $props();
</script>

<div class="min-h-screen w-full flex flex-col items-center p-4 sm:p-6">
	<div class="max-w-7xl">
		<h2 class="text-3xl font-semibold text-gray-900 mb-6">List of Programs</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{#await data.programs}
				Loading ...
			{:then programs}
				{#each programs as program}
					<a href="/programs/{program.id}">
						<Card.Root>
							<Card.Header>
								<Card.Title>{program.name}</Card.Title>
								<Card.Description class="line-clamp-3">{program.description}</Card.Description>
							</Card.Header>
						</Card.Root>
					</a>
				{/each}
			{/await}
		</div>
	</div>
</div>
