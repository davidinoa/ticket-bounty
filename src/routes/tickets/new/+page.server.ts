import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ticketFormSchema } from '../../../features/tickets/schema';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  const form = await superValidate(zod(ticketFormSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(ticketFormSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const response = await event.fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.data)
      });

      if (!response.ok) {
        const error = await response.json();
        return fail(response.status, { form, error: error.message });
      }

      const { ticket } = await response.json();
      return { form, success: true, ticket };
    } catch (error) {
      console.error('Error creating ticket:', error);
      return fail(500, { form, error: 'Failed to create ticket' });
    }
  }
} satisfies Actions;
