<script lang="ts">
  import CreateTicketForm from '../../../features/tickets/components/create-ticket-form.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="container max-w-2xl py-8">
  <h1 class="mb-8 text-3xl font-bold">Create New Ticket</h1>
  <CreateTicketForm data={data.form} />
</div>
