import i18n from '@/i18n';
import { propertyPhoto } from '@/lib/property-images';
import { formatNumber } from '@/lib/utils';

export const POR_CONFIRMAR = 'Por confirmar';
// Placeholder: reemplazar por el número confirmado del dueño antes de recibir reservas.
export const WHATSAPP_NUMBER = '51999999999';

export type Room = {
  id: string;
  name: string;
  description: string;
  beds: string;
  size?: string;
  capacity: number;
  price?: number;
  priceCurrency: 'PEN';
  priceNote?: string;
  amenities: string[];
  images: string[];
  isProposal?: boolean;
  bathroom: string;
  views: string;
};

export type Property = {
  id: string;
  slug: string;
  name: string;
  zone: string;
  category: string;
  address: string;
  checkIn: string;
  checkOut: string;
  rating?: number;
  reviewsCount?: number;
  languages: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  nearby: { name: string; distance: string }[];
  rooms: Room[];
  whatsappNumber: string;
  heroImage: string;
  gallery: string[];
  manager: string;
};

const photoSeries = (folder: string, prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => propertyPhoto(folder, `${prefix}${index + 1}.jpg`));

const hostalPhotos = photoSeries('hostalviajerosarequipa', 'viajerosarequipa', 20);
const rioPhotos = Array.from({ length: 20 }, (_, index) =>
  propertyPhoto('cajajuntoalrio', `CasaJuntoAlRio${index + 1}.${index === 12 ? 'png' : 'jpg'}`)
);
const capuaPhotos = photoSeries('cataratacapua', 'capua', 20);

const createRoom = (
  propertySlug: string,
  id: string,
  capacity: number,
  images: string[],
  price?: number
): Room => ({
  id,
  get name() {
    return i18n.t(`properties.${propertySlug}.rooms.${id}.name`);
  },
  get description() {
    return i18n.t(`properties.${propertySlug}.rooms.${id}.description`);
  },
  get beds() {
    return i18n.t(`properties.${propertySlug}.rooms.${id}.beds`);
  },
  get size() {
    const s = i18n.t(`properties.${propertySlug}.rooms.${id}.size`);
    return s === 'toConfirm' || s === POR_CONFIRMAR ? POR_CONFIRMAR : s;
  },
  capacity,
  ...(price === undefined ? {} : { price }),
  priceCurrency: 'PEN',
  get priceNote() {
    const pn = i18n.t(`properties.${propertySlug}.rooms.${id}.priceNote`);
    return pn === 'toConfirm' || pn === POR_CONFIRMAR ? POR_CONFIRMAR : pn;
  },
  get amenities() {
    return i18n.t(`properties.${propertySlug}.rooms.${id}.amenities`, { returnObjects: true }) as string[];
  },
  images,
  isProposal: true,
  get bathroom() {
    return i18n.t(`properties.${propertySlug}.rooms.${id}.bathroom`);
  },
  get views() {
    return i18n.t(`properties.${propertySlug}.rooms.${id}.views`);
  },
});

const createProperty = (
  id: string,
  slug: string,
  rating: number | undefined,
  reviewsCount: number | undefined,
  heroImage: string,
  gallery: string[],
  rooms: Room[]
): Property => ({
  id,
  slug,
  get name() {
    return i18n.t(`properties.${slug}.name`);
  },
  get zone() {
    return i18n.t(`properties.${slug}.zone`);
  },
  get category() {
    return i18n.t(`properties.${slug}.category`);
  },
  get address() {
    return i18n.t(`properties.${slug}.address`);
  },
  get checkIn() {
    return i18n.t(`properties.${slug}.checkIn`);
  },
  get checkOut() {
    return i18n.t(`properties.${slug}.checkOut`);
  },
  ...(rating === undefined ? {} : { rating }),
  ...(reviewsCount === undefined ? {} : { reviewsCount }),
  get languages() {
    return i18n.t(`properties.${slug}.languages`, { returnObjects: true }) as string[];
  },
  get manager() {
    const m = i18n.t(`properties.${slug}.manager`);
    return m === 'toConfirm' || m === POR_CONFIRMAR ? POR_CONFIRMAR : m;
  },
  get description() {
    return i18n.t(`properties.${slug}.description`);
  },
  get highlights() {
    return i18n.t(`properties.${slug}.highlights`, { returnObjects: true }) as string[];
  },
  get amenities() {
    return i18n.t(`properties.${slug}.amenities`, { returnObjects: true }) as string[];
  },
  get nearby() {
    return i18n.t(`properties.${slug}.nearby`, { returnObjects: true }) as { name: string; distance: string }[];
  },
  rooms,
  whatsappNumber: WHATSAPP_NUMBER,
  heroImage,
  gallery,
});

export const properties: Property[] = [
  createProperty(
    'viajeros',
    'hostal-viajeros-arequipa',
    7.8,
    588,
    hostalPhotos[18]!,
    hostalPhotos.filter((_, index) => index !== 18),
    [
      createRoom('hostal-viajeros-arequipa', 'double-twin-1', 2, [hostalPhotos[12]!, hostalPhotos[14]!], 48),
      createRoom('hostal-viajeros-arequipa', 'double-twin-2', 2, [hostalPhotos[14]!, hostalPhotos[12]!], 48),
      createRoom('hostal-viajeros-arequipa', 'double-1', 2, [hostalPhotos[12]!, hostalPhotos[14]!], 62),
      createRoom('hostal-viajeros-arequipa', 'double-2', 2, [hostalPhotos[14]!, hostalPhotos[12]!], 62),
      createRoom('hostal-viajeros-arequipa', 'family-1', 2, [hostalPhotos[1]!, hostalPhotos[13]!], 66),
      createRoom('hostal-viajeros-arequipa', 'family-2', 2, [hostalPhotos[16]!, hostalPhotos[10]!], 66),
      createRoom('hostal-viajeros-arequipa', 'small-twin', 2, [hostalPhotos[14]!, hostalPhotos[12]!], 65),
      createRoom('hostal-viajeros-arequipa', 'female-dorm', 1, [hostalPhotos[1]!, hostalPhotos[16]!], 21),
      createRoom('hostal-viajeros-arequipa', 'bed-dorm', 1, [hostalPhotos[16]!, hostalPhotos[1]!], 24),
    ]
  ),
  createProperty(
    'rio',
    'casa-junto-al-rio',
    undefined,
    undefined,
    rioPhotos[3]!,
    rioPhotos.filter((_, index) => index !== 3),
    [
      createRoom('casa-junto-al-rio', 'doble-terraza', 2, [rioPhotos[15]!, rioPhotos[17]!]),
      createRoom('casa-junto-al-rio', 'doble-jardin', 2, [rioPhotos[14]!, rioPhotos[5]!]),
      createRoom('casa-junto-al-rio', 'twin', 2, [rioPhotos[13]!, rioPhotos[12]!]),
      createRoom('casa-junto-al-rio', 'familiar', 4, [rioPhotos[2]!, rioPhotos[15]!]),
      createRoom('casa-junto-al-rio', 'superior', 2, [rioPhotos[2]!, rioPhotos[3]!, rioPhotos[9]!, rioPhotos[10]!]),
    ]
  ),
  createProperty(
    'capua',
    'catarata-capua',
    7.5,
    2,
    capuaPhotos[11]!,
    capuaPhotos.filter((_, index) => index !== 11),
    [
      createRoom('catarata-capua', 'cabana-1', 2, [capuaPhotos[11]!, capuaPhotos[17]!], 58),
      createRoom('catarata-capua', 'cabana-2', 2, [capuaPhotos[11]!, capuaPhotos[17]!], 58),
      createRoom('catarata-capua', 'cabana-3', 2, [capuaPhotos[11]!, capuaPhotos[17]!], 58),
    ]
  ),
];

// Preserve previous public URLs without keeping obsolete sample properties.
export const legacyPropertySlugs: Record<string, string> = {
  'hostal-sillar': 'hostal-viajeros-arequipa',
  'hostal-miraflores': 'casa-junto-al-rio',
  'casa-del-valle': 'catarata-capua',
};

export const getProperty = (slug: string) =>
  properties.find((p) => p.slug === (legacyPropertySlugs[slug] ?? slug));

export const roomPrice = (room: Room) =>
  room.price === undefined
    ? i18n.t('common.priceOnConsult')
    : i18n.t('common.pricePEN', { price: formatNumber(room.price) });
