<script lang="ts">
  type SpinnerSize = 'default' | 'sm' | 'lg';

  let { size = 'default', class: className = '' } = $props<{
    size?: SpinnerSize;
    class?: string;
  }>();

  const sizeClasses: Record<SpinnerSize, string> = {
    default: 'size-6',
    sm: 'size-4',
    lg: 'size-8'
  };

  const sizeClass = $derived(sizeClasses[size as SpinnerSize]);
</script>

<div class="inline-flex {sizeClass} {className}" role="status" aria-label="Loading">
  <svg
    class="animate-spin text-muted-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
</div>
