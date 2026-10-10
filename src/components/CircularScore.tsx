import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { RiskLabel, ConfidenceLevel } from '../types';
import { CountUp } from './animations/CountUp';

interface CircularScoreProps {
  score: number;
  label: RiskLabel;
  confidence?: ConfidenceLevel;
  timeline?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  label,
  confidence,
  timeline,
  size = 'md',
  showDetails = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const shouldReduceMotion = useReducedMotion();

  // Score styling logic
  const getColor = (val: number) => {
    if (val < 40) {
      return {
        stroke: '#0D9488',
        glow: 'rgba(13, 148, 136, 0.25)',
        text: 'text-teal-700 dark:text-teal-400',
        badge: 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      };
    }
    if (val < 60) {
      return {
        stroke: '#D97706',
        glow: 'rgba(217, 119, 6, 0.25)',
        text: 'text-amber-700 dark:text-amber-400',
        badge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    }
    if (val < 80) {
      return {
        stroke: '#EA580C',
        glow: 'rgba(234, 88, 12, 0.25)',
        text: 'text-orange-700 dark:text-orange-400',
        badge: 'bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      };
    }
    return {
      stroke: '#DC2626',
      glow: 'rgba(220, 38, 38, 0.25)',
      text: 'text-rose-700 dark:text-rose-400',
      badge: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    };
  };

  const { stroke, glow, text, badge } = getColor(score);

  const dimensions = {
    sm: { diameter: 80, strokeWidth: 7, radius: 31, fontSize: 'text-xl', labelSize: 'text-[10px]' },
    md: { diameter: 136, strokeWidth: 10, radius: 54, fontSize: 'text-3xl', labelSize: 'text-xs' },
    lg: { diameter: 180, strokeWidth: 13, radius: 72, fontSize: 'text-5xl', labelSize: 'text-sm' },
  }[size];

  const circumference = 2 * Math.PI * dimensions.radius;
  const targetOffset = circumference - (score / 100) * circumference;

  // Calculate coordinates of the leading beacon point along the arc
  const angle = (score / 100) * 2 * Math.PI - Math.PI / 2;
  const center = dimensions.diameter / 2;
  const beaconX = center + dimensions.radius * Math.cos(angle);
  const beaconY = center + dimensions.radius * Math.sin(angle);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <motion.div
        whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative inline-flex items-center justify-center cursor-default select-none"
      >
        {/* Soft Ambient Radial Glow Behind Gauge */}
        <div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-700 opacity-60"
          style={{ backgroundColor: glow }}
        />

        <svg
          width={dimensions.diameter}
          height={dimensions.diameter}
          className="transform -rotate-90 drop-shadow-sm overflow-visible"
          aria-label={`AI Exposure Score ${score} out of 100`}
        >
          {/* Subtle Rotating Outer Radar Ring */}
          {!shouldReduceMotion && size !== 'sm' && (
            <circle
              cx={center}
              cy={center}
              r={dimensions.radius + dimensions.strokeWidth + 4}
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 8"
              fill="transparent"
              className="text-slate-300/60 dark:text-slate-700/60 animate-spin-slow origin-center"
            />
          )}

          {/* Background Track Circle */}
          <circle
            cx={center}
            cy={center}
            r={dimensions.radius}
            stroke="currentColor"
            strokeWidth={dimensions.strokeWidth}
            fill="transparent"
            className="text-slate-100 dark:text-slate-800/80"
          />

          {/* Animated Progress Circle */}
          {shouldReduceMotion ? (
            <circle
              cx={center}
              cy={center}
              r={dimensions.radius}
              stroke={stroke}
              strokeWidth={dimensions.strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={targetOffset}
              strokeLinecap="round"
              fill="transparent"
            />
          ) : (
            <motion.circle
              cx={center}
              cy={center}
              r={dimensions.radius}
              stroke={stroke}
              strokeWidth={dimensions.strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={isInView ? { strokeDashoffset: targetOffset } : { strokeDashoffset: circumference }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              strokeLinecap="round"
              fill="transparent"
            />
          )}

          {/* Glowing Animated Beacon on Progress Head */}
          {!shouldReduceMotion && isInView && score > 3 && (
            <g className="transform rotate-90 origin-center">
              <circle
                cx={beaconX}
                cy={beaconY}
                r={dimensions.strokeWidth * 0.7}
                fill={stroke}
                className="opacity-75"
              />
              <circle
                cx={beaconX}
                cy={beaconY}
                r={dimensions.strokeWidth * 1.5}
                fill={stroke}
                className="animate-ping opacity-40 origin-center"
              />
            </g>
          )}
        </svg>

        {/* Center Text with Animated CountUp */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`font-serif-heading font-black tracking-tight leading-none ${dimensions.fontSize} ${text}`}
          >
            <CountUp to={score} duration={1.2} />
          </motion.div>
          <span className={`font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest ${dimensions.labelSize} -mt-0.5`}>
            / 100
          </span>
        </div>
      </motion.div>

      {/* Label, Confidence, and Timeline Details */}
      {showDetails && (
        <div className="mt-3 space-y-1">
          <div className="inline-flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${badge}`}>
              {label} Exposure
            </span>
          </div>

          {(timeline || confidence) && (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 pt-1">
              {timeline && (
                <span>
                  Window: <strong className="text-slate-700 dark:text-slate-300 font-mono">{timeline}</strong>
                </span>
              )}
              {timeline && confidence && <span aria-hidden="true">·</span>}
              {confidence && (
                <span>
                  Confidence: <strong className="text-slate-700 dark:text-slate-300">{confidence}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
