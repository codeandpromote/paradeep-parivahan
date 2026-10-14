'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award as AwardIcon } from 'lucide-react';
import { resolveAsset } from '@/lib/images';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { Award } from '@/lib/content';

/**
 * Awards & recognition — premium framed layout.
 *
 * Source images have wildly inconsistent aspect ratios (portrait certificates,
 * landscape trophies, tall shields). We fix a 4:3 display frame per card and
 * letterbox each image with `object-contain` so every tile is the same size
 * and the grid reads as one clean set. A soft off-white tile keeps
 * certificates legible; a gold accent bar + hover lift ties the block into
 * the rest of the site.
 */
export default function AwardsGrid({ awards }: { awards: Award[] }) {
  const { reducedMotion } = useAccessibility();
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
          <span className="h-px w-8 bg-accent-500" /> Recognition
        </p>
        <h2 className="font-display text-fluid-h2 font-bold leading-[1.02] text-white">
          Honoured for <span className="text-gradient">operational excellence</span>
        </h2>
        <p className="mt-4 text-slate-400">
          Awards and recognitions received from industry bodies and government agencies for our
          contribution to logistics, port operations and sustainable growth.
        </p>
      </div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer(0.08)}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="show"
        viewport={viewportOnce}
      >
        {awards.map((a, i) => (
          <motion.article
            key={a.id}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition hover:-translate-y-1 hover:border-accent-500/60 hover:shadow-glow"
          >
            {/* Top accent rule */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-500/0 via-accent-400 to-accent-500/0 opacity-70 transition group-hover:opacity-100" />

            {/* Fixed-aspect frame — every card the same size regardless of source ratio */}
            <div className="relative flex aspect-[4/3] items-center justify-center bg-[#f7f8fb] p-6">
              <Image
                src={resolveAsset(a.image)}
                alt={a.title || 'Award'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Badge */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink-950/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-300 backdrop-blur">
                <AwardIcon className="h-3 w-3" aria-hidden />
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Caption strip — reads well even when no title/date is present */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
              <p className="text-sm font-medium text-slate-100">
                {a.title || 'Award & Recognition'}
              </p>
              {a.award_date && (
                <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-semibold text-accent-300">
                  {a.award_date}
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
