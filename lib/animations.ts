/**
 * Framer Motion variant library — AM/NS-inspired motion language.
 * Centralised so every component shares the same easing / timing feel.
 * Respect reduced-motion: components read `useAccessibility().reducedMotion`
 * and pass `initial={false}` / skip animation, OR rely on the CSS media guard.
 */

import type { Variants } from 'framer-motion';

// Signature easing — smooth, slightly weighted (AM/NS-like).
// Typed as an explicit cubic-bezier tuple so it satisfies framer's Easing type.
type Bezier = [number, number, number, number];
export const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: Bezier = [0.65, 0, 0.35, 1];

/** Fade + rise — the default scroll reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/** Fade + rise, larger travel — hero sub-elements */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Slide from left/right — for split layouts */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Stagger container — children animate in sequence */
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** SVG line-draw (hero waves / underlines) */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 2, ease: EASE_IN_OUT }, opacity: { duration: 0.3 } },
  },
};

/** Count-up numbers helper timing */
export const COUNTER_DURATION = 1.8;

/** Shared viewport config for whileInView — trigger once, a bit early */
export const viewportOnce = { once: true, amount: 0.25 } as const;
