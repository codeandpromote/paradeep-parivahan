import Hero from '@/components/home/Hero';
import StatsCounter from '@/components/home/StatsCounter';
import Capabilities from '@/components/home/Capabilities';
import { LineArtPort, LineArtFleet } from '@/components/home/LineArtSections';
import MissionVision from '@/components/home/MissionVision';
import MajorAreas from '@/components/home/MajorAreas';
import CoreOperations from '@/components/home/CoreOperations';
import EvMobility from '@/components/home/EvMobility';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <Capabilities />
      <LineArtPort />
      <MissionVision />
      <MajorAreas />
      <CoreOperations />
      <EvMobility />
      <LineArtFleet />

      {/* CTA band */}
      <section className="grain relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-20 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Partner with the east coast&apos;s <span className="text-gradient">logistics leader</span>
            </h2>
            <p className="mt-3 text-slate-400">
              Talk to our team about stevedoring, transportation, trading &amp; more.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-semibold text-black shadow-glow transition hover:bg-accent-400"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
