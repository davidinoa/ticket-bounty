<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/nav.svelte';
  import { browser } from '$app/environment';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
  import { setContext } from 'svelte';
  import { Toaster } from 'svelte-sonner';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  });

  setContext('queryClient', queryClient);

  let { children } = $props();
</script>

<svelte:head>
  <title>Ticket Bounty</title>
  <meta name="description" content="A platform for ticket bounties" />
  <meta name="theme-color" content="#111827" />
</svelte:head>
<div class="grid min-h-screen grid-cols-1">
  <Nav />
  <main class="h-full overflow-y-auto overflow-x-hidden bg-background/20 px-8 py-24">
    <QueryClientProvider client={queryClient}>
      {@render children()}
      <SvelteQueryDevtools />
    </QueryClientProvider>
  </main>
  <Toaster richColors closeButton />
</div>
