'use client';

/**
 * VideoHero — full-viewport, cinematic VIDEO-SLIDER hero.
 *
 * A stack of muted/looping port-operations clips cross-fades every ~7s (and on
 * indicator click). A LIGHT left→right + bottom gradient keeps the footage
 * clearly visible while the overlaid copy stays legible. Headline reveals
 * word-by-word from overflow masks; eyebrow/sub/CTAs/trust stagger in.
 *
 * Reduced motion: no autoplay-cycle, no ken-burns, no entrance motion — the
 * first clip's poster is shown statically, but indicators remain usable.
 * Videos are decorative (aria-hidden); the section carries `data-speak`.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HERO_VIDEOS } from '@/lib/media';
import { useAccessibility } from '@/context/AccessibilityContext';

const CYCLE_MS = 7000;

const HEADLINE: { word: string; gold?: boolean }[] = [
  { word: 'Gateway' },
  { word: 'to' },
  { word: "India's" },
  { word: 'eastern', gold: true },
  { word: 'seaboard', gold: true },
];

const TRUST = [
  { k: '24+', v: 'Years on the coast' },
  { k: '350+', v: 'Fleet & equipment' },
  { k: '9', v: 'Port locations' },
];

export default function VideoHero() {
  const { reducedMotion } = useAccessibility();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number) => setActive(((next % HERO_VIDEOS.length) + HERO_VIDEOS.length) % HERO_VIDEOS.length),
    []
  );

  // Auto-advance on a timer (paused entirely under reduced motion).
  useEffect(() => {
    if (reducedMotion) return;
    timerRef.current = setTimeout(() => go(active + 1), CYCLE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, reducedMotion, go]);

  return (
    <section
      data-speak="Paradeep Parivahan Limited. Gateway to India's eastern seaboard. One of the largest fleet-owning port service providers on India's eastern coast — stevedoring, cargo handling, transportation, trading and marine & defence infrastructure, delivered end-to-end. Established 2000."
      className="grain relative isolate -mt-[92px] h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950"
    >
      {/* ===== VIDEO SLIDER (decorative background) ===== */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {HERO_VIDEOS.map((clip, i) => {
          const isActive = i === active;
          return (
            <div
              key={clip.src}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              {reducedMotion ? (
                // Static poster only — no autoplay, no scale.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={clip.poster}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  className={[
                    'h-full w-full object-cover',
                    isActive ? 'animate-kenburns' : '',
                  ].join(' ')}
                  poster={clip.poster}
                  src={clip.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  // Eagerly buffer the first clip; lazily fetch the rest.
                  preload={i === 0 ? 'auto' : 'metadata'}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ===== LIGHT LEGIBILITY OVERLAYS (footage stays visible) ===== */}
      {/* Left→right scrim behind the text side */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/75 via-ink-950/40 to-transparent" />
      {/* Soft bottom gradient to seat the trust row + indicators */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
      {/* Faint top vignette for the nav */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink-950/55 to-transparent" />

      {/* ===== CONTENT — top-aligned on phones (so the whole block incl. the
          trust row fits under the overlay header), vertically centred on md+.
          Entrance is CSS-driven (.hero-reveal / .hero-word) so the copy is
          guaranteed visible even if JS/hydration is delayed on mobile. ===== */}
      <div className="absolute inset-0 z-10 flex items-start pt-24 sm:pt-28 md:items-center md:pt-0">
       <div className="mx-auto w-full max-w-7xl px-6">
        <div className="max-w-[38rem] [text-shadow:0_2px_24px_rgba(2,8,20,0.55)]">
          {/* Eyebrow */}
          <div className="hero-reveal mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-400 sm:mb-6 sm:text-xs sm:tracking-[0.28em]">
            <span className="h-px w-6 bg-accent-500 sm:w-10" />
            Est. 2000 · Ports · Logistics · Trading
          </div>

          {/* Headline — words flow & wrap naturally; each masked for the reveal */}
          <h1 className="font-display text-[clamp(2.25rem,4.8vw,4.25rem)] font-bold leading-[1.03] tracking-tight text-white">
            {HEADLINE.map((item, i) => (
              <span
                key={i}
                className="mr-[0.28em] inline-block overflow-hidden pb-[0.14em] align-bottom"
              >
                <span
                  className={['hero-word', item.gold ? 'text-gradient' : ''].join(' ')}
                  style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                >
                  {item.word}
                </span>
              </span>
            ))}
          </h1>

          {/* Sub-paragraph */}
          <p
            className="hero-reveal mt-5 max-w-lg text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg"
            style={{ animationDelay: '0.45s' }}
          >
            From first-mile to last-mile — end-to-end logistics across ports, plants &amp; mines:
            stevedoring, cargo handling, transportation, dredging, trading &amp; more.
          </p>

          {/* CTAs */}
          <div
            className="hero-reveal mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
            style={{ animationDelay: '0.55s' }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent-400 px-7 py-3.5 font-semibold text-ink-950 shadow-glow transition hover:bg-accent-300"
            >
              Discover Paradeep Parivahan
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/investors"
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-ink-950/20 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:border-accent-400 hover:text-accent-300"
            >
              Investor Relations
            </Link>
          </div>

          {/* Trust row */}
          <div
            className="hero-reveal mt-6 grid grid-cols-3 gap-x-3 gap-y-3 border-t border-white/15 pt-5 sm:mt-8 sm:flex sm:gap-x-8"
            style={{ animationDelay: '0.7s' }}
          >
            {TRUST.map((t) => (
              <div key={t.v}>
                <div className="font-display text-xl font-bold text-white sm:text-2xl">{t.k}</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-300">{t.v}</div>
              </div>
            ))}
          </div>
        </div>
       </div>
      </div>

      {/* ===== SLIDE INDICATORS (segmented gold progress bar) ===== */}
      <div
        className="hero-reveal absolute inset-x-0 bottom-5 z-10 mx-auto flex max-w-7xl items-center gap-3 px-6 sm:bottom-8"
        style={{ animationDelay: '0.85s' }}
        role="group"
        aria-label="Hero video slides"
      >
        {HERO_VIDEOS.map((clip, i) => {
          const isActive = i === active;
          return (
            <button
              key={clip.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show clip ${i + 1}: ${clip.label}`}
              aria-current={isActive ? 'true' : undefined}
              className="group relative h-2.5 flex-1 max-w-[120px] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              {/* track */}
              <span className="absolute inset-0 rounded-full bg-white/25 transition group-hover:bg-white/40" />
              {/* fill */}
              <span
                className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-accent-400"
                style={{ width: isActive ? '100%' : '0%' }}
              >
                {/* Timed sweep on the active bar (CSS; skipped under reduced motion) */}
                {isActive && !reducedMotion && (
                  <span
                    key={active}
                    className="hero-sweep block h-full w-full rounded-full bg-accent-300"
                    style={{ ['--sweep']: `${CYCLE_MS}ms` } as CSSProperties}
                  />
                )}
              </span>
            </button>
          );
        })}
        <span className="ml-2 hidden font-display text-sm font-semibold tabular-nums text-white/80 sm:block">
          <span className="text-accent-400">{String(active + 1).padStart(2, '0')}</span>
          <span className="text-white/40"> / {String(HERO_VIDEOS.length).padStart(2, '0')}</span>
        </span>
      </div>
    </section>
  );
}
