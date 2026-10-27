import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameSession } from '../../features/game-session';
import { GameCard } from '../../widgets/game-card';
import { MathDoodles } from '../../shared/ui/doodles';
import { X } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export const GamePage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { session, selectOption, checkAnswer, nextQuestion } = useGameSession(categoryId);
  const { t } = useTranslation();

  useEffect(() => {
    if (session?.isFinished) {
      navigate('/result', {
        state: {
          correct: session.correctAnswers,
          total: session.cards.length,
          categoryId,
          leveledUp: session.leveledUp,
          newLevel: session.newLevel,
          newlyUnlockedAwards: session.newlyUnlockedAwards,
        },
      });
    }
  }, [
    session?.isFinished,
    navigate,
    session?.correctAnswers,
    session?.cards.length,
    categoryId,
    session?.leveledUp,
    session?.newLevel,
    session?.newlyUnlockedAwards,
  ]);

  if (!session || session.cards.length === 0) {
    return (
      <div className="bg-peach-paper text-ink flex items-center justify-center min-h-screen font-headline text-2xl">
        {t('game.loading')}
      </div>
    );
  }

  const currentCard = session.cards[session.currentIndex];
  const progressPercentage = ((session.currentIndex + 1) / session.cards.length) * 100;

  return (
    <div className="relative bg-peach-paper text-ink min-h-screen flex flex-col">
      <MathDoodles />

      {/* Top Bar */}
      <header className="relative z-10 w-full px-5 pt-5 pb-2 flex flex-col gap-2.5 max-w-2xl mx-auto">
        <div className="flex items-center gap-3.5 w-full">
          <button
            onClick={() => navigate('/')}
            aria-label="Close quiz"
            className="min-w-[48px] min-h-[48px] w-12 h-12 flex items-center justify-center rounded-[47px] bg-snow border-2 border-ink text-ink hover:bg-ember-orange hover:text-[#000000] active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" weight="bold" />
          </button>

          {/* Outlined Progress Bar */}
          <div className="flex-1 h-5 bg-snow border-2 border-ink rounded-[47px] overflow-hidden p-0.5">
            <div
              className="h-full bg-ember-orange rounded-[47px] transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Counter Pill */}
          <div className="bg-snow border-2 border-ink px-3.5 py-1.5 rounded-[47px] font-headline text-sm text-ink min-w-[58px] text-center tabular-nums">
            {session.currentIndex + 1}/{session.cards.length}
          </div>
        </div>

        {/* Category & Current Level Indicator */}
        {categoryId && (
          <div className="flex items-center justify-center gap-2 font-body font-extrabold text-xs uppercase tracking-wider text-ink/80">
            <span>{t(`categories.${categoryId}`)}</span>
            <span aria-hidden="true">·</span>
            <span>{t('topic.level', { level: session.level })}</span>
          </div>
        )}
      </header>

      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-5 pt-4 pb-6 flex flex-col">
        <GameCard
          card={currentCard}
          currentStepIndex={session.currentStepIndex}
          selectedOption={session.selectedOption}
          isAnswerChecked={session.isAnswerChecked}
          onSelectOption={selectOption}
          onCheckAnswer={checkAnswer}
          onNextQuestion={nextQuestion}
        />
      </main>
    </div>
  );
};
