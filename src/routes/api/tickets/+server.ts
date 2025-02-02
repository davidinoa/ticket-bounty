import { json } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { dbPromise } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
import { TicketStatus } from '$lib/types';
import type { RequestEvent } from './$types';

export async function GET({ url }: RequestEvent) {
  try {
    const { db } = await dbPromise;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const result = await db.select().from(tickets).limit(limit).orderBy(desc(tickets.createdAt));
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
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();
    const status = formData.get('status')?.toString() as TicketStatus;

    if (!title || !content || !status) {
      return json({ error: 'Missing required fields' }, { status: 400 });
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

    return json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}
