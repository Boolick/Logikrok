# Logikrok (Logikrok)

**Logikrok** is an interactive Progressive Web Application (PWA) math learning game for children in **Grades 1–5**, crafted in the warm illustrated **"Storybook on Peach Paper" (Lpalo Blush Playground)** design system.

It combines adaptive arithmetic, visual fraction & geometry SVG diagrams, parameterized multi-step story problems, an Instagram-style step-by-step error explanation drawer, and a Firestore-ready student progress & achievement engine.

---

## Key Features

### 1. "Storybook on Peach Paper" Visual Design System

- **Tactile Illustrated Aesthetics**: Warm Peach Paper canvas (`#f6e0db`), crisp `2px solid #000000` ink outlines, `47px` pill buttons/cards, and vibrant crayon fills (`ember-orange`, `mint-wash`, `lilac-tint`, `sunbeam-yellow`, `powder-blue`, `lime-zest`) with zero drop-shadows or gradients.
- **Light & Dark Storybook Modes**: Seamless toggling between the signature Peach Paper light mode and the high-contrast Night Storybook dark mode.
- **Expressive Bilingual Typography**: Chunky slab headlines (`Alfa Slab One` paired with Cyrillic `Russo One`) and high-legibility `Manrope` UI typography.
- **Vector Math Doodles**: Custom inline SVG background illustrations (rocket, compass, ruler, star, operations, and numbers).

### 2. Seven Math Modules + "Super Mix" Blitz (Grades 1–5)

- **Addition & Subtraction**: Dynamic problem generator scaling from numbers within 20 (Grade 1) up to 100+ with carry/borrowing (Grades 3–5), strictly preventing negative answers.
- **Multiplication & Division**: Adaptive factor and exact-quotient generators scaled by topic level.
- **Fractions (`Дроби`)**: Dynamic SVG pie-sector (`fraction-pie`) and fraction-bar (`fraction-bar`) diagrams covering fraction identification, common-denominator addition/subtraction, and finding a fraction of a whole number.
- **Geometry (`Геометрия`)**: Dynamic SVG shapes (triangles, squares, rectangles) with labeled dimensions for perimeter $P$, area $S$, and missing-side problems.
- **Multi-Step Word Problems (`Текстовые задачи в 2–3 действия`)**: Parameterized story templates for Grades 1–5 where students solve each action sequentially inside a single story card with a live log of completed steps.
- **Super Mix (`Случайный микс`)**: Practice mode combining all 7 topics into a single dynamic round.

### 3. Step-by-Step Error Explanation Drawer (`ExplanationDrawer`)

- When a student selects an incorrect answer, an Instagram-style bottom sheet slides up with:
  - A plain-language pedagogical explanation (`RU` / `EN`).
  - A clear numeric breakdown (`Пример цифрами по шагам`).

### 4. Gamification, Grade 1–5 Selector & Firestore-Ready Profile

- **Grade 1–5 Baseline Switcher**: Parents or students can select their school grade (`1` to `5`) in the Profile tab to immediately calibrate problem difficulty across all modules.
- **6 Live Unlockable Badges**: Real-time progress bars and unlock notifications for _First Steps_, _Daily Champion_, _Sharp Shooter_, _3-Day Streak_, _Shape & Fraction Master_, and _Number Wizard_.
- **Streak & Topic Mastery Analytics**: Tracks daily streaks, XP, perfect rounds, and per-category accuracy percentages.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6 + `vite-plugin-pwa`
- **Styling**: Tailwind CSS v4 (`@theme` custom tokens)
- **Routing**: React Router DOM 7
- **Internationalization**: `i18next` + `react-i18next` (Russian & English)
- **Icons**: `@phosphor-icons/react`
- **Architecture**: Feature-Sliced Design (FSD)

---

## Project Architecture (Feature-Sliced Design)

```text
src/
├── entities/
│   ├── card/                 # Card models, dynamic math generators & DB-ready word problem templates
│   ├── category/             # Math topic definitions & Storybook crayon color mappings
│   ├── game-session/         # Multi-step session state models
│   └── progress/             # Firestore-ready player profile & live award definitions
├── features/
│   └── game-session/         # useGameSession hook (multi-step validation, XP, level-up, awards)
├── widgets/
│   ├── header/               # Top bar with Logikrok pill, XP badge, language & theme toggles
│   ├── bottom-nav/           # Outlined 47px pill navigation bar (Learn, Practice, Awards, Profile)
│   └── game-card/            # Interactive quiz card, SVG visual renderer & ExplanationDrawer sheet
├── pages/
│   ├── home/                 # Learn, Practice (Super Mix), Awards & Profile views
│   ├── game/                 # Active quiz session view
│   └── result/               # End-of-round summary with level-up & badge unlock celebrations
└── shared/
    ├── api/                  # gameSessionService (localStorage repository ready for Firestore sync)
    ├── config/               # Game constants (daily goal target, session length, accuracy thresholds)
    ├── lib/                  # Theme manager & i18n locales (EN / RU)
    └── ui/                   # Storybook UI kit (HeroCard, TopicCard, OptionButton, ProgressRing, Doodles)
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Build & Verify

```bash
npm run lint
npm run build
```

