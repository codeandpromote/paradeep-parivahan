/**
 * Seed content — mirrors the MySQL seed (backend/schema.sql). Used as the
 * fallback in lib/data.ts so every page renders even before the PHP API is
 * live. Once the backend is deployed, data.ts prefers the API automatically.
 */

import { MEDIA_IMG } from '@/lib/media';

export interface TeamMember { id: number; name: string; designation: string; photo: string; bio?: string; category: 'BOARD' | 'KMP'; }
export interface EquipmentModel { id: number; category_slug: string; category_title: string; category_image: string; category_description?: string; model: string; quantity: number; capacity?: string | null; }
export interface Client { id: number; name: string; logo: string; }
export interface Partner { id: number; type: 'SUBCONTRACT' | 'JOBWORK' | 'PARTY'; name: string; detail?: string; }
export interface Project { id: number; name: string; description: string; }
export interface Named { id: number; title: string; image?: string; }
export interface Office { id: number; name: string; address: string; email: string; phone: string; fax?: string; manager?: string; manager_phone?: string; }
export interface GalleryImage { id: number; album: 'GALLERY' | 'CSR'; image: string; caption?: string; }
export interface Award { id: number; title?: string; image: string; award_date?: string; }
export interface Prose { slug: string; title: string; body: string; hero_image?: string; }

export const TEAM: TeamMember[] = [
  { id: 1, name: 'Dr. Khalid Khan', designation: 'Managing Director & CEO', photo: '/uploads/photos/Picture1.png', bio: 'A visionary leader, Khalid Khan founded Paradeep Parivahan Ltd. in 2000 and has since steered the company toward global recognition. As the Chairman and Managing Director, he provides strategic direction, drawing on his extensive experience in the logistics industry. Khan’s leadership is marked by a commitment to innovation, sustainability, and a customer-centric approach, shaping the company’s success and fostering a culture of excellence.', category: 'BOARD' },
  { id: 2, name: 'Pravat Kumar Nandi', designation: 'Director', photo: '/uploads/photos/Picture2.png', bio: 'Pravat Kumar Nandi, as a Director, plays a pivotal role in Paradeep Parivahan Ltd.’s journey. His strategic insights and business acumen contribute to the company’s growth and development. With a wealth of experience, Nandi brings valuable perspectives to the board, ensuring that the company remains agile in responding to industry dynamics. His dedication to fostering strong partnerships and driving operational efficiency has been instrumental in the company’s achievements.', category: 'BOARD' },
  { id: 3, name: 'Parbati Priya Nandi', designation: 'Director', photo: '/uploads/photos/parbati1.jpeg', bio: 'As a Director on the board, Parbati Priya Nandi contributes to the company’s strategic direction and governance, supporting sustainable growth across its port, logistics, trading and marine-infrastructure operations.', category: 'BOARD' },
  { id: 4, name: 'Bushra Khan', designation: 'Non-Executive Director', photo: '/uploads/photos/WhatsApp_Image_2026-02-09_at_11_10_06.jpeg', bio: 'As a Non-Executive Director, Bushra Khan brings an independent, big-picture perspective to board deliberations, supporting sound corporate governance and the company’s long-term strategic priorities.', category: 'BOARD' },
  { id: 5, name: 'Ardhendu Sekhar Raut', designation: 'Independent Director', photo: '/uploads/photos/arendhu1.jpeg', bio: 'An Independent Director, Ardhendu Sekhar Raut provides objective oversight and independent judgement on matters of audit, risk and governance, strengthening the board’s independence and protecting stakeholder interests.', category: 'BOARD' },
  { id: 6, name: 'Chandra Kanta Prusty', designation: 'Independent Director', photo: '/uploads/photos/chandrakanta1.jpeg', bio: 'As an Independent Director, Chandra Kanta Prusty offers impartial guidance on strategy, compliance and risk management, reinforcing transparency and accountability across the organisation.', category: 'BOARD' },
  { id: 7, name: 'Prithvi Ranjan Parhi', designation: 'Independent Director', photo: '/uploads/photos/Prithvi1.jpeg', bio: 'Prithvi Ranjan Parhi serves as an Independent Director, contributing an independent viewpoint on corporate strategy, regulatory compliance and stakeholder governance to the board.', category: 'BOARD' },
  { id: 8, name: 'Usha Rani Ray', designation: 'Company Secretary & Compliance Officer', photo: '/uploads/photos/Photo-Usha_Ray.jpeg', bio: 'As Company Secretary and Compliance Officer, Usha Rani Ray ensures the company’s statutory and regulatory compliance, oversees board processes, and serves as the key point of contact for investor and shareholder communication.', category: 'KMP' },
  { id: 9, name: 'Suryasnata Rath', designation: 'Chief Financial Officer', photo: '/uploads/photos/WhatsApp_Image_2026-03-25_at_16_00_04.jpeg', bio: 'As Chief Financial Officer, Suryasnata Rath leads the company’s financial strategy, reporting, treasury and internal controls, supporting disciplined growth and strong financial governance.', category: 'KMP' },
];

export interface GroupCompany { name: string; detail: string; }
export const GROUP_COMPANIES_DETAIL: GroupCompany[] = [
  { name: 'MRTC (India) Pvt. Ltd.', detail: 'A leader in integrated logistics and infrastructure services, driving operational efficiency across major industrial corridors.' },
  { name: 'ASK Logistiek Solutio Private Limited', detail: 'Delivering smart, customized and technology-driven logistics solutions tailored to evolving supply-chain demands.' },
  { name: 'Maa Tarini Logitec Private Limited', detail: 'Specializing in cargo transportation, bulk material handling and end-to-end logistics services with a strong regional presence.' },
  { name: 'Diamond Harbour Transport', detail: 'Trusted for reliable, on-time transport operations with a focus on safety, compliance and seamless connectivity.' },
];
export const GROUP_COMPANIES = GROUP_COMPANIES_DETAIL.map((g) => g.name);

export const ACTIVITIES: Named[] = [
  { id: 1, title: 'Stevedores', image: '/uploads/images/gallery/Stevedores.png' },
  { id: 2, title: 'Port Handling & Intraport Transportation', image: '/uploads/images/gallery/Port_Handling_Intraport_Transportation.png' },
  { id: 3, title: 'Transportation from Mines to Ports', image: '/uploads/images/gallery/Transportation_from_Mines_to_Ports.png' },
  { id: 4, title: 'Custom House Agent', image: '/uploads/images/gallery/Custom_House_Agent.png' },
  { id: 5, title: 'Port Handling & Heavy Equipment', image: '/uploads/images/gallery/Port_Handling_Heavy_Equipment.png' },
  { id: 6, title: 'Earthmoving Work — HEMM Fleet Owners', image: '/uploads/images/gallery/Earthmoving_Work_HEMM_Fleet_Owners.png' },
  { id: 7, title: 'Specialised Fabrication', image: '/uploads/images/gallery/specialized1.jpeg' },
  { id: 8, title: 'Infrastructure & Concrete Ready Mix', image: '/uploads/images/gallery/Infrastructure_Concrete_Ready_Mix1.png' },
  { id: 9, title: 'Dredging & Reclamation', image: '/uploads/images/gallery/Dredging_Reclamation.png' },
];

export const COMMODITIES: Named[] = [
  { id: 1, title: 'Calibrated Iron Ore', image: '/uploads/images/gallery/Calibrated_Iron_Ore.jpg' },
  { id: 2, title: 'Iron Ore Fines', image: '/uploads/images/gallery/Iron_Ore_Fines.jpg' },
  { id: 3, title: 'Iron Ore Pellets', image: '/uploads/images/gallery/Iron_Ore_Pellets.jpg' },
  { id: 4, title: 'Thermal Coal', image: '/uploads/images/gallery/Thermal_Coal.jpg' },
  { id: 5, title: 'LAM Coke', image: '/uploads/images/gallery/LAM_Coke.jpg' },
  { id: 6, title: 'Manganese Ore', image: '/uploads/images/gallery/Manganese_Ore.jpg' },
  { id: 7, title: 'Primary Aluminium', image: '/uploads/images/gallery/Primary_Aluminium.jpg' },
  { id: 8, title: 'Calcined Alumina', image: '/uploads/images/gallery/Calcined_Alumina.jpg' },
  { id: 9, title: 'Chrome Concentrate', image: '/uploads/images/gallery/Chrome_Concentrate.jpg' },
];

// Our Trusted Operations & Strategic Associations — the 19 operational footprints.
export const PROJECTS: Project[] = [
  { id: 1, name: 'Paradip Port Operations', description: 'End-to-end port logistics — stevedoring, vessel husbandry and uninterrupted bulk cargo handling of iron ore, coal, fertilizers, cement, limestone, gypsum and fly ash.' },
  { id: 2, name: 'IFFCO', description: 'A two-decade partnership managing fertilizer, coal and molten-sulphur logistics — rake loading at Dhanmandal, in-plant handling and bulk-to-bag conversion across Odisha.' },
  { id: 3, name: 'Paradip International Container Terminal (J. M. Baxi & Co)', description: 'Container terminal support — import/export cargo handling, equipment deployment, stevedoring and trailer operations by a disciplined workforce.' },
  { id: 4, name: 'JSW Odisha & Shiva Cement', description: 'End-to-end evacuation of limestone, clinker, gypsum and fly ash — plus finished goods — for JSW Cement, JSW Steel and Shiva Cement.' },
  { id: 5, name: 'IOCL Refinery, Paradip', description: 'Land reclamation across 3,000+ acres, infrastructure development and comprehensive manpower solutions since the refinery’s inception.' },
  { id: 6, name: 'Gopalpur Port Ltd', description: 'A key role in port development — dredging logistics, land reclamation, breakwater-wall construction and stone pitching.' },
  { id: 7, name: 'JSW Steel Ltd.', description: 'Seamless transportation of iron-ore fines to designated railway sidings and stockyards.' },
  { id: 8, name: 'Brahmani River Pellets Ltd', description: 'Road logistics for iron-pellet movement to Paradip and Visakhapatnam ports.' },
  { id: 9, name: 'Mata Dadimati Metals & Minerals', description: 'Reliable iron-ore-fines transportation to strategic rail-siding points.' },
  { id: 10, name: 'Ashika Fintrade Pvt. Ltd.', description: 'Consistent, efficient iron-ore movement solutions across operational zones.' },
  { id: 11, name: 'Jajpur Cement', description: 'Full-spectrum raw-material logistics — rake unloading and direct plant delivery of clinker, gypsum and fly ash.' },
  { id: 12, name: 'MCL & WCL', description: 'Comprehensive coal logistics — overburden removal, coal transportation, in-plant feeding and rake loading for leading coal miners.' },
  { id: 13, name: 'Dhanmandal Railway Siding', description: '24/7 cargo handling, rake loading/unloading and end-to-end railway coordination with zero demurrage.' },
  { id: 14, name: 'Manguli Railway Siding', description: 'Round-the-clock siding operations with strategically positioned teams and equipment.' },
  { id: 15, name: 'Visakhapatnam Port', description: 'End-to-end port logistics — stevedoring and cargo forwarding backed by modern equipment and specialized handling expertise.' },
  { id: 16, name: 'Haldia Port', description: 'Bulk cargo handling and stevedoring supported by modern equipment and skilled manpower.' },
  { id: 17, name: 'MESCO Railway Siding (Kalinga Nagar)', description: 'An exclusive long-term Co-User Agreement serving Adani, JSW and Godavari Power with inbound and outbound logistics.' },
  { id: 18, name: 'Review Infrahousing Pvt. Ltd.', description: 'Ready-Mix Concrete manufacturing and delivery in Bhubaneswar through a dedicated batching plant and in-house fleet.' },
  { id: 19, name: 'Specialized Steel Fabrication', description: 'Precision fabrication of industrial-grade steel structures for Tata Steel, L&T, JSL and others at Kalinga Nagar.' },
];

const eq = (id: number, s: string, t: string, img: string, model: string, quantity: number, capacity?: string, desc?: string): EquipmentModel =>
  ({ id, category_slug: s, category_title: t, category_image: img, category_description: desc, model, quantity, capacity: capacity ?? null });

export const EQUIPMENT: EquipmentModel[] = [
  eq(1, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'VOLVO 240', 10, undefined, 'Heavy machines with hydraulic arms and 360° rotation for excavation, loading and mobilisation.'),
  eq(2, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'VOLVO 290', 10),
  eq(3, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'L&T PC200', 15),
  eq(4, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'CAT 320', 1),
  eq(5, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'EX-100', 1),
  eq(6, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'EX-70', 1),
  eq(7, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'EX-210', 10),
  eq(8, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'VOLVO 360', 2),
  eq(9, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'HITACHI 460', 2),
  eq(10, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'HYUNDAI', 10),
  eq(11, 'hydraulicexcavators', 'Hydraulic Excavator', '/uploads/images/pages/1.jpg', 'LIUGONG', 12),
  eq(12, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'VOLVO L45B', 5, undefined, 'Versatile wheel loaders to scoop and transport rubble, gravel, soil and debris.'),
  eq(13, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'VOLVO L120', 5),
  eq(14, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'CAT 2021', 10),
  eq(15, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'CAT 962 & KAWASAKI', 10),
  eq(16, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'HM 2021', 15),
  eq(17, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'CAT 950 Loader', 10),
  eq(18, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'LG Loader (Small)', 20),
  eq(19, 'payloader', 'Pay Loader', '/uploads/images/pages/2.jpg', 'LG Loader (Big)', 31),
  eq(20, 'dozer', 'Dozer', '/uploads/images/pages/3.jpg', 'CAT D5G', 1, undefined, 'Powerful machines for pushing earth or rock in road building, construction and wrecking.'),
  eq(21, 'dozer', 'Dozer', '/uploads/images/pages/3.jpg', 'Dozer D6H', 1),
  eq(22, 'dozer', 'Dozer', '/uploads/images/pages/3.jpg', 'Dozer D80A-12', 1),
  eq(23, 'dozer', 'Dozer', '/uploads/images/pages/3.jpg', 'Shantui Bull Dozer', 1),
  eq(24, 'dumper', 'Dumper / Tipper / Hywa', '/uploads/images/pages/4.jpg', 'Ashok Leyland', 20, '10MT & 20MT', 'Vehicles for carrying bulk material, debris, sand and gravel safely and efficiently.'),
  eq(25, 'dumper', 'Dumper / Tipper / Hywa', '/uploads/images/pages/4.jpg', 'Tata', 40, '10MT & 20MT'),
  eq(26, 'dumper', 'Dumper / Tipper / Hywa', '/uploads/images/pages/4.jpg', 'Tata TT', 10, '40MT'),
  eq(27, 'dumper', 'Dumper / Tipper / Hywa', '/uploads/images/pages/4.jpg', 'Volvo', 10, '40MT'),
  eq(28, 'dumper', 'Dumper / Tipper / Hywa', '/uploads/images/pages/4.jpg', 'Tata Body Truck', 50),
  eq(29, 'dumper', 'Dumper / Tipper / Hywa', '/uploads/images/pages/4.jpg', 'Tata Tanker', 10),
  eq(30, 'dumper', 'Dumper / Tipper / Hywa', '/uploads/images/pages/4.jpg', 'Container Trailer', 20),
  eq(31, 'vibrator-roller', 'Vibrator Roller', '/uploads/images/pages/5.jpg', 'Escort Roller', 2, undefined, 'Compaction equipment applying static and dynamic force to increase load-bearing capacity.'),
  eq(32, 'jcb', 'JCB', '/uploads/images/pages/6.jpg', 'JCB 3D', 10, undefined, 'Versatile backhoe loaders for construction and material handling.'),
];

// map new clean slugs → equipment category_slug
export const EQUIPMENT_SLUGS: Record<string, string> = {
  'hydraulic-excavator': 'hydraulicexcavators',
  'pay-loader': 'payloader',
  dozer: 'dozer',
  dumper: 'dumper',
  'vibrator-roller': 'vibrator-roller',
  jcb: 'jcb',
};

export const CLIENTS: Client[] = [
  ['Bhushan', 'bhusan'], ['Karam', 'karam'], ['Shree', 'shree'], ['JM', 'jm'], ['MCL', 'mcl'], ['BRPL', 'brpl'],
  ['Client', 'Picture23'], ['IFFCO', 'iffco'], ['Jindal', 'zindal'], ['Essar', 'easser'], ['Cement', 'cement'],
  ['Steel', 'steel'], ['Aarti', 'aarti'], ['TAT', 'tat'], ['Premco', 'premco'], ['Cola', 'cola'], ['PICT', 'pict1'],
  ['Bhushan Steel', 'bhusansteel'], ['MRTC', 'mrtc'], ['MESCO', 'mesco'], ['GPL', 'gpl'], ['Bothra', 'bothra'],
  ['RIPL', 'ripl'], ['TM', 'tm'], ['BOS', 'bos'], ['Tata', 'tata1'], ['IT', 'it'], ['Sea', 'sea'],
].map(([name, file], i) => ({ id: i + 1, name, logo: `/uploads/clientlogo/${file}.png` }));

const p = (id: number, type: Partner['type'], name: string): Partner => ({ id, type, name });
export const PARTNERS: Partner[] = [
  p(1, 'SUBCONTRACT', 'MRTC (India) Pvt. Ltd.'), p(2, 'SUBCONTRACT', 'E.C. Bose & Co. Pvt. Ltd.'), p(3, 'SUBCONTRACT', 'Roy & Chatterjee (P) Ltd.'),
  p(4, 'SUBCONTRACT', 'Sesa Goa Ltd.'), p(5, 'SUBCONTRACT', 'J.M. Baxi & Co.'), p(6, 'SUBCONTRACT', 'L.M. Hati & Co. Pvt. Ltd.'),
  p(7, 'SUBCONTRACT', 'Premco Traders'), p(8, 'SUBCONTRACT', 'Boskalis International Dredging (IOCL Paradip Refinery — 1st Phase)'),
  p(9, 'SUBCONTRACT', 'Karamchand & Thapar Pvt. Ltd.'), p(10, 'SUBCONTRACT', 'Satish Chandra Das & Co.'), p(11, 'SUBCONTRACT', 'Just In Time Organisation'),
  p(12, 'SUBCONTRACT', 'Naresh Kumar & Co.'), p(13, 'SUBCONTRACT', 'IRC Logistic Ltd.'), p(14, 'SUBCONTRACT', 'A.C. Commercial & Co. Pvt. Ltd.'),
  p(15, 'SUBCONTRACT', 'Bothra Shipping Services'), p(16, 'SUBCONTRACT', 'Jindal Steel & Power Ltd.'), p(17, 'SUBCONTRACT', 'T.P. Roy Choudhury & Co. Pvt. Ltd.'),
  p(18, 'SUBCONTRACT', 'Dharti Dredging & Infrastructure Ltd. (IOCL Paradip Refinery — 2nd Phase)'),
  p(19, 'JOBWORK', 'Reliable Services'), p(20, 'JOBWORK', 'Sasmal Distributor'), p(21, 'JOBWORK', 'B.K. Construction & Transport'),
  p(22, 'JOBWORK', 'BMC & Engineers Pvt. Ltd.'), p(23, 'JOBWORK', 'N R International Ltd.'), p(24, 'JOBWORK', 'Ajanta Earth Movers'),
  p(25, 'JOBWORK', 'Kandoi Transport'), p(26, 'JOBWORK', 'Narayan Trading'), p(27, 'JOBWORK', 'Priyadarsi Associates'),
  p(28, 'JOBWORK', 'Khazana Project & Industries Pvt. Ltd.'), p(29, 'JOBWORK', 'ITD Cementation India Pvt. Ltd.'), p(30, 'JOBWORK', 'Sarat Chatterjee (VSP) Pvt. Ltd.'),
  p(31, 'JOBWORK', 'Seaways Shipping Pvt. Ltd.'), p(32, 'JOBWORK', 'S.S. Enterprisers'), p(33, 'JOBWORK', 'Sadhaba Shipping Co. Pvt. Ltd.'),
  p(34, 'JOBWORK', 'Pranaya Mallik'), p(35, 'JOBWORK', 'P. Srinivas Rao'), p(36, 'JOBWORK', 'Sark Group Marketing Ltd.'),
  p(37, 'JOBWORK', 'Bhagaban Das'), p(38, 'JOBWORK', 'Aarpee Carriers Pvt. Ltd.'), p(39, 'JOBWORK', 'Tata Chemicals Ltd.'),
  p(40, 'PARTY', 'Varomet Trading India Pvt. Ltd.'), p(41, 'PARTY', 'Kasturilal Harlal Ltd.'), p(42, 'PARTY', 'LMJ International Ltd.'),
  p(43, 'PARTY', 'MNB Steels'), p(44, 'PARTY', 'Rhine Raavi Agro Ltd.'), p(45, 'PARTY', 'Poonadal Import & Export Pvt. Ltd.'),
  p(46, 'PARTY', 'National Oil & Service'), p(47, 'PARTY', 'Swarup Group of Industries'), p(48, 'PARTY', 'SPS Steel & Power Ltd.'),
];

export const GALLERY: GalleryImage[] = [1, 2, 3, 4, 5, 6].map((n) => ({ id: n, album: 'GALLERY', image: `/uploads/images/gallery/port${n}1.jpeg` }));
// csr7 & csr10 are absent on the source server, so they're excluded.
export const CSR_IMAGES: GalleryImage[] = [4, 5, 6, 8, 9, 11].map((n, i) => ({ id: i + 1, album: 'CSR', image: `/uploads/images/gallery/csr${n}.jpeg` }));
export const AWARDS: Award[] = ['PictureA', 'PictureA2', 'PictureA3', 'PictureA4', 'PictureA5', 'PictureA6', 'PictureA7', 'PictureA8'].map((f, i) => ({ id: i + 1, image: `/uploads/client2/${f}.png` }));

export const OFFICES: Office[] = [
  { id: 1, name: 'Registered & Head Office', address: '204, OBC Building, Bank Street Area, Paradip Port, Jagatsinghpur, Pin-754142, Odisha, India', email: 'headoffice@paradeepparivahan.com', phone: '+91-67-2222 3416', fax: '+91-67-2222 3416', manager: 'Mr. Manoj Kumar Pati', manager_phone: '+91-7873453717' },
  { id: 2, name: 'Corporate Office', address: 'A-29, Pallaspali, BDA Colony, Near Airport, Bhubaneswar, Pin-751020, Odisha, India', email: 'info@paradeepparivahan.com', phone: '+91-674-2590169', fax: '+91-674-2590169', manager: 'Shaikh Azam Ali', manager_phone: '+91-9937513376' },
];

export const PROSE: Record<string, Prose> = {
  aboutus: {
    slug: 'aboutus', title: 'Driving Logistics with Precision, Power & Purpose Since 2000', hero_image: MEDIA_IMG.aerialPlant,
    body: `Established in the year 2000 under the visionary leadership of Dr. Khalid Khan, Paradeep Parivahan Ltd has emerged as a trusted and dynamic force in the logistics and port-services sector. With an unwavering focus on operational excellence, the company specializes in cargo handling, intra-port transportation, port operations, and the movement of import cargo — including bulk raw materials and hazardous goods.

## Comprehensive Port Logistics & Integrated Solutions
As a full-spectrum logistics and port-operations company, we offer unmatched expertise in:

- Intra-Port Transportation
- Cargo Handling & Stevedoring
- Rake Handling
- Earthmoving Equipment Leasing
- Port Operations & Project Logistics
- Infrastructure Support Services
- Specialized Services — Port Liaising & Ship Husbandry

## Fleet Strength Powered by Expert Manpower
Our capability to manage complex port, plant and mining operations stems from decades of on-ground experience and a deep understanding of integrated logistics. To power our extensive operations, we maintain a state-of-the-art fleet comprising:

- Material Handling Equipment
- Earthmoving Machinery
- Dumpers, Trailers & Covered Trucks

This high-performance fleet is operated by a dedicated team of trained professionals, ensuring every movement is executed with safety, precision and timeliness.

## Dredging Expertise with Regional & International Reach
Our Dredging Division is widely recognized across India’s East Coast and South-East Asia for its reliability and engineering precision. Collaborating with leading ports and infrastructure entities, we execute high-impact dredging and reclamation projects, contributing to regional and global maritime development.

## Value-Added Services Through Global Sourcing & Trading
Extending beyond traditional logistics, Paradeep Parivahan Ltd offers turnkey sourcing solutions for sectors including steel, aluminium, cement and power. Our specialized global trading division, led by seasoned professionals, ensures our clients receive the right materials from the right sources — every time.

## Corporate Social Responsibility That Makes a Difference
At PPL, we are committed to creating shared value. Our CSR initiatives emphasize healthcare, education and disaster response — bringing tangible, lasting impact to the communities where we operate.`,
  },
  pledge: {
    slug: 'pledge', title: 'Our Green Pledge', hero_image: MEDIA_IMG.aerialIndustrial,
    body: `Every load we carry is a promise — to move progress forward without compromising our planet. The future belongs to those who move the world, yet leave no mark behind.

At Paradeep Parivahan Ltd, we don’t just move cargo — we operate with purpose. As a forward-thinking logistics company committed to a sustainable future, we have taken a firm stand in support of fossil-free energy.

## Leading the Green Shift in Logistics
As a sustainability-driven organization, we recognize that the future of logistics must be green. From port handling to plant logistics, we are integrating eco-conscious practices into every step of our journey. Our clients — many of them sustainability leaders in their own sectors — inspire us to reimagine how we operate, fuelling our mission to set new environmental standards for the industry.

## Collaborating for a Cleaner Tomorrow
We are partnering with world-class equipment manufacturers to co-develop energy-efficient, low-emission machinery. Our efforts span the critical re-engineering of:

- Payloaders
- Forklifts
- Excavators & Dozers
- Drills & Crushers

Our mission is clear — maximize performance, minimize environmental impact.`,
  },
  port: {
    slug: 'port', title: 'Stevedoring & Port Operations', hero_image: MEDIA_IMG.cargoShip,
    body: `At Paradeep Parivahan Ltd, our Stevedoring & Port Operations Division represents a benchmark of operational excellence across key ports on the Eastern Coast of India, with Odisha as our strategic stronghold. Backed by decades of experience and deep domain expertise, we deliver reliable, round-the-clock port services tailored to the dynamic needs of global trade and logistics.

## Equipped for Excellence
To ensure uninterrupted, efficient operations, we maintain a robust fleet of:

- Cargo-handling equipment
- Dumpers
- Trailers
- Loaders & specialized machinery

All operations are executed by a dedicated team of highly skilled professionals, available round-the-clock to ensure consistent quality, uncompromised safety and on-time delivery across every project.

## Why Choose PPL?
- Strategic presence across all major East Coast ports
- Robust operational infrastructure with real-time coordination
- Safety-first approach aligned with environmental best practices
- Proven expertise in both commercial and project cargo logistics

Bridging Ports. Powering Progress. Proudly from Odisha.`,
  },
  dredging: {
    slug: 'dredging', title: 'Dredging & Reclamation', hero_image: MEDIA_IMG.dredger,
    body: `Our Dredging Division is widely recognized across India’s East Coast and South-East Asia for its reliability and engineering precision. Collaborating with leading ports and infrastructure entities, we execute high-impact dredging and reclamation projects that contribute to regional and global maritime development.

## Proven Marine-Infrastructure Expertise
From capital and maintenance dredging to land reclamation, breakwater construction and stone pitching, we bring deep engineering capability to complex marine works — delivered through our proprietary fleet and an experienced technical workforce.

We have partnered with leading global dredging firms to execute demanding operations such as boulder transportation, stone pitching and end-to-end logistics support with precision and reliability.`,
  },
  trading: {
    slug: 'trading', title: 'Trading — Global Sourcing & Supply', hero_image: MEDIA_IMG.coalPile,
    body: `Extending beyond traditional logistics, Paradeep Parivahan Ltd offers turnkey sourcing solutions for sectors including steel, aluminium, cement and power. Our specialized global trading division, led by seasoned professionals, ensures our clients receive the right materials from the right sources — every time.

## Mines to Mills to Market
We source and supply bulk raw materials — iron ore, coal, coke, manganese, limestone, gypsum and primary aluminium — building dependable supply chains for India’s core industries.`,
  },
  logistics: {
    slug: 'logistics', title: 'Logistics & Transportation', hero_image: MEDIA_IMG.containerYard,
    body: `At Paradeep Parivahan Ltd, we take pride in being one of the largest fleet-owning logistics companies along the East Coast of India, with deep roots in Odisha’s industrial and port ecosystem. Our expertise spans the full spectrum of port, plant and mining logistics — delivering end-to-end solutions with reliability, speed and scale.

## Our Major Areas of Operation
- Stevedoring Services — Efficient loading and unloading of vessels with a focus on safety, turnaround time and precision.
- Port Handling & Intra-Port Transportation — Seamless cargo movement within port premises, driven by a modern fleet and skilled manpower.
- Mine-to-Port Transportation — Connecting Odisha’s mineral-rich regions to major ports for faster exports and an efficient supply chain.
- Heavy Equipment & Port Handling — A wide range of specialized handling equipment for efficient operations at bulk terminals.
- Earthmoving — A large fleet of Heavy Earth Moving Machinery for mining, reclamation and infrastructure support.
- Specialized Fabrication — Customized fabrication solutions to support industrial and port-infrastructure development.
- Infrastructure & Ready-Mix Concrete — Quality-assured concrete solutions for mega infrastructure and construction projects across Odisha.
- Dredging & Reclamation — Advanced dredging operations, both within India and across South-East Asia.

Rooted in Odisha. Driving India’s growth. From the core of Odisha to the harbours of the world — PPL powers movement with purpose.`,
  },
  'marine-defence': {
    slug: 'marine-defence', title: 'Marine & Defence Infrastructure', hero_image: MEDIA_IMG.dryDockNight,
    body: `Paradeep Parivahan undertakes select EPC and greenfield projects in marine and infrastructure — bringing its port-engineering, dredging & reclamation, fabrication and heavy-equipment capabilities to nation-building projects along India’s coastline.

From marine works and land reclamation to specialized fabrication and shore-based infrastructure, we partner with government bodies and industry leaders to deliver critical coastal assets.`,
  },
  presence: {
    slug: 'presence', title: 'Our Presence', hero_image: MEDIA_IMG.aerialShipIsland,
    body: `The company has cultivated a robust footprint across key regions of the eastern seaboard and South-East Asia — spanning stevedoring & port operations, dredging & reclamation, trading, and logistics & transportation.`,
  },
  'infrastructure-rmc': {
    slug: 'infrastructure-rmc', title: 'Infrastructure & Ready-Mix Concrete', hero_image: MEDIA_IMG.aerialIndustrial,
    body: `Paradeep Parivahan Ltd delivers quality-assured concrete solutions for mega infrastructure and construction projects across Odisha. As a strategic logistics partner for Ready-Mix Concrete (RMC) manufacturing and delivery, we serve leading builders and developers through a dedicated batching plant and an in-house fleet — ensuring timely, high-quality supply.

## Capabilities
- Ready-Mix Concrete manufacturing through dedicated batching plants
- Timely, high-quality delivery via an in-house fleet
- Infrastructure support services for mega projects
- Quality-assured solutions for construction and industrial development`,
  },
  fabrication: {
    slug: 'fabrication', title: 'Specialized Fabrication', hero_image: MEDIA_IMG.industrialPlantDusk,
    body: `Our precision fabrication unit at Kalinga Nagar delivers industrial-grade steel structures for leading companies including Tata Steel, L&T and JSL — using cutting-edge equipment and skilled personnel for reliable, scalable production.

## Capabilities
- Custom fabrication for industrial and port-infrastructure development
- Industrial-grade steel structures built to specification
- Cutting-edge equipment operated by skilled personnel
- Reliable, scalable production for demanding project timelines`,
  },
};

/* Vision · Mission · Values · Quality — from the new corporate content. */
export const VISION = 'To be the preferred logistics partner of choice — locally and globally — by delivering world-class, end-to-end supply-chain and port-management solutions. We aspire to become a true “One-Stop Logistics Destination”, driven by innovation, operational excellence and unwavering customer focus.';
export const MISSION = 'To empower businesses through seamless, scalable and cost-effective logistics solutions. We are committed to continuous improvement, client-centric service and operational efficiency that supports national infrastructure and industrial growth.';
export const QUALITY_POLICY = 'Paradeep Parivahan Ltd is dedicated to offering superior port and logistics services that consistently fulfil customer requirements. We maintain the highest standards of quality, integrity, accountability and efficiency, ensuring every solution aligns with client goals and industry benchmarks.';
export const CORE_VALUES: { title: string; body: string }[] = [
  { title: 'Integrity', body: 'We act with transparency and uphold the highest ethical standards.' },
  { title: 'Quality', body: 'We deliver excellence through every service touchpoint.' },
  { title: 'Customer-Centricity', body: 'We prioritize long-term partnerships built on trust, responsiveness and satisfaction.' },
  { title: 'Innovation', body: 'We embrace technology and forward thinking to stay ahead.' },
  { title: 'Sustainability', body: 'We believe in responsible growth aligned with environmental and social stewardship.' },
];
export const WHY_CHOOSE: { title: string; body: string }[] = [
  { title: 'Innovative Solutions', body: 'Leveraging technology and creativity to enhance supply-chain efficiency.' },
  { title: 'Customer-Centric Approach', body: 'Personalized services tailored to your operational needs.' },
  { title: 'Global & Sectoral Expertise', body: 'A proven track record in multi-industry, pan-India logistics operations.' },
  { title: 'Commitment to Excellence', body: 'Guided by principles of integrity, quality and continuous improvement.' },
];

/* Major Areas of Operation — homepage animated-icon section, CMS-editable via
   the `service_areas` table. `icon` maps to an animated SVG on the frontend. */
export interface ServiceArea { id: number; title: string; description: string; icon: string; }
export const SERVICE_AREAS: ServiceArea[] = [
  { id: 1, title: 'Stevedoring Services', description: 'Efficient loading and unloading of vessels with a focus on safety, turnaround time and precision.', icon: 'stevedoring' },
  { id: 2, title: 'Port Handling & Intra-Port Transportation', description: 'Seamless cargo movement within port premises, driven by a modern fleet and skilled manpower.', icon: 'port-handling' },
  { id: 3, title: 'Mine-to-Port Transportation', description: 'Comprehensive logistics connecting Odisha’s mineral-rich regions to major ports, enabling faster exports and an efficient supply chain.', icon: 'mine-to-port' },
  { id: 4, title: 'Heavy Equipment & Port Handling', description: 'Ownership and operation of a wide range of specialized handling equipment for efficient operations at bulk terminals.', icon: 'heavy-equipment' },
  { id: 5, title: 'Earthmoving', description: 'A large fleet of Heavy Earth Moving Machinery for mining, reclamation and infrastructure support.', icon: 'earthmoving' },
  { id: 6, title: 'Specialized Fabrication', description: 'Customized fabrication solutions to support industrial and port-infrastructure development.', icon: 'fabrication' },
  { id: 7, title: 'Infrastructure & Ready-Mix Concrete', description: 'Quality-assured concrete solutions for mega infrastructure and construction projects across Odisha.', icon: 'rmc' },
  { id: 8, title: 'Dredging & Reclamation', description: 'Proven marine-infrastructure expertise through advanced dredging operations, within India and across South-East Asia.', icon: 'dredging' },
];

/* Major areas of operation — powers the homepage "Core Operations" section. */
export const CORE_OPERATIONS: { title: string; body: string }[] = [
  { title: 'Stevedoring Services', body: 'Efficient loading and unloading of vessels with a focus on safety, turnaround time and precision.' },
  { title: 'Port Handling & Intra-Port Transportation', body: 'Seamless cargo movement within port premises, driven by a modern fleet and skilled manpower.' },
  { title: 'Mine-to-Port Transportation', body: 'Connecting Odisha’s mineral-rich regions to major ports for faster exports and efficient supply chains.' },
  { title: 'Heavy Equipment & Port Handling', body: 'A wide range of specialized handling equipment for efficient operations at bulk terminals.' },
  { title: 'Earthmoving', body: 'A large fleet of Heavy Earth Moving Machinery for mining, reclamation and infrastructure support.' },
  { title: 'Specialized Fabrication', body: 'Customized fabrication solutions to support industrial and port-infrastructure development.' },
  { title: 'Infrastructure & Ready-Mix Concrete', body: 'Quality-assured concrete solutions for mega infrastructure and construction projects.' },
  { title: 'Dredging & Reclamation', body: 'Advanced dredging operations, both within India and across South-East Asia.' },
];

export const KMP = [
  { role: 'Company Secretary & Compliance Officer', name: 'Ms. Usha Rani Ray', organization: null as string | null, address: 'Room No 204, Above OBC Bank, Paradeep, Jagatsinghpur 754142, Odisha, India', phone: '0647-2590169 / 06722-223416', email: 'cs@paradeepparivahan.com', extra: null as string | null },
  { role: 'Registrar & Share Transfer Agent', name: 'Mr. Jibu John', organization: 'Bigshare Services Private Limited', address: 'Office No S6-2, 6th Floor, Pinnacle Business Park, Mahakali Caves Road, Andheri (East), Mumbai 400093', phone: '+91 22 6263 8300', email: 'investor@bigshareonline.com', extra: 'SEBI Reg: INR000001385 · www.bigshareonline.com' },
];
