<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/nav.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Ticket Bounty</title>
	<meta name="description" content="A platform for ticket bounties" />
	<meta name="theme-color" content="#111827" />
</svelte:head>
<Nav />
<main
	class="flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden bg-background/20 px-8 py-24"
>
	{@render children()}
</main>
