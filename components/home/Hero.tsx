'use client';

/**
 * Hero — full-viewport, cinematic VIDEO-SLIDER hero for Paradeep Parivahan.
 * The previous split layout + animated SVG "PortScene" has been retired in
 * favour of live port/logistics footage. All the actual markup, motion and
 * accessibility handling live in <VideoHero />; this stays as the stable
 * default export that page.tsx imports.
 */

import VideoHero from './VideoHero';

export default function Hero() {
  return <VideoHero />;
}
