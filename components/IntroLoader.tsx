'use client';

/**
 * IntroLoader — a one-time brand intro that plays the logo line-animation on a
 * white screen, then fades to reveal the site. Shows once per session; skipped
 * entirely under reduced-motion. Click/tap or Skip to dismiss early.
 */

import { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

// Module-scope guard: play once per full page load (survives client-side route
// changes; replays on a hard refresh). Reset naturally on reload.
let played = false;

export default function IntroLoader() {
  const { reducedMotion } = useAccessibility();
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reducedMotion || played) return;
    played = true;
    setShow(true);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [reducedMotion]);

  const dismiss = () => {
    if (fading) return;
    setFading(true);
    document.documentElement.style.overflow = '';
    timers.current.push(setTimeout(() => setShow(false), 700));
  };

  // Auto-dismiss shortly after the ~3.9s animation completes (safety net).
  useEffect(() => {
    if (!show) return;
    timers.current.push(setTimeout(dismiss, 4200));
    const t = timers.current;
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!show) return null;

  return (
    <div
      role="presentation"
      onClick={dismiss}
      className="fixed inset-0 z-[999] grid place-items-center bg-white transition-opacity duration-700"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <video
        src="/media/video/logo-intro.mp4"
        poster="/media/img/logo-intro-poster.jpg"
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        className="w-[min(78vw,560px)] max-w-full"
        aria-label="Paradeep Parivahan Limited"
      />
      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-8 right-8 rounded-full border border-ink-900/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink-900/60 transition hover:border-ink-900/50 hover:text-ink-900"
      >
        Skip
      </button>
    </div>
  );
}
