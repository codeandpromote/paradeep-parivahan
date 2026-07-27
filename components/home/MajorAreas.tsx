import { getServiceAreas } from '@/lib/data';
import MajorAreasClient from './MajorAreasClient';

/**
 * "Our Major Areas of Operation" — homepage section. Data is DYNAMIC
 * (service_areas table via the API, CMS-editable) with a static fallback.
 * Each item's `icon` key maps to a bespoke animated SVG in the client.
 */
export default async function MajorAreas() {
  const areas = await getServiceAreas();
  return <MajorAreasClient areas={areas} />;
}
