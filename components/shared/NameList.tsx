import Reveal from '@/components/motion/Reveal';

/** Numbered list of entities (partners, projects, group companies). */
export default function NameList({
  items,
  columns = 2,
}: {
  items: { id: number; name: string; description?: string }[];
  columns?: 1 | 2 | 3;
}) {
  const cols = columns === 3 ? 'lg:grid-cols-3' : columns === 2 ? 'sm:grid-cols-2' : '';
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className={`grid gap-4 ${cols}`}>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={Math.min(i * 0.03, 0.3)}>
            <div className="flex gap-4 rounded-xl border border-white/10 bg-ink-900 p-5 transition hover:border-accent-500/40">
              <span className="font-display text-lg font-bold text-accent-400 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-medium text-white">{it.name}</p>
                {it.description && <p className="mt-1 text-sm text-slate-400">{it.description}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
