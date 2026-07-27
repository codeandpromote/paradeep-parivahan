/**
 * Canonical navigation tree for the new site.
 * Mirrors discovery/sitemap-tree.json but expressed as Next.js routes.
 * New route scheme is clean & hierarchical (no more /home/{slug}).
 * Header (desktop mega-menu) and MobileNav both consume this.
 */

export interface NavNode {
  label: string;
  href?: string;
  children?: NavNode[];
}

export const NAV: NavNode[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about/team' },
      { label: 'Our Green Pledge', href: '/about/green-pledge' },
      { label: 'Group of Companies', href: '/about/group-companies' },
      { label: 'Major Activities', href: '/about/activities' },
      { label: 'Stevedoring & Port Operations', href: '/about/port-operations' },
      { label: 'Dredging & Reclamation', href: '/about/dredging' },
      { label: 'Trading — Global Sourcing', href: '/about/trading' },
      { label: 'Logistics & Transportation', href: '/about/logistics' },
      { label: 'Infrastructure & Ready-Mix Concrete', href: '/about/infrastructure-rmc' },
      { label: 'Specialized Fabrication', href: '/about/fabrication' },
      { label: 'Marine & Defence Infrastructure', href: '/about/marine-defence' },
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
    children: [{ label: 'Domestic Projects', href: '/projects/domestic' }],
  },
  {
    label: 'Investors',
    href: '/investors',
    children: [
      { label: 'Annual Reports', href: '/investors/annual-reports' },
      { label: 'Policies', href: '/investors/policies' },
      { label: 'Board of Directors & Committees', href: '/investors/board-composition' },
      { label: 'Annual Return', href: '/investors/annual-return' },
      {
        label: 'Meetings',
        children: [
          { label: 'AGM / EoGM', href: '/investors/meetings/agm-egm' },
          { label: 'Board Meeting', href: '/investors/meetings/board' },
        ],
      },
      { label: 'Financial Results', href: '/investors/financial-results' },
      { label: 'Shareholding Pattern', href: '/investors/shareholding' },
      { label: 'Credit Rating', href: '/investors/credit-rating' },
      { label: 'Corporate Information', href: '/investors/corporate-information' },
      {
        label: 'IPO',
        children: [
          { label: 'Abridged Prospectus', href: '/investors/ipo/abridged-prospectus' },
          { label: 'Red Herring Prospectus', href: '/investors/ipo/red-herring' },
          { label: 'DRHP', href: '/investors/ipo/drhp' },
          { label: 'Prospectus', href: '/investors/ipo/prospectus' },
          { label: 'Material Contracts', href: '/investors/ipo/material-contracts' },
        ],
      },
      { label: 'Disclosures', href: '/investors/disclosures' },
      { label: 'CSR Compliance', href: '/investors/csr-compliance' },
      { label: 'Postal Ballot', href: '/investors/postal-ballot' },
      { label: 'Intimation to Stock Exchange', href: '/investors/intimation' },
      {
        label: 'Grievance Redressal',
        children: [
          { label: 'RTI', href: '/investors/grievance/rti' },
          { label: 'KMP Details', href: '/investors/grievance/kmp' },
        ],
      },
      { label: 'Regulation 46 (LODR)', href: '/investors/regulation-46' },
    ],
  },
  {
    label: 'Infrastructure',
    href: '/infrastructure',
    children: [
      { label: 'Hydraulic Excavator', href: '/infrastructure/hydraulic-excavator' },
      { label: 'Pay Loader', href: '/infrastructure/pay-loader' },
      { label: 'Dozer', href: '/infrastructure/dozer' },
      { label: 'Dumper / Tipper / Hywa', href: '/infrastructure/dumper' },
      { label: 'Vibrator Roller', href: '/infrastructure/vibrator-roller' },
      { label: 'JCB', href: '/infrastructure/jcb' },
    ],
  },
  {
    label: 'Clients',
    href: '/clients',
    children: [
      { label: 'Client List', href: '/clients' },
      { label: 'Presence', href: '/clients/presence' },
      { label: 'Sub Contract', href: '/clients/sub-contract' },
      { label: 'Job Work', href: '/clients/job-work' },
      { label: 'Party Name', href: '/clients/party-name' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Awards', href: '/awards' },
  { label: 'CSR', href: '/csr' },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Registered Office', href: '/contact/registered-office' },
      { label: 'Corporate Office', href: '/contact/corporate-office' },
    ],
  },
];

/**
 * Curated column layout for the Investors desktop mega-menu — grouped by theme
 * so the 20+ items read cleanly instead of as a flat jumble.
 */
export interface MegaColumn {
  heading: string;
  links: { label: string; href: string }[];
}
export const INVESTOR_MEGA: MegaColumn[] = [
  {
    heading: 'Reports & Financials',
    links: [
      { label: 'Annual Reports', href: '/investors/annual-reports' },
      { label: 'Financial Results', href: '/investors/financial-results' },
      { label: 'Annual Return', href: '/investors/annual-return' },
      { label: 'Shareholding Pattern', href: '/investors/shareholding' },
      { label: 'Credit Rating', href: '/investors/credit-rating' },
    ],
  },
  {
    heading: 'Governance',
    links: [
      { label: 'Board of Directors & Committees', href: '/investors/board-composition' },
      { label: 'Policies', href: '/investors/policies' },
      { label: 'Corporate Information', href: '/investors/corporate-information' },
      { label: 'Regulation 46 (LODR)', href: '/investors/regulation-46' },
    ],
  },
  {
    heading: 'Meetings & Disclosures',
    links: [
      { label: 'AGM / EoGM', href: '/investors/meetings/agm-egm' },
      { label: 'Board Meeting', href: '/investors/meetings/board' },
      { label: 'Intimation to Stock Exchange', href: '/investors/intimation' },
      { label: 'Disclosures', href: '/investors/disclosures' },
      { label: 'CSR Compliance', href: '/investors/csr-compliance' },
      { label: 'Postal Ballot', href: '/investors/postal-ballot' },
    ],
  },
  {
    heading: 'IPO & Grievance',
    links: [
      { label: 'Abridged Prospectus', href: '/investors/ipo/abridged-prospectus' },
      { label: 'Red Herring Prospectus', href: '/investors/ipo/red-herring' },
      { label: 'DRHP', href: '/investors/ipo/drhp' },
      { label: 'Prospectus', href: '/investors/ipo/prospectus' },
      { label: 'Material Contracts', href: '/investors/ipo/material-contracts' },
      { label: 'RTI', href: '/investors/grievance/rti' },
      { label: 'KMP Details', href: '/investors/grievance/kmp' },
    ],
  },
];

/** Maps a new clean route slug → the backend investor_documents category. */
export const INVESTOR_CATEGORY_BY_SLUG: Record<string, string> = {
  'annual-reports': 'ANNUAL_REPORT',
  policies: 'POLICY',
  'board-composition': 'BOARD_COMPOSITION',
  'annual-return': 'ANNUAL_RETURN',
  'agm-egm': 'MEETING_AGM_EGM',
  board: 'MEETING_BOARD',
  'financial-results': 'FINANCIAL_RESULT',
  shareholding: 'SHAREHOLDING',
  'credit-rating': 'CREDIT_RATING',
  'corporate-information': 'CORPORATE_INFO',
  'abridged-prospectus': 'IPO_ABRIDGED_PROSPECTUS',
  'red-herring': 'IPO_RHP',
  drhp: 'IPO_DRHP',
  prospectus: 'IPO_PROSPECTUS',
  'material-contracts': 'IPO_MATERIAL_CONTRACTS',
  disclosures: 'DISCLOSURE',
  'csr-compliance': 'CSR_COMPLIANCE',
  'postal-ballot': 'POSTAL_BALLOT',
  intimation: 'INTIMATION',
};
