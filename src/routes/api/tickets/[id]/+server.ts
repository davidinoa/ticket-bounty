import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const result = await db.select().from(tickets).where(eq(tickets.id, params.id));

    if (result.length === 0) {
      return new Response(JSON.stringify({ error: 'Ticket not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return json(result[0]);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch ticket' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
