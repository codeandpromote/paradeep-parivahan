'use client';

/**
 * Dark header — transparent over the hero, solidifies to ink on scroll.
 * Desktop mega-menu (3-level Investors nesting); mobile slide-over.
 */

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu, Phone, ArrowRight } from 'lucide-react';
import { NAV, INVESTOR_MEGA, type NavNode } from '@/lib/nav';
import { useAccessibility } from '@/context/AccessibilityContext';
import MobileNav from './MobileNav';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { reducedMotion } = useAccessibility();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        // Translucent, blurred overlay so the hero footage shows through the bar.
        // Solidifies (more opaque tint) once the page is scrolled for legibility.
        'sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300',
        scrolled
          ? 'border-white/10 bg-ink-950/85 shadow-card'
          : 'border-white/10 bg-ink-950/50',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" aria-label="Paradeep Parivahan home" className="flex shrink-0 items-center">
          {/* Brand-colour logo line-animation in a white floating box (plaque).
              Loops; static poster under reduced-motion. Sits in the sticky
              header so it travels with the menu on scroll. */}
          <span className="inline-flex items-center rounded-lg bg-white px-3.5 py-2.5 shadow-lg ring-1 ring-black/5">
            {reducedMotion ? (
              <Image
                src="/media/img/logo-header-white-poster.jpg"
                alt="Paradeep Parivahan Limited — Delivering Commitments"
                width={240}
                height={110}
                className="h-12 w-auto"
                priority
              />
            ) : (
              <video
                src="/media/video/logo-header-white.mp4"
                poster="/media/img/logo-header-white-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Paradeep Parivahan Limited — Delivering Commitments"
                className="h-12 w-auto"
              />
            )}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden flex-nowrap items-center gap-0.5 xl:flex">
          {NAV.map((node) => (
            <TopLevel key={node.label} node={node} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+916722223416"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent-400 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-accent-300 lg:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            +91-67-2222 3416
          </a>
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-accent-400 p-2.5 text-ink-950 shadow-lg ring-1 ring-black/5 transition hover:bg-accent-300 xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function TopLevel({ node }: { node: NavNode }) {
  const hasChildren = !!node.children?.length;
  const isInvestors = node.label === 'Investor Relations';

  if (!hasChildren) {
    return (
      <Link
        href={node.href ?? '#'}
        className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-200 transition hover:text-accent-300"
      >
        {node.label}
      </Link>
    );
  }

  // Investors gets a bespoke, grouped mega-panel (clean columns).
  if (isInvestors) {
    return (
      <div className="group relative">
        <Link
          href="/investors"
          className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:text-accent-300"
        >
          <span className="whitespace-nowrap">Investor Relations</span>
          <ChevronDown className="h-4 w-4 opacity-50 transition group-hover:rotate-180" aria-hidden />
        </Link>

        <div className="invisible absolute left-1/2 top-full z-50 w-[900px] max-w-[92vw] -translate-x-1/2 translate-y-2 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/95 opacity-0 shadow-card backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="grid grid-cols-4 gap-x-6 gap-y-2 p-6">
            {INVESTOR_MEGA.map((col) => (
              <div key={col.heading}>
                <p className="mb-2 border-b border-white/10 pb-2 text-xs font-semibold uppercase tracking-wider text-accent-400">
                  {col.heading}
                </p>
                <ul className="flex flex-col">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="block rounded-md px-2 py-1.5 text-[13px] leading-snug text-slate-300 transition hover:bg-white/5 hover:text-accent-300"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link
            href="/investors"
            className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-accent-300 transition hover:bg-white/[0.06]"
          >
            View the full Investor Relations hub
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  // Standard single-column dropdown for the other menus.
  return (
    <div className="group relative">
      <Link
        href={node.href ?? '#'}
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-200 transition hover:text-accent-300"
      >
        {node.label}
        <ChevronDown className="h-4 w-4 opacity-50 transition group-hover:rotate-180" aria-hidden />
      </Link>

      <div className="invisible absolute left-0 top-full z-50 flex w-64 translate-y-2 flex-col rounded-2xl border border-white/10 bg-ink-800/95 p-3 opacity-0 shadow-card backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {node.children!.map((child) => (
          <DropdownLink key={child.label} node={child} />
        ))}
      </div>
    </div>
  );
}

function DropdownLink({ node }: { node: NavNode }) {
  return (
    <Link
      href={node.href ?? '#'}
      className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-accent-300"
    >
      {node.label}
    </Link>
  );
}
