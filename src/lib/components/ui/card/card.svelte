<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';

  type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
  {...restProps}
>
  {@render children?.()}
</div>
