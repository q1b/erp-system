<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import CardRoot from '$lib/components/ui/card/card.svelte';
	import {
		HomeIcon,
		UsersRoundIcon,
		Layers3Icon,
		LayoutPanelLeftIcon,
		SidebarOpenIcon,
		Table2Icon,
		BuildingIcon,
		BlocksIcon,
		SparkleIcon
	} from 'lucide-svelte';

	const navItems = [
		{ name: 'Home', href: '/admin', icon: HomeIcon },
		{ name: 'Buildings', href: '/admin/buildings', icon: BuildingIcon },
		{ name: 'Users', href: '/admin/users', icon: UsersRoundIcon },
		{ name: 'Programs', href: '/admin/programs', icon: BlocksIcon },
		{ name: 'Specializations', href: '/admin/specialization', icon: SparkleIcon },
		{ name: 'Courses', href: '/admin/courses', icon: Layers3Icon },
		{ name: 'Time Tables', href: '/admin/timetable', icon: Table2Icon }
	];

	let { children } = $props();

	let open = $state(false);
</script>

<div class="min-h-screen w-full">
	<aside class="w-64 fixed inset-y-0 left-0 max-lg:hidden">
		<nav class="flex h-full min-h-0 flex-col">
			<div class="p-4 flex items-center gap-x-2">
				<LayoutPanelLeftIcon size={20} />
				<span class="text-base/6 font-medium text-gray-950"> Admin Dashboard </span>
			</div>
			<div class="flex flex-1 flex-col overflow-y-auto">
				<div class="flex flex-col p-2.5 gap-y-2">
					{#each navItems as navItem}
						{@const Icon = navItem.icon}
						<a href={navItem.href} class="w-full flex gap-x-2 items-center hover:bg-gray-100 p-1.5">
							<Icon size={20} />
							<span class="truncate text-base/6 font-medium text-gray-600">{navItem.name}</span>
						</a>
					{/each}
				</div>
			</div>
		</nav>
	</aside>
	<div
		class="sticky top-0 flex items-center gap-x-6 px-4 py-4 bg-background shadow-sm sm:px-6 lg:hidden"
	>
		<Sheet.Root bind:open>
			<Sheet.Trigger asChild let:builder>
				<Button builders={[builder]} size="icon" variant="outline" class="p-2.5 -m-2.5">
					<SidebarOpenIcon class="h-5 w-5" />
					<span class="sr-only">Toggle Menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left" class="sm:max-w-xs">
				<Sheet.Title class="mb-4 pl-1">Admin Dashboard</Sheet.Title>
				<div class="flex flex-1 flex-col overflow-y-auto">
					<div class="flex flex-col gap-y-2">
						{#each navItems as navItem}
							{@const Icon = navItem.icon}
							<a
								onclick={() => {
									open = false;
								}}
								href={navItem.href}
								class="w-full flex gap-x-2 items-center hover:bg-gray-100 p-1.5"
							>
								<Icon size={20} fill="#000000" />
								<span class="truncate text-base/6 font-medium text-gray-600">{navItem.name}</span>
							</a>
						{/each}
					</div>
				</div>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex-1 text-sm font-semibold leading-6 text-secondary-foreground">
			Admin Dashboard
		</div>
		<a href="#">
			<span class="sr-only">Your profile</span>
			<img
				class="h-8 w-8 rounded-full bg-indigo-700"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt=""
			/>
		</a>
	</div>

	<main class="lg:pl-64 py-10 px-4 sm:px-6 lg:px-8">
		<CardRoot>
			{@render children()}
		</CardRoot>
	</main>
</div>
