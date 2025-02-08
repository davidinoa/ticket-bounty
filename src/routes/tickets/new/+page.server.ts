import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ticketFormSchema } from '../../../features/tickets/schema';
import { api } from '../../../lib/api';
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
      const ticketResult = await api(event.fetch).createTicket(form.data);

      if (!ticketResult.success) {
        return fail(ticketResult.status, { form, error: ticketResult.error });
      }

      return { form, success: true, ticket: ticketResult.data };
    } catch (error) {
      console.error('Error creating ticket:', error);
      return fail(500, { form, error: 'Failed to create ticket' });
    }
  }
} satisfies Actions;
