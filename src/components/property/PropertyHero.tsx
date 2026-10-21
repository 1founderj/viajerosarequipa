import { useTranslation } from 'react-i18next';
import type { Property } from '@/data/properties';

export function PropertyHero({ property }: { property: Property }) {
  const { t } = useTranslation();

  return (
    <section className="property-hero">
      <div className="page-width">
        <div className="eyebrow text-primary">
          {property.zone} · {property.category}
        </div>
        <h1>{property.name}</h1>
        <p>{property.description}</p>
        <img
          src={property.heroImage}
          alt={t('propertyHero.alt', { name: property.name })}
          width="1600"
          height="700"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
