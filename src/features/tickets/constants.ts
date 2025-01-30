import { LucideCheckCircle, LucideCircleDashed, LucideFileText } from 'lucide-svelte';

export const TICKET_ICONS = {
  DONE: LucideCheckCircle,
  IN_PROGRESS: LucideCircleDashed,
  OPEN: LucideFileText
} as const;

export const DEFAULT_PAGE_SIZE = 10;
