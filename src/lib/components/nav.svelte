<script lang="ts">
  import { paths } from '../../path';
  import { Button } from '$lib/components/ui/button';
  import { LucideKanban, LucidePlus } from 'lucide-svelte';
  import ThemeSelector from './theme-selector.svelte';
</script>

<nav
  class="fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b border-border/40 bg-background/80 px-5 py-2.5 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
>
  <Button href={paths.home()} variant="ghost">
    <LucideKanban />
    <h1 class="text-lg font-bold">TicketBounty</h1>
  </Button>
  <div class="flex items-center gap-4">
    <Button href={paths.tickets.list()} variant="link">Tickets</Button>
    <Button
      href="/tickets/new"
      variant="outline"
      class="gap-2 bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30"
    >
      <LucidePlus class="h-4 w-4" />
      New Ticket
    </Button>
    <ThemeSelector />
  </div>
</nav>
