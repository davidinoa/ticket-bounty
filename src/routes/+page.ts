import { DEFAULT_PAGE_SIZE } from '@features/tickets/constants';
import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ['tickets', DEFAULT_PAGE_SIZE],
    queryFn: () => api().getTickets(DEFAULT_PAGE_SIZE)
  });
};
