'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { Users, Award, Globe2, Star } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

const STATS = [
  { icon: Users, value: 200, suffix: '+', label: 'Team Members' },
  { icon: Award, value: 64, suffix: '', label: 'Satisfied Clients' },
  { icon: Globe2, value: 7, suffix: '', label: 'Countries Covered' },
  { icon: Star, value: 9.4, suffix: '', label: 'Customer Rating', decimals: 1 },
];

export default function StatsCounter() {
  return (
    <section className="relative border-y border-white/10 bg-ink-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-0 md:grid-cols-4 md:divide-y-0">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  value,
  suffix,
  label,
  decimals = 0,
}: {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const { reducedMotion } = useAccessibility();

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reducedMotion]);

  return (
    <div className="group flex flex-col gap-1 px-6 py-10 transition-colors hover:bg-white/[0.03]">
      <Icon className="mb-2 h-6 w-6 text-accent-400" aria-hidden />
      <span ref={ref} className="font-display text-4xl font-bold text-white md:text-5xl">
        {display.toFixed(decimals)}
        <span className="text-accent-500">{suffix}</span>
      </span>
      <span className="text-sm uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  );
}
