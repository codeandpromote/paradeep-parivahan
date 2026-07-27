'use client';

/**
 * Mobile navigation — full-screen slide-over with accordions.
 * Handles the massively nested Investors tree WITHOUT overflowing the
 * viewport: each level is an independent collapsible <details>-style accordion,
 * the panel scrolls vertically, and long labels wrap. (QA stress-test target.)
 */

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { NAV, type NavNode } from '@/lib/nav';

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={[
        'fixed inset-0 z-[60] xl:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={['absolute inset-0 bg-black/50 transition-opacity', open ? 'opacity-100' : 'opacity-0'].join(' ')}
        onClick={onClose}
      />
      {/* Panel */}
      <nav
        aria-label="Mobile"
        className={[
          'absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="font-display text-lg font-bold text-brand-900">Menu</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="p-1">
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Scroll region — critical so deep Investors tree never blows the viewport */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-2 py-3">
          {NAV.map((node) => (
            <Accordion key={node.label} node={node} depth={0} onNavigate={onClose} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function Accordion({
  node,
  depth,
  onNavigate,
}: {
  node: NavNode;
  depth: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!node.children?.length;
  const pad = { paddingLeft: `${0.75 + depth * 0.75}rem` };

  if (!hasChildren) {
    return (
      <Link
        href={node.href ?? '#'}
        onClick={onNavigate}
        style={pad}
        className="block break-words rounded-md py-2.5 pr-3 text-sm text-slate-700 hover:bg-brand-50"
      >
        {node.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-stretch">
        {node.href ? (
          <Link
            href={node.href}
            onClick={onNavigate}
            style={pad}
            className="flex-1 break-words rounded-md py-2.5 pr-2 text-sm font-medium text-brand-950 hover:bg-brand-50"
          >
            {node.label}
          </Link>
        ) : (
          <span
            style={pad}
            className="flex-1 break-words py-2.5 pr-2 text-sm font-semibold text-brand-800"
          >
            {node.label}
          </span>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.label}`}
          className="px-3 text-slate-500"
        >
          <ChevronRight
            className={['h-5 w-5 transition-transform', expanded ? 'rotate-90' : ''].join(' ')}
          />
        </button>
      </div>
      {expanded && (
        <div className="border-l border-slate-100 pl-1">
          {node.children!.map((c) => (
            <Accordion key={c.label} node={c} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
