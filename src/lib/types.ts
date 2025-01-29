export const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export type Ticket = {
  id: string | number;
  title: string;
  content: string;
  status: TicketStatus;
};
