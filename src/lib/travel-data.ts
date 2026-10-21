import colca from '@/assets/colca.jpg';
import { properties as lodgingProperties } from '@/data/properties';
import i18n from '@/i18n';
import { formatNumber } from '@/lib/utils';

export const images = {
  arequipa: '/images/general/arequipa1.jpg',
  stay: '/images/propiedades/hostalviajerosarequipa/viajerosarequipa19.jpg',
  colca,
  catalina: '/images/general/arequipa7.jpg',
};

export const properties = lodgingProperties.map((p) => ({
  ...p,
  get location() {
    return i18n.t(`properties.${p.slug}.location`, { defaultValue: `${p.zone}, Arequipa` });
  },
  image: p.heroImage,
}));

export type Tour = {
  slug: string;
  name: string;
  location: string;
  category: 'nature' | 'culture' | 'adventure' | 'gastronomy';
  duration: string;
  image: string;
  description: string;
  long: string;
};

export const tours: Tour[] = [
  {
    slug: 'colca',
    get name() {
      return i18n.t('tours.colca.name');
    },
    get location() {
      return i18n.t('tours.colca.location');
    },
    category: 'nature',
    get duration() {
      return i18n.t('tours.colca.duration');
    },
    image: colca,
    get description() {
      return i18n.t('tours.colca.description');
    },
    get long() {
      return i18n.t('tours.colca.long');
    },
  },
  {
    slug: 'city-tour',
    get name() {
      return i18n.t('tours.city-tour.name');
    },
    get location() {
      return i18n.t('tours.city-tour.location');
    },
    category: 'culture',
    get duration() {
      return i18n.t('tours.city-tour.duration');
    },
    image: '/images/general/arequipa6.jpg',
    get description() {
      return i18n.t('tours.city-tour.description');
    },
    get long() {
      return i18n.t('tours.city-tour.long');
    },
  },
  {
    slug: 'misti',
    get name() {
      return i18n.t('tours.misti.name');
    },
    get location() {
      return i18n.t('tours.misti.location');
    },
    category: 'adventure',
    get duration() {
      return i18n.t('tours.misti.duration');
    },
    image: '/images/general/arequipa1.jpg',
    get description() {
      return i18n.t('tours.misti.description');
    },
    get long() {
      return i18n.t('tours.misti.long', { altitude: formatNumber(5822) });
    },
  },
  {
    slug: 'gastronomia',
    get name() {
      return i18n.t('tours.gastronomia.name');
    },
    get location() {
      return i18n.t('tours.gastronomia.location');
    },
    category: 'gastronomy',
    get duration() {
      return i18n.t('tours.gastronomia.duration');
    },
    image: '/images/general/arequipa10.jpg',
    get description() {
      return i18n.t('tours.gastronomia.description');
    },
    get long() {
      return i18n.t('tours.gastronomia.long');
    },
  },
  {
    slug: 'salinas',
    get name() {
      return i18n.t('tours.salinas.name');
    },
    get location() {
      return i18n.t('tours.salinas.location');
    },
    category: 'nature',
    get duration() {
      return i18n.t('tours.salinas.duration');
    },
    image: colca,
    get description() {
      return i18n.t('tours.salinas.description');
    },
    get long() {
      return i18n.t('tours.salinas.long');
    },
  },
];

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} – Viajeros Arequipa` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} – Viajeros Arequipa` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  };
}
