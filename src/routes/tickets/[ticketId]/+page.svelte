<script lang="ts">
  import { paths } from '../../../path';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import NotFound from '$lib/components/not-found.svelte';
  import { getStatusColor } from '$lib/utils/ticketUtils';
  import { TICKET_ICONS } from '$features/tickets/constants';
  import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import Spinner from '$lib/components/ui/spinner.svelte';
  import { ticketKeys } from '$features/tickets/query-keys';
  import { formatStatus } from '$lib/utils/ticketUtils';
  import ErrorBoundary from '$lib/components/error-boundary.svelte';
  import TicketId from '$lib/components/ticket-id.svelte';

  const { data } = $props();
  const ticketId = data.ticketId;
  const queryClient = useQueryClient();

  const queryData = createQuery({
    queryKey: ticketKeys.detail(ticketId),
    queryFn: () => api().getTicketById(ticketId)
  });

  const mutation = createMutation({
    mutationFn: () => api().deleteTicket(ticketId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ticketKeys.list() });
        window.location.href = paths.tickets.list();
      } else {
        alert('Failed to delete ticket: ' + result.error);
      }
    },
    onError: (error) => {
      alert('Failed to delete ticket: ' + error.message);
    }
  });
</script>

{#if !ticketId || $queryData.isPending}
  <div class="flex justify-center">
    <Spinner size="lg" />
  </div>
{:else if $queryData.error}
  <ErrorBoundary
    error={$queryData.error}
    reset={() => $queryData.refetch()}
    message="Failed to load ticket details"
  />
{:else if $queryData.isSuccess && $queryData.data.success}
  {@const ticket = $queryData.data.data}
  {@const Icon = TICKET_ICONS[ticket.status]}
  <div class="mx-auto w-full min-w-fit max-w-xl">
    <nav class="mb-8 flex items-center gap-4 border-b border-gray-200 pb-4 dark:border-gray-700/50">
      <Button
        href={paths.tickets.list()}
        variant="ghost"
        size="sm"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Tickets
      </Button>
      <div class="ml-auto flex items-center gap-4">
        <Button href="/tickets/{ticket.id}/edit" variant="ghost" size="sm">
          <svg
            class="mr-1.5 h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="text-destructive hover:bg-destructive/10"
          onclick={() => {
            if (
              confirm('Are you sure you want to delete this ticket? This action cannot be undone.')
            ) {
              $mutation.mutate();
            }
          }}
          disabled={$mutation.isPending}
        >
          {#if $mutation.isPending}
            <Spinner class="mr-1.5 h-3.5 w-3.5" />
          {:else}
            <svg
              class="mr-1.5 h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          {/if}
          Delete Ticket
        </Button>
      </div>
    </nav>

    <Card.Root class="border border-gray-200 bg-white dark:border-gray-700/50 dark:bg-gray-800/50">
      <Card.Header class="space-y-6 border-b border-gray-200 pb-6 dark:border-gray-700/50">
        <div class="flex items-start justify-between gap-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{ticket.title}</h1>
          <span
            class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium {getStatusColor(
              ticket.status
            )}"
          >
            <Icon class="size-3.5" />
            {formatStatus(ticket.status)}
          </span>
        </div>
        <div
          class="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700/50"
        >
          <div class="space-y-1">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket ID</p>
            <TicketId id={ticket.id} />
          </div>
          <div class="space-y-1 text-right">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Created</p>
            <p class="text-sm text-gray-900 dark:text-gray-100">March 15, 2024</p>
          </div>
        </div>
      </Card.Header>
      <Card.Content class="space-y-4">
        <div>
          <p class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
          <p class="text-pretty text-gray-700 dark:text-gray-300">{ticket.content}</p>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{:else}
  <div class="flex flex-col">
    <NotFound
      message="Ticket not found"
      buttonProps={{
        variant: 'link',
        onclick: () => {
          window.location.href = paths.tickets.list();
        },
        children: 'Back to Tickets'
      }}
      {Button}
    />
  </div>
{/if}

<svelte:head>
  <title
    >{$queryData.data?.success && $queryData.data.data.title
      ? `${$queryData.data.data.title} - Ticket Bounty`
      : 'Ticket Not Found - Ticket Bounty'}</title
  >
  <meta
    name="description"
    content={$queryData.data?.success ? $queryData.data.data.content : 'Ticket not found'}
  />
</svelte:head>
