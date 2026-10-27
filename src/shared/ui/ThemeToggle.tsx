import React from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../providers/ThemeContext';
import { cn } from '../lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-[47px]",
        "bg-snow text-ink border-2 border-ink",
        "hover:bg-lilac-tint hover:text-[#000000] active:scale-95",
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun
        weight="bold"
        className={cn(
          "w-5 h-5 absolute transition-all duration-150",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
      />
      <Moon
        weight="bold"
        className={cn(
          "w-5 h-5 absolute transition-all duration-150",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )}
      />
    </button>
  );
};
