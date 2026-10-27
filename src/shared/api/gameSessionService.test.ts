import { describe, it, expect, beforeEach, vi } from 'vitest';
import { gameSessionService } from './gameSessionService';
import {
  STORAGE_KEYS,
  LEVEL_UP_ACCURACY_THRESHOLD,
} from '../config/constants';

class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

describe('gameSessionService', () => {
  let storageMock: LocalStorageMock;

  beforeEach(() => {
    storageMock = new LocalStorageMock();
    vi.stubGlobal('localStorage', storageMock);
  });

  describe('getProgress', () => {
    it('returns default progress when localStorage is empty', () => {
      const progress = gameSessionService.getProgress();

      expect(progress.xp).toBe(0);
      expect(progress.dailySolved).toBe(0);
      expect(progress.totalSolved).toBe(0);
      expect(progress.perfectRounds).toBe(0);
      expect(progress.streakDays).toBe(0);
      expect(progress.selectedGrade).toBe(1);
      expect(progress.unlockedAwards).toEqual([]);
      expect(progress.categoryLevels.addition).toBe(1);
    });

    it('returns default clean progress without throwing when localStorage contains invalid JSON', () => {
      storageMock.setItem(STORAGE_KEYS.PROGRESS, '{"invalid_json: true');

      const progress = gameSessionService.getProgress();

      expect(progress.xp).toBe(0);
      expect(progress.dailySolved).toBe(0);
      expect(progress.totalSolved).toBe(0);
      expect(progress.selectedGrade).toBe(1);
      expect(progress.unlockedAwards).toEqual([]);
    });

    it('resets streakDays to 0 if last played date is older than yesterday', () => {
      const pastDate = new Date(2025, 0, 1).toDateString();
      storageMock.setItem(
        STORAGE_KEYS.PROGRESS,
        JSON.stringify({
          xp: 50,
          streakDays: 4,
          lastPlayedDate: pastDate,
          selectedGrade: 2,
        })
      );

      const progress = gameSessionService.getProgress();
      expect(progress.streakDays).toBe(0);
      expect(progress.xp).toBe(50);
      expect(progress.selectedGrade).toBe(2);
    });
  });

  describe('setSelectedGrade', () => {
    it('updates grade and clamps values between 1 and 5', () => {
      let progress = gameSessionService.setSelectedGrade(0);
      expect(progress.selectedGrade).toBe(1);

      progress = gameSessionService.setSelectedGrade(3);
      expect(progress.selectedGrade).toBe(3);

      progress = gameSessionService.setSelectedGrade(9);
      expect(progress.selectedGrade).toBe(5);

      const stored = JSON.parse(storageMock.getItem(STORAGE_KEYS.PROGRESS)!);
      expect(stored.selectedGrade).toBe(5);
    });
  });

  describe('recordCardOutcome', () => {
    it('increments xp, dailySolved, totalSolved, category stats and awards first-steps', () => {
      // Record 4 correct answers
      for (let i = 0; i < 4; i++) {
        const awards = gameSessionService.recordCardOutcome('addition', true, 10);
        expect(awards).toEqual([]);
      }

      let current = gameSessionService.getProgress();
      expect(current.xp).toBe(40);
      expect(current.dailySolved).toBe(4);
      expect(current.totalSolved).toBe(4);
      expect(current.categoryStats.addition.correct).toBe(4);
      expect(current.categoryStats.addition.solved).toBe(4);

      // 5th answer unlocks 'first-steps' (target: 5 totalSolved)
      const unlockedAwards = gameSessionService.recordCardOutcome('addition', true, 10);
      expect(unlockedAwards).toContain('first-steps');

      current = gameSessionService.getProgress();
      expect(current.totalSolved).toBe(5);
      expect(current.unlockedAwards).toContain('first-steps');
    });

    it('tracks incorrect answers without incrementing correct counters or xp', () => {
      gameSessionService.recordCardOutcome('multiplication', false, 0);

      const current = gameSessionService.getProgress();
      expect(current.xp).toBe(0);
      expect(current.dailySolved).toBe(0);
      expect(current.totalSolved).toBe(0);
      expect(current.categoryStats.multiplication.solved).toBe(1);
      expect(current.categoryStats.multiplication.correct).toBe(0);
    });
  });

  describe('completeRound', () => {
    it('levels up category when accuracy meets threshold and awards sniper on 10/10', () => {
      const result = gameSessionService.completeRound(
        'subtraction',
        10,
        10,
        LEVEL_UP_ACCURACY_THRESHOLD
      );

      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);
      expect(result.newlyUnlockedAwards).toContain('sniper');

      const progress = gameSessionService.getProgress();
      expect(progress.perfectRounds).toBe(1);
      expect(progress.categoryLevels.subtraction).toBe(2);
      expect(progress.unlockedAwards).toContain('sniper');
    });

    it('does not level up when accuracy is below threshold', () => {
      const result = gameSessionService.completeRound(
        'division',
        5,
        10,
        LEVEL_UP_ACCURACY_THRESHOLD
      );

      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(1);
      expect(result.newlyUnlockedAwards).not.toContain('sniper');

      const progress = gameSessionService.getProgress();
      expect(progress.categoryLevels.division).toBe(1);
    });
  });
});
