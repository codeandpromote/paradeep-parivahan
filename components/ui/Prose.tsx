import Reveal from '@/components/motion/Reveal';
import type { ReactNode } from 'react';

/**
 * Renders a prose body on the dark theme. Supports a light markdown subset so
 * CMS/DB-stored content can carry structure:
 *   - "## Heading"      → section heading (h2)
 *   - "### Subheading"  → sub-heading (h3)
 *   - "- bullet"        → bullet list (consecutive lines grouped)
 *   - other lines       → paragraphs (blank line separates paragraphs)
 * Parsed line-by-line so a heading may be followed immediately by a list or
 * text without needing a blank line in between.
 */
type Block =
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'ul'; items: string[] };

function parse(body: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] = [];
  const flushPara = () => { if (para.length) { blocks.push({ type: 'p', text: para.join(' ') }); para = []; } };
  const flushList = () => { if (list.length) { blocks.push({ type: 'ul', items: list }); list = []; } };

  for (const raw of body.split('\n')) {
    const t = raw.trim();
    if (!t) { flushPara(); flushList(); continue; }
    if (t.startsWith('- ')) { flushPara(); list.push(t.slice(2)); continue; }
    flushList();
    if (t.startsWith('### ')) { flushPara(); blocks.push({ type: 'h3', text: t.slice(4) }); continue; }
    if (t.startsWith('## ')) { flushPara(); blocks.push({ type: 'h2', text: t.slice(3) }); continue; }
    para.push(t);
  }
  flushPara(); flushList();
  return blocks;
}

export default function Prose({ body }: { body: string }) {
  const blocks = parse(body);
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-5">
        {blocks.map((b, i) => {
          const delay = Math.min(i * 0.05, 0.3);
          let node: ReactNode;
          if (b.type === 'ul') {
            node = (
              <ul className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-lg leading-relaxed text-slate-300">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          } else if (b.type === 'h2') {
            node = <h2 className="pt-4 font-display text-2xl font-bold text-white md:text-3xl">{b.text}</h2>;
          } else if (b.type === 'h3') {
            node = <h3 className="pt-2 font-display text-xl font-bold text-white">{b.text}</h3>;
          } else {
            node = <p className="text-lg leading-relaxed text-slate-300">{b.text}</p>;
          }
          return <Reveal key={i} delay={delay}>{node}</Reveal>;
        })}
      </div>
    </div>
  );
}
