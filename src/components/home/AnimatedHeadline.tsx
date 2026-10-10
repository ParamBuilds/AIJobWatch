import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

export const AnimatedHeadline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const line1Words = ['Will', 'AI', 'take', 'your', 'job', 'in', 'India?'];
  const line2Words = ['And', 'when?'];

  if (shouldReduceMotion) {
    return (
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15]">
        Will AI take your job in India?{' '}
        <span className="italic font-normal text-teal-800 dark:text-teal-400">
          And when?
        </span>
      </h1>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-3xl sm:text-5xl lg:text-6xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15]"
    >
      <span className="inline-block">
        {line1Words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={wordVariants}
            className="inline-block mr-[0.28em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </span>{' '}
      <br className="hidden sm:inline" />
      <span className="inline-block italic font-normal text-teal-800 dark:text-teal-400">
        {line2Words.map((word, idx) => (
          <motion.span
            key={`l2-${idx}`}
            variants={wordVariants}
            className="inline-block mr-[0.28em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
};
