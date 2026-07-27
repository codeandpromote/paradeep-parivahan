import PageHero from '@/components/ui/PageHero';
import OfficeCard from '@/components/contact/OfficeCard';
import ContactForm from '@/components/contact/ContactForm';
import { MEDIA_IMG } from '@/lib/media';
import { getOffices } from '@/lib/data';

export const metadata = { title: 'Registered & Head Office' };

export default async function RegisteredOfficePage() {
  const office = (await getOffices())[0];
  return (
    <>
      <PageHero title="Registered & Head Office" image={MEDIA_IMG.portCityNight} crumbs={[{ label: 'Contact', href: '/contact' }, { label: 'Registered Office' }]} />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
        <OfficeCard office={office} />
        <div className="rounded-2xl border border-white/10 bg-ink-900 p-7">
          <h2 className="font-display text-xl font-bold text-white">Feel free to drop us a message</h2>
          <div className="mt-6"><ContactForm source="registered-office" /></div>
        </div>
      </div>
    </>
  );
}
