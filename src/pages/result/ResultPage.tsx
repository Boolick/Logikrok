import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, House, ArrowCounterClockwise, Sparkle, Medal } from '@phosphor-icons/react';
import { ProgressRing } from '../../shared/ui/ProgressRing';
import { MathDoodles } from '../../shared/ui/doodles';
import { useTranslation } from 'react-i18next';

interface ResultLocationState {
  correct: number;
  total: number;
  categoryId: string;
  leveledUp?: boolean;
  newLevel?: number;
  newlyUnlockedAwards?: string[];
}

export const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const state = location.state as ResultLocationState | null;

  if (!state) {
    navigate('/');
    return null;
  }

  const { correct, total, categoryId, leveledUp, newLevel, newlyUnlockedAwards = [] } = state;
  const percentage = (correct / total) * 100;
  const isPerfect = correct === total;

  return (
    <div className="relative bg-peach-paper text-ink min-h-screen flex flex-col items-center justify-center p-5">
      <MathDoodles />

      <div className="relative z-10 w-full max-w-md bg-snow border-2 border-ink p-8 rounded-[47px] flex flex-col items-center text-center">
        {isPerfect ? (
          <div className="w-28 h-28 bg-sunbeam-yellow text-[#000000] border-2 border-ink rounded-full flex items-center justify-center mb-6">
            <Trophy className="w-14 h-14" weight="fill" />
          </div>
        ) : (
          <div className="mb-6">
            <ProgressRing progress={percentage} size={124} strokeWidth={14} />
          </div>
        )}

        {leveledUp && typeof newLevel === 'number' && (
          <div className="bg-lime-zest text-[#000000] border-2 border-ink rounded-[47px] px-4 py-1.5 mb-3 flex items-center gap-1.5 font-body font-extrabold text-xs sm:text-sm uppercase tracking-wide">
            <Sparkle className="w-4 h-4 shrink-0" weight="fill" />
            <span>{t('result.levelUp', { level: newLevel })}</span>
          </div>
        )}

        {newlyUnlockedAwards.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {newlyUnlockedAwards.map((awardId) => (
              <div
                key={awardId}
                className="bg-sunbeam-yellow text-[#000000] border-2 border-ink rounded-[47px] px-3.5 py-1 flex items-center gap-1.5 font-body font-extrabold text-xs"
              >
                <Medal className="w-4 h-4 shrink-0" weight="fill" />
                <span>{t(`awards.${awardId}.title`)}</span>
              </div>
            ))}
          </div>
        )}

        <h1 className="font-headline text-[34px] sm:text-[42px] leading-[1.09] text-ink mb-3">
          {isPerfect ? t('result.perfectScore') : t('result.goodJob')}
        </h1>

        <p className="font-body font-bold text-ink/85 text-base sm:text-lg mb-8">
          {t('result.stats', { correct, total })}
        </p>

        <div className="w-full flex flex-col gap-3.5">
          <button
            onClick={() => navigate(`/game/${categoryId}`, { replace: true })}
            className="w-full bg-ember-orange text-[#000000] border-2 border-ink min-h-[56px] rounded-[47px] font-body font-extrabold text-xl hover:bg-sunbeam-yellow active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <ArrowCounterClockwise className="w-6 h-6" weight="bold" />
            <span>{t('result.playAgain')}</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-snow text-ink border-2 border-ink min-h-[56px] rounded-[47px] font-body font-extrabold text-xl hover:bg-mint-wash hover:text-[#000000] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <House className="w-6 h-6" weight="bold" />
            <span>{t('result.backToHome')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
