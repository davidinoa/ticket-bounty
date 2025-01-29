<script lang="ts">
  import { paths } from '../path';
  import Heading from '$lib/components/heading.svelte';
</script>

<div class="mx-auto grid max-w-2xl gap-8">
  <Heading
    title="Homepage"
    description="Welcome to the Ticket Bounty platform! Here, you can submit tickets and earn bounties for solving them."
  />
  <div>
    <a
      href={paths.tickets.list()}
      class="inline-block rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
      >View Tickets</a
    >
  </div>
</div>
