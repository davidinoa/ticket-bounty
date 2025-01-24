<script lang="ts">
	import { paths } from '../path';
</script>

<div class="mx-auto max-w-4xl">
	<h1 class="mb-6 text-3xl font-bold">Ticket Bounty</h1>
	<p class="mb-8 text-gray-300">
		Welcome to the Ticket Bounty platform! Here, you can submit tickets and earn bounties for
		solving them.
	</p>
	<a
		href={paths.tickets.list()}
		class="inline-block rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
		>View Tickets</a
	>
</div>
