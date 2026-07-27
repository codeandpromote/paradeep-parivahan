'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { resolveAsset } from '@/lib/images';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';

/** Grid of image+title cards (activities, commodities, …). */
export default function CardGrid({ items }: { items: { id: number; title: string; image?: string }[] }) {
  const { reducedMotion } = useAccessibility();
  return (
    <motion.div
      className="mx-auto grid max-w-7xl gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer(0.08)}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      {items.map((it) => (
        <motion.div key={it.id} variants={fadeUp} className="group overflow-hidden rounded-xl border border-white/10 bg-ink-900">
          <div className="relative h-52 overflow-hidden bg-ink-800">
            {it.image && (
              <Image
                src={resolveAsset(it.image)}
                alt={it.title}
                fill
                className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                sizes="(max-width:1024px) 100vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg font-semibold text-white">{it.title}</h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
