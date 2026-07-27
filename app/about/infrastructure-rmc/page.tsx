import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Infrastructure & Ready-Mix Concrete' };

export default async function InfrastructureRmcPage() {
  const p = await getPage('infrastructure-rmc');
  return (
    <>
      <PageHero
        title={p.title}
        image={resolveAsset(p.hero_image)}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Infrastructure & Ready-Mix Concrete' }]}
      />
      <Prose body={p.body} />
    </>
  );
}
