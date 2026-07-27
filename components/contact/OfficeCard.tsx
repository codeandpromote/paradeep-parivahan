import { MapPin, Phone, Mail, Printer, User } from 'lucide-react';
import type { Office } from '@/lib/content';

export default function OfficeCard({ office }: { office: Office }) {
  const rows = [
    { icon: MapPin, value: office.address },
    { icon: Phone, value: office.phone, href: `tel:${office.phone.replace(/\s+/g, '')}` },
    office.fax ? { icon: Printer, value: office.fax } : null,
    { icon: Mail, value: office.email, href: `mailto:${office.email}` },
    office.manager ? { icon: User, value: `${office.manager}${office.manager_phone ? ` · ${office.manager_phone}` : ''}` } : null,
  ].filter(Boolean) as { icon: typeof MapPin; value: string; href?: string }[];

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900 p-7">
      <h3 className="font-display text-xl font-bold text-white">{office.name}</h3>
      <ul className="mt-5 space-y-3 text-sm text-slate-300">
        {rows.map((r, i) => (
          <li key={i} className="flex gap-3">
            <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
            {r.href ? <a href={r.href} className="hover:text-accent-300">{r.value}</a> : <span>{r.value}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
