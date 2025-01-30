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
  },
  {
    id: '4',
    title: 'Optimize Database Queries',
    content:
      'Some API endpoints are experiencing slow response times due to unoptimized SQL queries',
    status: TicketStatus.OPEN
  },
  {
    id: '5',
    title: 'Implement User Authentication',
    content: 'Add OAuth2 authentication flow with Google and GitHub providers',
    status: TicketStatus.IN_PROGRESS
  },
  {
    id: '6',
    title: 'Mobile Responsive Layout Fixes',
    content: 'Several components break on mobile viewports below 320px width',
    status: TicketStatus.OPEN
  },
  {
    id: '7',
    title: 'Email Notification System',
    content: 'Create system for sending transactional emails for ticket updates',
    status: TicketStatus.OPEN
  }
];
