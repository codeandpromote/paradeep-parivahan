'use client';

/**
 * DocumentTable — renders a list of investor_documents for one category.
 * Client-side search/filter over the pre-fetched rows. Responsive: table on
 * desktop, stacked cards on mobile. Empty categories (CSR Compliance, RTI)
 * show a friendly "documents will be published here" state.
 */

import { useMemo, useState } from 'react';
import { FileText, Download, Search } from 'lucide-react';
import type { InvestorDoc } from '@/lib/api';
import { resolveAsset } from '@/lib/images';
import Reveal from '@/components/motion/Reveal';

export default function DocumentTable({ docs }: { docs: InvestorDoc[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return docs;
    return docs.filter(
      (d) =>
        d.title.toLowerCase().includes(term) ||
        (d.period ?? '').toLowerCase().includes(term)
    );
  }, [q, docs]);

  if (!docs.length) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-white/15 bg-ink-900 p-12 text-center">
        <FileText className="mx-auto h-10 w-10 text-slate-500" aria-hidden />
        <p className="mt-4 font-medium text-slate-200">No documents published yet</p>
        <p className="mt-1 text-sm text-slate-400">
          Filings for this section will appear here as they are released.
        </p>
      </div>
    );
  }

  return (
    <div>
      <label className="relative mb-6 block max-w-sm">
        <span className="sr-only">Search documents</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or period…"
          className="w-full rounded-full border border-white/15 bg-ink-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-accent-400"
        />
      </label>

      <ul className="space-y-3">
        {filtered.map((d, i) => (
          <Reveal as="li" key={d.id} delay={Math.min(i * 0.03, 0.3)}>
            <a
              href={resolveAsset(d.file_path)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-ink-900 p-4 transition hover:border-accent-500/50 hover:bg-white/[0.03]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-500/15 text-accent-400 group-hover:bg-accent-400 group-hover:text-ink-950">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-slate-100 group-hover:text-accent-300">
                  {d.title}
                </span>
                {d.period && <span className="text-xs text-slate-400">{d.period}</span>}
              </span>
              <Download className="h-5 w-5 shrink-0 text-slate-500 group-hover:text-accent-400" aria-hidden />
            </a>
          </Reveal>
        ))}
        {!filtered.length && (
          <li className="py-8 text-center text-sm text-slate-400">No documents match “{q}”.</li>
        )}
      </ul>
    </div>
  );
}
