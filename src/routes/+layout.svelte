<script>
	import "../app.css"
	
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import { Toaster } from "$lib/components/ui/sonner";

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
	let { children } = $props();
</script>

<svelte:head>
	<title> Sri Sri University - ERP Portal </title>
	<meta name="description" content="ERP Portal for students, staff of Sri Sri University">
	{@html webManifestLink}
</svelte:head>

<Toaster />

<main>
	{@render children()}
</main>