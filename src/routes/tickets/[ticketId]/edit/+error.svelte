<script lang="ts">
  import { page } from '$app/state';
  import NotFound from '$lib/components/not-found.svelte';
  import { Button } from '$lib/components/ui/button';
  import { paths } from '../../../../path';
</script>

{#if page.status === 404}
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
{/if}

{#if page.status === 500}
  <h1>{page.status}: {page.error?.message}</h1>
{/if}
