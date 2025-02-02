<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { ActionResult } from '@sveltejs/kit';
  import { TicketStatus } from '$lib/types';
  import type { ActionData } from '../../../routes/tickets/new/$types';

  const { form } = $props<{ form: ActionData | null }>();
  let isSubmitting = $state(false);

  const handleSubmit = () => {
    isSubmitting = true;
    return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
      isSubmitting = false;
      if (result.type === 'success') {
        const data = result.data;
        if (data?.success && data.ticket) {
          await goto(`/tickets/${data.ticket.id}`);
        } else {
          await update();
        }
      }
    };
  };
</script>

<form method="POST" class="space-y-4" use:enhance={handleSubmit}>
  {#if form?.missing}
    <div class="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-200">
      <p>All fields are required</p>
    </div>
  {/if}

  {#if form?.error}
    <div class="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-200">
      <p>Something went wrong. Please try again.</p>
    </div>
  {/if}

  <div class="space-y-2">
    <label for="title" class="block text-sm font-medium dark:text-gray-200">Title</label>
    <input
      type="text"
      id="title"
      name="title"
      required
      value={form?.data?.title ?? ''}
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
      placeholder="Enter ticket title"
    />
  </div>

  <div class="space-y-2">
    <label for="content" class="block text-sm font-medium dark:text-gray-200">Content</label>
    <textarea
      id="content"
      name="content"
      required
      rows="4"
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
      placeholder="Describe the ticket...">{form?.data?.content ?? ''}</textarea
    >
  </div>

  <div class="space-y-2">
    <label for="status" class="block text-sm font-medium dark:text-gray-200">Status</label>
    <select
      id="status"
      name="status"
      required
      class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
    >
      {#each Object.values(TicketStatus) as status}
        <option value={status} selected={form?.data?.status === status}>
          {status}
        </option>
      {/each}
    </select>
  </div>

  <button
    type="submit"
    disabled={isSubmitting}
    class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
  >
    {isSubmitting ? 'Creating...' : 'Create Ticket'}
  </button>
</form>

<style>
  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid rgb(37 99 235);
    outline-offset: 2px;
  }
</style>
