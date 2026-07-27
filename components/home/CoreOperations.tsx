import Reveal from '@/components/motion/Reveal';
import { getProjects } from '@/lib/data';

/**
 * "Our Trusted Operations & Strategic Associations" — a dynamic showcase of the
 * company's operational footprint (fed from the projects table / content seed,
 * so it's fully CMS-editable). Numbered cards, revealed on scroll.
 */
export default async function CoreOperations() {
  const ops = await getProjects();
  return (
    <section className="relative border-t border-white/10 bg-ink-900 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> Where we deliver
          </p>
          <h2 className="font-display text-fluid-h2 font-bold leading-[1.02] text-white">
            Trusted operations &amp; <span className="text-gradient">strategic associations</span>
          </h2>
          <p className="mt-4 text-slate-400">
            A comprehensive logistics powerhouse — delivering industry-leading solutions across ports,
            railways, mines and industrial zones.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ops.map((op, i) => (
            <Reveal key={op.id} delay={Math.min((i % 3) * 0.06, 0.2)}>
              <div className="group flex h-full gap-4 rounded-xl border border-white/10 bg-ink-950 p-5 transition hover:border-accent-500/50">
                <span className="font-display text-sm font-bold text-accent-400/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold leading-snug text-white">{op.name}</h3>
                  {op.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{op.description}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
