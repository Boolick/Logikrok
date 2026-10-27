import React from 'react';
import { cn } from '../lib/utils';
import { ProgressRing } from './ProgressRing';
import { DAILY_GOAL_TARGET } from '../config/constants';
import { useTranslation } from 'react-i18next';

interface DailyGoalCardProps {
  solved: number;
  className?: string;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ solved, className }) => {
  const { t } = useTranslation();
  const progress = Math.min(100, (solved / DAILY_GOAL_TARGET) * 100);
  const remaining = Math.max(0, DAILY_GOAL_TARGET - solved);
  const isComplete = remaining === 0;

  return (
    <section className={cn("mb-10", className)}>
      <div className="bg-snow border-2 border-ink p-6 rounded-[47px] flex items-center gap-5">
        <ProgressRing progress={progress} size={88} strokeWidth={12} />
        <div className="flex-1 min-w-0">
          <div className="inline-block bg-sunbeam-yellow text-[#000000] border-2 border-ink px-3 py-0.5 rounded-[10px] font-body font-extrabold text-xs uppercase tracking-wider mb-2">
            {t('dailyGoal.title')}
          </div>
          <h4 className="font-headline text-xl sm:text-2xl text-ink leading-tight mb-1">
            {isComplete ? t('dailyGoal.reached') : t('dailyGoal.almostThere')}
          </h4>
          <p className="font-body font-medium text-ink/85 text-sm sm:text-base leading-snug">
            {isComplete
              ? t('dailyGoal.completedDesc')
              : t('dailyGoal.remainingDesc', { count: remaining })}
          </p>
        </div>
      </div>
    </section>
  );
};
