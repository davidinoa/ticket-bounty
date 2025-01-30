import { json } from '@sveltejs/kit';
import { initialTickets } from '../../../data';

export async function GET({ url }: { url: URL }) {
  const limit = Number(url.searchParams.get('limit')) || 10;
  // Return mock data from initialTickets
  return json(initialTickets.slice(0, limit));
}
