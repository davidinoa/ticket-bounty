<script lang="ts">
  import type { Ticket } from '$lib/types';
  import * as Card from '$lib/components/ui/card';
  import { getStatusColor } from '$lib/utils/ticketUtils';
  import { paths } from '../../../path';
  import { fade, fly } from 'svelte/transition';
  import { TICKET_ICONS } from '@features/tickets/constants';
  import { api } from '$lib/api';
  import { getContext } from 'svelte';
  import type { QueryClient } from '@tanstack/svelte-query';
  import { ticketKeys } from '../query-keys';
  import { formatStatus } from '$lib/utils/ticketUtils';

  let { ticket, onPrefetch }: { ticket: Ticket; onPrefetch?: () => void } = $props();
  const Icon = TICKET_ICONS[ticket.status];
</script>

<div in:fly={{ y: 20, duration: 700 }} out:fade>
  <a
    onmouseover={() => onPrefetch?.()}
    onfocus={() => onPrefetch?.()}
    href={paths.tickets.detail(ticket.id)}
    class="block"
  >
    <Card.Root class="bg-muted/50 transition-transform hover:scale-[1.01] hover:bg-muted/70">
      <Card.Header>
        <Card.Title class="flex items-center justify-between text-xl">
          <div class="flex items-center gap-2">
            <span>{ticket.title}</span>
          </div>
          <span class="rounded-full px-3 py-1 text-sm {getStatusColor(ticket.status)}">
            <Icon class="size-4" />
            {formatStatus(ticket.status)}
          </span>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <p class="line-clamp-1 text-muted-foreground">{ticket.content}</p>
      </Card.Content>
    </Card.Root>
  </a>
</div>
