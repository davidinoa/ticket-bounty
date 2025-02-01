import { json } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { dbPromise } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';
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
