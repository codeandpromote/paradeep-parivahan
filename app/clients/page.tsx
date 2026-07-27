import PageHero from '@/components/ui/PageHero';
import LogoGrid from '@/components/clients/LogoGrid';
import { MEDIA_IMG } from '@/lib/media';
import { getClients } from '@/lib/data';

export const metadata = { title: 'Our Clients' };

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <>
      <PageHero
        title="Our Clients"
        subtitle="Trusted by leading names across steel, power, cement, ports and logistics."
        image={MEDIA_IMG.shipSunset}
        crumbs={[{ label: 'Clients' }]}
      />
      <LogoGrid clients={clients} />
    </>
  );
}
