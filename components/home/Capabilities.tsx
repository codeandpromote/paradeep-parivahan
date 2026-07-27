'use client';

/**
 * Capabilities — explains each TYPE OF WORK through a bespoke animated SVG
 * whose motion depicts the actual activity (crane lifts, excavator digs,
 * truck rolls, ore loads a ship, dredger ripples, train runs).
 * Animation uses SMIL so pivots animate reliably; gated off on reduced-motion.
 */

import Reveal from '@/components/motion/Reveal';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/animations';
import { motion } from 'framer-motion';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { ReactNode } from 'react';

const STEEL = '#7fb0e6';
const GOLD = '#f0c030';
const GOLD_D = '#e0aa14';
const NAVY = '#0a1c3a';
const NAVY_L = '#17418f';

export default function Capabilities() {
  const { reducedMotion } = useAccessibility();
  const R = !reducedMotion; // render SMIL only when motion allowed

  const ITEMS: { title: string; desc: string; svg: ReactNode }[] = [
    {
      title: 'Stevedoring & Port Operations',
      desc: 'Ship-to-shore cargo handling, intra-port transportation, vessel husbandry and rake handling across eastern India.',
      svg: <CraneIcon on={R} />,
    },
    {
      title: 'Dredging & Reclamation',
      desc: 'High-impact dredging, land reclamation, breakwater construction and stone pitching across the East Coast and South-East Asia.',
      svg: <DredgerIcon on={R} />,
    },
    {
      title: 'Trading — Mines to Mills to Market',
      desc: 'Sourcing and shipping iron ore, coal, coke, manganese and aluminium to domestic and international buyers.',
      svg: <LoadingShipIcon on={R} />,
    },
    {
      title: 'Logistics & Transportation',
      desc: 'A 350+ strong fleet of dumpers, tippers, trailers and trucks moving bulk material safely, efficiently, 24×7.',
      svg: <TruckIcon on={R} />,
    },
    {
      title: 'Railway Siding Operations',
      desc: 'Round-the-clock rake handling and end-to-end cargo movement at dedicated railway sidings.',
      svg: <TrainIcon on={R} />,
    },
  ];

  return (
    <section className="relative border-t border-white/10 bg-ink-950 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> How we operate
          </p>
          <h2 className="font-display text-fluid-h2 font-bold leading-[1.02] text-white">
            Our disciplines, <span className="text-gradient">one integrated operation</span>
          </h2>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="show"
          viewport={viewportOnce}
        >
          {ITEMS.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="group overflow-hidden rounded-lg border border-white/10 bg-ink-900 transition hover:border-accent-500/50"
            >
              <div className="relative border-b border-white/10 bg-gradient-to-b from-ink-800 to-ink-900">
                {it.svg}
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- shared frame ---------- */
function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 240 150" className="h-40 w-full" role="img" aria-label={label}>
      <line x1="0" y1="126" x2="240" y2="126" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {children}
    </svg>
  );
}

/* ---------- 1. Stevedoring: quay crane lifts a container ---------- */
function CraneIcon({ on }: { on: boolean }) {
  return (
    <Frame label="Quay crane lifting a container">
      {/* gantry */}
      <g stroke={STEEL} strokeWidth="3" fill="none">
        <line x1="70" y1="126" x2="70" y2="40" />
        <line x1="110" y1="126" x2="110" y2="40" />
        <line x1="60" y1="40" x2="200" y2="40" />
        <line x1="90" y1="24" x2="70" y2="40" />
        <line x1="90" y1="24" x2="120" y2="40" />
      </g>
      {/* trolley + lifting container */}
      <g>
        {on && (
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -34; 0 0" keyTimes="0;0.5;1" dur="3.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.16 1 0.3 1;0.16 1 0.3 1" />
        )}
        <rect x="160" y="36" width="16" height="8" fill={STEEL} />
        <line x1="168" y1="44" x2="168" y2="92" stroke={GOLD} strokeWidth="1.5" />
        <rect x="150" y="92" width="36" height="22" rx="2" fill={GOLD} />
        <line x1="150" y1="103" x2="186" y2="103" stroke={GOLD_D} strokeWidth="1" />
      </g>
      {/* dock stack */}
      <g>
        <rect x="16" y="104" width="34" height="20" rx="2" fill={NAVY_L} />
        <rect x="16" y="86" width="34" height="16" rx="2" fill={STEEL} opacity="0.8" />
      </g>
    </Frame>
  );
}

/* ---------- 2. Transportation: dumper truck rolling ---------- */
function TruckIcon({ on }: { on: boolean }) {
  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy="112" r="11" fill={NAVY} stroke={STEEL} strokeWidth="2.5" />
      <g>
        {on && (
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} 112`} to={`360 ${cx} 112`} dur="1.4s" repeatCount="indefinite" />
        )}
        <line x1={cx} y1="104" x2={cx} y2="120" stroke={STEEL} strokeWidth="2" />
        <line x1={cx - 8} y1="112" x2={cx + 8} y2="112" stroke={STEEL} strokeWidth="2" />
      </g>
    </g>
  );
  return (
    <Frame label="Dumper truck in motion">
      {/* speed lines */}
      <g stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.7">
        {[70, 84, 60].map((y, i) => (
          <line key={i} x1="10" y1={y} x2="40" y2={y}>
            {on && (
              <animate attributeName="opacity" values="0;0.8;0" dur="1.1s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            )}
          </line>
        ))}
      </g>
      {/* body */}
      <g>
        {on && (
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -1.5; 0 0" dur="0.5s" repeatCount="indefinite" />
        )}
        <path d="M60,100 L60,74 L150,74 L150,100 Z" fill={GOLD} />
        <path d="M150,100 L150,84 L172,84 L184,100 Z" fill={NAVY_L} />
        <rect x="156" y="72" width="14" height="12" fill={STEEL} />
        <rect x="64" y="62" width="82" height="12" fill={GOLD_D} />
      </g>
      {wheel(84)}
      {wheel(120)}
      {wheel(164)}
    </Frame>
  );
}

/* ---------- 3. Mining: excavator digs ---------- */
function ExcavatorIcon({ on }: { on: boolean }) {
  return (
    <Frame label="Excavator digging">
      {/* tracks + cab */}
      <rect x="24" y="112" width="86" height="12" rx="6" fill={NAVY} stroke={STEEL} strokeWidth="1.5" />
      <rect x="40" y="86" width="46" height="26" rx="3" fill={NAVY_L} />
      <rect x="70" y="74" width="20" height="16" rx="2" fill={STEEL} opacity="0.85" />
      {/* articulated arm — rotates at shoulder pivot (86,92) */}
      <g>
        {on && (
          <animateTransform attributeName="transform" type="rotate" values="0 86 92; 20 86 92; 20 86 92; 0 86 92" keyTimes="0;0.35;0.6;1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1" />
        )}
        <line x1="86" y1="92" x2="130" y2="66" stroke={GOLD} strokeWidth="7" strokeLinecap="round" />
        <line x1="130" y1="66" x2="150" y2="96" stroke={GOLD} strokeWidth="6" strokeLinecap="round" />
        {/* bucket */}
        <path d="M146,94 L162,90 L160,106 L150,108 Z" fill={GOLD_D} stroke={GOLD} strokeWidth="1.5" />
      </g>
      {/* dirt pile */}
      <path d="M150,124 q14,-14 28,0 Z" fill={STEEL} opacity="0.5" />
    </Frame>
  );
}

/* ---------- 4. Trading: ore loads a bulk carrier ---------- */
function LoadingShipIcon({ on }: { on: boolean }) {
  return (
    <Frame label="Loading a bulk carrier with ore">
      {/* chute */}
      <path d="M150,20 L188,20 L172,52 L156,52 Z" fill={STEEL} opacity="0.85" />
      {/* falling ore */}
      {on &&
        [0, 0.5, 1].map((d, i) => (
          <circle key={i} cx={164} r="3.5" fill={GOLD}>
            <animate attributeName="cy" values="52;92" dur="1.4s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.8;1" dur="1.4s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}
      {/* ship */}
      <g>
        {on && (
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="3s" repeatCount="indefinite" />
        )}
        <path d="M40,96 L200,96 L184,120 L56,120 Z" fill={NAVY} stroke={STEEL} strokeWidth="1.5" />
        <rect x="120" y="80" width="56" height="16" fill={NAVY_L} />
        {/* accumulating ore in hold */}
        <rect x="126" y="86" width="44" height="8" rx="2" fill={GOLD} opacity="0.9" />
      </g>
      {/* water */}
      <g stroke={STEEL} strokeWidth="2" opacity="0.3">
        <line x1="30" y1="132" x2="90" y2="132" />
        <line x1="120" y1="136" x2="200" y2="136" />
      </g>
    </Frame>
  );
}

/* ---------- 5. Dredging: suction pipe with expanding ripples ---------- */
function DredgerIcon({ on }: { on: boolean }) {
  return (
    <Frame label="Dredger with suction pipe">
      {/* vessel */}
      <g>
        {on && (
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="3.2s" repeatCount="indefinite" />
        )}
        <path d="M56,84 L150,84 L138,104 L68,104 Z" fill={NAVY} stroke={STEEL} strokeWidth="1.5" />
        <rect x="88" y="70" width="26" height="14" fill={NAVY_L} />
        <rect x="120" y="66" width="6" height="18" fill={STEEL} />
        {/* suction pipe into seabed */}
        <line x1="132" y1="96" x2="176" y2="122" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* expanding ripples at cutter head */}
      {on &&
        [0, 1].map((d) => (
          <circle key={d} cx="178" cy="124" r="4" fill="none" stroke={GOLD} strokeWidth="2">
            <animate attributeName="r" values="4;20" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}
      {/* water surface */}
      <g stroke={STEEL} strokeWidth="2" opacity="0.3">
        <line x1="20" y1="112" x2="70" y2="112" />
        <line x1="196" y1="110" x2="228" y2="110" />
      </g>
    </Frame>
  );
}

/* ---------- 6. Railway siding: train runs, sleepers stream past ---------- */
function TrainIcon({ on }: { on: boolean }) {
  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy="112" r="8" fill={NAVY} stroke={STEEL} strokeWidth="2" />
      <g>
        {on && (
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} 112`} to={`360 ${cx} 112`} dur="1s" repeatCount="indefinite" />
        )}
        <line x1={cx} y1="106" x2={cx} y2="118" stroke={STEEL} strokeWidth="1.5" />
      </g>
    </g>
  );
  return (
    <Frame label="Train at a railway siding">
      {/* rail */}
      <line x1="0" y1="122" x2="240" y2="122" stroke={STEEL} strokeWidth="2" />
      {/* streaming sleepers = sense of motion */}
      <g stroke={STEEL} strokeWidth="3" opacity="0.35">
        {[0, 30, 60, 90, 120, 150, 180, 210].map((x) => (
          <line key={x} x1={x} y1="122" x2={x + 8} y2="122" />
        ))}
        {on && (
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-30 0" dur="0.7s" repeatCount="indefinite" />
        )}
      </g>
      {/* smoke */}
      {on &&
        [0, 0.6].map((d, i) => (
          <circle key={i} cx="52" cy="52" r="5" fill={STEEL} opacity="0.4">
            <animate attributeName="cy" values="52;30" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}
      {/* loco + wagons */}
      <g>
        <rect x="40" y="74" width="40" height="30" rx="3" fill={NAVY_L} />
        <rect x="48" y="60" width="10" height="14" fill={STEEL} />
        <rect x="62" y="82" width="14" height="12" fill={STEEL} opacity="0.85" />
        <rect x="92" y="84" width="46" height="20" rx="2" fill={GOLD} />
        <rect x="150" y="84" width="46" height="20" rx="2" fill={GOLD_D} />
      </g>
      {wheel(52)}
      {wheel(72)}
      {wheel(104)}
      {wheel(126)}
      {wheel(162)}
      {wheel(184)}
    </Frame>
  );
}
