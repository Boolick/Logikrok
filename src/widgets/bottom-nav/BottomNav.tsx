import React from 'react';
import { BookOpen, Calculator, Medal, User } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../shared/lib/utils';

export type NavTab = 'learn' | 'practice' | 'awards' | 'profile';

interface BottomNavProps {
  activeTab?: NavTab;
  onChangeTab?: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'learn',
  onChangeTab,
}) => {
  const { t } = useTranslation();

  const items: { id: NavTab; label: string; icon: typeof BookOpen }[] = [
    { id: 'learn', label: t('nav.learn'), icon: BookOpen },
    { id: 'practice', label: t('nav.practice'), icon: Calculator },
    { id: 'awards', label: t('nav.awards'), icon: Medal },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <nav
        aria-label="Primary Bottom Navigation"
        className="pointer-events-auto max-w-md mx-auto bg-snow border-2 border-ink rounded-[47px] p-1.5 flex items-center justify-between gap-1"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTab?.(item.id)}
              className={cn(
                "flex-1 min-h-[52px] px-3 py-1.5 rounded-[47px] flex flex-col items-center justify-center gap-0.5 cursor-pointer",
                isActive
                  ? "bg-ember-orange text-[#000000] border-2 border-ink"
                  : "bg-transparent text-ink border-2 border-transparent hover:bg-peach-paper"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" weight={isActive ? 'fill' : 'bold'} />
              <span className="font-body text-[11px] font-extrabold tracking-tight leading-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
