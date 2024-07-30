<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { EllipsisIcon, ChevronRightIcon, HomeIcon } from 'lucide-svelte';

	let { items }: { items: Array<{ href?: string; label: string }> } = $props();

	const ITEMS_TO_DISPLAY = 3;

	let open = $state(false);

	let isDesktop = $state(true);
	$effect(() => {
		isDesktop = window.matchMedia('(min-width: 768px)').matches;
	});
</script>

<nav class="flex" aria-label="Breadcrumb">
	<ol role="list" class="flex items-center gap-x-1.5 ">
		<li>
			<div>
				<a href={items[0].href} class="text-muted-foreground hover:text-foreground transition-colors">
					<HomeIcon size={20} class="shrink-0" />
					<span class="sr-only">{items[0].label}</span>
				</a>
			</div>
		</li>
		{#if items.length > ITEMS_TO_DISPLAY}
			<li>
				{#if isDesktop}
					<DropdownMenu.Root bind:open>
						<DropdownMenu.Trigger class="flex items-center gap-1" aria-label="Toggle menu">
							<EllipsisIcon size={20} />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start">
							{#each items.slice(1, -2) as item}
								<DropdownMenu.Item href={item.href ? item.href : '#'}>
									{item.label}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Drawer.Root bind:open>
						<Drawer.Trigger aria-label="Toggle Menu">
							<EllipsisIcon size={20} />
						</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header class="text-left">
								<Drawer.Title>Navigate to</Drawer.Title>
								<Drawer.Description>Select a page to navigate to.</Drawer.Description>
							</Drawer.Header>
							<div class="grid gap-1 px-4">
								{#each items.slice(1, -2) as item}
									<a href={item.href ? item.href : '#'} class="py-1 text-sm">
										{item.label}
									</a>
								{/each}
							</div>
							<Drawer.Footer class="pt-4">
								<Drawer.Close asChild let:builder>
									<Button variant="outline" builders={[builder]}>Close</Button>
								</Drawer.Close>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Root>
				{/if}
			</li>
		{/if}
		{#each items.slice(-ITEMS_TO_DISPLAY + 1) as item}
			<li>
				<div class="flex items-center gap-x-1.5">
					<ChevronRightIcon size={20} class="shrink-0 text-gray-300" />
					{#if item.href}
						<a href={item.href} class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>{item.label}</a
						>
					{:else}
						<span class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>{item.label}</span
						>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</nav>
