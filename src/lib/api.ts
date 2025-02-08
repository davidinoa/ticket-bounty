import type { TicketFormData } from '$features/tickets/schema';
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
    const result = await response.json();
    return result;
  },

  deleteTicket: async (id: string): Promise<Result<void>> => {
    const response = await fetch(`/api/tickets/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to delete ticket',
        status: response.status
      };
    }
    const result = await response.json();
    return result;
  },

  createTicket: async (ticketData: TicketFormData): Promise<TicketResult> => {
    const response = await fetch(`/api/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    });
    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message, status: response.status };
    }
    const data = await response.json();
    return data;
  },

  updateTicket: async (id: string, ticketData: TicketFormData): Promise<TicketResult> => {
    const response = await fetch(`/api/tickets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    });
    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message, status: response.status };
    }
    const data = await response.json();
    return data;
  }
});
