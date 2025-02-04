import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ticketFormSchema } from '../../../features/tickets/schema';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  await parent();
  const form = await superValidate(zod(ticketFormSchema));
  return { form };
}) satisfies PageLoad;
