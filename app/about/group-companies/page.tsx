import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/motion/Reveal';
import { MEDIA_IMG } from '@/lib/media';
import { GROUP_COMPANIES_DETAIL } from '@/lib/content';
import { Building2 } from 'lucide-react';

export const metadata = { title: 'Group of Companies' };

export default function GroupCompaniesPage() {
  return (
    <>
      <PageHero
        title="Our Group of Companies"
        subtitle="Driving logistics innovation across multiple verticals — a robust, dynamic group that collectively delivers comprehensive, efficient and future-ready logistics solutions."
        image={MEDIA_IMG.industrialPlantDusk}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Group of Companies' }]}
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {GROUP_COMPANIES_DETAIL.map((c, i) => (
            <Reveal key={c.name} delay={Math.min(i * 0.06, 0.3)}>
              <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-ink-900 p-6 transition hover:border-accent-500/50">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-800 text-accent-400">
                  <Building2 className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{c.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{c.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 border-t border-white/10 pt-8 text-center text-lg font-medium text-slate-300">
            Unified by purpose. Diversified by strength. Together, these entities form a powerful
            logistics network — offering pan-India coverage, sector-specific expertise and the agility
            to adapt to any challenge in the ever-evolving world of logistics and supply-chain management.
          </p>
        </Reveal>
      </section>
    </>
  );
}
