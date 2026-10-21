import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import type { Property } from '@/data/properties';
import { Site, SectionHeading } from '@/components/travel/site';
import { PropertyHero } from './PropertyHero';
import { PropertyInfo } from './PropertyInfo';
import { AmenitiesGrid } from './AmenitiesGrid';
import { NearbyList } from './NearbyList';
import { RoomsSection } from './RoomsSection';

export function PropertyPage({ property }: { property: Property }) {
  const { t } = useTranslation();

  return (
    <div className="property-shell">
      <Site>
        <PropertyHero property={property} />
        <section className="section page-width">
          <SectionHeading
            eyebrow={t('propertyPage.lodgingEyebrow')}
            title={t('propertyPage.lodgingTitle')}
          />
          <div className="property-photo-grid">
            {property.gallery.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={t('propertyPage.photoAlt', { index: index + 1, name: property.name })}
                width="800"
                height="600"
                loading="lazy"
              />
            ))}
          </div>
        </section>
        <section className="section page-width">
          <Link to="/propiedades" className="text-link">
            {t('propertyPage.allProperties')}
          </Link>
          <SectionHeading
            eyebrow={t('propertyPage.stayEyebrow')}
            title={t('propertyPage.stayTitle')}
          />
          <PropertyInfo property={property} />
        </section>
        <section className="property-services section">
          <div className="page-width">
            <SectionHeading
              eyebrow={t('propertyPage.servicesEyebrow')}
              title={t('propertyPage.servicesTitle')}
            />
            <AmenitiesGrid items={property.amenities} />
          </div>
        </section>
        <RoomsSection property={property} />
        <section className="section page-width section-divider">
          <SectionHeading
            eyebrow={t('propertyPage.surroundingsEyebrow')}
            title={t('propertyPage.surroundingsTitle')}
          />
          <NearbyList items={property.nearby} />
        </section>
      </Site>
    </div>
  );
}
