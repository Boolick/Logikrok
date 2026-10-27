import React from 'react';
import { cn } from '../lib/utils';
import { Play } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface HeroCardProps {
  onStart: () => void;
  className?: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onStart, className }) => {
  const { t } = useTranslation();

  return (
    <section
      className={cn(
        "relative py-6 px-2 flex flex-col items-center justify-center text-center mb-8",
        className
      )}
    >
      <h1 className="font-headline text-[38px] sm:text-[46px] leading-[1.09] text-ink mb-3 max-w-xl text-balance">
        {t('hero.title')}
      </h1>

      <p className="font-body font-medium text-ink/90 mb-7 max-w-md text-base sm:text-lg leading-snug">
        {t('hero.subtitle')}
      </p>

      <button
        onClick={onStart}
        className="bg-snow text-ink border-2 border-ink min-h-[56px] px-9 py-3.5 rounded-[47px] font-body font-extrabold text-xl hover:bg-ember-orange hover:text-[#000000] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
      >
        <span>{t('hero.button')}</span>
        <span className="w-8 h-8 rounded-full bg-sunbeam-yellow border-2 border-ink flex items-center justify-center text-[#000000]">
          <Play className="w-4 h-4 ml-0.5" weight="fill" />
        </span>
      </button>
    </section>
  );
};
