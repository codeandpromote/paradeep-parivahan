'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { resolveAsset } from '@/lib/images';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { GalleryImage } from '@/lib/content';

export default function PhotoGrid({ images }: { images: GalleryImage[] }) {
  const { reducedMotion } = useAccessibility();
  return (
    <motion.div
      className="mx-auto grid max-w-7xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer(0.06)}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      {images.map((g) => (
        <motion.figure key={g.id} variants={fadeUp} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-ink-800">
          <Image src={resolveAsset(g.image)} alt={g.caption || 'Photograph'} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 33vw" />
          {g.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4 text-sm text-white">
              {g.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </motion.div>
  );
}
