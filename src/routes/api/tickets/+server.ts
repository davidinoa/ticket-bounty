import { json } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { ticketFormSchema } from '$features/tickets/schema';
import { dbPromise } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
import type { RequestEvent } from './$types';

export async function GET({ url }: RequestEvent) {
  try {
    const { db } = await dbPromise;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const result = await db.select().from(tickets).limit(limit).orderBy(desc(tickets.updatedAt));
    return json(result);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tickets' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }: RequestEvent) {
  try {
    const formData = await request.json();
    const validation = ticketFormSchema.safeParse(formData);

    if (!validation.success) {
      return json({ errors: validation.error.flatten() }, { status: 400 });
    }

    const { db } = await dbPromise;
    const [newTicket] = await db.insert(tickets).values(validation.data).returning();
    return json({ success: true, ticket: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}
