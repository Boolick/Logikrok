import { describe, it, expect } from 'vitest';
import {
  generateOptions,
  generateFractionOptions,
  generateSessionCards,
} from './generator';
import { QUESTIONS_PER_SESSION } from '../../../shared/config/constants';

describe('Math Problem Generator', () => {
  describe('generateOptions', () => {
    it('generates exactly 4 distinct non-negative choices containing the correct answer', () => {
      for (const answer of [0, 1, 5, 12, 50, 100, 240]) {
        const options = generateOptions(answer);
        expect(options).toHaveLength(4);
        expect(new Set(options).size).toBe(4);
        expect(options).toContain(answer);
        for (const opt of options) {
          expect(opt).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it('handles edge case when correctAnswer is 0 without infinite loops', () => {
      const options = generateOptions(0);
      expect(options).toHaveLength(4);
      expect(new Set(options).size).toBe(4);
      expect(options).toContain(0);
      for (const opt of options) {
        expect(opt).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('generateFractionOptions', () => {
    it('generates 4 distinct fraction strings containing the correct fraction', () => {
      const testCases = [
        { num: 1, den: 4 },
        { num: 2, den: 3 },
        { num: 3, den: 5 },
        { num: 5, den: 8 },
      ];

      for (const { num, den } of testCases) {
        const correct = `${num}/${den}`;
        const options = generateFractionOptions(num, den);
        expect(options).toHaveLength(4);
        expect(new Set(options).size).toBe(4);
        expect(options).toContain(correct);
      }
    });
  });

  describe('generateSessionCards', () => {
    const categories = [
      'addition',
      'subtraction',
      'multiplication',
      'division',
      'fractions',
      'geometry',
      'word-problems',
      'mixed',
    ] as const;

    const levels = [1, 2, 3, 4, 5];

    for (const category of categories) {
      for (const level of levels) {
        it(`generates valid session cards for category "${category}" at level ${level}`, () => {
          const cards = generateSessionCards(category, level, QUESTIONS_PER_SESSION);
          const expectedCount = category === 'word-problems' ? 5 : QUESTIONS_PER_SESSION;

          expect(cards.length).toBe(expectedCount);

          for (const card of cards) {
            expect(card.id).toBeDefined();
            expect(card.correctAnswer).toBeDefined();

            if (category === 'word-problems') {
              expect(card.steps).toBeDefined();
              expect(card.steps!.length).toBeGreaterThan(0);
              for (const step of card.steps!) {
                expect(step.options).toHaveLength(4);
                expect(new Set(step.options).size).toBe(4);
                expect(step.options).toContain(step.correctAnswer);
              }
            } else {
              expect(card.options).toHaveLength(4);
              expect(new Set(card.options).size).toBe(4);
              expect(card.options).toContain(card.correctAnswer);
            }

            if (category === 'subtraction') {
              const numericAnswer = Number(card.correctAnswer);
              expect(numericAnswer).toBeGreaterThanOrEqual(0);
            }

            if (category === 'division') {
              const numericAnswer = Number(card.correctAnswer);
              expect(Number.isInteger(numericAnswer)).toBe(true);
            }
          }
        });
      }
    }
  });
});
