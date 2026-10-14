import PageHero from '@/components/ui/PageHero';
import AwardsGrid from '@/components/awards/AwardsGrid';
import { MEDIA_IMG } from '@/lib/media';
import { getAwards } from '@/lib/data';

export const metadata = { title: 'Awards & Recognition' };

export default async function AwardsPage() {
  const awards = await getAwards();
  return (
    <>
      <PageHero
        title="Awards & Recognition"
        subtitle="Two decades of trust — recognised by industry bodies, ports and government agencies for our contribution to India&rsquo;s logistics story."
        image={MEDIA_IMG.cargoShip}
        crumbs={[{ label: 'Awards' }]}
      />
      <AwardsGrid awards={awards} />
    </>
  );
}
