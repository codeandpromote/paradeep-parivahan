import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import AccessibilityToolbar from '@/components/AccessibilityToolbar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Paradeep Parivahan Ltd. — Ports, Logistics & Stevedoring',
    template: '%s | Paradeep Parivahan Ltd.',
  },
  description:
    'Paradeep Parivahan Ltd. — one of the largest fleet-owning port service providers on the east coast of India. Stevedoring & port operations, trading, logistics & transportation, and marine & defence infrastructure.',
  metadataBase: new URL('https://www.paradeepparivahan.com'),
};

/**
 * Anti-FOUC: apply persisted accessibility settings to <html> BEFORE first
 * paint, so high-contrast / font-scale don't flash. Runs before React hydrates.
 */
const a11yBootScript = `
(function(){try{
  var s=JSON.parse(localStorage.getItem('ppl-a11y')||'{}');
  var r=document.documentElement;
  if(s.fontScale) r.style.setProperty('--a11y-font-scale',String(s.fontScale));
  r.setAttribute('data-contrast', s.highContrast?'high':'normal');
  r.setAttribute('data-motion', s.reducedMotion?'reduced':'full');
  r.setAttribute('data-reading', s.readingMode?'true':'false');
}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
      </head>
      <body>
        <AccessibilityProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <AccessibilityToolbar />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
