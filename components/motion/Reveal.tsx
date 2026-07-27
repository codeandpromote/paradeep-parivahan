'use client';

/**
 * <Reveal> — scroll-triggered reveal wrapper (whileInView).
 * Automatically disables animation when the user prefers reduced motion.
 */

import { motion, type Variants } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { ReactNode } from 'react';

export default function Reveal({
  children,
  variants = fadeUp,
  className,
  as = 'div',
  delay = 0,
}: {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
  delay?: number;
}) {
  const { reducedMotion } = useAccessibility();
  const MotionTag = motion[as] as typeof motion.div;

  if (reducedMotion) {
    const Tag = as as any;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
