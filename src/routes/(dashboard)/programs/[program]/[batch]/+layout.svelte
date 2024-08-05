<script lang="ts">
	import ordinal from "ordinal";
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import CardRoot from '$lib/components/ui/card/card.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import {
		HomeIcon,
		UsersRoundIcon,
		Layers3Icon,
		SidebarOpenIcon,
		Table2Icon,
		BuildingIcon,
		BlocksIcon,
		SparkleIcon,
		TagsIcon,
		GroupIcon,
		GraduationCapIcon,

		BookTextIcon

	} from 'lucide-svelte';
	import { page } from '$app/stores';

	const navItems = [
		{ name: 'Lectures', href: `/programs/${$page.params.program}/${$page.params.batch}/${$page.params.semester}/`, icon: BookTextIcon },
		{ name: 'Students', href: `/programs/${$page.params.program}/${$page.params.batch}/${$page.params.semester}/students`, icon: UsersRoundIcon },
	];

	let { children, data } = $props();

	let open = $state(false);
	let selectedSemester = $state($page.params.semester);
</script>

<div class="min-h-screen w-full">
	<aside class="w-64 fixed inset-y-0 left-0 max-lg:hidden">
		<nav class="flex h-full min-h-0 flex-col">
			<div class="px-4 pt-4 flex items-center gap-x-2">
				<span class="text-base/6 font-medium text-gray-950">
					{#await data.program}
						Loading ...
					{:then program}
						{program?.name}
					{/await}
				</span>
			</div>
			<div class="px-4 pt-2 flex items-center">
				{#await data.batch}
					<span class="text-base/6 font-medium text-gray-950"> Loading ... </span>
				{:then batch}
					<span class="text-base/6 font-medium text-gray-950">{batch?.year} Batch</span>
				{/await}
			</div>
			<div class="px-4 pt-2 flex items-center gap-x-2">
				{#await data.semesters}
					<span class="text-base/6 font-medium text-gray-950"> Loading ... </span>
				{:then semesters}
					{@const selectedSemesterNumber = semesters.find((semester) => semester.id === selectedSemester)?.number}
					<div>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button variant="outline" class="px-1 h-6" builders={[builder]}>{ordinal(selectedSemesterNumber || 1)} Semester</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-40">
								<DropdownMenu.RadioGroup bind:value={selectedSemester}>
									{#each semesters as semester}
										<DropdownMenu.RadioItem value={semester.id}>{ordinal(semester.number)} Semester</DropdownMenu.RadioItem>
									{/each}
								</DropdownMenu.RadioGroup>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				{/await}
			</div>
			<div class="py-2"></div>
			<hr/>
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
				<Sheet.Title class="mb-4 pl-1"></Sheet.Title>
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
			{#await data.program}
				Loading ...
			{:then program}
				{program?.name}
			{/await}
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

	<main class="lg:pl-64 py-2 px-4 sm:px-6 lg:px-8">
		<CardRoot class="p-6">
			{@render children()}
		</CardRoot>
	</main>
</div>
