<script lang="ts">
  import CreateTicketForm from '../../../features/tickets/components/create-ticket-form.svelte';
  import type { ActionData } from './$types';
  import { Button } from '$lib/components/ui/button';
  import { LucideArrowLeft } from 'lucide-svelte';

  const { form } = $props<{ form: ActionData | null }>();
</script>

<div class="container mx-auto max-w-2xl p-6">
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Create New Ticket</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Fill out the form below to create a new ticket.
        </p>
      </div>
      <Button href="/tickets" variant="outline" class="gap-2">
        <LucideArrowLeft class="h-4 w-4" />
        Back to Tickets
      </Button>
    </div>
  </div>

  <CreateTicketForm {form} />
</div>
