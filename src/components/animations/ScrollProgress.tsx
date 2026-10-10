import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="scroll-progress fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-teal-600 via-teal-500 to-amber-500 origin-left z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
};
