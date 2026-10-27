# External Integrations

**Analysis Date:** 2026-10-27

## APIs & External Services

**External Content & Fonts:**
- Google Fonts CDN - Web typography distribution for Storybook headers and UI text
  - URL: `https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Manrope:wght@400;500;600;700;800&family=Russo+One&display=swap`
  - Integration: Loaded via `@import url(...)` in `src/index.css`
  - Fonts used: `Alfa Slab One` (display slab), `Russo One` (Cyrillic slab counterpart), `Manrope` (body and numerals)

**Payment Processing:**
- None - Application is a standalone educational math game without payment or subscription walls.

**Email/SMS:**
- None - No communication services integrated.

**External APIs:**
- None - Math problem generation and validation run 100% locally in-browser (`src/entities/card/model/generator.ts`).

## Data Storage

**Client Storage (Primary Data Store):**
- Browser `localStorage` - Persists player progression, achievements, daily streak, and topic levels
  - Client abstraction: `src/shared/api/gameSessionService.ts`
  - Storage keys (defined in `src/shared/config/constants.ts`):
    - `math_sanctuary_progress` - Full player profile: XP, daily solved, total solved, streak, selected grade (1–5), category level maps, category statistics, unlocked awards
    - `math_sanctuary_daily_goal` - Daily target configuration
  - Serialization: JSON serialization with fallback defaults and schema migration safeguards in `getProgress()`

**Databases:**
- None active in code. The data model in `src/entities/progress/model/types.ts` and `src/shared/api/gameSessionService.ts` is explicitly structured to be Firestore-ready for future cloud synchronization.

**File Storage:**
- None - Static assets and SVG icons are bundled directly into the client build or generated dynamically via SVG code in `src/shared/ui/doodles/MathDoodles.tsx` and `src/widgets/game-card/CardVisualView.tsx`.

**Caching:**
- Service Worker Cache (PWA) - Handled via `vite-plugin-pwa` auto-update service worker strategy (`vite.config.ts`) for offline gameplay.

## Authentication & Identity

**Auth Provider:**
- None currently implemented. Progression is tied to local browser profile. No user login, OAuth, or sessions exist.

## Monitoring & Observability

**Error Tracking:**
- None - Exceptions are logged to `console.error` (e.g., in JSON parsing inside `src/shared/api/gameSessionService.ts`).

**Analytics:**
- None - Game statistics (accuracy, streak, total solved) are calculated locally and displayed in the UI.

**Logs:**
- Browser console stdout/stderr only.

## CI/CD & Deployment

**Hosting:**
- Static Single Page Application hosting (Vercel, Netlify, Cloudflare Pages, or static web container). Configured with `vite build` outputting to `dist/`.

**CI Pipeline & Local Git Hooks:**
- Local Pre-commit: Husky v9 hook (`.husky/pre-commit`) running `npx lint-staged`
- Staged linter: `.lintstagedrc` executes `eslint --fix` on modified `*.{ts,tsx,js,jsx}` files
- Remote CI: No GitHub Actions or CI pipeline workflow files detected in `.github/`

## Environment Configuration

**Development:**
- No mandatory environment variables required to run or build.
- Optional flag: `DISABLE_HMR=true` to disable Hot Module Replacement in controlled execution environments (`vite.config.ts`).

**Production:**
- Standard static bundle with no server secrets.

## Webhooks & Callbacks

**Incoming:**
- None.

**Outgoing:**
- None.

---

*Integration audit: 2026-10-27*
*Update when adding/removing external services*
