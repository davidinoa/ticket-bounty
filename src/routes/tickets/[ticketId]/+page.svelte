<script lang="ts">
  import { paths } from '../../../path';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import type { PageData } from './$types';
  import NotFound from '$lib/components/not-found.svelte';
  import { getStatusColor } from '$lib/utils/ticketUtils';
  import { TICKET_ICONS } from '@features/tickets/constants';
  import { createQuery } from '@tanstack/svelte-query';
  import { api } from '$lib/api';

  export let data: PageData;

  const ticketId = data.id;
  const ticketData = createQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => api().getTicketById(ticketId)
  });
</script>

{#if !ticketId || $ticketData.isPending}
  <div class="flex justify-center">
    <span>Loading...</span>
  </div>
{/if}

{#if $ticketData.error}
  <div class="text-destructive">
    <span>Error: {$ticketData.error.message}</span>
  </div>
{/if}

<svelte:head>
  <title
    >{$ticketData.data
      ? `${$ticketData.data.title} - Ticket Bounty`
      : 'Ticket Not Found - Ticket Bounty'}</title
  >
  <meta name="description" content={$ticketData.data?.content || 'Ticket not found'} />
</svelte:head>

{#if $ticketData.isSuccess}
  <div class="mx-auto w-full min-w-fit max-w-xl">
    <div class="mb-8">
      <Button
        href={paths.tickets.list()}
        variant="ghost"
        class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Tickets
      </Button>
    </div>

    {#if $ticketData.data}
      {@const Icon = TICKET_ICONS[$ticketData.data.status]}
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{$ticketData.data.title}</h1>
        <span
          class="flex items-center gap-2 rounded-full px-3 py-1 text-sm {getStatusColor(
            $ticketData.data.status
          )}"
        >
          <Icon class="size-4" />
          {$ticketData.data.status}
        </span>
      </div>

      <Card.Root
        class="border border-gray-200 bg-white dark:border-gray-700/50 dark:bg-gray-800/50"
      >
        <Card.Header class="border-b border-gray-200 dark:border-gray-700/50">
          <div class="flex items-center justify-between pb-4">
            <div>
              <Card.Description class="text-sm text-gray-600 dark:text-gray-400"
                >Ticket ID</Card.Description
              >
              <Card.Title class="text-lg font-normal text-gray-900 dark:text-white"
                >{$ticketData.data.id}</Card.Title
              >
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          <p class="text-pretty text-gray-700 dark:text-gray-300">{$ticketData.data.content}</p>
        </Card.Content>
      </Card.Root>
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
  </div>
{/if}
