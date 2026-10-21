import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Site, Hero, TourCard } from '@/components/travel/site';
import { Button } from '@/components/ui/button';
import { tours, images, pageHead } from '@/lib/travel-data';

export const Route = createFileRoute('/tours/')({
  head: () => pageHead(i18n.t('meta.toursTitle'), i18n.t('meta.toursDescription')),
  component: Tours,
});

function Tours() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>('all');

  const filterKeys = ['all', 'culture', 'nature', 'adventure', 'gastronomy'] as const;

  return (
    <Site>
      <Hero
        title={t('toursIndex.heroTitle')}
        eyebrow={t('toursIndex.heroEyebrow')}
        description={t('toursIndex.heroDescription')}
        image={images.colca}
      />
      <section className="section page-width">
        <div className="filter-row">
          {filterKeys.map((key) => (
            <Button
              key={key}
              variant={key === category ? 'default' : 'outline'}
              aria-pressed={key === category}
              onClick={() => setCategory(key)}
            >
              {t(`toursIndex.filters.${key}`)}
            </Button>
          ))}
        </div>
        <div className="two-grid">
          {tours
            .filter((item) => category === 'all' || item.category === category)
            .map((item) => (
              <TourCard item={item} key={item.slug} />
            ))}
        </div>
        <p className="editorial-note">{t('toursIndex.editorialNote')}</p>
      </section>
    </Site>
  );
}
