<script lang="ts">
	import { Heading, Title, Subheading, Body, Strong } from "./typography";
</script>

<section class="p-12">

<Title>Design System 101</Title>

<Heading>Collection of Svelte Components</Heading>
<Subheading>Built around simplicity, to built fast and performant application</Subheading>

<Body>
	<Strong>Design System</Strong> is a collection of Svelte components that are built around simplicity, to built fast and performant application.
</Body>

<ul class="my-4 flex flex-wrap gap-4 rounded-2xl border border-slate-300/30 p-4 shadow-slate-200">
    <li class="flex flex-col gap-y-2 rounded-xl border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
      <h2 class="pl-1 text-sm text-zinc-400">Base</h2>
      <div class="ml-2">
        <button class="w-max rounded-md bg-blue-500 px-2.5 py-1 text-blue-50 shadow-sm">Example</button>
      </div>
    </li>
    <li class="flex flex-col gap-y-2 rounded-xl border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
      <h2 class="pl-1 text-sm text-zinc-400">Hover</h2>
      <div class="ml-2">
        <button class="w-max rounded-md bg-blue-600 px-2.5 py-1 text-blue-50 shadow-sm">Example</button>
      </div>
    </li>
    <li class="flex flex-col gap-y-2 rounded-xl border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
      <h2 class="pl-1 text-sm text-zinc-400">Focus</h2>
      <div class="ml-2">
        <button class="w-max rounded-md bg-blue-600 px-2.5 py-1 text-white shadow-sm ring-2 ring-blue-600/80 ring-offset-2 ring-offset-white">Example</button>
      </div>
    </li>
    <li class="flex flex-col gap-y-2 rounded-xl border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
      <h2 class="pl-1 text-sm text-zinc-400">Active</h2>
      <div class="ml-2">
        <button class="w-max rounded-md bg-blue-700 px-2.5 py-1 text-white shadow-sm">Example</button>
      </div>
    </li>
    <li class="flex flex-col gap-y-2 rounded-xl border border-slate-200 bg-white pb-3 pl-2 pr-4 pt-2">
      <h2 class="pl-1 text-sm text-zinc-400">Disabled</h2>
      <div class="ml-2">
        <button class="w-max rounded-md bg-blue-500 px-2.5 py-1 text-blue-50 shadow-sm opacity-40">Example</button>
      </div>
    </li>
  </ul>
</section>
<style>
	:global(h1,h2,h3,h4,h5,h6) {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>