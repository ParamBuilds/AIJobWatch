import React from 'react';
import { RiskLabel } from '../../types';

interface AbstractMetricGlyphProps {
  score: number;
  label: RiskLabel;
  size?: number;
  className?: string;
}

export const AbstractMetricGlyph: React.FC<AbstractMetricGlyphProps> = ({
  score,
  label,
  size = 36,
  className = '',
}) => {
  const getColors = () => {
    switch (label) {
      case 'Very High':
        return { primary: '#EF4444', secondary: '#F87171' };
      case 'High':
        return { primary: '#F97316', secondary: '#FB923C' };
      case 'Moderate':
        return { primary: '#F59E0B', secondary: '#FBBF24' };
      case 'Low':
      default:
        return { primary: '#10B981', secondary: '#34D399' };
    }
  };

  const { primary, secondary } = getColors();

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circular coordinate ring */}
        <circle
          cx="20"
          cy="20"
          r="17"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="2 2"
          className="text-slate-300 dark:text-slate-700"
        />

        {/* Diagonal crosshairs */}
        <line
          x1="20"
          y1="5"
          x2="20"
          y2="35"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-slate-300 dark:text-slate-700"
        />
        <line
          x1="5"
          y1="20"
          x2="35"
          y2="20"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-slate-300 dark:text-slate-700"
        />

        {/* Dynamic geometric glyph depending on score tier */}
        {score >= 75 && (
          // Concentric target arcs
          <>
            <polygon
              points="20,8 32,20 20,32 8,20"
              stroke={primary}
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="20" cy="20" r="3.5" fill={primary} />
          </>
        )}

        {score >= 60 && score < 75 && (
          // Concentric triangle tensor
          <>
            <polygon
              points="20,7 33,30 7,30"
              stroke={primary}
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="20" cy="22" r="3" fill={secondary} />
          </>
        )}

        {score >= 40 && score < 60 && (
          // Concentric squares
          <>
            <rect
              x="10"
              y="10"
              width="20"
              height="20"
              stroke={primary}
              strokeWidth="1.5"
              fill="none"
              transform="rotate(45 20 20)"
            />
            <circle cx="20" cy="20" r="2.5" fill={primary} />
          </>
        )}

        {score < 40 && (
          // Hexagonal / circular resilience shield
          <>
            <circle
              cx="20"
              cy="20"
              r="12"
              stroke={primary}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 15 20 L 19 24 L 26 16"
              stroke={primary}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
};
