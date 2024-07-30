<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	let { data } = $props();
</script>

<header>
	<nav>
		{#if data.session?.user}
			<strong>{data.session?.user?.email}</strong>
			<em>{data.session?.user?.role}</em>
			<br />
			<SignOut>
				<span slot="submitButton">Sign Out</span>
			</SignOut>
		{:else}
			<SignIn provider="google">
				<span slot="submitButton">Sign In with Google</span>
			</SignIn>
		{/if}
	</nav>
</header>
