import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowRight, ArrowDown, MapPin } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import i18n from '@/i18n';
import { Site, SectionHeading, PropertyCard, TourCard, Values } from '@/components/travel/site';
import { BookingBar } from '@/components/travel/booking-bar';
import { Button } from '@/components/ui/button';
import { images, properties, tours, pageHead } from '@/lib/travel-data';

export const Route = createFileRoute('/')({
  head: () => pageHead(i18n.t('meta.homeTitle'), i18n.t('meta.homeDescription')),
  component: Home,
});

function Home() {
  const { t } = useTranslation();

  return (
    <Site>
      <section className="hero">
        <img
          src={images.arequipa}
          alt={t('home.hero.imageAlt')}
          className="hero-image"
          width="1920"
          height="1024"
          fetchPriority="high"
        />
        <div className="page-width hero-content reveal">
          <div className="eyebrow">{t('home.hero.eyebrow')}</div>
          <h1>
            <span className="hero-brand-title">{t('home.hero.brandTitle')}</span>
            <Trans i18nKey="home.hero.title" components={{ br: <br />, em: <em /> }} />
          </h1>
          <p className="intro">
            <Trans i18nKey="home.hero.intro" components={{ br: <br /> }} />
          </p>
          <div className="hero-buttons">
            <Button asChild variant="hero" size="lg">
              <Link to="/propiedades">
                {t('home.hero.ctaLodgings')} <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/tours">
                {t('home.hero.ctaTours')} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="page-width hero-bottom">
          <span className="hero-location">
            <MapPin size={14} />
            {t('home.hero.location')}
          </span>
          <a href="#alojamientos" className="hero-scroll">
            {t('home.hero.scroll')} <ArrowDown size={17} />
          </a>
          <span className="hero-count">
            01 <span />
            <b>03</b>
          </span>
        </div>
      </section>

      <BookingBar />

      <section id="alojamientos" className="section page-width">
        <SectionHeading eyebrow={t('home.lodgings.eyebrow')} title={t('home.lodgings.title')}>
          <Link to="/propiedades" className="text-link">
            {t('home.lodgings.viewAll')} <ArrowUpRight size={18} />
          </Link>
        </SectionHeading>
        <div className="three-grid">
          {properties.map((item) => (
            <PropertyCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="section tour-section">
        <div className="page-width">
          <SectionHeading eyebrow={t('home.tours.eyebrow')} title={t('home.tours.title')}>
            <p>{t('home.tours.intro')}</p>
          </SectionHeading>
          <div className="two-grid">
            {tours.slice(0, 2).map((item) => (
              <TourCard key={item.slug} item={item} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild size="lg">
              <Link to="/tours">
                {t('home.tours.viewAll')} <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="destination-band">
        <img
          src={images.catalina}
          alt={t('home.band.imageAlt')}
          loading="lazy"
          width="1280"
          height="1024"
        />
        <div className="page-width">
          <div className="eyebrow">{t('home.band.eyebrow')}</div>
          <h2>
            <Trans i18nKey="home.band.title" components={{ br: <br />, em: <em /> }} />
          </h2>
          <p>{t('home.band.intro')}</p>
          <Button variant="glass" size="lg" asChild>
            <Link to="/nosotros">
              {t('home.band.cta')} <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      <Values />
    </Site>
  );
}
