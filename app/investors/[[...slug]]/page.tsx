/**
 * Catch-all Investors route — resolves ANY investor path to its content:
 *   /investors                          → section landing (card grid)
 *   /investors/annual-reports           → DocumentTable(ANNUAL_REPORT)
 *   /investors/meetings/agm-egm         → DocumentTable(MEETING_AGM_EGM)
 *   /investors/ipo/drhp                 → DocumentTable(IPO_DRHP)
 *   /investors/regulation-46            → Reg-46 compliance matrix
 *   /investors/grievance/rti | kmp      → contact blocks
 * One file covers all 21 investor pages via the slug→category map.
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import DocumentTable from '@/components/investors/DocumentTable';
import { INVESTOR_CATEGORY_BY_SLUG, NAV } from '@/lib/nav';
import { api, safe, type InvestorDoc } from '@/lib/api';
import { MEDIA_IMG } from '@/lib/media';

// Rotate the breadcrumb photo across investor pages so no two adjacent pages
// share the same image (varied, page-wise-meaningful imagery).
const INV_POOL = [
  MEDIA_IMG.aerialPlant, MEDIA_IMG.portCityNight, MEDIA_IMG.aerialIndustrial,
  MEDIA_IMG.portNightShips, MEDIA_IMG.dryDockNight, MEDIA_IMG.industrialPlantDusk,
  MEDIA_IMG.cargoShip, MEDIA_IMG.shipSunset,
];
const invHero = (key: string) => {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return INV_POOL[h % INV_POOL.length];
};

// Human labels for each category slug (breadcrumb + H1)
const TITLES: Record<string, string> = {
  'annual-reports': 'Annual Reports',
  policies: 'Policies',
  'board-composition': 'Board of Directors & Committees',
  'annual-return': 'Annual Return',
  'agm-egm': 'AGM / EoGM Notices',
  board: 'Board Meeting Notices',
  'financial-results': 'Financial Results',
  shareholding: 'Shareholding Pattern',
  'credit-rating': 'Credit Rating',
  'corporate-information': 'Corporate Information',
  'abridged-prospectus': 'Abridged Prospectus',
  'red-herring': 'Red Herring Prospectus',
  drhp: 'Draft Red Herring Prospectus (DRHP)',
  prospectus: 'Prospectus',
  'material-contracts': 'Material Contracts & Documents',
  disclosures: 'Disclosures',
  'csr-compliance': 'CSR Compliance',
  'postal-ballot': 'Postal Ballot',
  intimation: 'Intimation to Stock Exchange',
};

export default async function InvestorsPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const segments = params.slug ?? [];
  const leaf = segments[segments.length - 1];

  // 1) Section landing
  if (segments.length === 0) return <InvestorLanding />;

  // 2) Regulation 46 matrix
  if (leaf === 'regulation-46') return <Regulation46 />;

  // 3) Grievance special pages
  if (leaf === 'rti') return <GrievancePage kind="rti" />;
  if (leaf === 'kmp') return <GrievancePage kind="kmp" />;

  // 4) Document categories
  const category = INVESTOR_CATEGORY_BY_SLUG[leaf];
  if (!category) notFound();

  const docs = await safe<InvestorDoc[]>(api.investorDocs(category), []);

  return (
    <>
      <PageHero
        title={TITLES[leaf] ?? 'Investor Documents'}
        image={invHero(leaf)}
        crumbs={[{ label: 'Investors', href: '/investors' }, { label: TITLES[leaf] ?? leaf }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <DocumentTable docs={docs} />
      </div>
    </>
  );
}

// ---------- Section landing (card grid of every investor page) ----------
function InvestorLanding() {
  const investors = NAV.find((n) => n.label === 'Investors');
  type FlatItem = { label: string; href?: string; group?: string };
  const flat: FlatItem[] = (investors?.children ?? []).flatMap((c): FlatItem[] =>
    c.children
      ? c.children.map((cc) => ({ label: cc.label, href: cc.href, group: c.label }))
      : [{ label: c.label, href: c.href }]
  );
  return (
    <>
      <PageHero
        title="Investor Relations"
        subtitle="Financial results, regulatory filings, policies and disclosures under SEBI (LODR)."
        image={MEDIA_IMG.portCityNight}
        crumbs={[{ label: 'Investors' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flat.map((item) =>
            item.href ? (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/10 bg-ink-900 p-5 transition hover:border-accent-500/50 hover:bg-white/[0.03]"
              >
                {item.group && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent-400">
                    {item.group}
                  </span>
                )}
                <span className="mt-1 block font-medium text-slate-100">{item.label}</span>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

// ---------- Regulation 46 matrix ----------
function Regulation46() {
  // Static mapping (mirrors discovery/sitemap-tree.json reg46Matrix).
  const ROWS: { label: string; href: string }[] = [
    { label: 'Details of its business', href: '/about' },
    { label: 'MOA & AOA', href: '/investors/corporate-information' },
    { label: 'Brief profile of Directors', href: '/about/team' },
    { label: 'Terms & conditions of appointment of independent directors', href: '/investors/policies' },
    { label: 'Composition of committees of the board', href: '/investors/board-composition' },
    { label: 'Code of Conduct of board & senior management', href: '/investors/policies' },
    { label: 'Vigil mechanism / Whistle Blower policy', href: '/investors/policies' },
    { label: 'Criteria for payments to non-executive directors', href: '/investors/policies' },
    { label: 'Policy on related party transactions', href: '/investors/policies' },
    { label: "Policy for determining 'material' subsidiaries", href: '/investors/policies' },
    { label: 'Familiarization programmes for independent directors', href: '/investors/board-composition' },
    { label: 'Email for grievance redressal', href: '/investors/grievance/kmp' },
    { label: 'Contact of designated officials', href: '/investors/grievance/kmp' },
    { label: 'Financial information — Notice', href: '/investors/meetings/board' },
    { label: 'Financial information — Result', href: '/investors/financial-results' },
    { label: 'Annual Report', href: '/investors/annual-reports' },
    { label: 'Shareholding Pattern', href: '/investors/shareholding' },
    { label: 'Schedule of analyst / investor meets', href: '/investors/intimation' },
    { label: 'New & old name of the entity', href: '/investors/corporate-information' },
    { label: 'Items published in the newspaper', href: '/investors/intimation' },
    { label: 'Credit Ratings', href: '/investors/credit-rating' },
    { label: 'Audited financials of subsidiaries', href: '/investors/annual-reports' },
    { label: 'Secretarial Compliance Report', href: '/investors/annual-reports' },
    { label: 'Policy for determination of materiality', href: '/investors/policies' },
    { label: 'Contact details of KMP', href: '/investors/grievance/kmp' },
    { label: 'Disclosure under Reg 30(8)', href: '/investors/intimation' },
    { label: 'Statement of deviation(s)/variation(s)', href: '/investors/intimation' },
    { label: 'Dividend distribution policy', href: '/investors/policies' },
    { label: 'Annual return u/s 92', href: '/investors/annual-return' },
  ];
  return (
    <>
      <PageHero
        title="Disclosures under Regulation 46 of SEBI (LODR)"
        image={MEDIA_IMG.industrialPlantDusk}
        crumbs={[{ label: 'Investors', href: '/investors' }, { label: 'Regulation 46' }]}
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-ink-900">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-slate-300">
              <tr>
                <th className="px-5 py-3 font-semibold">Regulation 46 Requirement</th>
                <th className="px-5 py-3 text-right font-semibold">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {ROWS.map((r) => (
                <tr key={r.label} className="transition hover:bg-white/[0.03]">
                  <td className="px-5 py-3 text-slate-300">{r.label}</td>
                  <td className="px-5 py-3 text-right">
                    <Link href={r.href} className="font-semibold text-accent-400 hover:text-accent-300">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ---------- Grievance (RTI / KMP contact) ----------
function GrievancePage({ kind }: { kind: 'rti' | 'kmp' }) {
  const isRti = kind === 'rti';
  return (
    <>
      <PageHero
        title={isRti ? 'RTI — Registrar & Share Transfer Agent' : 'KMP / Compliance Officer Details'}
        image={MEDIA_IMG.aerialIndustrial}
        crumbs={[
          { label: 'Investors', href: '/investors' },
          { label: 'Grievance Redressal' },
          { label: isRti ? 'RTI' : 'KMP Details' },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-16">
        {isRti ? (
          <ContactCard
            title="Bigshare Services Private Limited"
            rows={[
              ['SEBI Registration', 'INR000001385'],
              ['Address', 'Office No S6-2, 6th Floor, Pinnacle Business Park, Mahakali Caves Road, Andheri (East), Mumbai 400093'],
              ['Contact Person', 'Mr. Jibu John'],
              ['Phone', '+91 22 6263 8300'],
              ['Email', 'investor@bigshareonline.com'],
              ['Website', 'www.bigshareonline.com'],
            ]}
          />
        ) : (
          <ContactCard
            title="Ms. Usha Rani Ray — Company Secretary & Compliance Officer"
            rows={[
              ['Address', 'Room No 204, Above OBC Bank, Paradeep, Jagatsinghpur 754142, Odisha'],
              ['Phone', '0647-2590169 / 06722-223416'],
              ['Email', 'cs@paradeepparivahan.com'],
            ]}
          />
        )}
      </div>
    </>
  );
}

function ContactCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900 p-8">
      <h2 className="font-display text-xl font-bold text-white">{title}</h2>
      <dl className="mt-6 space-y-4">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-3 gap-4 border-b border-white/10 pb-3">
            <dt className="text-sm font-semibold text-slate-400">{k}</dt>
            <dd className="col-span-2 text-sm text-slate-200">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
