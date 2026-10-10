import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);

      if (scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 no-print"
        >
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
            aria-label="Back to top"
            title={`Scroll to top (${Math.round(scrollProgress * 100)}% read)`}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:outline-none transition-colors group"
          >
            {/* Circular SVG Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#0D9488"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>

            <ArrowUp className="w-4 h-4 text-teal-800 dark:text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
