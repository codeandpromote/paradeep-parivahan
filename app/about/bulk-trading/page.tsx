import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { MEDIA_IMG } from '@/lib/media';

export const metadata = { title: 'Bulk Trading' };

const BODY = `Extending beyond traditional logistics, Paradeep Parivahan Limited's Bulk Trading vertical offers sourcing and supply of industrial raw materials integrated with logistics — mines to mills to market — for India's core industries.

## Mines to Mills to Market
Our specialised global trading division sources and supplies bulk raw materials across steel, aluminium, cement and power — building dependable, integrated supply chains for India's core industries.

## Commodities
- Iron ore — calibrated lump, fines and pellets
- Coal — thermal coal and LAM coke
- Manganese ore
- Aluminium — primary aluminium and calcined alumina
- Chrome concentrate
- Limestone, gypsum and fly ash

## Integrated with logistics
Because trading is delivered alongside our port, rail and road logistics capabilities, clients receive material handled end-to-end by a single operator — with the reliability, speed and scale that only an integrated logistics enterprise can deliver.`;

export default function BulkTradingPage() {
  return (
    <>
      <PageHero
        title="Bulk Trading"
        subtitle="Sourcing & supply of industrial raw materials integrated with logistics."
        image={MEDIA_IMG.coalPile}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Bulk Trading' }]}
      />
      <Prose body={BODY} />
    </>
  );
}
