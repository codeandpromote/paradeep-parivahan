'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { resolveAsset } from '@/lib/images';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { Client } from '@/lib/content';

export default function LogoGrid({ clients }: { clients: Client[] }) {
  const { reducedMotion } = useAccessibility();
  return (
    <motion.div
      className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      variants={staggerContainer(0.05)}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      {clients.map((c) => (
        <motion.div
          key={c.id}
          variants={fadeUp}
          className="flex h-28 items-center justify-center rounded-xl border border-white/10 bg-white p-5 transition hover:border-accent-400"
        >
          <Image src={resolveAsset(c.logo)} alt={c.name} width={160} height={70} className="max-h-16 w-auto object-contain" />
        </motion.div>
      ))}
    </motion.div>
  );
}
