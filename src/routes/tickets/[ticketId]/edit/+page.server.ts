import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ticketFormSchema } from '$features/tickets/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { ticketId } = params;

  try {
    const response = await fetch(`/api/tickets/${ticketId}`);
    if (!response.ok) {
      throw error(404, 'Ticket not found');
    }
    const result = await response.json();
    if (!result.success || !result.data) {
      throw error(404, 'Ticket not found');
    }
    const form = await superValidate(result.data, zod(ticketFormSchema));
    return { form, ticketId };
  } catch {
    throw error(404, 'Ticket not found');
  }
};

export const actions: Actions = {
  default: async ({ request, fetch, params }) => {
    const form = await superValidate(request, zod(ticketFormSchema));
    const { ticketId } = params;

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.data)
      });

      if (!response.ok) {
        return fail(response.status, { form, success: false });
      }

      const result = await response.json();
      if (!result.success) {
        return fail(500, { form, success: false });
      }

      throw redirect(303, `/tickets/${ticketId}`);
    } catch (e) {
      if (e instanceof Response) throw e;
      return fail(500, { form, success: false });
    }
  }
};
