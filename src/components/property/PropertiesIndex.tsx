import { Link } from '@tanstack/react-router';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Site, SectionHeading, Values } from '@/components/travel/site';
import { properties } from '@/data/properties';

export function PropertiesIndex() {
  const { t } = useTranslation();

  return (
    <div className="property-shell">
      <Site>
        <section className="property-index-title page-width">
          <div className="eyebrow text-primary">{t('propertiesIndex.eyebrow')}</div>
          <h1>{t('propertiesIndex.title')}</h1>
          <p>{t('propertiesIndex.intro')}</p>
        </section>

        <section className="section page-width property-list-section">
          <SectionHeading
            eyebrow={t('propertiesIndex.sectionEyebrow')}
            title={t('propertiesIndex.sectionTitle')}
          />
          <div className="three-grid">
            {properties.map((p) => (
              <article className="editorial-card" key={p.slug}>
                <Link to="/propiedades/$slug" params={{ slug: p.slug }}>
                  <div className="card-media">
                    <img
                      src={p.heroImage}
                      alt={t('propertiesIndex.photoAlt', { name: p.name })}
                      width="1600"
                      height="700"
                      loading="lazy"
                    />
                    <span className="image-label">{p.category}</span>
                  </div>
                  <div className="card-location">
                    <MapPin size={13} />
                    {p.zone}
                  </div>
                  <h3>{p.name}</h3>
                </Link>
                <p className="card-description">{p.description}</p>
                <div className="card-bottom">
                  <span>
                    {p.category === 'Glamping'
                      ? t('propertiesIndex.cabinCount', { count: p.rooms.length })
                      : t('propertiesIndex.roomCount', { count: p.rooms.length })}
                  </span>
                  <Button asChild variant="editorial" size="sm">
                    <Link to="/propiedades/$slug" params={{ slug: p.slug }}>
                      {t('propertiesIndex.viewProperty')}
                      <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <p className="editorial-note">{t('propertiesIndex.editorialNote')}</p>
        </section>
        <Values />
      </Site>
    </div>
  );
}
