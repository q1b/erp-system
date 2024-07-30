<script lang="ts">
	import { Heading, Title, Subheading, Body, Strong } from './typography';
	const common = 'inline-flex items-center w-max px-2.5 py-1 gap-x-2';
</script>

<section class="p-12">
	<Title>Design System 101</Title>

	<Heading>Collection of Components</Heading>
	<Subheading>Built around simplicity, to built fast and performant application</Subheading>

	<br />
	<Heading>Button</Heading>
	<ul class="my-4 flex flex-wrap gap-4 border border-slate-300/30 p-4 shadow-slate-200">
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Base</h2>
			<div class="ml-2">
				<button class="{common} bg-blue-500 text-blue-50"> Example </button>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Hover</h2>
			<div class="ml-2">
				<button class="{common} bg-blue-600 text-blue-50">Example</button>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Focus</h2>
			<div class="ml-2">
				<button
					class="{common} bg-blue-600 text-white ring-2 ring-blue-600/80 ring-offset-2 ring-offset-white"
					>Example</button
				>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Active</h2>
			<div class="ml-2">
				<button class="{common} bg-blue-700 text-white">Example</button>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Disabled</h2>
			<div class="ml-2">
				<button class="{common} bg-blue-500 text-blue-50 opacity-40">Example</button>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Suffix Icon</h2>
			<div class="ml-2">
				<button class="{common} bg-blue-500 text-blue-50">
					Example
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Prefix Icon</h2>
			<div class="ml-2">
				<button class="{common} bg-blue-500 text-blue-50">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
							clip-rule="evenodd"
						/>
					</svg>
					Shop
				</button>
			</div>
		</li>
	</ul>
	<ul class="my-4 flex flex-wrap gap-4 border border-slate-300/30 p-4 shadow-slate-200">
		<li class="flex flex-col gap-y-2 border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Base Compound Button</h2>
			<div class="ml-2">
				<button
					class="flex items-center rounded-md bg-blue-500 border border-blue-500 p-3 gap-x-2.5"
				>
					<div class="text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-7 w-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					</div>
					<div class="flex flex-col items-start gap-y-1.5">
						<span class="leading-3 text-sm text-white font-medium">Example Heading</span>
						<p class="leading-3 text-xs text-blue-100">Descriptive Text for Action</p>
					</div>
				</button>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-blue-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Hover Compound Button</h2>
			<div class="ml-2">
				<button
					class="flex items-center rounded-md bg-blue-600 border border-blue-500 p-3 gap-x-2.5"
				>
					<div class="text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-7 w-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					</div>
					<div class="flex flex-col items-start gap-y-1.5">
						<span class="leading-3 text-sm text-white font-medium">Example Heading</span>
						<p class="leading-3 text-xs text-blue-100">Descriptive Text for Action</p>
					</div>
				</button>
			</div>
		</li>
		<li class="flex flex-col gap-y-2 border border-blue-200 bg-white pb-3 pl-2 pr-4 pt-2">
			<h2 class="pl-1 text-sm text-zinc-400">Active Compound Button</h2>
			<div class="ml-2">
				<button
					class="flex items-center rounded-md border bg-blue-700 border-blue-400 p-3 gap-x-2.5"
				>
					<div class="text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-7 w-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					</div>
					<div class="flex flex-col items-start gap-y-1.5">
						<span class="leading-3 text-sm text-white font-medium">Example Heading</span>
						<p class="leading-3 text-xs text-blue-100">Descriptive Text for Action</p>
					</div>
				</button>
			</div>
		</li>
	</ul>
</section>

<style>
	:global(h1, h2, h3, h4, h5, h6) {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}
</style>
