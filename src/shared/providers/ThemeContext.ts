import { createContext, useContext } from 'react';
import { type Theme } from '../lib/theme';

export interface ThemeContextValue {
  /** Current user preference: 'light' | 'dark' | 'system' */
  theme: Theme;
  /** Currently active visual theme */
  resolvedTheme: 'light' | 'dark';
  /** Update theme preference */
  setTheme: (theme: Theme) => void;
  /** Quick toggle between light and dark */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook to access the theme state and setter from any component.
 * Must be used within a <ThemeProvider>.
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
};
