import { getClients } from '@/lib/data';
import ClientLogoSlider from './ClientLogoSlider';

/**
 * "Where we deliver" — a continuous logo slider of the clients PPL serves.
 * Data comes from the CMS (with a static fallback), so the strip stays
 * editable in production. Rendered by a small client component that owns
 * the marquee animation.
 */
export default async function CoreOperations() {
  const clients = await getClients();
  return (
    <section className="relative border-t border-white/10 bg-ink-900 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
            <span className="h-px w-8 bg-accent-500" /> Where we deliver
          </p>
          <h2 className="font-display text-fluid-h2 font-bold leading-[1.02] text-white">
            Trusted by <span className="text-gradient">industry leaders</span>
          </h2>
        </div>

        <ClientLogoSlider clients={clients} />
      </div>
    </section>
  );
}
