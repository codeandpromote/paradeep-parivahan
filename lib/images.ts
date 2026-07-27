/**
 * Centralised imagery.
 * -------------------------------------------------------------------------
 * High-quality curated stock from Unsplash (free to use). These are the
 * NEW site's polished visuals — the original site's photos were low-res.
 * Every URL is in ONE place so the client can swap any of them for their
 * own photography by editing this file (or later, via the CMS `pages`/
 * `gallery_images` tables which override these defaults).
 *
 * Unsplash delivery params: &w=<width>&q=80&auto=format&fit=crop
 * -------------------------------------------------------------------------
 */

// Imagery now points at the curated, high-resolution client photos in
// frontend/public/media/img/** (see lib/media.ts). The old low-res stock
// under /images/stock/** and the /uploads/images/pages/** shots are no
// longer referenced here — the physical files may remain on disk unused.
import { MEDIA_IMG } from '@/lib/media';

export const IMAGES = {
  // Legacy hero slider array — no longer consumed by the hero, kept for
  // safety so any incidental import still resolves to real photos.
  hero: [MEDIA_IMG.shipSunset, MEDIA_IMG.cargoShip, MEDIA_IMG.portNightCranes],

  // Section / division banners
  stevedoring: MEDIA_IMG.cargoShip,
  mining: MEDIA_IMG.coalMachinery,
  trading: MEDIA_IMG.coalPile,
  logistics: MEDIA_IMG.containerYard,
  marine: MEDIA_IMG.dryDockNight,
  dredging: MEDIA_IMG.dredger,
  about: MEDIA_IMG.aerialPlant,

  // Equipment category thumbnails — one distinct image per category. Keys match
  // EQUIPMENT_SLUGS values (note 'vibrator-roller').
  equipment: {
    'hydraulicexcavators': MEDIA_IMG.industrialPlantDusk,
    'payloader': MEDIA_IMG.shipSunset,
    'dozer': MEDIA_IMG.coalMachinery,
    'dumper': MEDIA_IMG.portNightShips,
    'vibrator-roller': MEDIA_IMG.dryDockNight,
    'jcb': MEDIA_IMG.aerialIndustrial,
  } as Record<string, string>,

  // Generic fallbacks
  placeholderWide: MEDIA_IMG.shipSunset,
  placeholderSquare: MEDIA_IMG.portNightCranes,

  // Abstract SVG-friendly gradient backdrop tint (used behind hero waves)
  heroTintFrom: '#0b1e4d',
  heroTintTo: '#036672',
};

/**
 * Resolve an asset reference.
 * All company assets are bundled locally under `frontend/public/uploads/**`, so
 * a `/uploads/...` path is served same-origin by Next (no external host).
 * `NEXT_PUBLIC_ASSET_HOST` can still override in a decoupled deployment where
 * the PHP host serves the files; leave it empty to use the local copies.
 */
export function resolveAsset(path?: string | null, fallback = IMAGES.placeholderWide): string {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  const rel = path.startsWith('/') ? path : `/${path}`;
  // Only CMS-managed /uploads assets live on the PHP host (so new CMS uploads
  // are served live). Bundled /media design assets stay same-origin (Vercel).
  const host = process.env.NEXT_PUBLIC_ASSET_HOST || '';
  return rel.startsWith('/uploads') ? `${host}${rel}` : rel;
}
