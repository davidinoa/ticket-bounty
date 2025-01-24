<script lang="ts">
	import { tickets } from '$lib/stores/tickets';
	import { paths } from '../../path';

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

<div class="mx-auto w-full min-w-fit max-w-xl">
	<h1 class="mb-8 text-3xl font-bold">Tickets</h1>

	<div class="space-y-4">
		{#each $tickets as ticket}
			<a
				href={paths.tickets.detail(ticket.id)}
				class="block rounded-lg bg-gray-800/50 p-6 transition-transform hover:scale-[1.01] hover:bg-gray-800/70"
			>
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold">{ticket.title}</h2>
					<span class="rounded-full {getStatusColor(ticket.status)} px-3 py-1 text-sm">
						{TICKET_ICONS[ticket.status]}
					</span>
				</div>
				<p class="mt-2 text-gray-400">{ticket.content}</p>
			</a>
		{/each}
	</div>
</div>
