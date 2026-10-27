import React from 'react';
import { useTranslation } from 'react-i18next';
import { Translate } from '@phosphor-icons/react';
import { cn } from '../lib/utils';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isRu = currentLang.startsWith('ru');

  const toggleLanguage = () => {
    const nextLang = isRu ? 'en' : 'ru';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "min-w-[44px] min-h-[44px] h-11 px-3 flex items-center justify-center gap-1 rounded-[47px]",
        "bg-snow text-ink border-2 border-ink font-body font-extrabold text-xs uppercase",
        "hover:bg-powder-blue hover:text-[#000000] active:scale-95",
        className
      )}
      aria-label="Toggle language"
      title={isRu ? 'Switch to English' : 'Переключить на русский'}
    >
      <Translate className="w-4 h-4 shrink-0" weight="bold" />
      <span>{isRu ? 'RU' : 'EN'}</span>
    </button>
  );
};
