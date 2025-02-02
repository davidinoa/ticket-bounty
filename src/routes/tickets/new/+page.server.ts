import { fail } from '@sveltejs/kit';
import { dbPromise } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
import type { TicketStatus } from '$lib/types';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      const title = formData.get('title')?.toString();
      const content = formData.get('content')?.toString();
      const status = formData.get('status')?.toString() as TicketStatus;

      if (!title || !content || !status) {
        return fail(400, {
          missing: true,
          data: {
            title: formData.get('title'),
            content: formData.get('content'),
            status: formData.get('status')
          }
        });
      }

      const { db } = await dbPromise;
      const [newTicket] = await db
        .insert(tickets)
        .values({
          title,
          content,
          status
        })
        .returning();

      return { success: true, ticket: newTicket };
    } catch (error) {
      console.error('Error creating ticket:', error);
      return fail(500, { error: true });
    }
  }
} satisfies Actions;
