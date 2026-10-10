import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FloatingChip {
  title: string;
  slug: string;
  risk: 'Low' | 'Moderate' | 'High' | 'Very High';
  score: number;
  initialX: number; // percentage
  initialY: number; // percentage
  depth: number; // 1 to 3 parallax depth
  floatDuration: number;
}

export const HeroDriftingChips: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth - 0.5) * 40;
      const normalizedY = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const chips: FloatingChip[] = [
    { title: 'Software QA Tester', slug: 'software-qa-tester', risk: 'High', score: 79, initialX: 8, initialY: 14, depth: 1.2, floatDuration: 7 },
    { title: 'Bank Clerk', slug: 'bank-clerk', risk: 'Very High', score: 82, initialX: 82, initialY: 16, depth: 0.9, floatDuration: 8.5 },
    { title: 'BPO Executive', slug: 'customer-support-executive', risk: 'Very High', score: 88, initialX: 74, initialY: 48, depth: 1.5, floatDuration: 6.8 },
    { title: 'Content Writer', slug: 'content-writer', risk: 'Very High', score: 84, initialX: 12, initialY: 66, depth: 1.1, floatDuration: 7.8 },
    { title: 'Chartered Accountant', slug: 'chartered-accountant', risk: 'Moderate', score: 54, initialX: 6, initialY: 44, depth: 0.8, floatDuration: 9 },
    { title: 'Staff Nurse', slug: 'staff-nurse', risk: 'Low', score: 18, initialX: 86, initialY: 68, depth: 1.3, floatDuration: 8 },
    { title: 'High School Teacher', slug: 'high-school-teacher', risk: 'Low', score: 26, initialX: 42, initialY: 84, depth: 1.0, floatDuration: 7.2 },
    { title: 'Civil Engineer', slug: 'civil-site-engineer', risk: 'Low', score: 32, initialX: 28, initialY: 20, depth: 0.7, floatDuration: 9.5 },
    { title: 'Data Analyst', slug: 'data-analyst', risk: 'Moderate', score: 58, initialX: 66, initialY: 22, depth: 1.4, floatDuration: 6.5 },
  ];

  const getRiskBorder = (score: number) => {
    if (score >= 80) return 'border-rose-300 dark:border-rose-900/60 hover:border-rose-500 text-rose-900 dark:text-rose-200 bg-rose-50/40 dark:bg-rose-950/20';
    if (score >= 60) return 'border-orange-300 dark:border-orange-900/60 hover:border-orange-500 text-orange-900 dark:text-orange-200 bg-orange-50/40 dark:bg-orange-950/20';
    if (score >= 40) return 'border-amber-300 dark:border-amber-900/60 hover:border-amber-500 text-amber-900 dark:text-amber-200 bg-amber-50/40 dark:bg-amber-950/20';
    return 'border-teal-300 dark:border-teal-900/60 hover:border-teal-500 text-teal-900 dark:text-teal-200 bg-teal-50/40 dark:bg-teal-950/20';
  };

  const getDotColor = (score: number) => {
    if (score >= 80) return 'bg-rose-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-teal-500';
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* Subtle orbital vector lines in background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.10] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="45%" r="280" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" className="animate-spin-slow" />
        <circle cx="50%" cy="45%" r="420" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" className="animate-spin-reverse-slow" />
      </svg>

      {chips.map((chip, idx) => {
        const isHovered = hoveredSlug === chip.slug;
        const colorClasses = getRiskBorder(chip.score);
        const dotColor = getDotColor(chip.score);

        return (
          <motion.div
            key={idx}
            style={{
              left: `${chip.initialX}%`,
              top: `${chip.initialY}%`,
              x: shouldReduceMotion ? 0 : smoothMouseX,
              y: shouldReduceMotion ? 0 : smoothMouseY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : [0.35, 0.65, 0.35],
              scale: isHovered ? 1.05 : [0.98, 1.02, 0.98],
              y: shouldReduceMotion ? 0 : [0, -10 * chip.depth, 0],
            }}
            transition={{
              opacity: { duration: chip.floatDuration, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: chip.floatDuration * 1.2, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: chip.floatDuration, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute hidden sm:inline-block pointer-events-auto"
            onMouseEnter={() => setHoveredSlug(chip.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <Link
              to={`/jobs/${chip.slug}`}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-xs border transition-all duration-300 shadow-2xs hover:shadow-md ${colorClasses}`}
            >
              <span className={`w-2 h-2 rounded-full ${dotColor} ${chip.score >= 80 ? 'animate-pulse' : ''}`} />
              <span className="font-sans font-medium text-slate-800 dark:text-slate-100 group-hover:underline">
                {chip.title}
              </span>
              <span className="text-[10px] opacity-75 font-mono">
                {chip.score}%
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};
