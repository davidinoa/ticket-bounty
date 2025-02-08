import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { ticketFormSchema } from '$features/tickets/schema';
import { dbPromise } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw error(400, 'Ticket ID is required');
  }

  try {
    const { db } = await dbPromise;
    const [ticket] = await db.select().from(tickets).where(eq(tickets.id, id));

    if (!ticket) {
      return json({ error: 'Ticket not found' }, { status: 404 });
    }

    return json({ success: true, data: ticket });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return json({ error: 'Failed to fetch ticket' }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ request, params }) => {
  const { id } = params;
  if (!id) throw error(400, 'Ticket ID is required');

  try {
    const formData = await request.json();
    const validation = ticketFormSchema.safeParse(formData);

    if (!validation.success) {
      return json({ errors: validation.error.flatten() }, { status: 400 });
    }

    const { db } = await dbPromise;
    const [updatedTicket] = await db
      .update(tickets)
      .set(validation.data)
      .where(eq(tickets.id, id))
      .returning();

    if (!updatedTicket) {
      return json({ error: 'Ticket not found' }, { status: 404 });
    }

    return json({ success: true, data: updatedTicket });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return json({ error: 'Failed to update ticket' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw error(400, 'Ticket ID is required');
  }

  try {
    const { db } = await dbPromise;
    const [deletedTicket] = await db.delete(tickets).where(eq(tickets.id, id)).returning();

    if (!deletedTicket) {
      return json({ error: 'Ticket not found' }, { status: 404 });
    }

    return json({ success: true, data: deletedTicket });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return json({ error: 'Failed to delete ticket' }, { status: 500 });
  }
};
