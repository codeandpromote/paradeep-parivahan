'use client';

/**
 * Renders the "Major Areas of Operation" grid with a bespoke animated SVG per
 * item (keyed by `icon`). SMIL animations are gated off under reduced motion.
 */

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { ServiceArea } from '@/lib/content';
import type { ReactNode } from 'react';

const LINE = '#e8edf6';
const GOLD = '#f0c030';
const GOLD_D = '#e0aa14';
const STEEL = '#7fb0e6';

export default function MajorAreasClient({ areas }: { areas: ServiceArea[] }) {
  const { reducedMotion } = useAccessibility();
  const on = !reducedMotion;

  return (
    <section className="relative border-t border-white/10 bg-ink-950 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> Our operations
          </p>
          <h2 className="font-display text-fluid-h2 font-bold leading-[1.02] text-white">
            Our major areas of <span className="text-gradient">operation</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Powering logistics across the eastern seaboard — the full spectrum of port, plant and
            mining logistics, delivered with reliability, speed and scale.
          </p>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.08)}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="show"
          viewport={viewportOnce}
        >
          {areas.map((a) => (
            <motion.div
              key={a.id}
              variants={fadeUp}
              className="group overflow-hidden rounded-xl border border-white/10 bg-ink-900 transition hover:border-accent-500/50"
            >
              <div className="relative border-b border-white/10 bg-gradient-to-b from-ink-800 to-ink-900">
                {icon(a.icon, on)}
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold leading-snug text-white">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
function Tile({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 120 96" className="h-24 w-full" role="img" aria-label={label}>
      <line x1="8" y1="84" x2="112" y2="84" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      {children}
    </svg>
  );
}
const S = { stroke: LINE, strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function icon(key: string, on: boolean): ReactNode {
  switch (key) {
    case 'port-handling': return <Forklift on={on} />;
    case 'mine-to-port': return <Dumper on={on} />;
    case 'heavy-equipment': return <Loader on={on} />;
    case 'earthmoving': return <Excavator on={on} />;
    case 'fabrication': return <Fabrication on={on} />;
    case 'rmc': return <Mixer on={on} />;
    case 'dredging': return <Dredger on={on} />;
    case 'stevedoring':
    default: return <Crane on={on} />;
  }
}

/* 1 — Stevedoring: quay crane lifts a container */
function Crane({ on }: { on: boolean }) {
  return (
    <Tile label="Quay crane">
      <g {...S}>
        <line x1="34" y1="84" x2="34" y2="30" />
        <line x1="54" y1="84" x2="54" y2="30" />
        <line x1="26" y1="30" x2="106" y2="30" />
        <line x1="44" y1="18" x2="34" y2="30" />
        <line x1="44" y1="18" x2="72" y2="30" />
        <line x1="34" y1="56" x2="54" y2="56" />
      </g>
      <g>
        {on && <animateTransform attributeName="transform" type="translate" values="0 0;0 -18;0 0" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />}
        <line x1="88" y1="30" x2="88" y2="56" stroke={GOLD} strokeWidth="2" />
        <rect x="76" y="56" width="24" height="16" rx="2" fill="none" stroke={GOLD} strokeWidth="2.5" />
      </g>
    </Tile>
  );
}

/* 2 — Port handling: forklift raises a box */
function Forklift({ on }: { on: boolean }) {
  return (
    <Tile label="Forklift">
      <g {...S}>
        <path d="M34,74 L34,54 L54,54 L60,64 L70,64 L70,74 Z" />
        <line x1="42" y1="54" x2="42" y2="44" />
        <line x1="54" y1="54" x2="42" y2="44" />
        <line x1="70" y1="74" x2="70" y2="32" />
      </g>
      <circle cx="44" cy="78" r="6" {...S} />
      <circle cx="62" cy="78" r="6" {...S} />
      <g>
        {on && <animateTransform attributeName="transform" type="translate" values="0 0;0 -16;0 0" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />}
        <line x1="70" y1="70" x2="92" y2="70" stroke={LINE} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="74" y="50" width="20" height="20" rx="1" fill="none" stroke={GOLD} strokeWidth="2.5" />
      </g>
    </Tile>
  );
}

/* 3 — Mine-to-port: dumper truck rolls */
function Dumper({ on }: { on: boolean }) {
  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy="78" r="7" {...S} />
      {on && (
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} 78`} to={`360 ${cx} 78`} dur="1.4s" repeatCount="indefinite" />
          <line x1={cx} y1="72" x2={cx} y2="84" stroke={LINE} strokeWidth="2" />
          <line x1={cx - 6} y1="78" x2={cx + 6} y2="78" stroke={LINE} strokeWidth="2" />
        </g>
      )}
    </g>
  );
  return (
    <Tile label="Dumper truck">
      <g stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
        {[46, 56, 40].map((y, i) => (
          <line key={i} x1="10" y1={y} x2="26" y2={y}>
            {on && <animate attributeName="opacity" values="0;0.9;0" dur="1.1s" begin={`${i * 0.22}s`} repeatCount="indefinite" />}
          </line>
        ))}
      </g>
      <g>
        {on && <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="0.5s" repeatCount="indefinite" />}
        <path d="M34,70 L34,50 L66,50 L66,70 Z" fill="none" stroke={GOLD} strokeWidth="2.5" />
        <path d="M66,70 L66,58 L80,58 L88,70 Z" {...S} />
        <rect x="70" y="60" width="10" height="8" {...S} />
      </g>
      {wheel(46)}
      {wheel(82)}
    </Tile>
  );
}

/* 4 — Heavy equipment: wheel loader tilts its bucket */
function Loader({ on }: { on: boolean }) {
  return (
    <Tile label="Wheel loader">
      <g {...S}>
        <path d="M56,72 L56,54 L66,54 L66,46 L82,46 L82,72 Z" />
        <rect x="68" y="48" width="12" height="8" />
      </g>
      <circle cx="62" cy="76" r="8" {...S} />
      <circle cx="84" cy="76" r="8" {...S} />
      <g>
        {on && <animateTransform attributeName="transform" type="rotate" values="0 56 66; -12 56 66; -12 56 66; 0 56 66" keyTimes="0;0.4;0.6;1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1" />}
        <line x1="56" y1="66" x2="34" y2="68" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        <path d="M34,60 L24,60 L24,72 L36,72 Z" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </Tile>
  );
}

/* 5 — Earthmoving: excavator digs */
function Excavator({ on }: { on: boolean }) {
  return (
    <Tile label="Excavator">
      <rect x="36" y="74" width="44" height="9" rx="4.5" {...S} />
      <rect x="46" y="54" width="24" height="20" rx="2" {...S} />
      <rect x="52" y="46" width="12" height="8" rx="1" {...S} />
      <g>
        {on && <animateTransform attributeName="transform" type="rotate" values="0 70 64; -15 70 64; -15 70 64; 0 70 64" keyTimes="0;0.4;0.6;1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1" />}
        <line x1="70" y1="64" x2="94" y2="50" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="94" y1="50" x2="102" y2="70" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        <path d="M99,68 L108,66 L106,78 L98,78 Z" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </Tile>
  );
}

/* 6 — Specialized fabrication: welding a steel frame, sparks fly */
function Fabrication({ on }: { on: boolean }) {
  return (
    <Tile label="Steel fabrication">
      <g {...S}>
        <rect x="30" y="62" width="52" height="10" />
        <line x1="56" y1="62" x2="56" y2="44" />
        <rect x="46" y="36" width="20" height="8" />
      </g>
      {/* torch */}
      <line x1="94" y1="34" x2="66" y2="48" stroke={STEEL} strokeWidth="3" strokeLinecap="round" />
      <line x1="66" y1="48" x2="60" y2="52" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
      {/* weld flash + sparks */}
      {on && (
        <>
          <circle cx="60" cy="53" r="3" fill={GOLD}>
            <animate attributeName="r" values="2;5;2" dur="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite" />
          </circle>
          {[0, 0.25, 0.5, 0.75].map((d, i) => (
            <circle key={i} cx="60" cy="53" r="1.6" fill={GOLD_D}>
              <animate attributeName="cx" values={`60;${48 + i * 5}`} dur="0.9s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`53;${70 + (i % 2) * 6}`} dur="0.9s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="0.9s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </>
      )}
    </Tile>
  );
}

/* 7 — Infrastructure & RMC: concrete mixer, drum turns */
function Mixer({ on }: { on: boolean }) {
  return (
    <Tile label="Concrete mixer">
      <g {...S}>
        <line x1="26" y1="72" x2="92" y2="72" />
        <path d="M74,72 L74,52 L86,52 L92,64 L92,72 Z" />
        <rect x="76" y="54" width="10" height="8" />
        <line x1="74" y1="66" x2="94" y2="78" />
      </g>
      {/* drum */}
      <g>
        <path d="M34,68 q-8,-16 8,-22 l18,-6 q16,-4 18,12 q2,14 -14,18 l-18,4 q-8,2 -12,-6 Z" {...S} />
        {/* rotating mixing stripes */}
        <g>
          {on && <animateTransform attributeName="transform" type="rotate" from="0 52 56" to="360 52 56" dur="3.5s" repeatCount="indefinite" />}
          <line x1="44" y1="48" x2="60" y2="64" stroke={GOLD} strokeWidth="2" />
          <line x1="60" y1="48" x2="44" y2="64" stroke={GOLD} strokeWidth="2" />
        </g>
      </g>
      <circle cx="42" cy="78" r="6" {...S} />
      <circle cx="82" cy="78" r="6" {...S} />
    </Tile>
  );
}

/* 8 — Dredging: dredger vessel, suction pipe, expanding ripples */
function Dredger({ on }: { on: boolean }) {
  return (
    <Tile label="Dredger">
      <g>
        {on && <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="3.2s" repeatCount="indefinite" />}
        <path d="M30,54 L82,54 L74,68 L44,68 Z" {...S} />
        <rect x="46" y="42" width="16" height="12" {...S} />
        <line x1="70" y1="42" x2="70" y2="54" {...S} />
        <line x1="72" y1="62" x2="98" y2="80" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
      </g>
      {on &&
        [0, 1].map((d) => (
          <circle key={d} cx="99" cy="82" r="3" fill="none" stroke={GOLD} strokeWidth="2">
            <animate attributeName="r" values="3;14" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}
      <g stroke={STEEL} strokeWidth="2" opacity="0.3">
        <line x1="16" y1="80" x2="40" y2="80" />
        <line x1="108" y1="78" x2="118" y2="78" />
      </g>
    </Tile>
  );
}
