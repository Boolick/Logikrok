# Codebase Concerns

**Analysis Date:** 2026-10-27

## Tech Debt

**Missing Dependencies & Lockfile:**
- Issue: `node_modules` is not installed and `package-lock.json` is missing from the repository root.
- Files: `package.json`
- Why: Fresh repository initialization without a completed initial `npm install`.
- Impact: Running `npm run lint` or dev server commands immediately fails with `eslint is not recognized`.
- Fix approach: Run `npm install` and commit `package-lock.json`.

**Path Alias Divergence (`tsconfig.json` vs `vite.config.ts`):**
- Issue: In `vite.config.ts`, `@` resolves to `./src`, whereas in `tsconfig.json`, `@/*` maps to `./*`.
- Files: `tsconfig.json` (line 19), `vite.config.ts` (line 36)
- Why: Standard template boilerplate was added without synchronizing the TypeScript compiler path resolution.
- Impact: Importing `@/shared/...` works in Vite but causes TypeScript compiler errors, or vice versa, forcing authors to use deep relative imports (`../../`).
- Fix approach: Align `tsconfig.json` paths mapping: `"@/*": ["./src/*"]` and set `"baseUrl": "."`.

**Missing PWA Icon Assets:**
- Issue: `vite.config.ts` configures `VitePWA` manifest referencing `pwa-192x192.png` and `pwa-512x512.png`, but neither file exists in `public/`.
- Files: `vite.config.ts` (lines 21–29), `public/`
- Why: PWA configuration was bootstrapped without generating or copying the corresponding PNG icons.
- Impact: Browsers show 404 errors when attempting to parse the web app manifest, and PWA installation prompts fail or show blank icons.
- Fix approach: Add `pwa-192x192.png` and `pwa-512x512.png` assets to `public/`.

## Known Bugs

**External Font Dependency Breaks Offline First:**
- Symptoms: When offline without a primed browser cache, custom headers and numerals revert to standard serif/sans-serif fonts instead of `Alfa Slab One` and `Manrope`.
- Trigger: Launching the PWA while offline or on restricted networks.
- Files: `src/index.css` (line 1)
- Root cause: Web fonts are fetched via remote `@import url('https://fonts.googleapis.com/css2?...')` instead of self-hosted local font files or `@fontsource` packages.
- Fix: Install `@fontsource/alfa-slab-one`, `@fontsource/russo-one`, and `@fontsource/manrope`, bundling font assets directly with Vite.

## Security Considerations

**LocalStorage Tampering & Plaintext State:**
- Risk: All player awards, streaks, and progression levels are stored unencrypted in `localStorage` (`math_sanctuary_progress`). Students or users can modify progression or unlock badges by editing localStorage in browser dev tools.
- Files: `src/shared/api/gameSessionService.ts`
- Current mitigation: Schema validation and fallback normalization guards in `getProgress()`.
- Recommendations: Acceptable for a single-player educational game; when migrating to Firestore, enforce validation rules and authentication claims server-side.

## Performance Bottlenecks

**Procedural Option Collision Loop:**
- Problem: Distractor generation uses a `while (optionsSet.size < 4)` loop with linear stepping.
- Files: `src/entities/card/model/generator.ts` (lines 42–49)
- Measurement: Negligible for arithmetic, but under rare level boundary edge cases could execute multiple iterations.
- Cause: Set deduplication with incrementing offset.
- Improvement path: Cap maximum loop iterations to guarantee non-blocking execution.

## Fragile Areas

**Multi-Step Word Problem State Machine:**
- File: `src/features/game-session/useGameSession.ts` (lines 52–99, 101–149)
- Why fragile: Handles two orthogonal card paradigms (single-step arithmetic vs multi-step word problems) inside a single state container with complex step index and mistake tracking (`currentCardHadMistake`).
- Common failures: Advancing past step boundaries without resetting selected options, or improperly attributing intermediate step XP vs round accuracy.
- Safe modification: Always add automated unit and integration tests before editing `checkAnswer` or `nextQuestion` branching logic.
- Test coverage: 0% currently.

**Award Evaluation Mutation:**
- File: `src/shared/api/gameSessionService.ts` (lines 30–43)
- Why fragile: `evaluateAwards` directly mutates the passed `progress.unlockedAwards` array in-place before returning `newlyUnlocked`.
- Common failures: Can lead to subtle state synchronicity bugs if passed an immutable or frozen object from React state.
- Safe modification: Make `evaluateAwards` a pure function returning a cloned and updated awards array.

## Test Coverage Gaps

**Procedural Generation Accuracy:**
- What's not tested: Problem generators for all 7 topics across Grades 1–5 (`src/entities/card/model/generator.ts`).
- Risk: Regressions where Grade 1 receives multi-digit subtraction with negative results, or geometry triangles render invalid SVG dimensions.
- Priority: High
- Difficulty to test: Low (pure functions, can run automated fuzzing tests).

**Session Lifecycle and Level-Up Gates:**
- What's not tested: `useGameSession` hook state machine and `gameSessionService` milestone progression.
- Risk: Students stuck on levels or failing to trigger level-ups upon achieving 70%+ accuracy.
- Priority: High
- Difficulty to test: Medium (requires test environment with mocked localStorage).

---

*Concerns audit: 2026-10-27*
*Update as issues are fixed or new ones discovered*
