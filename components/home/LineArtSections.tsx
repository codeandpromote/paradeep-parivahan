'use client';

/**
 * Two full-bleed line-art horizon bands with distinct narrative animation.
 *   1) LineArtPort  — cargo through the port: stock → van → crane lifts
 *      containers → container ship. (unit cargo)  White line-art on navy.
 *   2) LineArtFleet — mines to the market: excavator extracts → dumper hauls →
 *      conveyor pours bulk ore → bulk carrier. Navy line-art on brand gold.
 *
 * Composition: a compact horizon (short band, no empty void) with atmosphere
 * (sun, clouds, birds, distant hills), a filled waterline, and evenly-spaced
 * elements tied by a dashed route line — nothing overlaps. Structure draws in
 * on scroll (Framer pathLength); machinery loops via SMIL. Reduced-motion safe.
 */

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { EASE_IN_OUT } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';
import type { ReactNode } from 'react';

const GROUND = 300;
const WL = 316; // waterline

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.6, ease: EASE_IN_OUT }, opacity: { duration: 0.3 } } },
};
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.035 } } };

function Band({ bg, title, href, linkClass, titleClass, children, reduced, viewBox }: {
  bg: string; title: string; href: string; linkClass: string; titleClass: string; children: ReactNode; reduced: boolean; viewBox: string;
}) {
  return (
    <section className={`relative w-full overflow-hidden ${bg}`}>
      <div className="mx-auto max-w-[1600px] px-6 pt-14 md:pt-20 text-center">
        <h2 className={`font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl ${titleClass}`}>{title}</h2>
        <Link href={href} className={`mt-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] transition sm:text-sm sm:tracking-[0.35em] ${linkClass}`}>
          Know more
        </Link>
      </div>
      {/* Phones: the band scales up to a legible height and pans horizontally.
          md+: fills the width at its native aspect ratio. */}
      <div className="mt-4 overflow-x-auto md:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <motion.svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet"
          className="h-[200px] w-auto max-w-none md:h-auto md:w-full" variants={container}
          initial={reduced ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.3 }} aria-hidden>
          {children}
        </motion.svg>
      </div>
    </section>
  );
}

function Tree({ x, base, S, s = 1 }: { x: number; base: number; S: any; s?: number }) {
  const r = 40 * s;
  return (
    <g>
      <motion.path variants={draw} {...S}
        d={`M${x},${base} C${x - r},${base - 8} ${x - r * 1.3},${base - r * 1.6} ${x - r * 0.5},${base - r * 2.1} C${x - r * 0.3},${base - r * 2.9} ${x + r * 0.7},${base - r * 2.9} ${x + r * 0.9},${base - r * 2.0} C${x + r * 1.6},${base - r * 1.8} ${x + r * 1.4},${base - r * 0.5} ${x + r * 0.6},${base - 6} C${x + r * 0.5},${base - 2} ${x + r * 0.1},${base - 2} ${x},${base} Z`} />
      <motion.path variants={draw} {...S} d={`M${x + 4 * s},${base} C${x + 4 * s},${base - 30 * s} ${x + 12 * s},${base - 40 * s} ${x + 20 * s},${base - 44 * s}`} />
    </g>
  );
}
/** Detailed vessel that sits on waterline `wl`. */
function Vessel({ x, w, deckH, S, accent, bulk = false }: { x: number; w: number; deckH: number; S: any; accent: string; bulk?: boolean }) {
  const deckY = WL - deckH, rx = x + w, cx = x + w / 2;
  return (
    <>
      <motion.path variants={draw} {...S} d={`M${x + 16},${deckY} L${rx - 16},${deckY} L${rx},${WL} Q${cx},${WL + 12} ${x},${WL} Z`} />
      {bulk ? (
        <>
          <motion.rect variants={draw} {...S} x={x + 28} y={deckY - 2} width={w - 56} height={deckH - 6} />
          <motion.path variants={draw} {...S} d={`M${x + 40},${deckY + deckH - 10} q${(w - 80) / 2},-20 ${w - 80},0`} />
          <motion.rect variants={draw} {...S} x={rx - 26} y={deckY - 22} width="18" height="22" />{/* deckhouse */}
          <motion.line variants={draw} {...S} x1={x + 20} y1={deckY} x2={x + 20} y2={deckY - 26} />{/* mast */}
        </>
      ) : (
        <>
          {Array.from({ length: Math.floor((w - 90) / 42) }).map((_, i) => (
            <motion.rect key={i} variants={draw} {...S} x={x + 28 + i * 42} y={deckY - 26} width="34" height="26" />
          ))}
          <motion.path variants={draw} {...S} d={`M${rx - 44},${deckY} L${rx - 44},${deckY - 36} L${rx - 10},${deckY - 36} L${rx - 10},${deckY}`} />
          <motion.path variants={draw} {...S} d={`M${rx - 32},${deckY - 36} L${rx - 32},${deckY - 52} L${rx - 20},${deckY - 52} L${rx - 20},${deckY - 36}`} />
        </>
      )}
      {/* portholes */}
      <motion.path variants={draw} {...S} d={`M${x + 40},${WL - 8} h${w - 80}`} opacity="0.5" />
      {/* accent waterline stripe */}
      <line x1={x + 6} y1={WL - 2} x2={rx - 6} y2={WL - 2} stroke={accent} strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.7" />
    </>
  );
}
function Wheel({ cx, S, anim }: { cx: number; S: any; anim: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={0} r={12} {...S} />
      {anim && (
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} 0`} to={`360 ${cx} 0`} dur="1.3s" repeatCount="indefinite" />
          <line x1={cx} y1={-9} x2={cx} y2={9} stroke={S.stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <line x1={cx - 9} y1={0} x2={cx + 9} y2={0} stroke={S.stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </g>
      )}
    </g>
  );
}
function Truck({ S, anim, ore = false }: { S: any; anim: boolean; ore?: boolean }) {
  return (
    <g>
      <path d="M-104,-14 L-104,-60 L8,-60 L8,-14 Z" {...S} />
      <path d={ore ? 'M-98,-60 q46,-18 96,0' : 'M-96,-60 q44,-15 92,0'} {...S} />
      <path d="M8,-14 L8,-44 L38,-44 L56,-14 Z" {...S} />
      <rect x="14" y="-42" width="18" height="16" {...S} />
      <Wheel cx={-76} S={S} anim={anim} />
      <Wheel cx={38} S={S} anim={anim} />
    </g>
  );
}

/* ====================================================================== */
export function LineArtPort() {
  const { reducedMotion } = useAccessibility();
  const anim = !reducedMotion;
  const S = { stroke: '#e8edf6', strokeWidth: 2, fill: 'none', vectorEffect: 'non-scaling-stroke' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const GOLD = '#f0c030', QUAY = 900;

  return (
    <Band bg="bg-ink-950" title="How cargo moves through our ports" href="/about/cargo-handling"
      titleClass="text-white" linkClass="text-slate-400 hover:text-accent-300" reduced={reducedMotion} viewBox="0 12 1440 322">
      {/* waterline + quay wall (plain line-art, no fill / no waves) */}
      <motion.line variants={draw} {...S} x1={QUAY} y1={WL} x2="1440" y2={WL} />
      <motion.path variants={draw} {...S} d={`M${QUAY},${GROUND} L${QUAY},${WL}`} />
      {/* land ground + dashed route */}
      <motion.line variants={draw} {...S} x1="0" y1={GROUND} x2={QUAY} y2={GROUND} />
      <motion.path variants={draw} {...S} d={`M60,${GROUND + 20} L${QUAY - 24},${GROUND + 20}`} stroke={GOLD} strokeDasharray="7 10" opacity="0.5" />

      <Tree x={92} base={GROUND} S={S} s={1.15} />
      <Tree x={182} base={GROUND} S={S} s={0.75} />

      {/* industrial stock */}
      {[[236, 3], [290, 2]].map(([x, h], ci) =>
        Array.from({ length: h as number }).map((_, r) => (
          <motion.rect key={`${ci}-${r}`} variants={draw} {...S} x={x as number} y={GROUND - 22 - r * 24} width="46" height="24" rx="2" />
        ))
      )}
      <motion.rect variants={draw} {...S} x="352" y={GROUND - 30} width="28" height="30" rx="3" />

      {/* cargo van — travels in a clear lane between the stock and the crane */}
      {anim ? (
        <g transform={`translate(0 ${GROUND})`}>
          <animateTransform attributeName="transform" type="translate" values={`500 ${GROUND}; 648 ${GROUND}`} dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.12;0.5;0.86;1" dur="6s" repeatCount="indefinite" />
          <Truck S={S} anim />
        </g>
      ) : (<g transform={`translate(560 ${GROUND})`}><Truck S={S} anim={false} /></g>)}

      {/* gantry crane (tall — fills vertical) */}
      <motion.path variants={draw} {...S} d={`M712,${GROUND} L712,72 M804,${GROUND} L804,72 M712,168 L804,168`} />
      <motion.path variants={draw} {...S} d="M680,72 L1092,72" />
      <motion.path variants={draw} {...S} d="M758,30 L680,72 M758,30 L900,72" />
      {anim && (
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;250 0;250 0;0 0" keyTimes="0;0.12;0.46;0.6;1" dur="6.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1" />
          <rect x="748" y="66" width="22" height="10" fill="none" stroke="#e8edf6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </g>
      )}
      {anim ? (
        <g>
          <rect x="-24" y="-14" width="48" height="28" rx="2" fill="none" stroke={GOLD} strokeWidth="2" vectorEffect="non-scaling-stroke">
            <animate attributeName="opacity" values="1;1;1;0;0;1" keyTimes="0;0.12;0.62;0.66;0.96;1" dur="6.5s" repeatCount="indefinite" />
          </rect>
          <animateMotion dur="6.5s" repeatCount="indefinite" keyPoints="0;0.08;0.5;0.62;0.62;1" keyTimes="0;0.12;0.46;0.62;0.96;1" calcMode="linear"
            path={`M762,${GROUND - 16} L762,88 L1014,88 L1014,${WL - 40} L1014,${WL - 40} L762,${GROUND - 16}`} />
        </g>
      ) : (<rect x="990" y={WL - 54} width="48" height="28" rx="2" fill="none" stroke={GOLD} strokeWidth="2" />)}

      {/* container ship */}
      <g className={anim ? 'anim-ship-bob' : ''}><Vessel x={1000} w={362} deckH={48} S={S} accent={GOLD} /></g>
    </Band>
  );
}

/* ====================================================================== */
export function LineArtFleet() {
  const { reducedMotion } = useAccessibility();
  const anim = !reducedMotion;
  const S = { stroke: '#04102a', strokeWidth: 2, fill: 'none', vectorEffect: 'non-scaling-stroke' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const NAVY = '#04102a', ACC = '#04102a', QUAY = 1060;
  // pivot for the excavator boom (front of the cab)
  const PVX = 530, PVY = GROUND - 40;

  return (
    <Band bg="bg-accent-400" title="From the mines to the market" href="/about/bulk-trading"
      titleClass="text-ink-950" linkClass="text-ink-900 hover:text-ink-950" reduced={reducedMotion} viewBox="0 116 1440 218">
      {/* waterline + quay wall (plain line-art, no fill / no waves) */}
      <motion.line variants={draw} {...S} x1={QUAY} y1={WL} x2="1440" y2={WL} />
      <motion.path variants={draw} {...S} d={`M${QUAY},${GROUND} L${QUAY},${WL}`} />
      <motion.line variants={draw} {...S} x1="0" y1={GROUND} x2={QUAY} y2={GROUND} />
      {/* haul route: mine → port hopper */}
      <motion.path variants={draw} {...S} d={`M600,${GROUND + 20} L914,${GROUND + 20}`} stroke={ACC} strokeDasharray="7 10" opacity="0.55" />

      <Tree x={80} base={GROUND} S={S} s={0.95} />

      {/* mine mound + entrance + ore heap */}
      <motion.path variants={draw} {...S} d={`M150,${GROUND} C220,${GROUND - 120} 380,${GROUND - 120} 450,${GROUND}`} />
      <motion.path variants={draw} {...S} d={`M258,${GROUND} L258,${GROUND - 44} C258,${GROUND - 66} 314,${GROUND - 66} 314,${GROUND - 44} L314,${GROUND}`} />
      <motion.path variants={draw} {...S} d={`M270,${GROUND} L270,${GROUND - 28} M286,${GROUND} L286,${GROUND - 32} M302,${GROUND} L302,${GROUND - 28}`} opacity="0.5" />
      <motion.path variants={draw} {...S} d={`M150,${GROUND} q26,-20 52,0 Z`} />
      {[164, 178, 192].map((cx, i) => (<motion.circle key={i} variants={draw} {...S} cx={cx} cy={GROUND - 12} r="4" />))}

      {/* EXCAVATOR — sits on flat ground right of the mine, boom digs its right slope */}
      <motion.rect variants={draw} {...S} x="452" y={GROUND - 18} width="116" height="16" rx="8" />
      <motion.rect variants={draw} {...S} x="474" y={GROUND - 46} width="58" height="28" rx="3" />
      <motion.rect variants={draw} {...S} x="480" y={GROUND - 60} width="22" height="14" rx="2" />
      <g>
        {anim && <animateTransform attributeName="transform" type="rotate" values={`0 ${PVX} ${PVY}; -15 ${PVX} ${PVY}; -15 ${PVX} ${PVY}; 0 ${PVX} ${PVY}`} keyTimes="0;0.4;0.6;1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1" />}
        <line x1={PVX} y1={PVY} x2="454" y2={GROUND - 82} stroke={NAVY} strokeWidth="7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <line x1="454" y1={GROUND - 82} x2="416" y2={GROUND - 30} stroke={NAVY} strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d={`M420,${GROUND - 32} L402,${GROUND - 22} L410,${GROUND - 4} L426,${GROUND - 14} Z`} {...S} />
      </g>

      {/* DUMPER — hauls ore along a clear lane from the mine to the hopper */}
      {anim ? (
        <g transform={`translate(0 ${GROUND})`}>
          <animateTransform attributeName="transform" type="translate" values={`690 ${GROUND}; 860 ${GROUND}`} dur="6.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.1;0.5;0.86;1" dur="6.5s" repeatCount="indefinite" />
          <Truck S={S} anim ore />
        </g>
      ) : (<g transform={`translate(790 ${GROUND})`}><Truck S={S} anim={false} ore /></g>)}

      {/* HOPPER — receives ore from the dumper, feeds the conveyor */}
      <motion.path variants={draw} {...S} d={`M924,${GROUND - 48} L996,${GROUND - 48} L974,${GROUND - 6} L946,${GROUND - 6} Z`} />
      <motion.path variants={draw} {...S} d={`M948,${GROUND - 6} L948,${GROUND} M972,${GROUND - 6} L972,${GROUND}`} />

      {/* CONVEYOR — lifts ore from the hopper up over the quay */}
      <motion.path variants={draw} {...S} d={`M950,${GROUND - 30} L1184,150`} />
      <motion.path variants={draw} {...S} d={`M962,${GROUND - 16} L1196,164`} />
      <motion.path variants={draw} {...S} d={`M1082,${GROUND} L1094,208`} />{/* support leg */}
      {anim && <line x1="956" y1={GROUND - 23} x2="1190" y2="157" stroke={ACC} strokeWidth="2" strokeDasharray="8 12" vectorEffect="non-scaling-stroke" className="anim-belt" />}

      {/* CHUTE + falling ore into the hold */}
      <motion.path variants={draw} {...S} d="M1166,146 L1216,146 L1200,188 L1184,188 Z" />
      {anim && [0, 0.5, 1].map((d, i) => (
        <circle key={i} cx="1192" r="4" fill={NAVY}>
          <animate attributeName="cy" values={`188;${WL - 42}`} dur="1.4s" begin={`${d}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.8;1" dur="1.4s" begin={`${d}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* bulk carrier */}
      <g className={anim ? 'anim-ship-bob' : ''}><Vessel x={1120} w={300} deckH={48} S={S} accent={ACC} bulk /></g>
    </Band>
  );
}
