import { json } from '@sveltejs/kit';
import { initialTickets } from '../../../../data';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const ticket = initialTickets.find((t) => t.id === params.id);

  if (!ticket) {
    return new Response(JSON.stringify({ error: 'Ticket not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return json(ticket);
};
