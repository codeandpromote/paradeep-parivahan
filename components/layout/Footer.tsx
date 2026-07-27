import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const QUICK = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Domestic Projects', href: '/projects/domestic' },
  { label: 'Client List', href: '/clients' },
  { label: 'Our Team', href: '/about/team' },
];

const INVESTOR = [
  { label: 'Annual Reports', href: '/investors/annual-reports' },
  { label: 'Financial Results', href: '/investors/financial-results' },
  { label: 'Shareholding Pattern', href: '/investors/shareholding' },
  { label: 'Policies', href: '/investors/policies' },
  { label: 'Regulation 46 (LODR)', href: '/investors/regulation-46' },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Paradeep Parivahan Ltd.</h2>
          <p className="mt-1 font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent-400">
            Beyond Cargo, Beyond Boundaries
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Founded in 2000, one of the largest fleet-owning logistics companies on the east coast of
            India — from first-mile to last-mile, delivering end-to-end logistics across ports, plants
            and mines.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.facebook.com/profile?id=61560465104179"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/p/C8CPefghKx_/"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterCol title="Quick Links" links={QUICK} />
        <FooterCol title="Investors" links={INVESTOR} />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Address</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              204, OBC Building, Bank Street Area, Paradip Port, Jagatsinghpur, Pin-754142, Odisha,
              India
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <a href="tel:+91672222 3416" className="hover:text-white">
                +91-67-2222 3416
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              <a href="mailto:info@paradeepparivahan.com" className="hover:text-white">
                info@paradeepparivahan.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Paradeep Parivahan Ltd. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-slate-400 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
