import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { resolveAsset } from '@/lib/images';
import { getPage } from '@/lib/data';

export const metadata = { title: 'Our Presence' };

export default async function PresencePage() {
  const p = await getPage('presence');
  return (
    <>
      <PageHero title={p.title} image={resolveAsset(p.hero_image)} crumbs={[{ label: 'Clients', href: '/clients' }, { label: 'Presence' }]} />
      <Prose body={p.body} />
    </>
  );
}
