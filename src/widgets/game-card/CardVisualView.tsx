import React from 'react';
import { CardVisual } from '../../entities/card';

interface CardVisualViewProps {
  visual: CardVisual;
}

/**
 * Renders Storybook-styled 2px outlined SVG diagrams for Fractions and Geometry cards.
 */
export const CardVisualView: React.FC<CardVisualViewProps> = ({ visual }) => {
  if (visual.type === 'fraction-pie') {
    const { numerator, denominator, fillHex = '#ef724f' } = visual;
    const cx = 75;
    const cy = 75;
    const r = 62;

    const slices = Array.from({ length: denominator }, (_, idx) => {
      const startAngle = (idx * 2 * Math.PI) / denominator - Math.PI / 2;
      const endAngle = ((idx + 1) * 2 * Math.PI) / denominator - Math.PI / 2;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = 2 * Math.PI / denominator > Math.PI ? 1 : 0;

      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      const isShaded = idx < numerator;

      return (
        <path
          key={idx}
          d={d}
          fill={isShaded ? fillHex : '#ffffff'}
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      );
    });

    return (
      <div className="flex items-center justify-center my-2">
        <svg viewBox="0 0 150 150" className="w-36 h-36 sm:w-40 sm:h-40">
          {slices}
        </svg>
      </div>
    );
  }

  if (visual.type === 'fraction-bar') {
    const {
      numerator,
      secondNumerator = 0,
      denominator,
      fillHex = '#84bfff',
    } = visual;

    const totalWidth = 240;
    const height = 46;
    const cellWidth = totalWidth / denominator;

    return (
      <div className="flex items-center justify-center my-3 w-full">
        <svg viewBox="0 0 260 66" className="w-full max-w-[260px] h-16">
          {Array.from({ length: denominator }, (_, idx) => {
            const isFirstPart = idx < numerator;
            const isSecondPart = idx >= numerator && idx < numerator + secondNumerator;
            const cellFill = isFirstPart
              ? fillHex
              : isSecondPart
                ? '#e7db4c'
                : '#ffffff';

            return (
              <rect
                key={idx}
                x={10 + idx * cellWidth}
                y={10}
                width={cellWidth}
                height={height}
                fill={cellFill}
                stroke="#000000"
                strokeWidth="2.5"
              />
            );
          })}
        </svg>
      </div>
    );
  }

  if (visual.type === 'geometry-shape') {
    const { shape, labels, fillHex = '#ace2df' } = visual;

    if (shape === 'square') {
      return (
        <div className="flex items-center justify-center my-2">
          <svg viewBox="0 0 200 155" className="w-48 h-36">
            <rect
              x="45"
              y="28"
              width="100"
              height="100"
              rx="6"
              fill={fillHex}
              stroke="#000000"
              strokeWidth="2.5"
            />
            {labels.top && (
              <text
                x="95"
                y="20"
                textAnchor="middle"
                fill="currentColor"
                className="font-headline text-[14px]"
              >
                {labels.top}
              </text>
            )}
            {labels.right && (
              <text
                x="153"
                y="82"
                textAnchor="start"
                fill="currentColor"
                className="font-headline text-[13px]"
              >
                {labels.right}
              </text>
            )}
            {labels.center && (
              <text
                x="95"
                y="84"
                textAnchor="middle"
                fill="#000000"
                className="font-headline text-[18px]"
              >
                {labels.center}
              </text>
            )}
          </svg>
        </div>
      );
    }

    if (shape === 'rectangle') {
      return (
        <div className="flex items-center justify-center my-2">
          <svg viewBox="0 0 240 150" className="w-56 h-36">
            <rect
              x="30"
              y="30"
              width="150"
              height="90"
              rx="6"
              fill={fillHex}
              stroke="#000000"
              strokeWidth="2.5"
            />
            {labels.top && (
              <text
                x="105"
                y="21"
                textAnchor="middle"
                fill="currentColor"
                className="font-headline text-[14px]"
              >
                {labels.top}
              </text>
            )}
            {labels.right && (
              <text
                x="188"
                y="80"
                textAnchor="start"
                fill="currentColor"
                className="font-headline text-[14px]"
              >
                {labels.right}
              </text>
            )}
            {labels.center && (
              <text
                x="105"
                y="81"
                textAnchor="middle"
                fill="#000000"
                className="font-headline text-[18px]"
              >
                {labels.center}
              </text>
            )}
          </svg>
        </div>
      );
    }

    // Triangle
    return (
      <div className="flex items-center justify-center my-2">
        <svg viewBox="0 0 220 155" className="w-52 h-36">
          <polygon
            points="110,20 40,122 180,122"
            fill={fillHex}
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {labels.left && (
            <text
              x="60"
              y="70"
              textAnchor="end"
              fill="currentColor"
              className="font-headline text-[14px]"
            >
              {labels.left}
            </text>
          )}
          {labels.right && (
            <text
              x="160"
              y="70"
              textAnchor="start"
              fill="currentColor"
              className="font-headline text-[14px]"
            >
              {labels.right}
            </text>
          )}
          {labels.bottom && (
            <text
              x="110"
              y="144"
              textAnchor="middle"
              fill="currentColor"
              className="font-headline text-[14px]"
            >
              {labels.bottom}
            </text>
          )}
          {labels.center && (
            <text
              x="110"
              y="98"
              textAnchor="middle"
              fill="#000000"
              className="font-headline text-[16px]"
            >
              {labels.center}
            </text>
          )}
        </svg>
      </div>
    );
  }

  return null;
};
