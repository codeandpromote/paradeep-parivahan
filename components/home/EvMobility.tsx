'use client';

/**
 * EV-Led Mobility (from the corporate slide). Intro banner + four benefit cards
 * with colour-coded top rules & titles, matching the deck.
 */

import { motion } from 'framer-motion';
import { Leaf, IndianRupee, Globe2, Landmark } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';

const CARDS = [
  { icon: Leaf, title: 'Lower Emissions', color: '#34d399', desc: 'EV fleet transition cuts Scope 1 CO₂ emissions directly and measurably.' },
  { icon: IndianRupee, title: 'Lower Operating Costs', color: '#f0c030', desc: 'EV total cost of ownership beats diesel over a 6-year fleet lifecycle.' },
  { icon: Globe2, title: 'Greener Future', color: '#2dd4bf', desc: "Contributing to India's Net Zero 2070 goal and EV30@30 national targets." },
  { icon: Landmark, title: 'Govt. Policy Aligned', color: '#f7cd4d', desc: 'Eligible for FAME II incentives, PLI scheme benefits and EV subsidies.' },
];

export default function EvMobility() {
  const { reducedMotion } = useAccessibility();
  return (
    <section className="relative border-t border-white/10 bg-ink-950 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-accent-400">Moving towards</p>
        <h2 className="font-display text-fluid-h2 font-bold uppercase leading-[1.02] text-white">EV-Led Mobility</h2>

        {/* Intro banner */}
        <div className="mt-8 rounded-lg border border-white/10 border-l-4 border-l-[#34d399] bg-ink-800 p-6">
          <p className="text-lg italic leading-relaxed text-slate-200">
            PPL is actively transitioning towards EV-based logistics solutions aligned with the
            Government of India’s sustainability and electrification vision — reducing emissions,
            lowering operating costs, and future-proofing India’s supply-chain infrastructure.
          </p>
        </div>

        {/* Benefit cards */}
        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.1)}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="show"
          viewport={viewportOnce}
        >
          {CARDS.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              className="flex flex-col items-center rounded-md border border-white/10 bg-ink-800 px-6 py-10 text-center"
              style={{ borderTop: `4px solid ${c.color}` }}
            >
              <span
                className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                style={{ color: c.color }}
              >
                <c.icon className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="font-display text-lg font-bold uppercase leading-tight" style={{ color: c.color }}>
                {c.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
