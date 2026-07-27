import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import { resolveAsset } from '@/lib/images';
import { MEDIA_IMG } from '@/lib/media';
import { EQUIPMENT_SLUGS } from '@/lib/content';
import { getEquipment } from '@/lib/data';

export const metadata = { title: 'Infrastructure' };

export default async function InfrastructurePage() {
  const all = await getEquipment();
  // one card per category (first model carries the category meta)
  const cats = Object.entries(EQUIPMENT_SLUGS)
    .map(([route, catSlug]) => {
      const models = all.filter((m) => m.category_slug === catSlug);
      if (!models.length) return null;
      const total = models.reduce((s, m) => s + m.quantity, 0);
      return { route, title: models[0].category_title, image: models[0].category_image, total };
    })
    .filter(Boolean) as { route: string; title: string; image: string; total: number }[];

  return (
    <>
      <PageHero
        title="Infrastructure & Fleet"
        subtitle="A 350+ strong fleet of material-handling and earth-moving equipment."
        image={MEDIA_IMG.containerYard}
        crumbs={[{ label: 'Infrastructure' }]}
      />
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <Link key={c.route} href={`/infrastructure/${c.route}`} className="group overflow-hidden rounded-xl border border-white/10 bg-ink-900 transition hover:border-accent-500/50">
            <div className="relative h-48 bg-ink-800">
              <Image src={resolveAsset(c.image)} alt={c.title} fill className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" sizes="(max-width:1024px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
            </div>
            <div className="flex items-center justify-between p-5">
              <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
              <span className="text-sm font-semibold text-accent-400">{c.total} units →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
