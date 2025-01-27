<script lang="ts">
	import type { Ticket } from '$lib/stores/tickets';
	import * as Card from '$lib/components/ui/card';
	import { getStatusColor } from '$lib/utils/ticketUtils';
	import { paths } from '../../../path';
	import { fade, fly } from 'svelte/transition';
	import { TICKET_ICONS } from '@features/tickets/constants';

	let { ticket }: { ticket: Ticket } = $props();
	const Icon = TICKET_ICONS[ticket.status];
</script>

<div in:fly={{ y: 20, duration: 700 }} out:fade>
	<a href={paths.tickets.detail(ticket.id)} class="block">
		<Card.Root class="bg-gray-800/50 transition-transform hover:scale-[1.01] hover:bg-gray-800/70">
			<Card.Header>
				<Card.Title class="flex items-center justify-between text-xl">
					<div class="flex items-center gap-2">
						<span>{ticket.title}</span>
					</div>
					<span class="rounded-full px-3 py-1 text-sm {getStatusColor(ticket.status)}">
						<Icon class="size-4" />
					</span>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="line-clamp-1 text-gray-400">{ticket.content}</p>
			</Card.Content>
		</Card.Root>
	</a>
</div>
