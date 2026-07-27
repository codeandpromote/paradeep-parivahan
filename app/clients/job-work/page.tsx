import PageHero from '@/components/ui/PageHero';
import NameList from '@/components/shared/NameList';
import { MEDIA_IMG } from '@/lib/media';
import { getPartners } from '@/lib/data';

export const metadata = { title: 'Job Work' };

export default async function JobWorkPage() {
  const items = await getPartners('JOBWORK');
  return (
    <>
      <PageHero title="Job Work" image={MEDIA_IMG.portNightShips} crumbs={[{ label: 'Clients', href: '/clients' }, { label: 'Job Work' }]} />
      <NameList items={items} columns={2} />
    </>
  );
}
