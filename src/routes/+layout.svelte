<script lang="ts">
	import '../app.css';
	import { paths } from '../path';
	let { children } = $props();
</script>

<svelte:head>
	<title>Ticket Bounty</title>
	<meta name="description" content="A platform for ticket bounties" />
	<meta name="theme-color" content="#111827" />
</svelte:head>

<nav
	class="border-border/40 bg-background/80 supports-[backdrop-filter]:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur-sm"
>
	<a href={paths.home()} class="text-lg font-bold">Home</a>
	<a href={paths.tickets.list()} class="text-sm underline">Tickets</a>
</nav>
<main
	class="bg-background/20 flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden px-8 py-24"
>
	{@render children()}
</main>
