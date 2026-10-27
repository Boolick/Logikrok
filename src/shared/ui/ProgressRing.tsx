import React from "react";
import { cn } from "../lib/utils";

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 88,
  strokeWidth = 12,
  className,
}) => {
  const outerBorder = 2;
  const radius = (size - strokeWidth - outerBorder * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative flex-shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Outer black stroke border of the track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          className="text-ink"
          strokeWidth={strokeWidth + 4}
        />
        {/* Inner peach/white track fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="var(--peach-paper)"
          strokeWidth={strokeWidth}
        />
        {/* Colored progress segment with crisp outline */}
        {clamped > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            stroke="#6ed311"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-headline text-lg sm:text-xl text-ink tabular-nums">
        {Math.round(clamped)}%
      </div>
    </div>
  );
};
