import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Job } from '../../types';

interface RadarChartProps {
  job1: Job;
  job2: Job;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  job1,
  job2,
  size = 340,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredDimension, setHoveredDimension] = useState<number | null>(null);

  // 6 evaluated dimensions for task automation vs human resiliency
  const dimensions = [
    { key: 'routineCognitive', label: 'Routine Cognitive', desc: 'Susceptible to LLM generation' },
    { key: 'dataProcessing', label: 'Data Processing', desc: 'Standardized spreadsheet / SQL transforms' },
    { key: 'humanEmpathy', label: 'Human Empathy', desc: 'Bedside manner & emotional nuance' },
    { key: 'physicalDexterity', label: 'Physical Dexterity', desc: 'Unstructured motor coordination' },
    { key: 'regulatoryMoat', label: 'Regulatory Moat', desc: 'Statutory liability under Indian law' },
    { key: 'strategicJudgment', label: 'Strategic Judgment', desc: 'High-stakes executive discretion' },
  ];

  // Compute 0-100 values for job dimensions based on score and sector characteristics
  const calculateDimensionValues = (job: Job) => {
    const isTech = job.sector === 'it-software';
    const isBPO = job.sector === 'bpo-customer-support';
    const isHealth = job.sector === 'healthcare';
    const isLegal = job.sector === 'legal-compliance';
    const isFinance = job.sector === 'banking-finance';
    const isEducation = job.sector === 'education';

    return {
      routineCognitive: Math.min(100, Math.round(job.score * 0.95 + 5)),
      dataProcessing: Math.min(100, Math.round(job.score * 0.9 + (isTech || isFinance ? 10 : 0))),
      humanEmpathy: Math.max(10, Math.round(100 - job.score * 0.85 + (isHealth || isEducation ? 15 : 0))),
      physicalDexterity: Math.max(10, Math.round(job.score < 40 ? 85 : job.score < 60 ? 45 : 15)),
      regulatoryMoat: Math.max(15, Math.round((isLegal || isHealth || isFinance ? 85 : 35) - job.score * 0.2)),
      strategicJudgment: Math.max(15, Math.round(100 - job.score * 0.75 + (isLegal || isTech ? 10 : 0))),
    };
  };

  const values1 = calculateDimensionValues(job1);
  const values2 = calculateDimensionValues(job2);

  const center = size / 2;
  const radius = size * 0.36;
  const totalPoints = dimensions.length;

  // Coordinate helper: angle 0 at top (-PI/2)
  const getCoordinates = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / totalPoints - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points string
  const points1 = dimensions
    .map((dim, i) => {
      const val = values1[dim.key as keyof typeof values1];
      const { x, y } = getCoordinates(i, val);
      return `${x},${y}`;
    })
    .join(' ');

  const points2 = dimensions
    .map((dim, i) => {
      const val = values2[dim.key as keyof typeof values2];
      const { x, y } = getCoordinates(i, val);
      return `${x},${y}`;
    })
    .join(' ');

  // Concentric polygon background grids (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible select-none"
        >
          <defs>
            <radialGradient id="radarSweepGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* Animated Sweeping Radar Beam (Subtle rotating line) */}
          {!shouldReduceMotion && (
            <g className="animate-radar-sweep origin-center">
              <line
                x1={center}
                y1={center}
                x2={center + radius * 1.1}
                y2={center}
                stroke="#0D9488"
                strokeWidth="1"
                strokeOpacity="0.4"
                strokeDasharray="2 4"
              />
            </g>
          )}

          {/* Background Concentric Polygon Grids */}
          {gridLevels.map((level, lvlIdx) => {
            const gridPoints = dimensions
              .map((_, i) => {
                const angle = (i * 2 * Math.PI) / totalPoints - Math.PI / 2;
                const r = level * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <polygon
                key={lvlIdx}
                points={gridPoints}
                fill={lvlIdx === gridLevels.length - 1 ? 'url(#radarSweepGrad)' : 'none'}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
                strokeDasharray={lvlIdx < 3 ? '2 3' : 'none'}
              />
            );
          })}

          {/* Axis Spoke Lines */}
          {dimensions.map((_, i) => {
            const angle = (i * 2 * Math.PI) / totalPoints - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            const isHovered = hoveredDimension === i;

            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                className={isHovered ? 'text-teal-600 dark:text-teal-400 stroke-2' : 'text-slate-200 dark:text-slate-800'}
                strokeWidth={isHovered ? '1.5' : '1'}
              />
            );
          })}

          {/* Polygon 1: Job 1 (Teal) */}
          {shouldReduceMotion ? (
            <polygon
              points={points1}
              fill="rgba(13, 148, 136, 0.28)"
              stroke="#0D9488"
              strokeWidth="2.5"
            />
          ) : (
            <motion.polygon
              points={points1}
              fill="rgba(13, 148, 136, 0.28)"
              stroke="#0D9488"
              strokeWidth="2.5"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}

          {/* Polygon 2: Job 2 (Amber / Orange) */}
          {shouldReduceMotion ? (
            <polygon
              points={points2}
              fill="rgba(217, 119, 6, 0.24)"
              stroke="#D97706"
              strokeWidth="2.5"
            />
          ) : (
            <motion.polygon
              points={points2}
              fill="rgba(217, 119, 6, 0.24)"
              stroke="#D97706"
              strokeWidth="2.5"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            />
          )}

          {/* Dimension Vertex Points with hover interaction */}
          {dimensions.map((dim, i) => {
            const val1 = values1[dim.key as keyof typeof values1];
            const val2 = values2[dim.key as keyof typeof values2];
            const coord1 = getCoordinates(i, val1);
            const coord2 = getCoordinates(i, val2);
            const angle = (i * 2 * Math.PI) / totalPoints - Math.PI / 2;
            const labelX = center + (radius + 24) * Math.cos(angle);
            const labelY = center + (radius + 18) * Math.sin(angle);
            const isHovered = hoveredDimension === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDimension(i)}
                onMouseLeave={() => setHoveredDimension(null)}
              >
                {/* Vertex circle for Job 1 */}
                <circle
                  cx={coord1.x}
                  cy={coord1.y}
                  r={isHovered ? '5.5' : '3.5'}
                  fill="#0D9488"
                  className="transition-all duration-200"
                />

                {/* Vertex circle for Job 2 */}
                <circle
                  cx={coord2.x}
                  cy={coord2.y}
                  r={isHovered ? '5.5' : '3.5'}
                  fill="#D97706"
                  className="transition-all duration-200"
                />

                {/* Dimension Label Text */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[10px] font-mono transition-colors ${
                    isHovered
                      ? 'fill-teal-700 dark:fill-teal-300 font-bold'
                      : 'fill-slate-600 dark:fill-slate-400'
                  }`}
                >
                  {dim.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Dimension Inspection Bar */}
      {hoveredDimension !== null ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-center max-w-sm"
        >
          <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
            {dimensions[hoveredDimension].label}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
            {dimensions[hoveredDimension].desc}
          </div>
          <div className="flex items-center justify-center gap-6 font-mono text-xs">
            <span className="text-teal-700 dark:text-teal-400 font-bold">
              {job1.title}: {values1[dimensions[hoveredDimension].key as keyof typeof values1]}%
            </span>
            <span className="text-amber-700 dark:text-amber-400 font-bold">
              {job2.title}: {values2[dimensions[hoveredDimension].key as keyof typeof values2]}%
            </span>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-center gap-6 mt-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-600" />
            <span className="text-slate-700 dark:text-slate-300">{job1.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-600" />
            <span className="text-slate-700 dark:text-slate-300">{job2.title}</span>
          </div>
        </div>
      )}
    </div>
  );
};
