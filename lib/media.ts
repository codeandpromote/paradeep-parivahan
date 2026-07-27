/**
 * Client-supplied media (from /newassets-paradeepparivahan), optimised into
 * frontend/public/media/**. Videos are web-transcoded 1080p H.264 with poster
 * frames; images are resized to ≤2200px. This is the single source of truth
 * for the new hero video slider and every page's breadcrumb imagery.
 */

const M = (n: string) => `/media/img/${n}.jpg`;

export interface HeroVideo {
  src: string;
  poster: string;
  label: string;
}

// Hero background video slider (muted, looping clips of ports / industry).
export const HERO_VIDEOS: HeroVideo[] = [
  { src: '/media/video/v1.mp4', poster: '/media/img/v1-poster.jpg', label: 'Port & terminal operations' },
  { src: '/media/video/v2.mp4', poster: '/media/img/v2-poster.jpg', label: 'Aerial port view' },
  { src: '/media/video/v3.mp4', poster: '/media/img/v3-poster.jpg', label: 'Cargo handling' },
  { src: '/media/video/v4.mp4', poster: '/media/img/v4-poster.jpg', label: 'Logistics in motion' },
  { src: '/media/video/v5.mp4', poster: '/media/img/v5-poster.jpg', label: 'Industrial scale' },
];

// Curated, named stills for breadcrumbs / section imagery.
export const MEDIA_IMG = {
  cargoShip: M('paulbr75-cargo-ship-1646752'),            // cargo ship at berth w/ cranes
  shipSunset: M('pexels-rasmus-andersen-759275282-19686313'), // red cargo ship, golden hour
  portNightCranes: M('pexels-artemkulinych-13157972'),    // port cranes at night
  portCityNight: M('pexels-introspectivedsgn-4593504'),   // port city lights at night
  portNightShips: M('pexels-photo-30750630'),             // ships at port, night
  containerYard: M('pexels-introspectivedsgn-12936132'),  // aerial container/truck yard
  dryDockNight: M('pexels-introspectivedsgn-8913520'),    // aerial dry dock at night
  dredger: M('pexels-deluca-g-412104326-18998415'),       // dredger / barge in water
  aerialPlant: M('jimmy-desplanques-viJErzTznBQ-unsplash'), // aerial industrial plant
  aerialIndustrial: M('marcin-jozwiak-uKvPDQop-JA-unsplash'), // aerial industrial area
  industrialPlantDusk: M('camera-man-industrial-plant-5968230'), // plant/silos at dusk
  coalPile: M('pexels-kelly-6595789'),                    // bulk coal pile + machinery
  coalMachinery: M('pexels-wolfgang-vrede-9996223-35917393'), // coal + reclaimer machinery
  aerialShipIsland: M('pexels-tomfisk-1996989'),          // aerial ship at port/island
} as const;

export type MediaImgKey = keyof typeof MEDIA_IMG;
