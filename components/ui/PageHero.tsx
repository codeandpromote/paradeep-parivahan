'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Ship } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { EASE_OUT } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Interior-page hero with a meaningful shared motion motif:
 *   - image ken-burns (slow zoom)
 *   - breadcrumb + title fade-up
 *   - gold underline that draws in beneath the title
 *   - a "shipping route" line at the bottom whose dashes flow while a small
 *     vessel glides along it — a subtle brand-wide nod to movement/logistics.
 *
 * Client feedback: the photo should read clearly. So the image sits at high
 * opacity and the darkening is intentionally light — a bottom-anchored
 * gradient for the route/underline zone, a soft left scrim only behind the
 * text column, and a small radial gold tint. The title carries its own
 * drop-shadow so it stays legible over brighter footage.
 * All motion respects reduced-motion.
 */
export default function PageHero({
  title,
  subtitle,
  image = IMAGES.placeholderWide,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  const { reducedMotion } = useAccessibility();

  return (
    <section
      data-speak={title}
      className="relative -mt-[92px] flex min-h-[440px] items-end overflow-hidden bg-ink-950 md:min-h-[520px]"
    >
      {/* Photo — high opacity so it reads clearly, with a slow ken-burns push */}
      <motion.div
        className={['absolute inset-0', reducedMotion ? '' : 'animate-kenburns'].join(' ')}
        initial={reducedMotion ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      >
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-90"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Bottom-anchored gradient — keeps the route line + text base grounded
          while leaving the upper 60% of the photo essentially clear. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      {/* Left scrim, only behind the text column, for legibility */}
      <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-ink-950/70 via-ink-950/25 to-transparent" />
      {/* Subtle radial gold tint */}
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-28 text-white [text-shadow:0_1px_16px_rgba(3,8,26,0.55)] md:pb-20 md:pt-32">
        <motion.nav
          aria-label="Breadcrumb"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-3 flex flex-wrap items-center gap-1 text-sm text-brand-100"
        >
          <Link href="/" className="hover:text-accent-300">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
              {c.href ? (
                <Link href={c.href} className="hover:text-accent-300">{c.label}</Link>
              ) : (
                <span className="text-white/90">{c.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
          className="max-w-3xl font-display text-fluid-h2 font-bold leading-tight drop-shadow-[0_2px_20px_rgba(3,8,26,0.6)]"
        >
          {title}
        </motion.h1>

        {/* underline draws in */}
        <motion.span
          aria-hidden
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
          className="mt-4 block h-[3px] w-24 origin-left rounded-full bg-accent-400 shadow-[0_0_16px_rgba(240,192,48,0.55)]"
        />

        {subtitle && (
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
            className="mt-4 max-w-2xl text-slate-200"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* shipping-route motif */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12" aria-hidden>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <motion.line
            x1="0" y1="34" x2="1440" y2="34"
            stroke="#f0c030" strokeWidth="1.5" strokeDasharray="6 10"
            vectorEffect="non-scaling-stroke" opacity="0.55"
            animate={reducedMotion ? undefined : { strokeDashoffset: [0, -64] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
        {!reducedMotion && (
          <motion.div
            className="absolute bottom-2 text-accent-400 drop-shadow-[0_0_8px_rgba(240,192,48,0.7)]"
            initial={{ left: '-3%' }}
            animate={{ left: '103%' }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Ship className="h-5 w-5" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
