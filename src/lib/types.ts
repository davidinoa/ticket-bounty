export const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export type Ticket = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  status: TicketStatus;
  userId: string | null;
};

export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E; status: number };

export type TicketResult = Result<Ticket>;
