import React from 'react';
import { Check, X } from '@phosphor-icons/react';
import { CardOption } from '../../entities/card';
import { cn } from '../lib/utils';

interface OptionButtonProps {
  value: CardOption;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  value,
  isSelected,
  isCorrect,
  isWrong,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full min-h-[64px] rounded-[47px] border-2 border-ink font-headline text-[26px] sm:text-[32px] leading-none tabular-nums",
        "flex items-center justify-center gap-2 px-5 py-4",
        !isSelected &&
          !isCorrect &&
          !isWrong &&
          "bg-snow text-ink hover:bg-sunbeam-yellow hover:text-[#000000] active:scale-95 cursor-pointer",
        isSelected &&
          !isCorrect &&
          !isWrong &&
          "bg-powder-blue text-[#000000] scale-[0.99]",
        isCorrect && "bg-lime-zest text-[#000000]",
        isWrong && "bg-ember-orange text-[#000000]",
        disabled &&
          !isCorrect &&
          !isWrong &&
          !isSelected &&
          "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <span>{value}</span>
      {isCorrect && <Check className="w-6 h-6 shrink-0" weight="bold" />}
      {isWrong && <X className="w-6 h-6 shrink-0" weight="bold" />}
    </button>
  );
};
