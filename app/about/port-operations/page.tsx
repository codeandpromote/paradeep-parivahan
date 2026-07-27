import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Stevedoring & Port Operations' };

export default async function PortOperationsPage() {
  const p = await getPage('port');
  return (
    <>
      <PageHero title={p.title} image={resolveAsset(p.hero_image)} crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Stevedoring & Port Operations' }]} />
      <Prose body={p.body} />
    </>
  );
}
