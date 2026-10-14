import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { MEDIA_IMG } from '@/lib/media';

export const metadata = { title: 'Shore-Based Assets' };

const BODY = `Paradeep Parivahan Limited owns and operates a comprehensive fleet of shore-based assets — earthmoving, material-handling and port-yard equipment — in-house. This asset-backed approach powers our port, plant and mining operations with reliability, turnaround speed and operational flexibility.

## Our fleet
- Earthmoving equipment — hydraulic excavators, dozers and vibrator rollers for mining, reclamation and infrastructure support
- Material-handling machinery — pay loaders, tippers, trailers and body trucks for bulk cargo movement
- Port and yard handling assets — dedicated equipment for terminal, yard and berth operations
- Heavy construction equipment — for site development, marine works and infrastructure execution
- Cargo loading & unloading equipment — for efficient vessel, rake and truck operations

## Owned in-house
Because every asset is company-owned and operated, we maintain full control over deployment, uptime, safety and cost — the foundation of our zero-demurrage record and our ability to scale for demanding project timelines.`;

export default function ShoreBasedAssetsPage() {
  return (
    <>
      <PageHero
        title="Shore-Based Assets"
        subtitle="Earthmoving, material handling & port-yard equipment owned in-house."
        image={MEDIA_IMG.containerYard}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Shore-Based Assets' }]}
      />
      <Prose body={BODY} />
    </>
  );
}
