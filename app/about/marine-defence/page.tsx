import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Marine & Defence Infrastructure' };

export default async function MarineDefencePage() {
  const p = await getPage('marine-defence');
  return (
    <>
      <PageHero title={p.title} image={resolveAsset(p.hero_image)} crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Marine & Defence Infrastructure' }]} />
      <Prose body={p.body} />
    </>
  );
}
