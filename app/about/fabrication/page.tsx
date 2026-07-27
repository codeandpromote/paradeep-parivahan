import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Specialized Fabrication' };

export default async function FabricationPage() {
  const p = await getPage('fabrication');
  return (
    <>
      <PageHero
        title={p.title}
        image={resolveAsset(p.hero_image)}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Specialized Fabrication' }]}
      />
      <Prose body={p.body} />
    </>
  );
}
