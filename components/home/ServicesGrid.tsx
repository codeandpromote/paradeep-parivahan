'use client';

/**
 * "What we do" — the original bento image-card services layout, updated to the
 * four current services, with a Key Sectors Served strip below.
 */

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { useAccessibility } from '@/context/AccessibilityContext';

const SERVICES = [
  {
    n: '01',
    title: 'Stevedoring & Port Operations',
    desc: 'Ship-to-shore cargo handling, intra-port transportation, rake handling & vessel husbandry across eastern India.',
    href: '/about/port-operations',
    img: IMAGES.stevedoring,
    span: 'lg:col-span-2',
  },
  {
    n: '02',
    title: 'Dredging & Reclamation',
    desc: 'High-impact dredging, land reclamation, breakwater construction & stone pitching across India’s East Coast and South-East Asia.',
    href: '/about/dredging',
    img: IMAGES.dredging,
    span: '',
  },
  {
    n: '03',
    title: 'Trading — Global Sourcing',
    desc: 'Mines to Mills to Market — turnkey sourcing of iron ore, coal, coke, manganese & aluminium for steel, cement & power.',
    href: '/about/trading',
    img: IMAGES.trading,
    span: '',
  },
  {
    n: '04',
    title: 'Logistics & Transportation',
    desc: 'A 350+ strong fleet moving bulk material safely, efficiently, 24×7 — port-bound, intra-port, mine-to-port & rake.',
    href: '/about/logistics',
    img: IMAGES.logistics,
    span: '',
  },
  {
    n: '05',
    title: 'Marine & Defence Infrastructure',
    desc: 'Select EPC & greenfield projects — marine works, land reclamation, specialized fabrication & shore-based infrastructure.',
    href: '/about/marine-defence',
    img: IMAGES.marine,
    span: '',
  },
];

const SECTORS = ['Metals & Mining', 'Cement', 'Energy', 'Petrochemicals', 'Fertilizers', 'Manufacturing'];

export default function ServicesGrid() {
  const { reducedMotion } = useAccessibility();
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-28">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> What we do
          </p>
          <h2 className="font-display text-fluid-h2 font-bold leading-[1.02] text-white">
            From first-mile to last-mile, <span className="text-gradient">end-to-end logistics</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Full-spectrum logistics and port operations across ports, plants and mines.
          </p>
        </div>
        <Link href="/about/activities" className="text-sm font-semibold text-accent-300 hover:text-accent-200">
          View all activities →
        </Link>
      </div>

      <motion.div
        className="grid auto-rows-[300px] gap-4 md:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer(0.1)}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="show"
        viewport={viewportOnce}
      >
        {SERVICES.map((s) => (
          <motion.div key={s.title} variants={fadeUp} className={s.span}>
            <Link
              href={s.href}
              className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
            >
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
              <span className="absolute right-5 top-5 font-display text-sm font-bold text-white/40">{s.n}</span>
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition group-hover:border-accent-400 group-hover:bg-accent-500 group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
                <p className="mt-2 max-w-md text-sm text-slate-400">{s.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Key sectors served */}
      <p className="mb-4 mt-16 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">Key sectors served</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((s) => (
          <div key={s} className="flex items-center gap-2 rounded-md border border-white/10 bg-ink-900 px-4 py-3 text-slate-200">
            <ChevronRight className="h-4 w-4 text-accent-400" aria-hidden />
            <span className="font-medium">{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
