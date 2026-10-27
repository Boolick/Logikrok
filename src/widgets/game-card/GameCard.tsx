import React, { useState } from 'react';
import { Card, CardOption } from '../../entities/card';
import { OptionButton } from '../../shared/ui/OptionButton';
import { CardVisualView } from './CardVisualView';
import { ExplanationDrawer } from './ExplanationDrawer';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle, Check, Lightbulb } from '@phosphor-icons/react';

interface GameCardProps {
  card: Card;
  currentStepIndex?: number;
  selectedOption: CardOption | null;
  isAnswerChecked: boolean;
  onSelectOption: (option: CardOption) => void;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  card,
  currentStepIndex = 0,
  selectedOption,
  isAnswerChecked,
  onSelectOption,
  onCheckAnswer,
  onNextQuestion,
}) => {
  const { t, i18n } = useTranslation();
  const isRu = (i18n.language || 'en').startsWith('ru');
  const [openedStepKey, setOpenedStepKey] = useState<string | null>(null);

  const steps = card.steps;
  const isMultiStep = Array.isArray(steps) && steps.length > 0;
  const activeStep = isMultiStep ? steps[currentStepIndex] ?? steps[0] : null;
  const completedSteps = isMultiStep ? steps.slice(0, currentStepIndex) : [];
  const hasMoreStepsAfterCurrent = isMultiStep && currentStepIndex < steps.length - 1;

  const activeOptions = activeStep ? activeStep.options : card.options;
  const activeCorrectAnswer = activeStep ? activeStep.correctAnswer : card.correctAnswer;
  const activeExplanation = activeStep?.explanation ?? card.explanation;

  const currentStepKey = `${card.id}-step-${currentStepIndex}`;
  const isCurrentAttemptWrong =
    isAnswerChecked && selectedOption !== null && selectedOption !== activeCorrectAnswer;

  // Opens ONLY when user explicitly clicks the Lightbulb button
  const isDrawerOpen =
    Boolean(activeExplanation) &&
    isCurrentAttemptWrong &&
    openedStepKey === currentStepKey;

  const localizedPrompt = card.questionText
    ? isRu
      ? card.questionText.ru
      : card.questionText.en
    : null;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto">
      {/* Question Card: White, 2px black border, 47px pill radius */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[220px] bg-snow border-2 border-ink rounded-[47px] px-6 py-7 mb-6">
        {isMultiStep && activeStep ? (
          <div className="w-full flex flex-col gap-3.5 text-left">
            <p className="font-body font-bold text-base sm:text-[18px] leading-snug text-ink">
              {localizedPrompt ?? card.question}
            </p>

            {completedSteps.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {completedSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="bg-mint-wash text-[#000000] border-2 border-ink rounded-[10px] px-3 py-1.5 flex items-center gap-2 font-body font-extrabold text-xs sm:text-sm"
                  >
                    <Check className="w-4 h-4 shrink-0" weight="bold" />
                    <span>{isRu ? step.summary.ru : step.summary.en}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-peach-paper border-2 border-ink rounded-[24px] p-4 mt-1">
              <div className="inline-block bg-sunbeam-yellow text-[#000000] border-2 border-ink rounded-[10px] px-2.5 py-0.5 font-body font-extrabold text-xs uppercase tracking-wider mb-2">
                {t('game.stepBadge', {
                  current: currentStepIndex + 1,
                  total: steps.length,
                })}
              </div>
              <h2 className="font-body font-extrabold text-base sm:text-lg text-ink leading-snug">
                {isRu ? activeStep.prompt.ru : activeStep.prompt.en}
              </h2>
            </div>
          </div>
        ) : card.visual ? (
          <div className="w-full flex flex-col items-center text-center">
            {localizedPrompt && (
              <p className="font-body font-extrabold text-base sm:text-lg text-ink mb-2 leading-snug max-w-sm">
                {localizedPrompt}
              </p>
            )}
            <CardVisualView visual={card.visual} />
          </div>
        ) : (
          <h2 className="text-[48px] sm:text-[56px] leading-[1.1] font-headline text-ink tracking-normal text-center tabular-nums">
            {card.question}
          </h2>
        )}

        {/* Lightbulb Trigger Pill: Appears when answer is wrong so user can open the Explanation Drawer on demand */}
        {isCurrentAttemptWrong && activeExplanation && (
          <button
            type="button"
            onClick={() => setOpenedStepKey(currentStepKey)}
            className="mt-5 bg-sunbeam-yellow text-[#000000] border-2 border-ink min-h-[46px] px-5 py-2 rounded-[47px] font-body font-extrabold text-sm sm:text-base flex items-center gap-2 hover:bg-ember-orange active:scale-95 cursor-pointer"
          >
            <Lightbulb className="w-5 h-5 shrink-0" weight="fill" />
            <span>{t('game.showExplanation')}</span>
          </button>
        )}
      </div>

      {/* Options Grid 2x2 */}
      <div className="grid grid-cols-2 gap-3.5 mb-7">
        {activeOptions.map((option, index) => {
          const isSelected = selectedOption === option;
          let isCorrect = false;
          let isWrong = false;

          if (isAnswerChecked) {
            if (option === activeCorrectAnswer) {
              isCorrect = true;
            } else if (isSelected && option !== activeCorrectAnswer) {
              isWrong = true;
            }
          }

          return (
            <OptionButton
              key={`${currentStepIndex}-${index}-${String(option)}`}
              value={option}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isWrong={isWrong}
              disabled={isAnswerChecked}
              onClick={() => onSelectOption(option)}
            />
          );
        })}
      </div>

      {/* Action Pill Button */}
      <div className="mt-auto pb-6">
        {!isAnswerChecked ? (
          <button
            onClick={() => {
              setOpenedStepKey(null);
              onCheckAnswer();
            }}
            disabled={selectedOption === null}
            className="w-full bg-sunbeam-yellow text-[#000000] border-2 border-ink min-h-[58px] rounded-[47px] font-body font-extrabold text-xl hover:bg-ember-orange active:scale-95 disabled:opacity-45 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle className="w-6 h-6" weight="bold" />
            <span>{t('game.checkAnswer')}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setOpenedStepKey(null);
              onNextQuestion();
            }}
            className="w-full bg-lime-zest text-[#000000] border-2 border-ink min-h-[58px] rounded-[47px] font-body font-extrabold text-xl hover:bg-mint-wash active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {hasMoreStepsAfterCurrent ? t('game.nextStep') : t('game.nextQuestion')}
            </span>
            <ArrowRight className="w-6 h-6" weight="bold" />
          </button>
        )}
      </div>

      {/* Instagram-style Bottom Sheet for Error Explanation */}
      {activeExplanation && (
        <ExplanationDrawer
          isOpen={isDrawerOpen}
          explanation={activeExplanation}
          correctAnswer={activeCorrectAnswer}
          hasNextStep={hasMoreStepsAfterCurrent}
          onClose={() => setOpenedStepKey(null)}
          onContinue={() => {
            setOpenedStepKey(null);
            onNextQuestion();
          }}
        />
      )}
    </div>
  );
};
