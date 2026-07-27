/**
 * Typed fetch client for the Core PHP REST API (Agent 4).
 * Server Components call these directly (SSR/ISR); the PHP side must send
 * permissive CORS headers (see backend/.htaccess) for any client-side use.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.paradeepparivahan.com/api';

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

async function apiGet<T>(path: string, revalidate = 300): Promise<T> {
  const url = `${API_BASE}/${path.replace(/^\//, '')}`;
  const res = await fetch(url, {
    // Dev: always fresh so CMS edits show instantly. Prod: ISR (revalidate).
    next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : revalidate },
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} for ${url}`);
  }
  const json = (await res.json()) as ApiEnvelope<T>;
  if (!json.success) throw new Error(json.message || `API error for ${url}`);
  return json.data;
}

// ---- Domain types (align with Agent 2 schema) ----
export interface InvestorDoc {
  id: number;
  category: string;
  title: string;
  file_path: string;
  period?: string;
  sort_order: number;
}
export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  photo: string;
  bio?: string;
  category: 'BOARD' | 'KMP';
}
export interface EquipmentModel {
  id: number;
  category_slug: string;
  category_title: string;
  category_image: string;
  category_description?: string;
  model: string;
  quantity: number;
  capacity?: string | null;
}
export interface Client {
  id: number;
  name: string;
  logo: string;
}
export interface MenuItem {
  id: number;
  label: string;
  slug: string | null;
  url: string | null;
  parent_id: number | null;
  sort_order: number;
}

// ---- Endpoint helpers ----
export interface Partner { id: number; type: 'SUBCONTRACT' | 'JOBWORK' | 'PARTY'; name: string; detail?: string; }
export interface GalleryImage { id: number; album: 'GALLERY' | 'CSR'; image: string; caption?: string; }

export const api = {
  menu: () => apiGet<MenuItem[]>('get_menu.php', 3600),
  investorDocs: (category: string) =>
    apiGet<InvestorDoc[]>(`get_investor_docs.php?category=${encodeURIComponent(category)}`),
  services: () => apiGet<{ activities: unknown[]; commodities: unknown[] }>('get_services.php'),
  team: (category?: string) =>
    apiGet<TeamMember[]>('get_team.php' + (category ? `?category=${category}` : '')),
  equipment: (slug?: string) =>
    apiGet<EquipmentModel[]>('get_equipment.php' + (slug ? `?category=${encodeURIComponent(slug)}` : '')),
  clients: () => apiGet<Client[]>('get_clients.php'),
  partners: (type: string) => apiGet<Partner[]>(`get_partners.php?type=${type}`),
  gallery: (album: string) => apiGet<GalleryImage[]>(`get_gallery.php?album=${album}`),
  page: (slug: string) => apiGet<Record<string, string>>(`get_page.php?slug=${encodeURIComponent(slug)}`),
  misc: <T>(resource: string) => apiGet<T>(`get_misc.php?resource=${resource}`),
};

/**
 * Safe wrapper — returns fallback instead of throwing, so a backend hiccup
 * degrades a single section rather than 500-ing the whole page during migration.
 */
export async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p;
  } catch (e) {
    console.error('[api] falling back:', (e as Error).message);
    return fallback;
  }
}
