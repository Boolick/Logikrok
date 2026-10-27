# Testing Patterns

**Analysis Date:** 2026-10-27

## Test Framework

**Current State:**
- **Runner:** None installed. No test runner (such as Vitest or Jest) is currently configured in `package.json` or root configuration files.
- **Assertion Library:** None installed.
- **Run Commands:**
  - No `npm test` script is present in `package.json`.

**Recommended Framework Adoption:**
- **Recommended Runner:** Vitest (native alignment with Vite 6, `@tailwindcss/vite`, and TypeScript).
- **Recommended Component Testing:** `@testing-library/react` + `jsdom`.

## Test File Organization

**Location:**
- Collocated test files alongside source files (e.g. `src/entities/card/model/generator.test.ts` alongside `generator.ts`).

**Naming:**
- Unit tests: `*.test.ts`
- Component / UI tests: `*.test.tsx`

**Structure (Planned Pattern):**
```
src/
  entities/
    card/
      model/
        generator.ts
        generator.test.ts
    progress/
      model/
        awards.ts
        awards.test.ts
  features/
    game-session/
      useGameSession.ts
      useGameSession.test.ts
  shared/
    api/
      gameSessionService.ts
      gameSessionService.test.ts
```

## Recommended Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { generateSessionCards } from './generator';

describe('generateSessionCards', () => {
  it('generates the specified count of cards for a category', () => {
    const cards = generateSessionCards('addition', 1, 10);
    expect(cards).toHaveLength(10);
    cards.forEach((card) => {
      expect(card.options).toHaveLength(4);
      expect(card.options).toContain(card.correctAnswer);
    });
  });

  it('guarantees subtraction problems never yield negative answers', () => {
    const cards = generateSessionCards('subtraction', 2, 20);
    cards.forEach((card) => {
      expect(typeof card.correctAnswer).toBe('number');
      expect(card.correctAnswer).toBeGreaterThanOrEqual(0);
    });
  });
});
```

## Mocking Strategy

**Browser Storage Mocking:**
- For `src/shared/api/gameSessionService.ts`, mock `window.localStorage` with an in-memory dictionary.

**Localization Mocking:**
- In component tests, either load the real `i18n` instance from `src/shared/lib/i18n` with English translations or mock `useTranslation()`:
```typescript
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));
```

## Coverage & Testing Gaps

**Current Coverage:** 0% (No tests currently exist).

**Priority Areas Requiring Test Coverage:**

1. **Math Problem Generators (`src/entities/card/model/generator.ts`):**
   - Boundary tests for Grade 1 through Grade 5 difficulty scaling.
   - Non-negative answer invariant checks for subtraction.
   - Exact quotient generation checks for division.
   - Simplified fraction and common-denominator generator verification.
   - Options generation ensuring exactly 4 distinct options containing the correct answer.

2. **Player Progress & Streak Logic (`src/shared/api/gameSessionService.ts`):**
   - Streak calculation across same-day, yesterday, and multi-day lapses.
   - Accuracy calculation and level-up milestone trigger (`LEVEL_UP_ACCURACY_THRESHOLD = 0.7`).
   - Grade selector baseline calculations.

3. **Multi-Step Word Problems (`src/features/game-session/useGameSession.ts`):**
   - Sequential step completion flow.
   - Intermediate XP rewards versus round-final XP awards.
   - Mistake tracking across steps (`currentCardHadMistake`).

---

*Testing analysis: 2026-10-27*
*Update when test patterns change*
