<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Component } from 'svelte';
  import { LucideAlertCircle } from 'lucide-svelte';
  import type { LucideIcon } from '$lib/types/lucide';
  import { Button } from '$lib/components/ui/button';

  export let error: Error | null = null;
  export let reset: (() => void) | undefined;
  export let message = 'Something went wrong';
  export let icon: LucideIcon = LucideAlertCircle;
</script>

{#if error}
  {@const Icon = icon}
  <div transition:fade class="flex w-full flex-1 items-center justify-center p-8">
    <div class="space-y-4 text-center">
      <Icon class="mx-auto size-12 text-red-500" />
      <h3 class="text-xl font-medium text-red-600">Oops! Something went wrong</h3>
      <p class="text-sm text-muted-foreground">{message}</p>

      {#if reset}
        <div class="pt-4">
          <Button onclick={reset} variant="outline">Try Again</Button>
        </div>
      {:else}
        <p class="pt-2 text-sm text-muted-foreground">Refresh the page or try again later</p>
      {/if}
    </div>
  </div>
{:else}
  <slot />
{/if}
