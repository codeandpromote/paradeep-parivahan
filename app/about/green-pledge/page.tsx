import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Our Green Pledge' };

export default async function GreenPledgePage() {
  const p = await getPage('pledge');
  return (
    <>
      <PageHero title={p.title} image={resolveAsset(p.hero_image)} crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Our Green Pledge' }]} />
      <Prose body={p.body} />
    </>
  );
}
