# Codebase Structure

**Analysis Date:** 2026-10-27

## Directory Layout

```
logikrok/
├── .aistudio/                 # AI Studio generation metadata and initial plans
├── .husky/                    # Git hooks (pre-commit linting)
├── public/                    # Static assets, design specifications, PWA icons
├── src/                       # Application source code (Feature-Sliced Design)
│   ├── entities/              # Domain models, data generators, schemas
│   │   ├── card/              # Math problem generation & card models
│   │   ├── category/          # Math categories & theme palette bindings
│   │   ├── game-session/      # Active session interfaces
│   │   └── progress/          # Player profile, stats & award definitions
│   ├── features/              # Interactive user workflows
│   │   └── game-session/      # Session hook & state management
│   ├── pages/                 # Full routed application views
│   │   ├── game/              # Quiz screen
│   │   ├── home/              # Main hub & tab views
│   │   └── result/            # Round completion summary
│   ├── shared/                # Universal reusables, config, UI kit
│   │   ├── api/               # Storage services & repositories
│   │   ├── config/            # Game constants & storage keys
│   │   ├── lib/               # Theme utilities, helper functions, i18n
│   │   ├── providers/         # Theme context provider
│   │   └── ui/                # Storybook UI component library
│   └── widgets/               # Standalone composite UI blocks
│       ├── bottom-nav/        # Bottom tab navigation pill
│       ├── game-card/         # Problem card, SVG visualizer, explanation sheet
│       └── header/            # Top branding bar with XP and toggles
├── eslint.config.js           # Flat ESLint configuration
├── index.html                 # HTML application template
├── metadata.json              # Project metadata & frame permissions
├── package.json               # Dependencies, scripts, package manifest
├── tsconfig.json              # TypeScript compiler configuration
└── vite.config.ts             # Vite bundler, PWA plugin, alias configuration
```

## Directory Purposes

**`src/entities/`:**
- Purpose: Domain models, entities, procedural math problem generators, and data structures
- Contains: TypeScript type definitions, static card databases, dynamic problem generator algorithms, word problem templates
- Key files:
  - `src/entities/card/model/generator.ts` - Dynamic generation for addition, subtraction, multiplication, division, fractions, and geometry
  - `src/entities/card/model/wordProblemTemplates.ts` - Multi-step word problem blueprints for Grades 1–5
  - `src/entities/category/model/data.ts` - 7 category definitions with Storybook color themes
  - `src/entities/progress/model/awards.ts` - 6 unlockable badges and progress calculation logic

**`src/features/`:**
- Purpose: Application user stories and behavioral state machines
- Contains: React hooks and logic managing user interactions
- Key files:
  - `src/features/game-session/useGameSession.ts` - Core hook orchestrating quiz question navigation, multi-step validation, and XP rewards

**`src/widgets/`:**
- Purpose: High-level UI components combining multiple entities and UI elements
- Contains: Compound React components and drawer sheets
- Key files:
  - `src/widgets/game-card/GameCard.tsx` - Quiz interaction card
  - `src/widgets/game-card/CardVisualView.tsx` - Dynamic SVG renderer for fractions and shapes
  - `src/widgets/game-card/ExplanationDrawer.tsx` - Slide-up pedagogical explanation drawer
  - `src/widgets/header/Header.tsx` - Header with XP pill, language toggle, and theme switch
  - `src/widgets/bottom-nav/BottomNav.tsx` - 47px navigation bar

**`src/pages/`:**
- Purpose: Route endpoints composing widgets and features into complete screens
- Contains: Screen-level React components and routing index
- Key files:
  - `src/pages/home/HomePage.tsx` - Primary hub handling Learn, Practice (Super Mix), Awards, and Profile tabs
  - `src/pages/game/GamePage.tsx` - Active game quiz runner
  - `src/pages/result/ResultPage.tsx` - Post-game summary and badge unlock celebration
  - `src/pages/Index.tsx` - Route configuration (`<BrowserRouter>`)

**`src/shared/`:**
- Purpose: Infrastructure, design system primitives, and utilities
- Key subdirectories:
  - `src/shared/api/` - `gameSessionService.ts` for profile storage
  - `src/shared/config/` - `constants.ts` with gameplay rules
  - `src/shared/lib/` - `utils.ts` (Tailwind merge), `theme.ts`, `i18n/` (translations)
  - `src/shared/providers/` - `ThemeProvider.tsx`
  - `src/shared/ui/` - Atomic Storybook components (`HeroCard.tsx`, `TopicCard.tsx`, `OptionButton.tsx`, `ProgressRing.tsx`, `doodles/MathDoodles.tsx`)

## Key File Locations

**Entry Points:**
- `src/main.tsx` - Application DOM mount and provider root
- `src/pages/Index.tsx` - Application route configuration
- `index.html` - HTML document shell

**Configuration:**
- `vite.config.ts` - Vite bundler, PWA plugin, dev server, path aliases
- `tsconfig.json` - TypeScript compiler flags and path mappings
- `eslint.config.js` - ESLint 9 flat config
- `.lintstagedrc` - Staged files linter trigger
- `.husky/pre-commit` - Git pre-commit hook script

**Core Logic:**
- `src/entities/card/model/generator.ts` - Math problem and option generator
- `src/features/game-session/useGameSession.ts` - Game session state hook
- `src/shared/api/gameSessionService.ts` - Profile storage service

## Naming Conventions

**Files:**
- PascalCase for React components: `GameCard.tsx`, `HomePage.tsx`, `TopicCard.tsx`
- camelCase for hooks, services, and modules: `useGameSession.ts`, `gameSessionService.ts`, `generator.ts`
- `index.ts` for barrel exports in feature, widget, and entity folders

**Directories:**
- kebab-case for slice and segment directories: `game-card`, `bottom-nav`, `game-session`, `word-problems`

**Design Tokens:**
- CSS custom properties prefixed with `--`: `--peach-paper`, `--ink`, `--ember-orange`, `--mint-wash`, `--radius-default`

## Where to Add New Code

**New Math Category / Module:**
- Define topic metadata in `src/entities/category/model/data.ts`
- Add generation logic in `src/entities/card/model/generator.ts`
- If visual diagrams are needed, add SVG rendering in `src/widgets/game-card/CardVisualView.tsx`
- Add localized strings to `src/shared/lib/i18n/locales/en.json` and `ru.json`

**New Badge or Achievement:**
- Add award contract to `AWARD_DEFINITIONS` in `src/entities/progress/model/awards.ts`
- Add localized badge title and description to `src/shared/lib/i18n/locales/en.json` and `ru.json`

**New UI Component:**
- Place reusable atomic components in `src/shared/ui/`
- Place compound multi-entity widgets in `src/widgets/`

**New Unit or Integration Tests:**
- Collocate unit test files alongside source files (e.g. `src/entities/card/model/generator.test.ts` or `src/shared/api/gameSessionService.test.ts`) once test runner is configured

## Special Directories

**`.aistudio/`:**
- Purpose: AI Studio workspace records and implementation plans
- Committed: Tracked in git repository

**`public/assets/`:**
- Purpose: Static assets, icons, and design documentation (`DESIGN_f2d39917.md`)
- Committed: Yes

---

*Structure analysis: 2026-10-27*
*Update when directory structure changes*
