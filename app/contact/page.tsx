import PageHero from '@/components/ui/PageHero';
import OfficeCard from '@/components/contact/OfficeCard';
import ContactForm from '@/components/contact/ContactForm';
import { MEDIA_IMG } from '@/lib/media';
import { getOffices } from '@/lib/data';

export const metadata = { title: 'Contact Us' };

export default async function ContactPage() {
  const offices = await getOffices();
  return (
    <>
      <PageHero
        title="Get in touch"
        subtitle="Talk to our team about stevedoring, transportation, trading and more."
        image={MEDIA_IMG.portNightShips}
        crumbs={[{ label: 'Contact' }]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div className="space-y-6">
          {offices.map((o) => (
            <OfficeCard key={o.id} office={o} />
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-ink-900 p-7">
          <h2 className="font-display text-xl font-bold text-white">Feel free to drop us a message</h2>
          <p className="mt-1 text-sm text-slate-400">We usually respond within one business day.</p>
          <div className="mt-6">
            <ContactForm source="contact" />
          </div>
        </div>
      </div>
    </>
  );
}
