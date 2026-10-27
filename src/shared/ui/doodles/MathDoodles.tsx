import React from 'react';

/**
 * Storybook Math Doodles:
 * Inline SVG illustrations (numbers, ruler, compass, star, plus/minus, equals, rocket)
 * with thin 2px outlines and bright crayon fills scattered across the Peach Paper canvas.
 */
export const MathDoodles: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 text-ink opacity-90 dark:opacity-65"
    >
      {/* 1. Rocket Doodle — Top Left */}
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 md:w-20 md:h-20 absolute top-20 left-3 md:left-10 -rotate-12"
        fill="none"
      >
        <path
          d="M40 10C48 22 52 36 52 50H28C28 36 32 22 40 10Z"
          fill="#ef724f"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle
          cx="40"
          cy="34"
          r="7"
          fill="#84bfff"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M28 42L18 52L28 50Z"
          fill="#e7db4c"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M52 42L62 52L52 50Z"
          fill="#e7db4c"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M34 50L37 64L40 58L43 64L46 50"
          fill="#e69dff"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>

      {/* 2. Star Sparkle Doodle — Top Right */}
      <svg
        viewBox="0 0 64 64"
        className="w-14 h-14 md:w-16 md:h-16 absolute top-24 right-4 md:right-14 rotate-12"
        fill="none"
      >
        <path
          d="M32 6L39 23L57 25L43 37L47 55L32 45L17 55L21 37L7 25L25 23L32 6Z"
          fill="#e7db4c"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>

      {/* 3. Ruler Doodle — Middle Left */}
      <svg
        viewBox="0 0 100 44"
        className="w-24 h-11 md:w-28 md:h-12 absolute top-[38%] -left-3 md:left-8 rotate-[22deg]"
        fill="none"
      >
        <rect
          x="4"
          y="8"
          width="92"
          height="28"
          rx="6"
          fill="#ace2df"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <line x1="20" y1="8" x2="20" y2="20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="35" y1="8" x2="35" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="50" y1="8" x2="50" y2="22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="65" y1="8" x2="65" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="80" y1="8" x2="80" y2="20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>

      {/* 4. Compass (Циркуль) Doodle — Middle Right */}
      <svg
        viewBox="0 0 72 80"
        className="w-16 h-20 md:w-20 md:h-24 absolute top-[44%] right-2 md:right-12 -rotate-[18deg]"
        fill="none"
      >
        <circle
          cx="36"
          cy="14"
          r="7"
          fill="#e69dff"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M36 7V3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M32 20L16 68"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M40 20L56 68"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M23 44H49"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect
          x="50"
          y="52"
          width="8"
          height="14"
          rx="2"
          transform="rotate(-18 50 52)"
          fill="#ef724f"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* 5. Plus & Minus Symbols — Upper Center-Left */}
      <svg
        viewBox="0 0 60 60"
        className="w-12 h-12 md:w-14 md:h-14 absolute top-[26%] left-[14%] -rotate-6"
        fill="none"
      >
        <path
          d="M24 12H36V24H48V36H36V48H24V36H12V24H24V12Z"
          fill="#6ed311"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        viewBox="0 0 60 32"
        className="w-12 h-7 absolute top-[62%] right-[15%] rotate-12"
        fill="none"
      >
        <rect
          x="6"
          y="8"
          width="48"
          height="14"
          rx="7"
          fill="#84bfff"
          stroke="currentColor"
          strokeWidth="2.2"
        />
      </svg>

      {/* 6. Equals Sign (=) — Bottom Left */}
      <svg
        viewBox="0 0 64 52"
        className="w-14 h-12 absolute bottom-28 left-4 md:left-16 -rotate-[14deg]"
        fill="none"
      >
        <rect
          x="8"
          y="8"
          width="48"
          height="12"
          rx="6"
          fill="#e7db4c"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <rect
          x="8"
          y="30"
          width="48"
          height="12"
          rx="6"
          fill="#ef724f"
          stroke="currentColor"
          strokeWidth="2.2"
        />
      </svg>

      {/* 7. Chunky Numbers (1, 2, 3) — Bottom Right & Scattered */}
      <svg
        viewBox="0 0 110 64"
        className="w-24 h-14 md:w-28 md:h-16 absolute bottom-24 right-4 md:right-16 rotate-[10deg]"
        fill="none"
      >
        {/* Circle badge with 123 */}
        <rect
          x="6"
          y="8"
          width="98"
          height="46"
          rx="23"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <circle cx="28" cy="31" r="13" fill="#e69dff" stroke="currentColor" strokeWidth="2" />
        <circle cx="55" cy="31" r="13" fill="#ace2df" stroke="currentColor" strokeWidth="2" />
        <circle cx="82" cy="31" r="13" fill="#e7db4c" stroke="currentColor" strokeWidth="2" />
        <text
          x="28"
          y="36"
          textAnchor="middle"
          fill="#000000"
          className="font-headline text-[14px]"
        >
          1
        </text>
        <text
          x="55"
          y="36"
          textAnchor="middle"
          fill="#000000"
          className="font-headline text-[14px]"
        >
          2
        </text>
        <text
          x="82"
          y="36"
          textAnchor="middle"
          fill="#000000"
          className="font-headline text-[14px]"
        >
          3
        </text>
      </svg>
    </div>
  );
};
