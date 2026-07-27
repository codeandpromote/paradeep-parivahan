import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { IMAGES } from '@/lib/images';
import { Target, Eye, Gem, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: Eye,
    title: 'Vision',
    body: 'To be the preferred logistics partner of choice — locally and globally — a true One-Stop Logistics Destination driven by innovation and operational excellence.',
  },
  {
    icon: Target,
    title: 'Mission',
    body: 'To empower businesses through seamless, scalable and cost-effective logistics — with continuous improvement and client-centric service.',
  },
  {
    icon: Gem,
    title: 'Values',
    body: 'Integrity, quality, customer-centricity, innovation and sustainability — upheld in every relationship we build.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Policy',
    body: 'Superior port & logistics services, delivered with quality, integrity, accountability and efficiency in all that we do.',
  },
];

export default function MissionVision() {
  return (
    <section className="relative border-y border-white/10 bg-ink-900 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal variants={slideInLeft} className="relative">
          <div className="relative h-[460px] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={IMAGES.about}
              alt="Aerial view of port operations"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/60 to-transparent" />
          </div>
          {/* floating accent badge */}
          <div className="absolute -bottom-6 -right-4 rounded-2xl border border-white/10 bg-ink-800 px-6 py-4 shadow-card">
            <p className="font-display text-3xl font-bold text-accent-400">24<span className="text-white">×</span>7</p>
            <p className="text-xs uppercase tracking-wider text-slate-400">Operations</p>
          </div>
        </Reveal>

        <Reveal variants={slideInRight}>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> Who we are
          </p>
          <h2 className="font-display text-fluid-h2 font-bold leading-[1.02] text-white">
            Driven by integrity, <br /> built for <span className="text-gradient">scale</span>
          </h2>
          <p className="mt-5 max-w-lg text-slate-400">
            From first-mile to last-mile, we deliver end-to-end logistics across ports, plants and
            mines — powered by a large owned fleet, deep domain expertise and expert manpower.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-white/10 bg-ink-800 p-5 transition hover:border-accent-500/50"
              >
                <p.icon className="h-6 w-6 text-accent-400" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
