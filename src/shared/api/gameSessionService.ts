import { STORAGE_KEYS } from '../config/constants';
import { AWARD_DEFINITIONS, CategoryStat, Progress } from '../../entities/progress';

const DEFAULT_CATEGORY_LEVELS: Record<string, number> = {
  addition: 1,
  subtraction: 1,
  multiplication: 1,
  division: 1,
  fractions: 1,
  geometry: 1,
  'word-problems': 1,
};

const DEFAULT_CATEGORY_STATS: Record<string, CategoryStat> = {
  addition: { solved: 0, correct: 0 },
  subtraction: { solved: 0, correct: 0 },
  multiplication: { solved: 0, correct: 0 },
  division: { solved: 0, correct: 0 },
  fractions: { solved: 0, correct: 0 },
  geometry: { solved: 0, correct: 0 },
  'word-problems': { solved: 0, correct: 0 },
};

function isYesterday(dateString: string, today: Date): boolean {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return dateString === yesterday.toDateString();
}

function evaluateAwards(progress: Progress): string[] {
  const newlyUnlocked: string[] = [];
  const existing = new Set(progress.unlockedAwards || []);

  for (const award of AWARD_DEFINITIONS) {
    if (!existing.has(award.id) && award.getCurrent(progress) >= award.target) {
      existing.add(award.id);
      newlyUnlocked.push(award.id);
    }
  }

  progress.unlockedAwards = Array.from(existing);
  return newlyUnlocked;
}

export const gameSessionService = {
  getProgress: (): Progress => {
    const now = new Date();
    const today = now.toDateString();
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);

    if (data) {
      try {
        const parsed = JSON.parse(data) as Partial<Progress>;
        const categoryLevels: Record<string, number> = {
          ...DEFAULT_CATEGORY_LEVELS,
          ...(parsed.categoryLevels || {}),
        };
        const categoryStats: Record<string, CategoryStat> = {
          ...DEFAULT_CATEGORY_STATS,
          ...(parsed.categoryStats || {}),
        };

        const isSameDay = parsed.lastPlayedDate === today;
        const wasYesterday = parsed.lastPlayedDate
          ? isYesterday(parsed.lastPlayedDate, now)
          : false;

        let streakDays = typeof parsed.streakDays === 'number' ? parsed.streakDays : 0;
        if (!isSameDay && !wasYesterday && streakDays > 0) {
          streakDays = 0;
        }

        const normalized: Progress = {
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
          dailySolved:
            isSameDay && typeof parsed.dailySolved === 'number' ? parsed.dailySolved : 0,
          totalSolved: typeof parsed.totalSolved === 'number' ? parsed.totalSolved : 0,
          perfectRounds: typeof parsed.perfectRounds === 'number' ? parsed.perfectRounds : 0,
          streakDays,
          lastPlayedDate: parsed.lastPlayedDate || today,
          selectedGrade:
            typeof parsed.selectedGrade === 'number' &&
            parsed.selectedGrade >= 1 &&
            parsed.selectedGrade <= 5
              ? parsed.selectedGrade
              : 1,
          categoryLevels,
          categoryStats,
          unlockedAwards: Array.isArray(parsed.unlockedAwards) ? parsed.unlockedAwards : [],
        };

        evaluateAwards(normalized);
        return normalized;
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }

    return {
      xp: 0,
      dailySolved: 0,
      totalSolved: 0,
      perfectRounds: 0,
      streakDays: 0,
      lastPlayedDate: today,
      selectedGrade: 1,
      categoryLevels: { ...DEFAULT_CATEGORY_LEVELS },
      categoryStats: { ...DEFAULT_CATEGORY_STATS },
      unlockedAwards: [],
    };
  },

  saveProgress: (progress: Progress): void => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },

  setSelectedGrade: (grade: number): Progress => {
    const safeGrade = Math.min(5, Math.max(1, grade));
    const progress = gameSessionService.getProgress();
    progress.selectedGrade = safeGrade;
    gameSessionService.saveProgress(progress);
    return progress;
  },

  getCategoryLevel: (categoryId: string): number => {
    const progress = gameSessionService.getProgress();
    if (categoryId === 'mixed') {
      return progress.selectedGrade;
    }
    const storedLevel =
      progress.categoryLevels[categoryId] ?? DEFAULT_CATEGORY_LEVELS[categoryId] ?? 1;
    return Math.max(storedLevel, progress.selectedGrade);
  },

  recordCardOutcome: (
    categoryId: string,
    isCorrect: boolean,
    xpEarned: number
  ): string[] => {
    const now = new Date();
    const today = now.toDateString();
    const progress = gameSessionService.getProgress();

    // Update streak on first activity of the day
    if (progress.dailySolved === 0) {
      if (progress.lastPlayedDate && isYesterday(progress.lastPlayedDate, now)) {
        progress.streakDays += 1;
      } else if (progress.streakDays === 0) {
        progress.streakDays = 1;
      } else if (progress.lastPlayedDate !== today) {
        progress.streakDays = 1;
      }
    }
    progress.lastPlayedDate = today;

    if (isCorrect) {
      progress.xp += xpEarned;
      progress.dailySolved += 1;
      progress.totalSolved += 1;
    }

    if (categoryId && categoryId !== 'mixed') {
      const currentStat = progress.categoryStats[categoryId] ?? { solved: 0, correct: 0 };
      progress.categoryStats = {
        ...progress.categoryStats,
        [categoryId]: {
          solved: currentStat.solved + 1,
          correct: isCorrect ? currentStat.correct + 1 : currentStat.correct,
        },
      };
    }

    const newlyUnlocked = evaluateAwards(progress);
    gameSessionService.saveProgress(progress);
    return newlyUnlocked;
  },

  completeRound: (
    categoryId: string,
    correct: number,
    total: number,
    accuracyThreshold: number
  ): { leveledUp: boolean; newLevel: number; newlyUnlockedAwards: string[] } => {
    const progress = gameSessionService.getProgress();
    const isPerfect = total > 0 && correct === total;

    if (isPerfect) {
      progress.perfectRounds += 1;
    }

    let leveledUp = false;
    let newLevel = gameSessionService.getCategoryLevel(categoryId);

    if (
      categoryId &&
      categoryId !== 'mixed' &&
      total > 0 &&
      correct / total >= accuracyThreshold
    ) {
      const currentEffective = Math.max(
        progress.categoryLevels[categoryId] ?? 1,
        progress.selectedGrade
      );
      newLevel = currentEffective + 1;
      progress.categoryLevels = {
        ...progress.categoryLevels,
        [categoryId]: newLevel,
      };
      leveledUp = true;
    }

    const newlyUnlockedAwards = evaluateAwards(progress);
    gameSessionService.saveProgress(progress);

    return { leveledUp, newLevel, newlyUnlockedAwards };
  },
};
