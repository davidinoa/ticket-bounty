import { writable } from 'svelte/store';

export type Ticket = {
	id: string;
	title: string;
	description: string;
	bountyAmount: number;
	status: 'open' | 'in_progress' | 'completed';
	createdAt: Date;
};

// Mock data
const mockTickets: Ticket[] = [
	{
		id: '1',
		title: 'Fix Navigation Bug',
		description:
			'The dropdown menu in the navigation bar is not working correctly on mobile devices.',
		bountyAmount: 500,
		status: 'open',
		createdAt: new Date('2024-01-15')
	},
	{
		id: '2',
		title: 'Implement Dark Mode',
		description: 'Add a dark mode toggle and implement dark mode styles across the application.',
		bountyAmount: 750,
		status: 'in_progress',
		createdAt: new Date('2024-01-20')
	},
	{
		id: '3',
		title: 'Performance Optimization',
		description: 'Improve page load times by optimizing image loading and reducing bundle size.',
		bountyAmount: 1000,
		status: 'completed',
		createdAt: new Date('2024-01-10')
	}
];

export const tickets = writable<Ticket[]>(mockTickets);

export const getTicketById = (id: string): Ticket | undefined => {
	return mockTickets.find((ticket) => ticket.id === id);
};
