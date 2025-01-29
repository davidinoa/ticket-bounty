import { initialTickets } from '../data';
import type { Ticket } from './types';

export const api = () => ({
  getTickets: async (limit: number) => {
    await wait(500);
    return initialTickets.slice(0, limit);
  },
  getTicketById: async (id: string): Promise<Ticket> => {
    await wait(500);
    const ticket = initialTickets.find((t) => t.id === id);
    if (!ticket) {
      throw new Error(`Ticket with id ${id} not found`);
    }
    return ticket;
  }
});

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
