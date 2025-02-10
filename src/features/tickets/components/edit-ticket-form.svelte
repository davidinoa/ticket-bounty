<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { TicketStatus } from '$lib/types';
  import { ticketFormSchema, type TicketFormData } from '../schema';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import type { SuperValidated } from 'sveltekit-superforms';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { formatStatus } from '$lib/utils/ticketUtils';

  let { data, ticketId }: { data: SuperValidated<TicketFormData>; ticketId: string } = $props();

  const form = superForm(data, {
    validators: zod(ticketFormSchema),
    onUpdate: ({ form }) => {
      if (form.valid) {
        window.location.href = `/tickets/${ticketId}`;
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
          <option value={status}>{formatStatus(status)}</option>
        {/each}
      </select>
    </Form.Control>
    <Form.Description>Current status of the ticket</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <div class="flex gap-4">
    <a href="/tickets/{ticketId}" class="flex-1">
      <Button type="button" variant="outline" class="w-full">Cancel</Button>
    </a>
    <Button type="submit" disabled={$submitting} class="flex-1">
      {$submitting ? 'Saving...' : 'Save Changes'}
    </Button>
  </div>
</form>
