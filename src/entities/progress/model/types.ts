export interface CategoryStat {
  solved: number;
  correct: number;
}

export interface Progress {
  xp: number;
  dailySolved: number;
  totalSolved: number;
  perfectRounds: number;
  streakDays: number;
  lastPlayedDate: string;
  /** Selected school grade (1 to 5) that sets the baseline difficulty */
  selectedGrade: number;
  categoryLevels: Record<string, number>;
  categoryStats: Record<string, CategoryStat>;
  unlockedAwards: string[];
}

export interface AwardDefinition {
  id: string;
  icon: 'star' | 'lightning' | 'target' | 'fire' | 'compass' | 'trophy';
  cardBgClass: string;
  target: number;
  getCurrent: (progress: Progress) => number;
}
