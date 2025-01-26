import { LucideCheckCircle, LucideCircleDashed, LucideFileText } from 'lucide-svelte';

export const TICKET_ICONS = {
	DONE: LucideCheckCircle,
	IN_PROGRESS: LucideCircleDashed,
	OPEN: LucideFileText
} as const;

export const getStatusColor = (status: string) => {
	switch (status) {
		case 'DONE':
			return 'bg-green-500/20 text-green-400';
		case 'IN_PROGRESS':
			return 'bg-blue-500/20 text-blue-400';
		case 'OPEN':
			return 'bg-yellow-500/20 text-yellow-400';
		default:
			return 'bg-gray-500/20 text-gray-400';
	}
};
