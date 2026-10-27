# Coding Conventions

**Analysis Date:** 2026-10-27

## Naming Patterns

**Files:**
- PascalCase for React UI components (`src/widgets/game-card/GameCard.tsx`, `src/pages/home/HomePage.tsx`, `src/shared/ui/HeroCard.tsx`)
- camelCase for hooks, services, generators, and library modules (`src/features/game-session/useGameSession.ts`, `src/shared/api/gameSessionService.ts`, `src/entities/card/model/generator.ts`)
- `index.ts` for directory barrel re-exports (`src/entities/card/index.ts`, `src/widgets/header/index.ts`)

**Functions:**
- camelCase for all regular and helper functions (`generateSessionCards`, `buildSession`, `evaluateAwards`, `isYesterday`)
- `use` prefix for React custom hooks (`useGameSession`, `useTranslation`)
- `handle` prefix for component event handlers (`handleStart`, `handleSelectGrade`, `handleClick`)

**Variables & Constants:**
- camelCase for local variables and state (`currentCard`, `activeStep`, `progressPercentage`)
- `UPPER_SNAKE_CASE` for exported configuration constants and immutable lists (`QUESTIONS_PER_SESSION`, `DAILY_GOAL_TARGET`, `LEVEL_UP_ACCURACY_THRESHOLD`, `STORAGE_KEYS`, `CATEGORIES`, `AWARD_DEFINITIONS`)

**Types & Interfaces:**
- PascalCase without prefixes (`Card`, `CardOption`, `Category`, `CategoryStat`, `GameSession`, `Progress`, `AwardDefinition`, `NavTab`)
- Descriptive union types for distinct string sets (`type NavTab = 'learn' | 'practice' | 'awards' | 'profile'`)

## Code Style

**Formatting:**
- Semicolons: Required and consistently used
- Quotes: Single quotes for TypeScript/JavaScript code, double quotes in JSON and HTML/JSX attributes
- Indentation: 2 spaces
- Tailwind Utility Merging: Always wrap dynamic classes in `cn(...)` from `src/shared/lib/utils.ts`

**Linting:**
- Tool: ESLint v9 flat config (`eslint.config.js`)
- Rulesets:
  - `@eslint/js` recommended rules
  - `typescript-eslint` recommended rules
  - `eslint-plugin-react` recommended rules
  - `eslint-plugin-react-hooks` recommended rules
- Pre-commit Hook: Husky + `lint-staged` running `eslint --fix` on commit

## Import Organization

**Order:**
1. React and React core packages (`react`, `react-dom`)
2. Third-party packages (`react-router-dom`, `@phosphor-icons/react`, `react-i18next`, `clsx`, `tailwind-merge`)
3. FSD layer imports from outer/sibling layers (`../../widgets/...`, `../../features/...`, `../../entities/...`)
4. Shared utilities and config (`../../shared/lib/utils`, `../../shared/config/constants`)
5. Type-only imports (`import { type NavTab } from ...`)

**Path Aliases:**
- `@/` maps to `src/` in `vite.config.ts` and `tsconfig.json`. Note that relative imports (`../../`) are currently prevalent throughout `src/`; new modules may leverage `@/` once aliases are standardized.

## Error Handling

**Defensive Parsing & Fallbacks:**
- Local storage operations wrap JSON deserialization in `try/catch` blocks, logging errors and returning pristine defaults (`src/shared/api/gameSessionService.ts`).
- Numerical math generators use clamp guards (`Math.max(1, level)`, `Math.min(5, Math.max(1, grade))`) to prevent invalid states, divide-by-zero, or out-of-bound array indexing.
- Component state gracefully renders loading fallbacks if sessions or card arrays are empty (`if (!session || session.cards.length === 0)` in `GamePage.tsx`).

## Design System Tokens & Classes

**Color Usage:**
- Use semantic Storybook utility classes mapped from `@theme` in `src/index.css`:
  - Canvas: `bg-peach-paper`, `text-ink`
  - Cards: `bg-snow`, `border-2`, `border-ink`
  - Accents: `bg-ember-orange`, `bg-sunbeam-yellow`, `bg-mint-wash`, `bg-powder-blue`, `bg-lilac-tint`, `bg-lime-zest`
- Never apply drop shadows or color gradients; maintain flat tactile ink aesthetics with 2px solid outlines.
- Use `rounded-[47px]` for standard pill buttons, topic cards, and headers.

## Module Design

**Exports:**
- Named exports are standard for components, functions, types, and constants (`export const GameCard: React.FC = ...`).
- Default exports are reserved exclusively for root wrappers (`src/App.tsx`, `src/shared/lib/i18n/index.ts`, `vite.config.ts`, `eslint.config.js`).
- FSD slices expose their public interface via `index.ts`. Internal implementation files (`model/`, `ui/`) should not be accessed directly from higher slices if exported in `index.ts`.

---

*Convention analysis: 2026-10-27*
*Update when patterns change*
