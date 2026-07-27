'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { resolveAsset } from '@/lib/images';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { TeamMember } from '@/lib/content';

export default function PersonGrid({ people }: { people: TeamMember[] }) {
  const { reducedMotion } = useAccessibility();
  return (
    <motion.div
      className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer(0.08)}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      {people.map((m) => (
        <motion.div key={m.id} variants={fadeUp} className="overflow-hidden rounded-xl border border-white/10 bg-ink-900">
          <div className="relative aspect-[4/5] bg-ink-800">
            <Image src={resolveAsset(m.photo)} alt={m.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 33vw" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-accent-400" />
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-white">{m.name}</h3>
            <p className="text-sm font-medium text-accent-400">{m.designation}</p>
            {m.bio && <p className="mt-3 text-sm leading-relaxed text-slate-400">{m.bio}</p>}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
