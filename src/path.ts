export const paths = {
	home: () => '/',
	tickets: {
		list: () => '/tickets',
		detail: (ticketId: string) => `/tickets/${ticketId}`
	}
} as const;
