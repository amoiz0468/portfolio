import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
};

// Apple-style custom cubic-bezier curve
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  className = '',
  delay = 0,
  yOffset = 40,
  duration = 0.8,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, simply fade in with no transform
  if (shouldReduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: APPLE_EASE,
      }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
