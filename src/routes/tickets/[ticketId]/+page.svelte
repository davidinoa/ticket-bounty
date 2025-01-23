<script lang="ts">
	import { getTicketById } from '$lib/stores/tickets';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ticket = getTicketById(data.id);

	// Status badge colors
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'DONE':
				return 'bg-green-500/20 text-green-400';
			case 'IN_PROGRESS':
				return 'bg-blue-500/20 text-blue-400';
			default:
				return 'bg-gray-500/20 text-gray-400';
		}
	};
</script>

<div class="mx-auto max-w-4xl p-6">
	<div class="mb-6">
		<a href="/" class="inline-flex items-center text-blue-400 hover:text-blue-300">
			<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Home
		</a>
	</div>

	{#if ticket}
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-3xl font-bold">{ticket.title}</h1>
			<span class="rounded-full px-3 py-1 text-sm {getStatusColor(ticket.status)}">
				{ticket.status}
			</span>
		</div>

		<div class="rounded-lg bg-gray-800 p-6">
			<div class="mb-6 flex items-center justify-between border-b border-gray-700 pb-4">
				<div>
					<p class="text-sm text-gray-400">Ticket ID</p>
					<p class="text-lg">{ticket.id}</p>
				</div>
			</div>

			<div class="space-y-6">
				<div>
					<h2 class="mb-2 text-xl font-semibold">Content</h2>
					<p class="text-gray-300">{ticket.content}</p>
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-lg bg-gray-800 p-6 text-center">
			<p class="text-xl text-gray-400">Ticket not found</p>
		</div>
	{/if}
</div>
