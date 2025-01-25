<script lang="ts">
	import { getTicketById } from '$lib/stores/tickets';
	import { paths } from '../../../path';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
	const ticket = getTicketById(data.id);

	const TICKET_ICONS = {
		DONE: '✅',
		IN_PROGRESS: '🔄',
		OPEN: '📝'
	} as const;

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'DONE':
				return 'bg-green-500/20 text-green-400';
			case 'IN_PROGRESS':
				return 'bg-blue-500/20 text-blue-400';
			case 'OPEN':
				return 'bg-yellow-500/20 text-yellow-400';
			default:
				return 'bg-gray-500/20 text-gray-400';
		}
	};
</script>

<svelte:head>
	<title>{ticket ? `${ticket.title} - Ticket Bounty` : 'Ticket Not Found - Ticket Bounty'}</title>
	<meta name="description" content={ticket?.content || 'Ticket not found'} />
</svelte:head>

<div class="mx-auto w-full min-w-fit max-w-xl">
	<div class="mb-8">
		<Button href={paths.tickets.list()} variant="ghost" class="text-gray-400 hover:text-gray-300">
			<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Tickets
		</Button>
	</div>

	{#if ticket}
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-3xl font-bold">{ticket.title}</h1>
			<span class="rounded-full px-3 py-1 text-sm {getStatusColor(ticket.status)}">
				{TICKET_ICONS[ticket.status]}
				{ticket.status}
			</span>
		</div>

		<Card.Root class="bg-gray-800/50">
			<Card.Header class="border-b border-gray-700/50">
				<div class="flex items-center justify-between pb-4">
					<div>
						<Card.Description class="text-sm text-gray-400">Ticket ID</Card.Description>
						<Card.Title class="text-lg font-normal">{ticket.id}</Card.Title>
					</div>
				</div>
			</Card.Header>
			<Card.Content>
				<p class="text-pretty text-gray-300">{ticket.content}</p>
			</Card.Content>
		</Card.Root>
	{:else}
		<div class="rounded-lg bg-gray-800/50 p-6 text-center">
			<p class="text-xl text-gray-400">Ticket not found</p>
		</div>
	{/if}
</div>
