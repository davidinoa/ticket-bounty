import { ticketKeys } from '@features/tickets/query-keys';
import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent, fetch }) => {
  const { queryClient } = await parent();

  try {
    await queryClient.prefetchQuery({
      queryKey: ticketKeys.detail(params.ticketId),
      queryFn: () => api(fetch).getTicketById(params.ticketId)
    });

    return { ticketId: params.ticketId };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load ticket');
  }
};
