<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { TicketStatus } from '$lib/types';
  import { ticketFormSchema } from '../schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { SuperValidated } from 'sveltekit-superforms';
  import type { z } from 'zod';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';

  type FormSchema = z.infer<typeof ticketFormSchema>;
  let { data }: { data: SuperValidated<FormSchema> } = $props();

  const form = superForm(data, {
    validators: zodClient(ticketFormSchema),
    onResult: async ({ result }) => {
      if (result.type === 'success') {
        const data = result.data;
        if (data?.success && data.ticket) {
          await goto(`/tickets/${data.ticket.id}`);
        }
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" use:enhance class="space-y-6">
  <Form.Field {form} name="title">
    <Form.Control let:attrs>
      <Form.Label>Title</Form.Label>
      <Input {...attrs} bind:value={$formData.title} placeholder="Enter ticket title" />
    </Form.Control>
    <Form.Description>The title of your ticket</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="content">
    <Form.Control let:attrs>
      <Form.Label>Content</Form.Label>
      <Textarea
        {...attrs}
        bind:value={$formData.content}
        placeholder="Describe the ticket..."
        rows={4}
      />
    </Form.Control>
    <Form.Description>Provide a detailed description of the ticket</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="status">
    <Form.Control let:attrs>
      <Form.Label>Status</Form.Label>
      <select
        {...attrs}
        bind:value={$formData.status}
        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>Select a status</option>
        {#each Object.values(TicketStatus) as status}
          <option value={status}>{status}</option>
        {/each}
      </select>
    </Form.Control>
    <Form.Description>Current status of the ticket</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Button type="submit" disabled={$submitting} class="w-full">
    {$submitting ? 'Creating...' : 'Create Ticket'}
  </Button>
</form>
