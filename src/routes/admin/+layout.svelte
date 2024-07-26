<script lang="ts">
	import {
		HomeIcon,
		UsersRoundIcon,
		Layers3Icon,
		LayoutPanelLeftIcon,
		Table2Icon
	} from 'lucide-svelte';
	let { children } = $props();
</script>

<div class="min-h-screen w-full">
	<aside class="w-64 fixed inset-y-0 left-0">
		<nav class="flex h-full min-h-0 flex-col">
			<div class="p-4 flex items-center gap-x-2">
				<LayoutPanelLeftIcon size={20} />
				<span class="text-base/6 font-medium text-gray-950"> Admin Dashboard </span>
			</div>
			<div class="flex flex-1 flex-col overflow-y-auto">
				<div class="flex flex-col p-2.5 gap-y-2">
					<a href="/admin" class="w-full flex gap-x-2 items-center hover:bg-gray-100 p-1.5">
						<HomeIcon size={20} />
						<span class="truncate text-base/6 font-medium text-gray-600">Home</span>
					</a>
					<a href="#" class="w-full flex gap-x-2 items-center hover:bg-gray-100 p-2">
						<UsersRoundIcon size={20} />
						<span class="truncate text-base/6 font-medium text-gray-600">Users</span>
					</a>
					<a href="#" class="w-full flex gap-x-2 items-center hover:bg-gray-100 p-1.5">
						<Layers3Icon size={20} />
						<span class="truncate text-base/6 font-medium text-gray-600">Programs</span>
					</a>
					<a href="/admin/courses" class="w-full flex gap-x-2 items-center hover:bg-gray-100 p-1.5">
						<Layers3Icon size={20} />
						<span class="truncate text-base/6 font-medium text-gray-600">Courses</span>
					</a>
					<a href="#" class="w-full flex gap-x-2 items-center hover:bg-gray-100 p-1.5">
						<Table2Icon size={20} />
						<span class="truncate text-base/6 font-medium text-gray-600">Time Tables</span>
					</a>
				</div>
			</div>
		</nav>
	</aside>
	<main class="pl-64 pr-6 py-6">
		<div class="p-6 bg-white rounded-lg shadow">
			{@render children()}
		</div>
	</main>
</div>
