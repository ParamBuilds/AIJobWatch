import React from 'react';

interface AbstractPosterProps {
  variant?: 'hero' | 'section' | 'footer' | 'card';
  className?: string;
}

export const AbstractPoster: React.FC<AbstractPosterProps> = ({
  variant = 'section',
  className = '',
}) => {
  if (variant === 'hero') {
    return (
      <div className={`relative overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 800 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-40 dark:opacity-20"
        >
          {/* Abstract topological contour curves */}
          <path
            d="M-50 180 C 150 80, 300 220, 500 130 C 650 60, 750 160, 850 110"
            stroke="currentColor"
            className="text-teal-600 dark:text-teal-400"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 140 C 180 40, 320 200, 520 90 C 680 10, 760 140, 850 70"
            stroke="currentColor"
            className="text-teal-700 dark:text-teal-500"
            strokeWidth="1.5"
          />
          <path
            d="M-50 210 C 120 120, 280 240, 480 160 C 630 110, 730 200, 850 150"
            stroke="currentColor"
            className="text-amber-600 dark:text-amber-400"
            strokeWidth="1"
          />

          {/* Coordinate intersection marks */}
          <circle cx="200" cy="110" r="3" className="fill-teal-600" />
          <circle cx="500" cy="130" r="3" className="fill-amber-600" />
          <circle cx="680" cy="80" r="2.5" className="fill-teal-700" />

          {/* Grid crosshairs */}
          <line x1="190" y1="110" x2="210" y2="110" stroke="currentColor" strokeWidth="0.8" className="text-slate-400" />
          <line x1="200" y1="100" x2="200" y2="120" stroke="currentColor" strokeWidth="0.8" className="text-slate-400" />
          <line x1="490" y1="130" x2="510" y2="130" stroke="currentColor" strokeWidth="0.8" className="text-slate-400" />
          <line x1="500" y1="120" x2="500" y2="140" stroke="currentColor" strokeWidth="0.8" className="text-slate-400" />
        </svg>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`relative overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 1000 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-30 dark:opacity-15"
        >
          {/* Abstract geometric rhythm */}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x, i) => (
            <g key={i}>
              <line
                x1={x}
                y1="10"
                x2={x}
                y2="110"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="2 3"
                className="text-slate-400"
              />
              <circle
                cx={x}
                cy={60 + Math.sin(i * 0.8) * 35}
                r="2.5"
                className="fill-teal-700 dark:fill-teal-400"
              />
            </g>
          ))}
          <path
            d="M 50 60 C 250 15, 450 105, 650 35 C 800 -10, 900 85, 950 60"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-teal-600 dark:text-teal-400"
          />
        </svg>
      </div>
    );
  }

  // Section banner poster
  return (
    <div className={`relative overflow-hidden select-none pointer-events-none rounded-xl ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto opacity-35 dark:opacity-20"
      >
        <path
          d="M 0 40 Q 150 5, 300 40 T 600 40"
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-teal-600 dark:text-teal-400"
        />
        <path
          d="M 0 50 Q 150 15, 300 50 T 600 50"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          className="text-amber-600 dark:text-amber-400"
        />
        <circle cx="150" cy="22" r="3" className="fill-teal-600" />
        <circle cx="450" cy="22" r="3" className="fill-amber-600" />
      </svg>
    </div>
  );
};
