import { get, writable } from 'svelte/store';

type Theme = 'dark' | 'light' | 'system';

const THEME_STORAGE_KEY = 'app-theme';
const VALID_THEMES = new Set<Theme>(['dark', 'light', 'system']);

function createThemeStore() {
  function getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'system';
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return VALID_THEMES.has(storedTheme as Theme) ? (storedTheme as Theme) : 'system';
  }

  function applyTheme(theme: Theme) {
    if (typeof window === 'undefined') return;
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }

  const initialTheme = getStoredTheme();
  const { subscribe, set } = writable<Theme>(initialTheme);

  const isInBrowser = typeof window !== 'undefined';

  if (isInBrowser) {
    document.documentElement.style.visibility = 'hidden';
    applyTheme(initialTheme);
    requestAnimationFrame(() => {
      document.documentElement.style.visibility = '';
    });
  }

  return {
    subscribe,
    setTheme(theme: Theme) {
      if (!VALID_THEMES.has(theme)) return;
      set(theme);
      if (isInBrowser) {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        applyTheme(theme);
      }
    },
    initialize() {
      if (!isInBrowser) return;
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        const currentTheme = get(theme);
        if (currentTheme === 'system') {
          document.documentElement.classList.toggle('dark', e.matches);
        }
      });
      applyTheme(get(theme));
    }
  };
}

export const theme = createThemeStore();
