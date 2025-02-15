<script lang="ts">
  import { cn } from '$lib/utils';
  import { Copy } from 'lucide-svelte';
  import { tick } from 'svelte';
  import { toast } from 'svelte-sonner';

  export let id: string;
  let copied = false;

  const formatId = (id: string) => {
    return id.slice(0, 6);
  };

  async function copyToClipboard() {
    await navigator.clipboard.writeText(id);
    copied = true;
    toast.success('Ticket ID copied to clipboard', {
      description: id,
      duration: 2000
    });
    await tick();
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div class="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-1.5">
  <span class="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">ID</span>
  <div class="flex items-center gap-2">
    <span class="font-mono text-xs text-muted-foreground/80">{formatId(id)}</span>
    <button
      on:click={copyToClipboard}
      class={cn(
        'inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-muted',
        copied && 'text-primary'
      )}
      aria-label="Copy ticket ID"
    >
      <Copy class="size-3" />
    </button>
  </div>
</div>
