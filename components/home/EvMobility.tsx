'use client';

/**
 * EV-Led (from the corporate slide). Intro banner + four benefit cards.
 * Uses the site's canonical accent/ink/slate tokens across every card so this
 * section reads as part of the same visual system as the rest of the site.
 */

import { motion } from 'framer-motion';
import { Leaf, IndianRupee, Globe2, Landmark } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';

const CARDS = [
  { icon: Leaf, title: 'Lower Emissions', desc: 'EV fleet transition cuts Scope 1 CO₂ emissions directly and measurably.' },
  { icon: IndianRupee, title: 'Lower Operating Costs', desc: 'EV total cost of ownership beats diesel over a 6-year fleet lifecycle.' },
  { icon: Globe2, title: 'Greener Future', desc: "Contributing to India's Net Zero 2070 goal and EV30@30 national targets." },
  { icon: Landmark, title: 'Govt. Policy Aligned', desc: 'Eligible for FAME II incentives, PLI scheme benefits and EV subsidies.' },
];

export default function EvMobility() {
  const { reducedMotion } = useAccessibility();
  return (
    <section className="relative border-t border-white/10 bg-ink-950 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
          <span className="h-px w-8 bg-accent-500" /> Moving towards
        </p>
        <h2 className="font-display text-fluid-h2 font-bold uppercase leading-[1.02] text-white">EV-Led</h2>

        {/* Intro banner */}
        <div className="mt-8 rounded-lg border border-white/10 border-l-4 border-l-accent-400 bg-ink-800 p-6">
          <p className="text-lg italic leading-relaxed text-slate-200">
            PPL is actively transitioning towards EV-based logistics solutions aligned with the
            Government of India&rsquo;s sustainability and electrification vision &mdash; reducing emissions,
            lowering operating costs, and future-proofing India&rsquo;s supply-chain infrastructure.
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
              className="flex flex-col items-center rounded-md border border-white/10 border-t-4 border-t-accent-400 bg-ink-800 px-6 py-10 text-center transition hover:border-accent-500/50"
            >
              <span className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-accent-400">
                <c.icon className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="font-display text-lg font-bold uppercase leading-tight text-white">
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
