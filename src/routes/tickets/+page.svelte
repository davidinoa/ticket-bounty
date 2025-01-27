<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import { tickets } from '$lib/stores/tickets';
	import TicketItem from '../../features/tickets/components/ticket-item.svelte';

	let mountedItems = $state(new Set<string>());

	$effect(() => {
		let timeout: NodeJS.Timeout;
		$tickets.forEach((ticket, index) => {
			timeout = setTimeout(() => {
				mountedItems = new Set([...mountedItems, ticket.id]);
			}, index * 300);
		});

		return () => clearTimeout(timeout);
	});
</script>

<div class="mx-auto max-w-2xl">
	<Heading
		title="Tickets"
		description="Here are the tickets that have been submitted. You can view the details of each ticket and submit a solution if you have one."
	/>
	<div class="mt-8 grid gap-8">
		<div class="mx-auto w-full max-w-lg space-y-4">
			{#each $tickets as ticket}
				{#if mountedItems.has(ticket.id)}
					<TicketItem {ticket} />
				{/if}
			{/each}
		</div>
	</div>
</div>
