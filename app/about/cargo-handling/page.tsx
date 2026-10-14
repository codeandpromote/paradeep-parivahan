import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { MEDIA_IMG } from '@/lib/media';

export const metadata = { title: 'Cargo Handling' };

const BODY = `Paradeep Parivahan Limited's Cargo Handling vertical delivers port-bound and intra-port cargo movement, manufacturing plant logistics, last-mile delivery and rake handling across India's east-coast industrial corridor.

## What we do
- Port-bound cargo handling — stevedoring, ship-to-shore movement and vessel husbandry
- Intra-port transportation — seamless cargo movement within port premises
- Manufacturing plant logistics — end-to-end raw-material feeding, in-plant handling and finished-goods evacuation
- Railway siding operations and rake handling — 24×7 loading, unloading and rake coordination
- Last-mile delivery — coordinated movement to final destinations

## Why PPL
- One of the largest fleet-owning logistics companies on the east coast
- Strategic presence across major East Coast ports including Paradeep, Gopalpur, Visakhapatnam and Haldia
- Safety-first operations with real-time coordination and zero-demurrage discipline
- Long-standing partnerships with IFFCO, IOCL, JSW, Ultratech Cement, Mahanadi Coalfields and other industrial leaders`;

export default function CargoHandlingPage() {
  return (
    <>
      <PageHero
        title="Cargo Handling"
        subtitle="Port-bound & intra-port cargo, plant logistics, last-mile & rake handling."
        image={MEDIA_IMG.cargoShip}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Cargo Handling' }]}
      />
      <Prose body={BODY} />
    </>
  );
}
