<script lang="ts">
	import '../app.css';
	import { paths } from '../path';
	import { Button } from '$lib/components/ui/button';
	import { LucideKanban } from 'lucide-svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Ticket Bounty</title>
	<meta name="description" content="A platform for ticket bounties" />
	<meta name="theme-color" content="#111827" />
</svelte:head>

<nav
	class="fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b border-border/40 bg-background/80 px-5 py-2.5 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
>
	<Button href={paths.home()} variant="ghost">
		<LucideKanban />
		<h1 class="text-lg font-bold">TicketBounty</h1>
	</Button>
	<Button href={paths.tickets.list()} variant="link">Tickets</Button>
</nav>
<main
	class="flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden bg-background/20 px-8 py-24"
>
	{@render children()}
</main>
