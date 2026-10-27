# Architecture

**Analysis Date:** 2026-10-27

## Pattern Overview

**Overall:** Feature-Sliced Design (FSD) Client-Side React SPA & PWA

**Key Characteristics:**
- **Strict Layered FSD Architecture**: Monodirectional dependency flow (`shared` -> `entities` -> `features` -> `widgets` -> `pages` -> `app`).
- **Zero-Backend Algorithmic Generation**: Procedural math generators compute problems, distractor options, and visual SVG geometry/fractions client-side on the fly.
- **Offline-First Reactive State**: Player profile, streak calculations, level milestones, and badge unlocks synchronize locally to browser storage via `gameSessionService`.
- **"Storybook on Peach Paper" Design System**: Flat tactile illustrated UI with high-contrast 2px ink borders, 47px pill shapes, crayon fills, and zero gradients.

## Layers

**App / Root Layer (`src/`):**
- Purpose: Application bootstrapping, global styles, providers, and i18n setup
- Contains: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Depends on: `shared/providers`, `shared/lib/i18n`, `pages`
- Used by: Vite dev server and HTML mount point (`index.html`)

**Pages Layer (`src/pages/`):**
- Purpose: Route-level compositions that combine widgets and features into screen views
- Contains:
  - `src/pages/home/HomePage.tsx` - Main hub with 4 tab views (Learn, Practice/Super Mix, Awards, Profile)
  - `src/pages/game/GamePage.tsx` - Active quiz session view with progress bar and card container
  - `src/pages/result/ResultPage.tsx` - Round summary view with level-up celebration, accuracy stats, and badge unlocks
  - `src/pages/Index.tsx` - Declarative route definitions (`/`, `/game/:categoryId`, `/result`)
- Depends on: `widgets`, `features`, `entities`, `shared`
- Used by: `src/App.tsx`

**Widgets Layer (`src/widgets/`):**
- Purpose: Self-contained composite UI sections
- Contains:
  - `src/widgets/header/Header.tsx` - App header with branding pill, XP counter, language selector, and theme toggle
  - `src/widgets/bottom-nav/BottomNav.tsx` - Outlined 47px navigation bar for switching views
  - `src/widgets/game-card/GameCard.tsx` - Interactive problem card with question, visual view, answer options, and action buttons
  - `src/widgets/game-card/CardVisualView.tsx` - Dynamic SVG visual generator for fraction pies, fraction bars, and geometric shapes
  - `src/widgets/game-card/ExplanationDrawer.tsx` - Slide-up pedagogical explanation sheet for incorrect answers
- Depends on: `entities`, `shared`
- Used by: `pages`

**Features Layer (`src/features/`):**
- Purpose: Encapsulates user interactions and business workflows
- Contains:
  - `src/features/game-session/useGameSession.ts` - Custom React hook managing the quiz lifecycle (session initialization, option selection, step-by-step validation, intermediate XP rewards, outcome recording, and round completion)
- Depends on: `entities/card`, `entities/game-session`, `shared/api`, `shared/config`
- Used by: `src/pages/game/GamePage.tsx`

**Entities Layer (`src/entities/`):**
- Purpose: Core domain data structures, algorithms, and business logic
- Contains:
  - `src/entities/card/` - Card models, procedural arithmetic generators (addition, subtraction, multiplication, division), visual fraction/geometry generators, and multi-step word problem templates (`src/entities/card/model/generator.ts`, `src/entities/card/model/wordProblemTemplates.ts`)
  - `src/entities/category/` - Math module configurations (addition, subtraction, multiplication, division, fractions, geometry, word problems, mixed) and crayon theme mappings (`src/entities/category/model/data.ts`)
  - `src/entities/game-session/` - Active session state data contracts (`src/entities/game-session/model/types.ts`)
  - `src/entities/progress/` - Player profile schemas, streak rules, accuracy metrics, and unlockable award criteria (`src/entities/progress/model/awards.ts`)
- Depends on: `shared/config`, `shared/lib`
- Used by: `features`, `widgets`, `pages`

**Shared Layer (`src/shared/`):**
- Purpose: Universal reusables, UI primitives, configurations, and API adapters
- Contains:
  - `src/shared/api/gameSessionService.ts` - LocalStorage repository managing player profile persistence, streak calculation, category level-ups, and award evaluation
  - `src/shared/config/constants.ts` - Gameplay constants (questions per session, level-up accuracy threshold, storage keys)
  - `src/shared/lib/` - i18n configurations (`i18n/index.ts`, `locales/en.json`, `locales/ru.json`), theme definitions (`theme.ts`), and class utility (`utils.ts`)
  - `src/shared/providers/` - `ThemeProvider.tsx` and `ThemeContext.ts`
  - `src/shared/ui/` - Atomic design kit (`HeroCard.tsx`, `TopicCard.tsx`, `DailyGoalCard.tsx`, `OptionButton.tsx`, `ProgressRing.tsx`, `LanguageToggle.tsx`, `ThemeToggle.tsx`, `doodles/MathDoodles.tsx`)
- Depends on: External libraries only
- Used by: All upper layers

## Data Flow

**Quiz Session Execution Lifecycle:**

1. **Category Selection:**
   - User clicks a topic card (e.g. `fractions`) or "Super Mix" on `HomePage`.
   - `HomePage` invokes `navigate('/game/fractions')`.

2. **Session Initialization:**
   - `GamePage` extracts `categoryId` via `useParams` and invokes `useGameSession('fractions')`.
   - `useGameSession` queries `gameSessionService.getCategoryLevel('fractions')`.
   - `generateSessionCards` generates 10 cards with adaptive difficulty based on effective student level and selected grade.

3. **Problem Display & Interaction:**
   - `GameCard` displays the problem question, dynamic SVG visuals via `CardVisualView` (e.g. pie chart or polygon), and 4 multiple-choice options.
   - User taps an option; `selectOption(option)` highlights the choice.

4. **Answer Validation & Pedagogical Feedback:**
   - User taps "Check Answer" (`checkAnswer()`).
   - If incorrect: `ExplanationDrawer` becomes accessible via a lightbulb button, offering step-by-step numeric and conceptual breakdowns.
   - If correct: awards intermediate XP; records correct answer.
   - In multi-step word problems, advances to subsequent steps within the same card.

5. **Outcome Recording & Level-Up:**
   - When the 10th card completes, `completeRound()` calculates session accuracy.
   - If accuracy >= 70% (`LEVEL_UP_ACCURACY_THRESHOLD`), category level increases and `leveledUp: true` is flagged.
   - Awards are evaluated via `evaluateAwards()`; newly unlocked badges are collected.
   - Session marked `isFinished: true`; `GamePage` redirects to `/result` with session summary state.

6. **Round Summary:**
   - `ResultPage` displays celebratory trophies or progress rings, badges earned, and options to "Play Again" or return to "Home".

**State Management:**
- Application state is localized using React hooks (`useState`, `useCallback`) in `useGameSession`.
- Global player persistence uses browser `localStorage` mediated through `gameSessionService`.
- UI theme (light / dark) is managed via `ThemeContext` and synced with HTML root class.

## Key Abstractions

**GameSessionService:**
- Purpose: Centralized repository pattern for player progression, streaks, and achievements
- Location: `src/shared/api/gameSessionService.ts`
- Pattern: Repository / Service singleton module with migration-safe JSON parsing

**Procedural Math Generator:**
- Purpose: Algorithmic problem generation scaling from Grade 1 to Grade 5
- Location: `src/entities/card/model/generator.ts`
- Pattern: Pure functional generators with deterministic boundary constraints (no negative numbers, exact quotients, fraction simplification)

**Award Evaluator:**
- Purpose: Declarative achievement rule engine
- Location: `src/entities/progress/model/awards.ts`
- Pattern: Strategy/Rule list evaluating predicate functions against player progress

## Entry Points

**Web Application Entry:**
- Location: `src/main.tsx`
- Triggers: Browser document load
- Responsibilities: Mounts React root, initializes i18n and global CSS tokens

**Routing Entry:**
- Location: `src/pages/Index.tsx`
- Triggers: URL route changes
- Responsibilities: Resolves client-side route paths (`/`, `/game/:categoryId`, `/result`)

## Error Handling

**Strategy:** Defensive fallback and client-side safe degradation.

**Patterns:**
- `gameSessionService.getProgress()` catches JSON parse exceptions and falls back to a clean default `Progress` object.
- Math generators contain boundary fallbacks (e.g. `Math.max(1, level)`) to avoid division by zero or negative operands.
- Grade calibration is clamped between 1 and 5 (`Math.min(5, Math.max(1, grade))`).

## Cross-Cutting Concerns

**Internationalization (i18n):**
- Handled via `react-i18next` with complete English (`src/shared/lib/i18n/locales/en.json`) and Russian (`src/shared/lib/i18n/locales/ru.json`) dictionaries.

**Styling & Theming:**
- Light mode: Peach Paper canvas (`#f6e0db`), ink borders (`#000000`), crayon fills.
- Dark mode: Night Storybook canvas (`#1b1528`), inverted ink borders (`#fff8f5`).
- Strict 2px borders, 47px pill radii, zero drop-shadows or gradients.

---

*Architecture analysis: 2026-10-27*
*Update when major patterns change*
