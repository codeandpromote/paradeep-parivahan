import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Logistics & Transportation' };

export default async function LogisticsPage() {
  const p = await getPage('logistics');
  return (
    <>
      <PageHero title={p.title} image={resolveAsset(p.hero_image)} crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Logistics & Transportation' }]} />
      <Prose body={p.body} />
    </>
  );
}
