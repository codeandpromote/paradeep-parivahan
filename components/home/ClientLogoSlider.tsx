'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { resolveAsset } from '@/lib/images';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { Client } from '@/lib/content';

/**
 * Infinite marquee of client logos. Rendered on the dark home section — each
 * logo sits on a white tile so brand-mark colours stay legible.
 * Duplicates the row once and slides at -50% so the loop is seamless.
 * Honours reduced-motion by rendering a static, wrapping grid instead.
 */
export default function ClientLogoSlider({ clients }: { clients: Client[] }) {
  const { reducedMotion } = useAccessibility();

  if (reducedMotion || clients.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {clients.map((c) => (
          <LogoTile key={c.id} client={c} />
        ))}
      </div>
    );
  }

  const row = [...clients, ...clients];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
      }}
    >
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: Math.max(20, clients.length * 3), ease: 'linear', repeat: Infinity }}
      >
        {row.map((c, i) => (
          <LogoTile key={`${c.id}-${i}`} client={c} />
        ))}
      </motion.div>
    </div>
  );
}

function LogoTile({ client }: { client: Client }) {
  return (
    <div className="flex h-24 w-48 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white p-4 transition hover:border-accent-400">
      <Image
        src={resolveAsset(client.logo)}
        alt={client.name}
        width={160}
        height={70}
        className="max-h-14 w-auto object-contain"
      />
    </div>
  );
}
