# Phase 1: Foundation & Hardening — Technical Research

**Date:** 2026-10-27
**Phase:** 01 — Foundation & Hardening
**Requirements Addressed:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05

---

## 1. Current State & Findings

### 1.1 Dependency Installation & Lockfile (`FOUND-01`)
- `package.json` defines all runtime and build dependencies (React 19.0.0, Vite 6.2.0, `@tailwindcss/vite` 4.1.14, ESLint 9.39.4), but `node_modules` and `package-lock.json` are absent.
- Running `npm install` will populate `node_modules`, create `package-lock.json`, and run the `"prepare": "husky"` script.

### 1.2 Path Alias Divergence (`FOUND-02`)
- `vite.config.ts` (line 36) defines:
  ```ts
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
  ```
- `tsconfig.json` (lines 18–22) defines:
  ```json
  "paths": {
    "@/*": [
      "./*"
    ]
  }
  ```
- **Resolution:** Update `tsconfig.json` so `"paths"` maps `"@/*": ["./src/*"]`, matching Vite's bundler resolution.

### 1.3 Offline Typography via `@fontsource` (`FOUND-03`)
- `src/index.css` (line 1) fetches fonts from `https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Manrope:wght@400;500;600;700;800&family=Russo+One&display=swap`.
- In an offline-first PWA / Android Capacitor app, un-cached Google Fonts fail to load without internet access.
- **Resolution:**
  - Install `@fontsource/alfa-slab-one`, `@fontsource/russo-one`, and `@fontsource/manrope`.
  - Import `@fontsource/alfa-slab-one/400.css`, `@fontsource/russo-one/400.css`, and `@fontsource/manrope/400.css`, `500.css`, `600.css`, `700.css`, `800.css` in `src/main.tsx`.
  - Remove the remote `@import url('https://fonts.googleapis.com/...');` line from `src/index.css`.

### 1.4 Missing PWA Manifest Icons (`FOUND-04`)
- `vite.config.ts` declares `pwa-192x192.png` (192x192, `image/png`) and `pwa-512x512.png` (512x512, `image/png`) in the `VitePWA` manifest.
- Neither file currently exists in `public/`.
- **Resolution:** Generate deterministic, valid 192x192 and 512x512 PNG files (`public/pwa-192x192.png` and `public/pwa-512x512.png`) styled with the Storybook Peach Paper (`#f6e0db`), Ember Orange (`#ef724f`), and Ink (`#000000`) palette using a Node script (or binary PNG generator) with zero external native dependencies.

### 1.5 Vitest & Math Generator Unit Tests (`FOUND-05`)
- `src/entities/card/model/generator.ts` contains pure procedural generation functions:
  - `generateOptions(correctAnswer: number): number[]`
  - `generateFractionOptions(num: number, den: number): CardOption[]`
  - `generateSessionCards(categoryId: string, level?: number, count?: number): Card[]`
- `src/shared/api/gameSessionService.ts` contains profile persistence, grade clamping (`1..5`), streak evaluation, and award unlocking.
- **Resolution:**
  - Install `vitest` as a devDependency.
  - Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json`.
  - Create `src/entities/card/model/generator.test.ts` and `src/shared/api/gameSessionService.test.ts` verifying all invariants across Grades 1–5.

---

## Validation Architecture

### Test Infrastructure
- **Framework:** `vitest` (v3.x compatible with Vite 6)
- **Quick run command:** `npm test` (`vitest run`)
- **Full verification command:** `npm run lint && npm test && npm run build`
- **Target latency:** < 5 seconds

### Invariants to Verify Automatically
1. **Linting & Typecheck:** `npm run lint` and `npx tsc --noEmit` exit with code `0`.
2. **Offline Fonts:** `src/index.css` contains zero references to `fonts.googleapis.com`.
3. **PWA Assets:** `public/pwa-192x192.png` and `public/pwa-512x512.png` exist with valid PNG magic bytes (`89 50 4E 47`).
4. **Math Generator Invariants:**
   - All generated subtraction problems across levels 1–5 have `correctAnswer >= 0`.
   - All generated division problems across levels 1–5 have integer `correctAnswer`.
   - Every generated card has `options.length === 4` and `options.includes(correctAnswer)`.
   - Multi-step word problems have valid `steps` where each step has 4 options including its `correctAnswer`.
