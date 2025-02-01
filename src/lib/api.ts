import type { Result, Ticket, TicketResult } from './types';

export const api = (fetch = window.fetch) => ({
  getTickets: async (limit: number): Promise<Result<Ticket[]>> => {
    const response = await fetch(`/api/tickets?limit=${limit}`);
    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: 'No tickets found',
          status: 404
        };
      }
      return {
        success: false,
        error: 'Failed to fetch tickets',
        status: response.status
      };
    }
    const data = await response.json();
    return { success: true, data };
  },

  getTicketById: async (id: string): Promise<TicketResult> => {
    const response = await fetch(`/api/tickets/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: `Ticket ${id} not found`,
          status: 404
        };
      }
      return {
        success: false,
        error: `Failed to fetch ticket: ${response.statusText}`,
        status: response.status
      };
    }
    const data = await response.json();
    return { success: true, data };
  }
});
