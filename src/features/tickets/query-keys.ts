/**
 * Query keys for ticket-related queries following @Effective React Query Keys pattern
 * @see https://tkdodo.eu/blog/effective-react-query-keys
 */

export const ticketKeys = {
  all: ['tickets'] as const,
  lists: () => [...ticketKeys.all, 'list'] as const,
  list: (filters: { limit?: number } = {}) => [...ticketKeys.lists(), { ...filters }] as const,
  details: () => [...ticketKeys.all, 'detail'] as const,
  detail: (id: string) => [...ticketKeys.details(), id] as const
} as const;

// Example usage:
// ticketKeys.all => ['tickets']
// ticketKeys.lists() => ['tickets', 'list']
// ticketKeys.list({ limit: 10 }) => ['tickets', 'list', { limit: 10 }]
// ticketKeys.details() => ['tickets', 'detail']
// ticketKeys.detail('123') => ['tickets', 'detail', '123']
