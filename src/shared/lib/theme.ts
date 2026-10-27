/**
 * Theme management utilities.
 * Uses `class` strategy on <html> for Tailwind dark mode.
 * Persists preference to localStorage.
 */

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'math-sanctuary-theme';

/** Resolve system preference */
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/** Read stored preference, default to 'light' */
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'light';
}

/** Resolve the active visual theme */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme;
}

/** Apply theme class to document */
export function applyTheme(theme: Theme): 'light' | 'dark' {
  const resolved = resolveTheme(theme);
  const root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(resolved);

  // Also set color-scheme for native elements (scrollbars, inputs)
  root.style.colorScheme = resolved;

  return resolved;
}

/** Persist theme preference */
export function storeTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
}
