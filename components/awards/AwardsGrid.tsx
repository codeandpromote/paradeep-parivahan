'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { resolveAsset } from '@/lib/images';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { Award } from '@/lib/content';

export default function AwardsGrid({ awards }: { awards: Award[] }) {
  const { reducedMotion } = useAccessibility();
  return (
    <motion.div
      className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer(0.06)}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      {awards.map((a) => (
        <motion.div key={a.id} variants={fadeUp} className="flex flex-col items-center rounded-xl border border-white/10 bg-white p-6">
          <Image src={resolveAsset(a.image)} alt={a.title || 'Award'} width={260} height={200} className="h-auto w-full object-contain" />
          {a.title && <p className="mt-3 text-center text-sm font-medium text-ink-900">{a.title}{a.award_date ? ` · ${a.award_date}` : ''}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
}
