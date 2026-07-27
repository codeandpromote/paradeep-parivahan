'use client';

import { motion } from 'framer-motion';
import { EASE_OUT, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';

/** Eyebrow + heading with a gold underline that draws in on scroll. */
export default function SectionHeading({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
}) {
  const { reducedMotion } = useAccessibility();
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-accent-500" /> {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold text-white md:text-3xl">{title}</h2>
      <motion.span
        aria-hidden
        initial={reducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className={`mt-3 block h-[3px] w-16 origin-left rounded-full bg-accent-400 ${center ? 'mx-auto' : ''}`}
      />
    </div>
  );
}
