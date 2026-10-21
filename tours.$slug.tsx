import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Site, Hero } from '@/components/travel/site';
import { Button } from '@/components/ui/button';
import { tours, pageHead } from '@/lib/travel-data';

export const Route = createFileRoute('/tours/$slug')({
  loader: ({ params }) => {
    const item = tours.find((t) => t.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData?.name ?? i18n.t('meta.tourFallbackTitle'),
      loaderData?.description ?? i18n.t('meta.tourFallbackDescription')
    ),
  component: Tour,
});

function Tour() {
  const { t } = useTranslation();
  const item = Route.useLoaderData();

  return (
    <Site>
      <Hero
        title={item.name}
        eyebrow={t(`toursIndex.filters.${item.category}`, { defaultValue: item.category })}
        description={item.description}
        image={item.image}
      />
      <section className="section page-width">
        <div className="detail-layout">
          <div className="detail-copy">
            <div className="eyebrow text-primary">{t('tourDetail.eyebrow')}</div>
            <h2>{t('tourDetail.title')}</h2>
            <p>{item.long}</p>
            <div className="amenities">
              <span>
                <Clock size={18} />
                {item.duration}
              </span>
              <span>
                <MapPin size={18} />
                {item.location}
              </span>
            </div>
            <h3 className="font-serif text-3xl mt-8">{t('tourDetail.beforeTitle')}</h3>
            <p>{t('tourDetail.beforeDescription')}</p>
            <img
              className="gallery-image"
              src={item.image}
              alt={item.location}
              loading="lazy"
              width="1280"
              height="1024"
            />
            <p className="editorial-note">{t('tourDetail.editorialNote')}</p>
          </div>
          <aside className="inquiry-panel">
            <h3>{t('tourDetail.inquiryTitle')}</h3>
            <p>{t('tourDetail.inquiryDescription')}</p>
            <Button asChild size="lg" className="w-full">
              <Link to="/contacto" search={{ interest: item.name }}>
                {t('tourDetail.inquiryButton')} <ArrowRight />
              </Link>
            </Button>
          </aside>
        </div>
      </section>
    </Site>
  );
}
