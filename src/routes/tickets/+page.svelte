<script lang="ts">
  import Heading from '$lib/components/heading.svelte';
  import TicketItem from '../../features/tickets/components/ticket-item.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import type { Ticket } from '$lib/types';
  import Spinner from '$lib/components/ui/spinner.svelte';
  import { DEFAULT_PAGE_SIZE } from '@features/tickets/constants';

  let mountedItems = $state(new Set<string>());

  const tickets = createQuery<Ticket[], Error>({
    queryKey: ['tickets', DEFAULT_PAGE_SIZE],
    queryFn: () => api().getTickets(DEFAULT_PAGE_SIZE)
  });

  $effect(() => {
    if ($tickets.data) {
      let timeout: NodeJS.Timeout;
      $tickets.data.forEach((ticket, index) => {
        timeout = setTimeout(() => {
          mountedItems = new Set([...mountedItems, ticket.id.toString()]);
        }, index * 300);
      });

      return () => clearTimeout(timeout);
    }
  });
</script>

<div class="mx-auto max-w-2xl">
  <Heading
    title="Tickets"
    description="Here are the tickets that have been submitted. You can view the details of each ticket and submit a solution if you have one."
  />
  <div class="mt-8 grid gap-8">
    <div class="mx-auto w-full max-w-lg space-y-4">
      {#if $tickets.isPending}
        <div class="flex justify-center">
          <Spinner size="lg" />
        </div>
      {:else if $tickets.error}
        <div class="text-destructive">
          <span>Error: {$tickets.error.message}</span>
        </div>
      {:else}
        {#each $tickets.data as ticket}
          {#if mountedItems.has(ticket.id.toString())}
            <TicketItem {ticket} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>
