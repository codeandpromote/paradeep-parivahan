import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/motion/Reveal';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';
import { VISION, MISSION, QUALITY_POLICY, CORE_VALUES, WHY_CHOOSE } from '@/lib/content';
import { Eye, Target, ShieldCheck } from 'lucide-react';

export const metadata = { title: 'About Us' };

export default async function AboutPage() {
  const p = await getPage('aboutus');
  return (
    <>
      <PageHero title={p.title} image={resolveAsset(p.hero_image)} crumbs={[{ label: 'About Us' }]} />
      <Prose body={p.body} />

      {/* Vision & Mission */}
      <section className="border-t border-white/10 bg-ink-900 py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
          {[
            { icon: Eye, title: 'Our Vision', body: VISION },
            { icon: Target, title: 'Our Mission', body: MISSION },
          ].map((c) => (
            <Reveal key={c.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-ink-800 p-8">
                <c.icon className="h-7 w-7 text-accent-400" aria-hidden />
                <h2 className="mt-4 font-display text-2xl font-bold text-white">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-300">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> Our Core Values
          </p>
          <h2 className="font-display text-fluid-h2 font-bold text-white">What we stand for</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((v, i) => (
            <Reveal key={v.title} delay={Math.min(i * 0.06, 0.3)}>
              <div className="h-full rounded-2xl border border-white/10 bg-ink-900 p-6 transition hover:border-accent-500/50">
                <span className="font-display text-sm font-bold text-accent-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quality Policy */}
      <section className="border-y border-white/10 bg-ink-900 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="rounded-2xl border border-accent-500/30 bg-ink-800 p-8">
              <ShieldCheck className="h-7 w-7 text-accent-400" aria-hidden />
              <h2 className="mt-4 font-display text-2xl font-bold text-white">Our Quality Policy</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{QUALITY_POLICY}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose PPL */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> Why choose Paradeep Parivahan
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {WHY_CHOOSE.map((w, i) => (
            <Reveal key={w.title} delay={Math.min(i * 0.06, 0.3)}>
              <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-ink-900 p-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-500 font-display text-sm font-bold text-ink-950">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{w.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
