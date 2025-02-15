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
  import * as Card from '$lib/components/ui/card';
  import { formatStatus } from '$lib/utils/ticketUtils';
  import { toast } from 'svelte-sonner';

  let { data, ticketId }: { data: SuperValidated<TicketFormData>; ticketId: string } = $props();

  const form = superForm(data, {
    validators: zod(ticketFormSchema),
    onUpdate: ({ form }) => {
      if (form.valid) {
        toast.success('Ticket updated successfully!');
        window.location.href = `/tickets/${ticketId}`;
      }
    }
  });

  const { form: formData, enhance, submitting, errors } = form;
</script>

<Card.Root
  class="mx-auto w-full max-w-2xl border-t-4 border-t-primary/20 bg-card/95 shadow-sm dark:bg-card/40"
>
  <Card.Content class="p-6">
    <form method="POST" use:enhance class="space-y-6">
      <Form.Field {form} name="title">
        <Form.Control let:attrs>
          <div class="space-y-0.5">
            <Form.Label class="font-medium">Title</Form.Label>
            <Form.Description class="text-xs text-muted-foreground"
              >The title of your ticket</Form.Description
            >
          </div>
          <Input
            {...attrs}
            bind:value={$formData.title}
            placeholder="Enter ticket title"
            class="mt-2 bg-background/50 focus:bg-background"
          />
        </Form.Control>
        <Form.FieldErrors>{$errors.title}</Form.FieldErrors>
      </Form.Field>

      <Form.Field {form} name="content">
        <Form.Control let:attrs>
          <div class="space-y-0.5">
            <Form.Label class="font-medium">Content</Form.Label>
            <Form.Description class="text-xs text-muted-foreground"
              >Provide a detailed description of the ticket</Form.Description
            >
          </div>
          <Textarea
            {...attrs}
            bind:value={$formData.content}
            placeholder="Describe the ticket..."
            rows={4}
            class="mt-2 bg-background/50 focus:bg-background"
          />
        </Form.Control>
        <Form.FieldErrors>{$errors.content}</Form.FieldErrors>
      </Form.Field>

      <Form.Field {form} name="status">
        <Form.Control let:attrs>
          <div class="space-y-0.5">
            <Form.Label class="font-medium">Status</Form.Label>
            <Form.Description class="text-xs text-muted-foreground"
              >Current status of the ticket</Form.Description
            >
          </div>
          <div class="relative">
            <select
              {...attrs}
              bind:value={$formData.status}
              class="mt-2 w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Select a status</option>
              {#each Object.values(TicketStatus) as status}
                <option value={status}>{formatStatus(status)}</option>
              {/each}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 mt-2 flex items-center px-4">
              <svg class="h-4 w-4 text-muted-foreground/70" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </Form.Control>
        <Form.FieldErrors>{$errors.status}</Form.FieldErrors>
      </Form.Field>

      <div class="flex gap-4 pt-2">
        <a href="/tickets/{ticketId}" class="flex-1">
          <Button
            type="button"
            variant="secondary"
            class="w-full bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/40"
            >Cancel</Button
          >
        </a>
        <Button type="submit" disabled={$submitting} class="flex-1 bg-primary hover:bg-primary/90">
          {$submitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
