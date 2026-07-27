import Image from 'next/image';
import { resolveAsset } from '@/lib/images';
import Reveal from '@/components/motion/Reveal';
import type { EquipmentModel } from '@/lib/content';

/** Category header (image + description + total) and a spec table of models. */
export default function EquipmentView({ models }: { models: EquipmentModel[] }) {
  if (!models.length) return null;
  const head = models[0];
  const total = models.reduce((sum, m) => sum + (m.quantity || 0), 0);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
            <Image src={resolveAsset(head.category_image)} alt={head.category_title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white">{head.category_title}</h2>
          {head.category_description && <p className="mt-3 text-slate-400">{head.category_description}</p>}
          <p className="mt-6 inline-block rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1.5 text-sm font-semibold text-accent-300">
            {total} units in the fleet
          </p>
        </Reveal>
      </div>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="border-b border-white/15 text-slate-400">
            <tr>
              <th className="py-3 font-semibold">Model</th>
              <th className="py-3 font-semibold">Capacity</th>
              <th className="py-3 text-right font-semibold">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {models.map((m) => (
              <tr key={m.id} className="hover:bg-white/[0.03]">
                <td className="py-3 font-medium text-white">{m.model}</td>
                <td className="py-3 text-slate-400">{m.capacity ?? '—'}</td>
                <td className="py-3 text-right tabular-nums text-accent-400">{m.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
