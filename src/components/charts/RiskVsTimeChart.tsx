import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Sector } from '../../types';

interface RiskVsTimeChartProps {
  sector: Sector;
}

export const RiskVsTimeChart: React.FC<RiskVsTimeChartProps> = ({ sector }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  // Generate 6 chronological points from 2024 to 2035 based on sector characteristics
  const years = ['2024', '2026', '2028', '2030', '2032', '2035'];

  // Trajectory calculation based on sector avgScore & timeline
  const calculatePoints = () => {
    const base = sector.avgScore;
    if (base >= 80) {
      // Steep immediate inflection (BPO, Media)
      return [35, 70, base, Math.min(95, base + 8), Math.min(98, base + 12), Math.min(99, base + 14)];
    }
    if (base >= 65) {
      // Moderate fast inflection (IT, Banking)
      return [25, 48, 68, base, Math.min(92, base + 10), Math.min(95, base + 12)];
    }
    if (base >= 45) {
      // Gradual steady transition (Retail, Manufacturing)
      return [15, 28, 42, base, Math.min(75, base + 12), Math.min(82, base + 16)];
    }
    // High human moats (Healthcare, Agriculture)
    return [8, 14, 22, 28, base, Math.min(52, base + 12)];
  };

  const points = calculatePoints();

  // SVG canvas dimensions
  const width = 640;
  const height = 230;
  const paddingX = 45;
  const paddingY = 32;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Coordinate mapper
  const getCoords = (index: number, val: number) => {
    const x = paddingX + (index / (years.length - 1)) * chartWidth;
    const y = height - paddingY - (val / 100) * chartHeight;
    return { x, y };
  };

  const coordinates = points.map((val, idx) => getCoords(idx, val));

  // Build SVG path string with smooth bezier curve
  const pathD = coordinates.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = coordinates[idx - 1];
    const cpX1 = prev.x + (curr.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (curr.x - prev.x) / 2;
    const cpY2 = curr.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
  }, '');

  // Closed area path for gradient
  const areaD = `${pathD} L ${coordinates[coordinates.length - 1].x} ${height - paddingY} L ${coordinates[0].x} ${height - paddingY} Z`;

  const activeCoord = activePointIndex !== null ? coordinates[activePointIndex] : null;

  return (
    <div ref={ref} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm my-6 relative overflow-hidden">
      {/* Background Subtle Coordinate Hatch */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none abstract-dots-bg" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 relative z-10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-teal-800 dark:text-teal-400 font-bold block">
            Adoption Trajectory Simulation
          </span>
          <h3 className="text-base sm:text-lg font-serif-heading font-bold text-slate-900 dark:text-slate-100">
            Projected Task Automation vs. Time ({sector.name})
          </h3>
        </div>
        <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Interactive Horizon: <strong>2024 – 2035</strong></span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[540px] h-auto overflow-visible select-none"
          onMouseLeave={() => setActivePointIndex(null)}
        >
          <defs>
            <linearGradient id={`grad-${sector.slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#0D9488" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
            </linearGradient>

            <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines (25%, 50%, 75%, 100%) */}
          {[25, 50, 75, 100].map((level) => {
            const y = height - paddingY - (level / 100) * chartHeight;
            return (
              <g key={level}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800/80"
                  strokeWidth="0.75"
                  strokeDasharray="3 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] font-mono fill-slate-400 dark:fill-slate-500"
                >
                  {level}%
                </text>
              </g>
            );
          })}

          {/* Fill Area with Gradient */}
          <path d={areaD} fill={`url(#grad-${sector.slug})`} />

          {/* Animated Line Stroke */}
          {shouldReduceMotion ? (
            <path
              d={pathD}
              fill="none"
              stroke="#0D9488"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ) : (
            <motion.path
              d={pathD}
              fill="none"
              stroke="#0D9488"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Active Hover Guide Hairline */}
          {activeCoord && (
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              x1={activeCoord.x}
              y1={paddingY - 10}
              x2={activeCoord.x}
              y2={height - paddingY}
              stroke="#0D9488"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className="pointer-events-none"
            />
          )}

          {/* Data Points and Value Badges */}
          {coordinates.map((coord, idx) => {
            const isActive = activePointIndex === idx;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setActivePointIndex(idx)}
              >
                {/* Invisible larger hover target */}
                <circle cx={coord.x} cy={coord.y} r="18" fill="transparent" />

                {/* Pulsing ring on active node */}
                {isActive && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="10"
                    fill="none"
                    stroke="#0D9488"
                    strokeWidth="1.5"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Outer halo */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isActive ? '7' : '4.5'}
                  fill="#FAF8F4"
                  stroke="#0D9488"
                  strokeWidth={isActive ? '3' : '2'}
                  className="dark:fill-slate-900 transition-all duration-200"
                />

                {/* Score label above node */}
                <text
                  x={coord.x}
                  y={coord.y - 10}
                  textAnchor="middle"
                  className={`text-[10px] font-mono font-bold transition-all ${
                    isActive ? 'fill-teal-700 dark:fill-teal-300 text-[11px]' : 'fill-slate-700 dark:fill-slate-300'
                  }`}
                >
                  {points[idx]}%
                </text>

                {/* Year label below baseline */}
                <text
                  x={coord.x}
                  y={height - paddingY + 16}
                  textAnchor="middle"
                  className={`text-[10px] font-mono transition-colors ${
                    isActive ? 'fill-teal-700 dark:fill-teal-300 font-bold' : 'fill-slate-400'
                  }`}
                >
                  {years[idx]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip Indicator */}
        <AnimatePresence>
          {activePointIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="mt-3 p-3 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-mono text-teal-900 dark:text-teal-200 flex items-center justify-between"
            >
              <span>
                Year <strong>{years[activePointIndex]}</strong>: Projected <strong>{points[activePointIndex]}%</strong> task automation exposure
              </span>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-sans">
                {points[activePointIndex] >= 80 ? 'Heavy agentic substitution' : points[activePointIndex] >= 50 ? 'Accelerated copilot integration' : 'Core human workflow resilient'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span>* Hover nodes to inspect milestone automation estimates based on Indian enterprise tech adoption.</span>
        <span className="font-mono">Baseline: {sector.avgScore}/100 index</span>
      </div>
    </div>
  );
};
