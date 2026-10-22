import { Link, useRouterState } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, ChevronDown, MapPin, Heart, Mountain, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import logoImg from '@/assets/logo.jpg';
import freeWalkingTourPdf from '@/assets/Free-Walking-Tour-Viajeros-Arequipa.pdf';
import { images } from '@/lib/travel-data';

const logo = { url: logoImg };

export function Site({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const navigation = [
    { to: '/' as const, label: t('nav.home') },
    { to: '/propiedades' as const, label: t('nav.properties') },
    { href: freeWalkingTourPdf, label: t('nav.freeWalkingTour') },
    { to: '/tours' as const, label: t('nav.tours') },
    { to: '/nosotros' as const, label: t('nav.about') },
    { to: '/contacto' as const, label: t('nav.contact') },
  ];
  const socialLinks = [
    { name: 'YouTube', handle: '@viajerosarequipa3802', href: 'https://www.youtube.com/@viajerosarequipa3802' },
    { name: 'Instagram', handle: '@hostalviajerosarequipa', href: 'https://www.instagram.com/hostalviajerosarequipa/' },
    { name: 'Instagram', handle: '@yas_el_dulce', href: 'https://www.instagram.com/yas_el_dulce/' },
    { name: 'TikTok', handle: '@yasdelacruz0', href: 'https://www.tiktok.com/@yasdelacruz0' },
    { name: 'Facebook', handle: 'Viajeros Arequipa', href: 'https://www.facebook.com/p/Viajeros-Arequipa-100063787502383/' },
  ];

  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').split('-')[0] || 'es';
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
  ] as const;

  const handleLanguageChange = (lang: string) => {
    void i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="page-width header-inner">
          <Link to="/" className="brand">
            <img src={logo.url} alt={t('nav.logoAlt')} width="65" height="65" />
            <span>
              <span className="brand-name">{t('nav.brandName')}</span>
              <span className="brand-caption">{t('nav.brandCaption')}</span>
            </span>
          </Link>
          <nav className="nav" aria-label={t('nav.ariaMainNav')}>
            {navigation.map((n) =>
              'href' in n ? (
                <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer">
                  {n.label}
                </a>
              ) : (
                <Link key={n.to} to={n.to} className={path === n.to ? 'active' : ''}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
          <div className="header-actions">
            <div className="relative inline-block">
              <button
                type="button"
                className="locale cursor-pointer flex items-center gap-1 bg-transparent border-0 text-inherit p-0 font-inherit"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-expanded={langMenuOpen}
                aria-label={t('nav.ariaSelectLanguage')}
              >
                {currentLang.toUpperCase()} <ChevronDown size={12} />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-md shadow-md py-1 z-50 min-w-[70px]">
                  {languages.map(({ code, name }) => (
                    <button
                      key={code}
                      type="button"
                      className={`w-full text-left px-3 py-1 text-xs hover:bg-accent cursor-pointer transition-colors ${
                        currentLang === code ? 'font-bold text-primary' : 'text-foreground'
                      }`}
                      onClick={() => handleLanguageChange(code)}
                      aria-pressed={currentLang === code}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button asChild variant="hero" className="reserve-header">
              <Link to="/contacto">
                {t('nav.bookNow')} <ArrowUpRight />
              </Link>
            </Button>
            <Button
              variant="glass"
              size="icon"
              className="mobile-menu"
              aria-label={open ? t('nav.ariaCloseMenu') : t('nav.ariaOpenMenu')}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav className="menu-panel" aria-label={t('nav.ariaMobileNav')}>
            {navigation.map((n) =>
              'href' in n ? (
                <a
                  key={n.href}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              ) : (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <div>
              <Link to="/" className="brand">
                <img src={logo.url} alt={t('nav.logoFooterAlt')} width="65" height="65" />
                <span>
                  <span className="brand-name">{t('nav.brandName')}</span>
                  <span className="brand-caption">{t('nav.brandCaption')}</span>
                </span>
              </Link>
              <p>{t('footer.description')}</p>
            </div>
            <div className="footer-links">
              <h3>{t('footer.colTripsTitle')}</h3>
              <Link to="/propiedades">{t('footer.colTripsProperties')}</Link>
              <Link to="/tours">{t('footer.colTripsTours')}</Link>
              <Link to="/contacto">{t('footer.colTripsBooking')}</Link>
            </div>
            <div className="footer-links">
              <h3>{t('footer.colArequipaTitle')}</h3>
              <Link to="/nosotros">{t('footer.colArequipaAbout')}</Link>
              <Link to="/contacto">{t('footer.colArequipaContact')}</Link>
              <span>
                {t('footer.cityCountry')} <MapPin size={12} className="inline" />
              </span>
            </div>
            <div className="footer-links footer-social-links">
              <h3>{t('footer.socialTitle')}</h3>
              {socialLinks.map(({ name, handle, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                  <span>{name}</span>
                  <span>{handle}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t('footer.copyright')}</span>
            <span>{t('footer.tagline')}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export function Hero({
  title,
  eyebrow,
  description,
  image = images.arequipa,
}: {
  title: string;
  eyebrow: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="hero sub-hero">
      <img className="hero-image" src={image} alt={title} width="1920" height="1024" />
      <div className="page-width hero-content reveal">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="intro">{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function Values() {
  const { t } = useTranslation();
  const values = [
    {
      icon: Heart,
      title: t('values.hospitalityTitle'),
      text: t('values.hospitalityText'),
    },
    {
      icon: Compass,
      title: t('values.localTitle'),
      text: t('values.localText'),
    },
    {
      icon: Mountain,
      title: t('values.travelTitle'),
      text: t('values.travelText'),
    },
  ];

  return (
    <div className="page-width values">
      {values.map((v) => (
        <div className="value" key={v.title}>
          <v.icon size={25} strokeWidth={1.4} />
          <div>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PropertyCard({
  item,
}: {
  item: { slug: string; name: string; location: string; category: string; image: string; description: string };
}) {
  const { t } = useTranslation();
  return (
    <article className="editorial-card scroll-reveal">
      <Link to="/propiedades/$slug" params={{ slug: item.slug }}>
        <div className="card-media">
          <img
            src={item.image}
            alt={t('cards.propertyAlt', { name: item.name })}
            loading="lazy"
            width="1280"
            height="1024"
          />
          <span className="image-label">{item.category}</span>
        </div>
        <div className="card-location">
          <MapPin size={12} />
          {item.location}
        </div>
        <h3>{item.name}</h3>
      </Link>
      <p className="card-description">{item.description}</p>
      <div className="card-bottom">
        <span>{t('cards.rateOnConsult')}</span>
        <Link to="/propiedades/$slug" params={{ slug: item.slug }} className="flex items-center gap-3">
          {t('cards.knowLodging')} <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function TourCard({
  item,
}: {
  item: { slug: string; name: string; location: string; category: string; duration: string; image: string; description: string };
}) {
  const { t } = useTranslation();
  return (
    <article className="editorial-card tour-card scroll-reveal">
      <Link to="/tours/$slug" params={{ slug: item.slug }}>
        <div className="card-media">
          <img src={item.image} alt={item.location} loading="lazy" width="1280" height="1024" />
          <span className="image-label">
            {t(`toursIndex.filters.${item.category}`, { defaultValue: item.category })}
          </span>
        </div>
        <div className="tour-meta">
          <span>
            <Compass size={13} />
            {item.duration}
          </span>
          <span>
            <MapPin size={13} />
            {item.location}
          </span>
        </div>
        <h3>{item.name}</h3>
      </Link>
      <p className="card-description">{item.description}</p>
      <div className="card-bottom">
        <span>{t('cards.knowItinerary')}</span>
        <Link to="/tours/$slug" params={{ slug: item.slug }} className="flex items-center gap-3">
          {t('cards.exploreExperience')} <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
