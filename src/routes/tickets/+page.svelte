<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import * as Card from '$lib/components/ui/card';
	import { tickets } from '$lib/stores/tickets';
	import { fade, fly } from 'svelte/transition';
	import { LucideCheckCircle, LucideCircleDashed, LucideFileText } from 'lucide-svelte';
	import { paths } from '../../path';

	const TICKET_ICONS = {
		DONE: LucideCheckCircle,
		IN_PROGRESS: LucideCircleDashed,
		OPEN: LucideFileText
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
					{@const Icon = TICKET_ICONS[ticket.status]}
					<div in:fly={{ y: 20, duration: 700 }} out:fade class="">
						<a href={paths.tickets.detail(ticket.id)} class="block">
							<Card.Root
								class="bg-gray-800/50 transition-transform hover:scale-[1.01] hover:bg-gray-800/70"
							>
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
				{/if}
			{/each}
		</div>
	</div>
</div>
