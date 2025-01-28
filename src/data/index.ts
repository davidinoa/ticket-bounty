import type { Ticket } from '$lib/stores/tickets';

export const initialTickets: Ticket[] = [
	{
		id: '1',
		title: 'Fix Navigation Bug',
		content: 'The back button is not working correctly on mobile devices',
		status: 'OPEN'
	},
	{
		id: '2',
		title: 'Add Dark Mode Support',
		content: 'Implement system-wide dark mode toggle with proper color schemes and transitions',
		status: 'IN_PROGRESS'
	},
	{
		id: '3',
		title: 'Improve Form Validation',
		content: 'Add better error messages and real-time validation for all forms',
		status: 'OPEN'
	}
];
