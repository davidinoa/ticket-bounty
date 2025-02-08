<script lang="ts">
  import Heading from '$lib/components/heading.svelte';
  import TicketItem from '../../features/tickets/components/ticket-item.svelte';
  import { createQuery, type QueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import type { Ticket } from '$lib/types';
  import Spinner from '$lib/components/ui/spinner.svelte';
  import { DEFAULT_PAGE_SIZE } from '$features/tickets/constants';
  import ErrorBoundary from '$lib/components/error-boundary.svelte';
  import { ticketKeys } from '@features/tickets/query-keys';
  import { getContext } from 'svelte';
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();

  let mountedItems = $state(new Set<string>());
  const queryClient = getContext<QueryClient>('queryClient');

  const tickets = createQuery<Ticket[], Error>({
    queryKey: ticketKeys.list({ limit: DEFAULT_PAGE_SIZE }),
    queryFn: async () => {
      const result = await api().getTickets(DEFAULT_PAGE_SIZE);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  });

  $effect(() => {
    if ($tickets.data) {
      let timeout: NodeJS.Timeout;
      $tickets.data.forEach((ticket, index) => {
        timeout = setTimeout(() => {
          mountedItems = new Set([...mountedItems, ticket.id]);
        }, index * 300);
      });

      return () => clearTimeout(timeout);
    }
  });

  function handlePrefetch(ticket: Ticket) {
    queryClient.prefetchQuery({
      queryKey: ticketKeys.detail(ticket.id),
      queryFn: () => api().getTicketById(ticket.id),
      retry: false
    });
  }
</script>

<div class="container mx-auto p-6">
  <div class="mx-auto grid h-full max-w-2xl grid-rows-[auto_1fr]">
    <Heading
      title="Tickets"
      description="Here are the tickets that have been submitted. You can view the details of each ticket and submit a solution if you have one."
    />
    <div class="mt-8 grid gap-8">
      <div class="mx-auto w-full max-w-lg space-y-4" data-testid="ticket-list">
        {#if $tickets.isPending}
          <div class="flex justify-center">
            <Spinner size="lg" />
          </div>
        {:else if $tickets.error}
          <ErrorBoundary
            error={$tickets.error}
            reset={$tickets.refetch}
            message={$tickets.error?.message}
          />
        {:else}
          {#each $tickets.data as ticket}
            {#if mountedItems.has(ticket.id)}
              <TicketItem {ticket} onPrefetch={() => handlePrefetch(ticket)} />
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
