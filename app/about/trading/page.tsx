import PageHero from '@/components/ui/PageHero';
import CardGrid from '@/components/shared/CardGrid';
import { MEDIA_IMG } from '@/lib/media';
import { getCommodities } from '@/lib/data';

export const metadata = { title: 'Trading Division' };

export default async function TradingPage() {
  const items = await getCommodities();
  return (
    <>
      <PageHero
        title="Trading Division"
        subtitle="From Mines to Mills to Market — the commodities we handle."
        image={MEDIA_IMG.coalPile}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Trading Division' }]}
      />
      <CardGrid items={items} />
    </>
  );
}
