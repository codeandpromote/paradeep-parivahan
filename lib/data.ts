/**
 * Data layer — API-first with a static fallback.
 *
 * Each getter tries the PHP/MySQL API (so anything edited in the CMS shows up),
 * and falls back to the seed constants in lib/content.ts when the backend is
 * unreachable (e.g. local dev without the API). This keeps every section
 * DYNAMIC in production while the site still renders anywhere.
 */

import { api, safe } from '@/lib/api';
import * as C from '@/lib/content';

export const getTeam = () => safe(api.team(), C.TEAM as unknown as C.TeamMember[]);
export const getClients = () => safe(api.clients(), C.CLIENTS as unknown as C.Client[]);
export const getEquipment = (slug?: string) =>
  safe(api.equipment(slug), (slug ? C.EQUIPMENT.filter((e) => e.category_slug === slug) : C.EQUIPMENT) as unknown as C.EquipmentModel[]);
export const getPartners = (type: 'SUBCONTRACT' | 'JOBWORK' | 'PARTY') =>
  safe(api.partners(type), C.PARTNERS.filter((p) => p.type === type) as unknown as C.Partner[]);
export const getGallery = (album: 'GALLERY' | 'CSR') =>
  safe(api.gallery(album), (album === 'CSR' ? C.CSR_IMAGES : C.GALLERY) as unknown as C.GalleryImage[]);
export const getProjects = () => safe(api.misc<C.Project[]>('projects'), C.PROJECTS);
export const getAwards = () => safe(api.misc<C.Award[]>('awards'), C.AWARDS);
export const getOffices = () => safe(api.misc<C.Office[]>('offices'), C.OFFICES);
export const getActivities = () =>
  safe(api.services().then((s) => s.activities as C.Named[]), C.ACTIVITIES);
export const getCommodities = () =>
  safe(api.services().then((s) => s.commodities as C.Named[]), C.COMMODITIES);

export const getGroupCompanies = () =>
  safe(
    api.misc<{ name: string }[]>('group_companies').then((rows) => rows.map((r) => r.name)),
    C.GROUP_COMPANIES
  );

export const getKmp = () => safe(api.misc<typeof C.KMP>('kmp'), C.KMP);

export const getServiceAreas = () =>
  safe(api.misc<C.ServiceArea[]>('service_areas'), C.SERVICE_AREAS);

export const getPage = (slug: string) =>
  safe(api.page(slug) as unknown as Promise<C.Prose>, (C.PROSE[slug] ?? { slug, title: slug, body: '' }) as C.Prose);
