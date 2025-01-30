import type { Ticket } from './types';

export const api = (fetch = window.fetch) => ({
  getTickets: async (limit: number) => {
    const response = await fetch(`/api/tickets?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    return response.json();
  },

  getTicketById: async (id: string): Promise<Ticket> => {
    const response = await fetch(`/api/tickets/${id}`);
    if (!response.ok) {
      throw new Error(`Ticket with id ${id} not found`);
    }
    return response.json();
  }
});
