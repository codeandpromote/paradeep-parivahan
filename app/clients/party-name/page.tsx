import PageHero from '@/components/ui/PageHero';
import NameList from '@/components/shared/NameList';
import { MEDIA_IMG } from '@/lib/media';
import { getPartners } from '@/lib/data';

export const metadata = { title: 'Party Name' };

export default async function PartyNamePage() {
  const items = await getPartners('PARTY');
  return (
    <>
      <PageHero
        title="Party Name"
        subtitle="Sale, supply & transportation partners."
        image={MEDIA_IMG.coalPile}
        crumbs={[{ label: 'Clients', href: '/clients' }, { label: 'Party Name' }]}
      />
      <NameList items={items} columns={2} />
    </>
  );
}
