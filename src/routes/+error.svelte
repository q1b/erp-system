<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-full flex-col bg-white pb-12 pt-16">
	<main class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
		<div class="flex flex-shrink-0 justify-center">
			<a href="#" class="inline-flex">
				<span class="sr-only">Sri Sri University</span>
				<img class="h-full max-h-60 w-auto" src="/icons/pwa-512x512.png" alt="" />
			</a>
		</div>
		<div class="py-16">
			<div class="text-center">
				<p class="text-base font-semibold text-indigo-600">{$page?.status}</p>
				<h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					{$page?.error?.message.split('-')[0]}
				</h1>
				<p class="mt-2 text-base text-gray-500">{$page?.error?.message.split('-')[1]}</p>
				<div class="mt-6">
					<a href="/" class="text-base font-medium text-indigo-600 hover:text-indigo-500">
						Go back home
						<span aria-hidden="true"> &rarr;</span>
					</a>
				</div>
			</div>
		</div>
	</main>
</div>
