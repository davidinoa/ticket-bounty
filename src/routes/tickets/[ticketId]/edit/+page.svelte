<script lang="ts">
  import EditTicketForm from '$features/tickets/components/edit-ticket-form.svelte';

  const { data } = $props();
  const ticketId = data.ticketId;
</script>

<div class="container max-w-2xl py-8">
  <h1 class="mb-8 text-3xl font-bold">Edit Ticket</h1>
  <EditTicketForm data={data.form} {ticketId} />
</div>
