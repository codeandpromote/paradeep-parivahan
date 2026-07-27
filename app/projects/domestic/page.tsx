import PageHero from '@/components/ui/PageHero';
import NameList from '@/components/shared/NameList';
import { MEDIA_IMG } from '@/lib/media';
import { getProjects } from '@/lib/data';

export const metadata = { title: 'Domestic Projects' };

export default async function DomesticProjectsPage() {
  const items = await getProjects();
  return (
    <>
      <PageHero
        title="Domestic Projects"
        subtitle="Complete port-related services delivered across India's eastern seaboard."
        image={MEDIA_IMG.dredger}
        crumbs={[{ label: 'Projects', href: '/projects' }, { label: 'Domestic' }]}
      />
      <NameList items={items} columns={2} />
    </>
  );
}
