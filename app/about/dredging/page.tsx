import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Dredging & Reclamation' };

export default async function DredgingPage() {
  const p = await getPage('dredging');
  return (
    <>
      <PageHero
        title={p.title}
        image={resolveAsset(p.hero_image)}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Dredging & Reclamation' }]}
      />
      <Prose body={p.body} />
    </>
  );
}
