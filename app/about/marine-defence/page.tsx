import PageHero from '@/components/ui/PageHero';
import Prose from '@/components/ui/Prose';
import { MEDIA_IMG } from '@/lib/media';

export const metadata = { title: 'Marine & Defence Infrastructure' };

const BODY = `Paradeep Parivahan Limited undertakes select EPC and greenfield projects in marine and defence infrastructure — bringing our port-engineering, dredging, fabrication and heavy-equipment capabilities to nation-building projects along India's coastline.

## What we deliver
- Small-scale infrastructure development
- Site development & maintenance
- Port and yard handling assets
- Marine-linked project execution — dredging, reclamation, breakwater and stone pitching
- Project coordination & execution end-to-end

## Recognised marine expertise
Our marine works are widely recognised across India's East Coast and South-East Asia for reliability and engineering precision. We partner with government bodies and industry leaders to deliver critical coastal assets — from land reclamation and shore-based infrastructure to specialised fabrication.`;

export default function MarineDefencePage() {
  return (
    <>
      <PageHero
        title="Marine & Defence Infrastructure"
        subtitle="Select EPC and greenfield projects in marine & defence infrastructure."
        image={MEDIA_IMG.dryDockNight}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Marine & Defence Infrastructure' }]}
      />
      <Prose body={BODY} />
    </>
  );
}
