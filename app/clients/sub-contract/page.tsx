import PageHero from '@/components/ui/PageHero';
import NameList from '@/components/shared/NameList';
import { MEDIA_IMG } from '@/lib/media';
import { getPartners } from '@/lib/data';

export const metadata = { title: 'Sub Contract' };

export default async function SubContractPage() {
  const items = await getPartners('SUBCONTRACT');
  return (
    <>
      <PageHero title="Sub Contract" image={MEDIA_IMG.dryDockNight} crumbs={[{ label: 'Clients', href: '/clients' }, { label: 'Sub Contract' }]} />
      <NameList items={items} columns={2} />
    </>
  );
}
