# Technology Stack

**Analysis Date:** 2026-10-27

## Languages

**Primary:**
- TypeScript 5.8.2 - All application source code across entities, features, widgets, pages, and shared utilities (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- JavaScript (ES2022) - Tooling and linter configuration (`eslint.config.js`)
- HTML5 - Application shell and root mount point (`index.html`)
- CSS3 - Tailwind CSS v4 imports, `@theme` token definitions, custom storybook color variables, and font imports (`src/index.css`)

## Runtime

**Environment:**
- Node.js 24.14.0 (for development server, bundling, and git hook scripts)
- Modern Evergreen Web Browsers supporting ES2022 and Service Workers (Client-side Progressive Web App)

**Package Manager:**
- npm 11.9.0
- Lockfile: `package.json` present (`node_modules` not yet installed locally)

## Frameworks

**Core:**
- React 19.0.0 - Primary UI library with React DOM 19 (`src/main.tsx`, `src/App.tsx`)
- React Router DOM 7.13.1 - Client-side declarative routing (`src/pages/Index.tsx`)

**Testing:**
- None configured - No testing framework (Vitest, Jest) or test runner is currently installed in `package.json`

**Build/Dev:**
- Vite 6.2.0 - Fast HMR development server and production bundler (`vite.config.ts`)
- `@vitejs/plugin-react` 5.0.4 - React Fast Refresh and JSX transformation
- `@tailwindcss/vite` 4.1.14 - Native Vite plugin for Tailwind CSS v4 engine
- `vite-plugin-pwa` 0.19.8 - Zero-config Service Worker generation and web app manifest caching
- TypeScript 5.8.2 - Type checking and syntax transpilation (`tsconfig.json`)
- ESLint 9.39.4 with `typescript-eslint` 8.57.2 - Flat config static code analysis (`eslint.config.js`)
- Husky 9.1.7 & lint-staged 16.4.0 - Git pre-commit hooks for automated linting (`.husky/pre-commit`, `.lintstagedrc`)

## Key Dependencies

**Critical:**
- `motion` 12.23.24 - Fluid animation library for interactive feedback and micro-interactions
- `i18next` 25.10.8 & `react-i18next` 16.6.5 - Multilingual localization framework (Russian & English) (`src/shared/lib/i18n/index.ts`)
- `i18next-browser-languagedetector` 8.2.1 - Client browser locale detection
- `@phosphor-icons/react` 2.1.10 - Iconography across navigation, cards, badges, and headers
- `clsx` 2.1.1 & `tailwind-merge` 3.5.0 - Dynamic CSS class merging helper (`src/shared/lib/utils.ts`)

**Infrastructure:**
- `serialize-javascript` 7.0.3 - Explicit package override in `package.json` to prevent serialization vulnerabilities

## Configuration

**Environment:**
- `DISABLE_HMR` - Checked in `vite.config.ts` (`server.hmr = process.env.DISABLE_HMR !== "true"`)
- No `.env` secrets required for client-side gameplay; data is stored locally in `localStorage`

**Build:**
- `vite.config.ts` - Configures Vite plugins (React, Tailwind, VitePWA with custom manifest for Logikrok), dev server (`port: 3000`, `host: 0.0.0.0`), and path aliases
- `tsconfig.json` - Compiler targets ES2022 with bundler resolution and `@/*` path mapping
- `eslint.config.js` - Flat ESLint configuration extending recommended JS/TS and React hooks rules

## Platform Requirements

**Development:**
- Cross-platform: Windows, macOS, or Linux running Node.js 20+
- Port 3000 available for dev server

**Production:**
- Static web hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages) or PWA standalone container
- HTTPS required for Service Worker registration and PWA installation

---

*Stack analysis: 2026-10-27*
*Update after major dependency changes*
