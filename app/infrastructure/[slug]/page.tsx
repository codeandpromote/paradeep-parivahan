import { notFound } from 'next/navigation';
import PageHero from '@/components/ui/PageHero';
import EquipmentView from '@/components/infrastructure/EquipmentView';
import { IMAGES } from '@/lib/images';
import { EQUIPMENT, EQUIPMENT_SLUGS } from '@/lib/content';
import { getEquipment } from '@/lib/data';

export function generateStaticParams() {
  return Object.keys(EQUIPMENT_SLUGS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const catSlug = EQUIPMENT_SLUGS[params.slug];
  const title = EQUIPMENT.find((m) => m.category_slug === catSlug)?.category_title ?? 'Equipment';
  return { title };
}

export default async function EquipmentCategoryPage({ params }: { params: { slug: string } }) {
  const catSlug = EQUIPMENT_SLUGS[params.slug];
  if (!catSlug) notFound();
  const models = await getEquipment(catSlug);
  if (!models.length) notFound();

  return (
    <>
      <PageHero
        title={models[0].category_title}
        image={IMAGES.equipment[catSlug] ?? IMAGES.logistics}
        crumbs={[{ label: 'Infrastructure', href: '/infrastructure' }, { label: models[0].category_title }]}
      />
      <EquipmentView models={models} />
    </>
  );
}
