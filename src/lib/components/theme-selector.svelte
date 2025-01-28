<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  type Theme = 'dark' | 'light' | 'system';
  let isHydrated = $state(false);

  const themes = [
    {
      id: 'light',
      name: 'Light'
    },
    {
      id: 'dark',
      name: 'Dark'
    },
    {
      id: 'system',
      name: 'System'
    }
  ] as const;

  $effect(() => {
    theme.initialize();
    isHydrated = true;
  });

  function handleThemeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newTheme = select.value as Theme;
    theme.setTheme(newTheme);
  }
</script>

<div class="relative">
  <select
    value={$theme}
    onchange={handleThemeChange}
    class="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {!isHydrated
      ? 'invisible'
      : ''}"
  >
    {#each themes as themeOption}
      <option value={themeOption.id}>{themeOption.name}</option>
    {/each}
  </select>
</div>
