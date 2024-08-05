<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { data } = $props();
</script>

<div>
	<h2 class="mb-6">Lectures</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
		{#await data.semesterLectures}
			<p>Loading ...</p>
		{:then semesterLectures}
			{#each semesterLectures as semesterLecture}
				<Card.Root>
					<Card.Header>
						<Card.Title>{semesterLecture.lecture?.course?.name}</Card.Title>
						<Card.Description>{semesterLecture.lecture.location}</Card.Description>
					</Card.Header>
					<Card.Content>
						{semesterLecture.lecture.professor?.user?.name}
					</Card.Content>
				</Card.Root>
			{/each}
		{/await}
	</div>
</div>
