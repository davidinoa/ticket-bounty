export const initialTickets = [
	{
		id: '1',
		title: 'Fix Navigation Bug',
		content: 'The back button is not working correctly on mobile devices',
		status: 'DONE' as const
	},
	{
		id: '2',
		title: 'Add Dark Mode Support',
		content: 'Implement system-wide dark mode toggle with proper color schemes',
		status: 'IN_PROGRESS' as const
	},
	{
		id: '3',
		title: 'Improve Form Validation',
		content: 'Add better error messages and real-time validation for all forms',
		status: 'OPEN' as const
	}
];
