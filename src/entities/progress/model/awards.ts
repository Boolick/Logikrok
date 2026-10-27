import { AwardDefinition, Progress } from './types';
import { DAILY_GOAL_TARGET } from '../../../shared/config/constants';

export const AWARD_DEFINITIONS: AwardDefinition[] = [
  {
    id: 'first-steps',
    icon: 'star',
    cardBgClass: 'bg-sunbeam-yellow',
    target: 5,
    getCurrent: (p: Progress) => Math.min(5, p.totalSolved),
  },
  {
    id: 'daily-champion',
    icon: 'lightning',
    cardBgClass: 'bg-mint-wash',
    target: DAILY_GOAL_TARGET,
    getCurrent: (p: Progress) => Math.min(DAILY_GOAL_TARGET, p.dailySolved),
  },
  {
    id: 'sniper',
    icon: 'target',
    cardBgClass: 'bg-ember-orange',
    target: 1,
    getCurrent: (p: Progress) => Math.min(1, p.perfectRounds),
  },
  {
    id: 'streak-3',
    icon: 'fire',
    cardBgClass: 'bg-lilac-tint',
    target: 3,
    getCurrent: (p: Progress) => Math.min(3, p.streakDays),
  },
  {
    id: 'visual-explorer',
    icon: 'compass',
    cardBgClass: 'bg-powder-blue',
    target: 10,
    getCurrent: (p: Progress) => {
      const frac = p.categoryStats?.fractions?.correct ?? 0;
      const geo = p.categoryStats?.geometry?.correct ?? 0;
      return Math.min(10, frac + geo);
    },
  },
  {
    id: 'math-wizard',
    icon: 'trophy',
    cardBgClass: 'bg-lime-zest',
    target: 500,
    getCurrent: (p: Progress) => Math.min(500, p.xp),
  },
];
