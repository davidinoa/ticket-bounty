import { DEFAULT_PAGE_SIZE } from '$features/tickets/constants';
import { ticketKeys } from '$features/tickets/query-keys';
import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ticketKeys.list({ limit: DEFAULT_PAGE_SIZE }),
    queryFn: () => api(fetch).getTickets(DEFAULT_PAGE_SIZE)
  });
};
