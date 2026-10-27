<!-- GSD:project-start source:PROJECT.md -->
## Project

**Math Sanctuary (Logikrok)**

An interactive multiplatform educational math learning game for children in Grades 1–5, crafted in the tactile "Storybook on Peach Paper" design system. The application combines procedural math problem generation, dynamic SVG diagrams, multi-step story problems, an error explanation drawer, and offline-first gamification. It is delivered across Web (PWA), Android (Capacitor), and Telegram Mini App (TMA), backed by a lightweight high-performance Go core service, a BFF presentation/session layer, and a PostgreSQL database.

**Core Value:** Provide children with an engaging, friction-free, tactile math learning experience across any device (Web, Android, Telegram) with reliable offline play and tamper-proof cloud progress synchronization.

### Constraints

- **Resource Budget**: Core Go backend container must stay within 25–50 MB RAM on Koyeb.
- **Security & Anti-Cheat**: Telegram Bot Token secret must never be exposed to the client; all Telegram `initData` HMAC validations and official score/streak mutations must be verified server-side.
- **Offline Playability**: Math problem generation, validation, and session progression must run 100% locally in-browser without network dependency.
- **Visual Design Contract**: Strict adherence to the "Storybook on Peach Paper" visual guidelines: 2px solid `#000000` ink outlines, 47px pill shapes, crayon fills, zero drop-shadows, zero gradients.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.8.2 - All application source code across entities, features, widgets, pages, and shared utilities (`src/**/*.ts`, `src/**/*.tsx`)
- JavaScript (ES2022) - Tooling and linter configuration (`eslint.config.js`)
- HTML5 - Application shell and root mount point (`index.html`)
- CSS3 - Tailwind CSS v4 imports, `@theme` token definitions, custom storybook color variables, and font imports (`src/index.css`)
## Runtime
- Node.js 24.14.0 (for development server, bundling, and git hook scripts)
- Modern Evergreen Web Browsers supporting ES2022 and Service Workers (Client-side Progressive Web App)
- npm 11.9.0
- Lockfile: `package.json` present (`node_modules` not yet installed locally)
## Frameworks
- React 19.0.0 - Primary UI library with React DOM 19 (`src/main.tsx`, `src/App.tsx`)
- React Router DOM 7.13.1 - Client-side declarative routing (`src/pages/Index.tsx`)
- None configured - No testing framework (Vitest, Jest) or test runner is currently installed in `package.json`
- Vite 6.2.0 - Fast HMR development server and production bundler (`vite.config.ts`)
- `@vitejs/plugin-react` 5.0.4 - React Fast Refresh and JSX transformation
- `@tailwindcss/vite` 4.1.14 - Native Vite plugin for Tailwind CSS v4 engine
- `vite-plugin-pwa` 0.19.8 - Zero-config Service Worker generation and web app manifest caching
- TypeScript 5.8.2 - Type checking and syntax transpilation (`tsconfig.json`)
- ESLint 9.39.4 with `typescript-eslint` 8.57.2 - Flat config static code analysis (`eslint.config.js`)
- Husky 9.1.7 & lint-staged 16.4.0 - Git pre-commit hooks for automated linting (`.husky/pre-commit`, `.lintstagedrc`)
## Key Dependencies
- `motion` 12.23.24 - Fluid animation library for interactive feedback and micro-interactions
- `i18next` 25.10.8 & `react-i18next` 16.6.5 - Multilingual localization framework (Russian & English) (`src/shared/lib/i18n/index.ts`)
- `i18next-browser-languagedetector` 8.2.1 - Client browser locale detection
- `@phosphor-icons/react` 2.1.10 - Iconography across navigation, cards, badges, and headers
- `clsx` 2.1.1 & `tailwind-merge` 3.5.0 - Dynamic CSS class merging helper (`src/shared/lib/utils.ts`)
- `serialize-javascript` 7.0.3 - Explicit package override in `package.json` to prevent serialization vulnerabilities
## Configuration
- `DISABLE_HMR` - Checked in `vite.config.ts` (`server.hmr = process.env.DISABLE_HMR !== "true"`)
- No `.env` secrets required for client-side gameplay; data is stored locally in `localStorage`
- `vite.config.ts` - Configures Vite plugins (React, Tailwind, VitePWA with custom manifest for Logikrok), dev server (`port: 3000`, `host: 0.0.0.0`), and path aliases
- `tsconfig.json` - Compiler targets ES2022 with bundler resolution and `@/*` path mapping
- `eslint.config.js` - Flat ESLint configuration extending recommended JS/TS and React hooks rules
## Platform Requirements
- Cross-platform: Windows, macOS, or Linux running Node.js 20+
- Port 3000 available for dev server
- Static web hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages) or PWA standalone container
- HTTPS required for Service Worker registration and PWA installation
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- PascalCase for React UI components (`src/widgets/game-card/GameCard.tsx`, `src/pages/home/HomePage.tsx`, `src/shared/ui/HeroCard.tsx`)
- camelCase for hooks, services, generators, and library modules (`src/features/game-session/useGameSession.ts`, `src/shared/api/gameSessionService.ts`, `src/entities/card/model/generator.ts`)
- `index.ts` for directory barrel re-exports (`src/entities/card/index.ts`, `src/widgets/header/index.ts`)
- camelCase for all regular and helper functions (`generateSessionCards`, `buildSession`, `evaluateAwards`, `isYesterday`)
- `use` prefix for React custom hooks (`useGameSession`, `useTranslation`)
- `handle` prefix for component event handlers (`handleStart`, `handleSelectGrade`, `handleClick`)
- camelCase for local variables and state (`currentCard`, `activeStep`, `progressPercentage`)
- `UPPER_SNAKE_CASE` for exported configuration constants and immutable lists (`QUESTIONS_PER_SESSION`, `DAILY_GOAL_TARGET`, `LEVEL_UP_ACCURACY_THRESHOLD`, `STORAGE_KEYS`, `CATEGORIES`, `AWARD_DEFINITIONS`)
- PascalCase without prefixes (`Card`, `CardOption`, `Category`, `CategoryStat`, `GameSession`, `Progress`, `AwardDefinition`, `NavTab`)
- Descriptive union types for distinct string sets (`type NavTab = 'learn' | 'practice' | 'awards' | 'profile'`)
## Code Style
- Semicolons: Required and consistently used
- Quotes: Single quotes for TypeScript/JavaScript code, double quotes in JSON and HTML/JSX attributes
- Indentation: 2 spaces
- Tailwind Utility Merging: Always wrap dynamic classes in `cn(...)` from `src/shared/lib/utils.ts`
- Tool: ESLint v9 flat config (`eslint.config.js`)
- Rulesets:
- Pre-commit Hook: Husky + `lint-staged` running `eslint --fix` on commit
## Import Organization
- `@/` maps to `src/` in `vite.config.ts` and `tsconfig.json`. Note that relative imports (`../../`) are currently prevalent throughout `src/`; new modules may leverage `@/` once aliases are standardized.
## Error Handling
- Local storage operations wrap JSON deserialization in `try/catch` blocks, logging errors and returning pristine defaults (`src/shared/api/gameSessionService.ts`).
- Numerical math generators use clamp guards (`Math.max(1, level)`, `Math.min(5, Math.max(1, grade))`) to prevent invalid states, divide-by-zero, or out-of-bound array indexing.
- Component state gracefully renders loading fallbacks if sessions or card arrays are empty (`if (!session || session.cards.length === 0)` in `GamePage.tsx`).
## Design System Tokens & Classes
- Use semantic Storybook utility classes mapped from `@theme` in `src/index.css`:
- Never apply drop shadows or color gradients; maintain flat tactile ink aesthetics with 2px solid outlines.
- Use `rounded-[47px]` for standard pill buttons, topic cards, and headers.
## Module Design
- Named exports are standard for components, functions, types, and constants (`export const GameCard: React.FC = ...`).
- Default exports are reserved exclusively for root wrappers (`src/App.tsx`, `src/shared/lib/i18n/index.ts`, `vite.config.ts`, `eslint.config.js`).
- FSD slices expose their public interface via `index.ts`. Internal implementation files (`model/`, `ui/`) should not be accessed directly from higher slices if exported in `index.ts`.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- **Strict Layered FSD Architecture**: Monodirectional dependency flow (`shared` -> `entities` -> `features` -> `widgets` -> `pages` -> `app`).
- **Zero-Backend Algorithmic Generation**: Procedural math generators compute problems, distractor options, and visual SVG geometry/fractions client-side on the fly.
- **Offline-First Reactive State**: Player profile, streak calculations, level milestones, and badge unlocks synchronize locally to browser storage via `gameSessionService`.
- **"Storybook on Peach Paper" Design System**: Flat tactile illustrated UI with high-contrast 2px ink borders, 47px pill shapes, crayon fills, and zero gradients.
## Layers
- Purpose: Application bootstrapping, global styles, providers, and i18n setup
- Contains: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Depends on: `shared/providers`, `shared/lib/i18n`, `pages`
- Used by: Vite dev server and HTML mount point (`index.html`)
- Purpose: Route-level compositions that combine widgets and features into screen views
- Contains:
- Depends on: `widgets`, `features`, `entities`, `shared`
- Used by: `src/App.tsx`
- Purpose: Self-contained composite UI sections
- Contains:
- Depends on: `entities`, `shared`
- Used by: `pages`
- Purpose: Encapsulates user interactions and business workflows
- Contains:
- Depends on: `entities/card`, `entities/game-session`, `shared/api`, `shared/config`
- Used by: `src/pages/game/GamePage.tsx`
- Purpose: Core domain data structures, algorithms, and business logic
- Contains:
- Depends on: `shared/config`, `shared/lib`
- Used by: `features`, `widgets`, `pages`
- Purpose: Universal reusables, UI primitives, configurations, and API adapters
- Contains:
- Depends on: External libraries only
- Used by: All upper layers
## Data Flow
- Application state is localized using React hooks (`useState`, `useCallback`) in `useGameSession`.
- Global player persistence uses browser `localStorage` mediated through `gameSessionService`.
- UI theme (light / dark) is managed via `ThemeContext` and synced with HTML root class.
## Key Abstractions
- Purpose: Centralized repository pattern for player progression, streaks, and achievements
- Location: `src/shared/api/gameSessionService.ts`
- Pattern: Repository / Service singleton module with migration-safe JSON parsing
- Purpose: Algorithmic problem generation scaling from Grade 1 to Grade 5
- Location: `src/entities/card/model/generator.ts`
- Pattern: Pure functional generators with deterministic boundary constraints (no negative numbers, exact quotients, fraction simplification)
- Purpose: Declarative achievement rule engine
- Location: `src/entities/progress/model/awards.ts`
- Pattern: Strategy/Rule list evaluating predicate functions against player progress
## Entry Points
- Location: `src/main.tsx`
- Triggers: Browser document load
- Responsibilities: Mounts React root, initializes i18n and global CSS tokens
- Location: `src/pages/Index.tsx`
- Triggers: URL route changes
- Responsibilities: Resolves client-side route paths (`/`, `/game/:categoryId`, `/result`)
## Error Handling
- `gameSessionService.getProgress()` catches JSON parse exceptions and falls back to a clean default `Progress` object.
- Math generators contain boundary fallbacks (e.g. `Math.max(1, level)`) to avoid division by zero or negative operands.
- Grade calibration is clamped between 1 and 5 (`Math.min(5, Math.max(1, grade))`).
## Cross-Cutting Concerns
- Handled via `react-i18next` with complete English (`src/shared/lib/i18n/locales/en.json`) and Russian (`src/shared/lib/i18n/locales/ru.json`) dictionaries.
- Light mode: Peach Paper canvas (`#f6e0db`), ink borders (`#000000`), crayon fills.
- Dark mode: Night Storybook canvas (`#1b1528`), inverted ink borders (`#fff8f5`).
- Strict 2px borders, 47px pill radii, zero drop-shadows or gradients.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
