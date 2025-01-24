<script lang="ts">
	import { tickets } from '$lib/stores/tickets';
	import { paths } from '../../path';
</script>

<div class="mt-4 p-4">
	<a href={paths.home()} class="text-blue-400 underline hover:text-blue-300">Home</a>
</div>

<div class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-3xl font-bold">Tickets</h1>

	<div class="space-y-4">
		{#each $tickets as ticket}
			<a
				href={paths.tickets.detail(ticket.id)}
				class="block rounded-lg bg-gray-800 p-6 transition-transform hover:scale-[1.02]"
			>
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold">{ticket.title}</h2>
					<span class="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
						{ticket.status}
					</span>
				</div>
				<p class="mt-2 text-gray-400">{ticket.content}</p>
			</a>
		{/each}
	</div>
</div>
