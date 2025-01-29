import { TicketStatus } from '$lib/types';

export const initialTickets = [
  {
    id: '1',
    title: 'Fix Navigation Bug',
    content: 'The back button is not working correctly on mobile devices',
    status: TicketStatus.DONE
  },
  {
    id: '2',
    title: 'Add Dark Mode Support',
    content: 'Implement system-wide dark mode toggle with proper color schemes',
    status: TicketStatus.IN_PROGRESS
  },
  {
    id: '3',
    title: 'Improve Form Validation',
    content: 'Add better error messages and real-time validation for all forms',
    status: TicketStatus.OPEN
  }
];
