<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { LucideSun, LucideMoon, LucideMonitor } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import { buttonVariants } from '$lib/components/ui/button';

  type Theme = 'dark' | 'light' | 'system';
  let isHydrated = $state(false);

  const themes = [
    {
      id: 'light',
      name: 'Light',
      icon: LucideSun
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: LucideMoon
    },
    {
      id: 'system',
      name: 'System',
      icon: LucideMonitor
    }
  ] as const;

  $effect(() => {
    theme.initialize();
    isHydrated = true;
  });

  function handleThemeChange(value: Theme) {
    theme.setTheme(value);
  }
</script>

<div class="relative">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger
      class={cn(
        buttonVariants({ variant: 'outline', size: 'icon' }),
        !isHydrated ? 'invisible' : ''
      )}
    >
      {#if $theme === 'light'}
        <LucideSun class="h-4 w-4" />
      {:else if $theme === 'dark'}
        <LucideMoon class="h-4 w-4" />
      {:else}
        <LucideMonitor class="h-4 w-4" />
      {/if}
      <span class="sr-only">Toggle theme</span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.RadioGroup
        value={$theme}
        onValueChange={(value) => handleThemeChange(value as Theme)}
      >
        {#each themes as themeOption}
          <DropdownMenu.RadioItem value={themeOption.id}>
            <themeOption.icon class="mr-2 h-4 w-4" />
            {themeOption.name}
          </DropdownMenu.RadioItem>
        {/each}
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
