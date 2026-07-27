import PageHero from '@/components/ui/PageHero';
import CardGrid from '@/components/shared/CardGrid';
import { MEDIA_IMG } from '@/lib/media';
import { getActivities } from '@/lib/data';

export const metadata = { title: 'Major Activities' };

export default async function ActivitiesPage() {
  const items = await getActivities();
  return (
    <>
      <PageHero
        title="Major Activities"
        subtitle="PPL is one of the largest fleet-owning companies across the entire east coast of India."
        image={MEDIA_IMG.portNightCranes}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Major Activities' }]}
      />
      <CardGrid items={items} />
    </>
  );
}
