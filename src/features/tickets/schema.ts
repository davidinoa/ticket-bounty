import { z } from 'zod';
import { TicketStatus } from '$lib/types';

export const ticketFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(1, 'Content is required'),
  status: z.nativeEnum(TicketStatus)
});

export type TicketFormSchema = typeof ticketFormSchema;
