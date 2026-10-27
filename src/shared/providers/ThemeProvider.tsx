import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  type Theme,
  getStoredTheme,
  applyTheme,
  storeTheme,
} from '../lib/theme';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

/**
 * System-aware Theme Provider.
 * Manages 'light' | 'dark' | 'system' preferences and applies them to the document.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  const [theme, setThemeState] = useState<Theme>(
    () => getStoredTheme() || defaultTheme
  );

  // Track system preference separately to avoid setState in effect
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Derived resolved theme
  const resolved = useMemo(() => {
    return theme === 'system' ? systemTheme : theme;
  }, [theme, systemTheme]);

  // Apply theme class to <html> whenever resolved theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, resolved]);

  const setTheme = useCallback((newTheme: Theme) => {
    storeTheme(newTheme);
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = resolved === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [resolved, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: resolved, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
