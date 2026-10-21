import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import i18n from '@/i18n';
import { Site, Hero, Values } from '@/components/travel/site';
import { images, pageHead } from '@/lib/travel-data';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/nosotros')({
  head: () => pageHead(i18n.t('meta.aboutTitle'), i18n.t('meta.aboutDescription')),
  component: About,
});

function About() {
  const { t } = useTranslation();

  return (
    <Site>
      <Hero
        title={t('about.heroTitle')}
        eyebrow={t('about.heroEyebrow')}
        description={t('about.heroDescription')}
        image={images.catalina}
      />
      <section className="section page-width">
        <div className="detail-layout">
          <div className="detail-copy">
            <div className="eyebrow text-primary">{t('about.eyebrow')}</div>
            <h2>
              <Trans i18nKey="about.title" components={{ br: <br />, em: <em /> }} />
            </h2>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link to="/contacto">
                {t('about.cta')} <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <img
            className="about-image"
            src={images.catalina}
            alt={t('about.imageAlt')}
            loading="lazy"
            width="1280"
            height="1024"
          />
        </div>
      </section>
      <div className="section-divider">
        <Values />
      </div>
    </Site>
  );
}
