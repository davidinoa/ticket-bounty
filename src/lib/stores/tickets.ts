import { writable } from 'svelte/store';
import { initialTickets } from '../../data';

export type Ticket = {
	id: string;
	title: string;
	content: string;
	status: 'DONE' | 'IN_PROGRESS';
};

export const tickets = writable<Ticket[]>(initialTickets);

export const getTicketById = (id: string): Ticket | undefined => {
	return initialTickets.find((ticket) => ticket.id === id);
};
