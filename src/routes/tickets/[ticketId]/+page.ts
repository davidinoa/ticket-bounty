import type { PageLoad } from './$types';

export const load = (({ params }) => {
	return {
		id: params.ticketId
	};
}) satisfies PageLoad;
