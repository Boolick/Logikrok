import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CardExplanation, CardOption } from '../../entities/card';
import { Lightbulb, X, ArrowRight } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface ExplanationDrawerProps {
  isOpen: boolean;
  explanation: CardExplanation;
  correctAnswer: CardOption;
  hasNextStep: boolean;
  onClose: () => void;
  onContinue: () => void;
}

/**
 * Smooth Instagram-style bottom sheet drawer for step-by-step error explanation.
 * Opens ONLY when user taps the Lightbulb button, slides up smoothly from the bottom,
 * caps height at 75dvh, and provides smooth mouse/touch scrolling for long explanations.
 */
export const ExplanationDrawer: React.FC<ExplanationDrawerProps> = ({
  isOpen,
  explanation,
  correctAnswer,
  hasNextStep,
  onClose,
  onContinue,
}) => {
  const { t, i18n } = useTranslation();
  const isRu = (i18n.language || 'en').startsWith('ru');

  // Lock background page scroll while the bottom sheet is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="explanation-drawer-title"
        >
          {/* Smooth Fade Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 bg-[#000000]/50"
            onClick={onClose}
          />

          {/* Smooth Slide-Up Bottom Sheet (capped at 75dvh, never full-screen) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 280,
              mass: 0.9,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.35 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className="relative z-10 w-full max-w-lg max-h-[75dvh] bg-snow text-ink border-t-2 border-x-2 border-ink rounded-t-[40px] px-5 sm:px-6 pt-3 pb-6 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-ink/30 rounded-full mx-auto mb-3 shrink-0 cursor-grab active:cursor-grabbing" />

            {/* Fixed Sheet Header */}
            <div className="flex items-center justify-between gap-3 pb-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full bg-sunbeam-yellow text-[#000000] border-2 border-ink flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6" weight="fill" />
                </div>
                <div className="min-w-0">
                  <h3
                    id="explanation-drawer-title"
                    className="font-headline text-xl sm:text-2xl text-ink leading-tight truncate"
                  >
                    {t('game.explanationTitle')}
                  </h3>
                  <p className="font-body font-bold text-xs sm:text-sm text-ink/80">
                    {t('game.correctAnswerIs', { answer: String(correctAnswer) })}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close explanation"
                className="w-10 h-10 rounded-full bg-peach-paper text-ink border-2 border-ink flex items-center justify-center hover:bg-ember-orange hover:text-[#000000] active:scale-95 shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>
            </div>

            {/* Scrollable Body (Touch & Mouse Wheel Scrollable) */}
            <div
              onPointerDownCapture={(e) => e.stopPropagation()}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y pr-1 py-1 flex flex-col gap-3.5"
            >
              {/* Text Explanation */}
              <div className="bg-peach-paper border-2 border-ink rounded-[24px] p-4">
                <p className="font-body font-bold text-sm sm:text-base text-ink leading-relaxed">
                  {isRu ? explanation.text.ru : explanation.text.en}
                </p>
              </div>

              {/* Numeric Breakdown ("Пример цифрами") */}
              <div className="bg-mint-wash text-[#000000] border-2 border-ink rounded-[24px] px-4 py-4 text-center overflow-x-auto">
                <div className="font-body font-extrabold text-[11px] uppercase tracking-wider mb-1.5 opacity-80">
                  {t('game.formulaLabel')}
                </div>
                <div className="font-headline text-xl sm:text-[26px] leading-snug tabular-nums break-words">
                  {explanation.formula}
                </div>
              </div>
            </div>

            {/* Fixed Bottom Action Button */}
            <div className="pt-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinue();
                }}
                className="w-full bg-lime-zest text-[#000000] border-2 border-ink min-h-[54px] rounded-[47px] font-body font-extrabold text-base sm:text-lg hover:bg-sunbeam-yellow active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {hasNextStep ? t('game.gotItNextStep') : t('game.gotItNextQuestion')}
                </span>
                <ArrowRight className="w-5 h-5" weight="bold" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
