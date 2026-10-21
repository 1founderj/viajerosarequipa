import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { MapPin, ArrowRight, ArrowLeft, FileCheck, Download } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import i18n from '@/i18n';
import { Site, Hero } from '@/components/travel/site';
import { Button } from '@/components/ui/button';
import { properties, tours, pageHead } from '@/lib/travel-data';
import { formatDate, formatNumber } from '@/lib/utils';

export const Route = createFileRoute('/contacto')({
  validateSearch: (search: Record<string, unknown>): { interest?: string; arrival?: string; departure?: string; guests?: string } => ({
    interest: typeof search['interest'] === 'string' ? search['interest'] : '',
    arrival: typeof search['arrival'] === 'string' ? search['arrival'] : '',
    departure: typeof search['departure'] === 'string' ? search['departure'] : '',
    guests: typeof search['guests'] === 'string' ? search['guests'] : '2',
  }),
  head: () => pageHead(i18n.t('meta.contactTitle'), i18n.t('meta.contactDescription')),
  component: Contact,
});

function Contact() {
  const { t, i18n } = useTranslation();
  const mapLanguage = (i18n.resolvedLanguage || i18n.language || 'es').split('-')[0] || 'es';
  const search = Route.useSearch();
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState(search.interest ?? '');
  const [arrival, setArrival] = useState(search.arrival ?? '');
  const [departure, setDeparture] = useState(search.departure ?? '');
  const [guests, setGuests] = useState(search.guests ?? '2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [prepared, setPrepared] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (step === 1) {
      if (departure && arrival && departure <= arrival) {
        setError(t('contact.errorDeparture'));
        return;
      }
      setStep(2);
    } else {
      setPrepared(true);
    }
  }

  function download() {
    const content = `${t('contact.downloadFile.header')}\n\n${t('contact.downloadFile.name', { name })}\n${t('contact.downloadFile.email', { email })}\n${t('contact.downloadFile.interest', { interest })}\n${t('contact.downloadFile.arrival', { arrival: formatDate(arrival) })}\n${t('contact.downloadFile.departure', { departure: departure ? formatDate(departure) : t('contact.downloadFile.notApplicable') })}\n${t('contact.downloadFile.guests', { guests: formatNumber(Number(guests) || 1) })}\n${t('contact.downloadFile.message', { message })}\n\n${t('contact.downloadFile.footer')}`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = t('contact.downloadFile.fileName');
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Site>
      <Hero
        title={t('contact.heroTitle')}
        eyebrow={t('contact.heroEyebrow')}
        description={t('contact.heroDescription')}
      />
      <section className="section page-width">
        <div className="detail-layout">
          <div>
            <div className="eyebrow text-primary">{t('contact.eyebrow')}</div>
            <h2>{t('contact.title')}</h2>
            <div className="form-notice">{t('contact.notice')}</div>

            {prepared ? (
              <div className="form-success" role="status">
                <FileCheck size={30} />
                <h3>{t('contact.prepared.title')}</h3>
                <p>
                  <Trans
                    i18nKey="contact.prepared.description"
                    values={{ name }}
                    components={{ bold: <strong /> }}
                  />
                </p>
                <dl>
                  <dt>{t('contact.prepared.interest')}</dt>
                  <dd>{interest}</dd>
                  <dt>{t('contact.prepared.datesAndGuests')}</dt>
                  <dd>
                    {formatDate(arrival)}
                    {departure ? ` → ${formatDate(departure)}` : ''} ·{' '}
                    {t('bookingBar.traveler', { count: Number(guests) || 1 })}
                  </dd>
                  <dt>{t('contact.prepared.email')}</dt>
                  <dd>{email}</dd>
                </dl>
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={download}>
                    <Download />
                    {t('contact.prepared.download')}
                  </Button>
                  <Button variant="outline" onClick={() => setPrepared(false)}>
                    <ArrowLeft />
                    {t('contact.prepared.edit')}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="flex items-center gap-4 mb-7">
                  <span className={step === 1 ? 'text-primary text-sm' : 'text-muted-foreground text-sm'}>
                    {t('contact.step1')}
                  </span>
                  <ArrowRight size={14} />
                  <span className={step === 2 ? 'text-primary text-sm' : 'text-muted-foreground text-sm'}>
                    {t('contact.step2')}
                  </span>
                </div>

                {step === 1 ? (
                  <div className="form-grid">
                    <label className="form-field full">
                      {t('contact.interestLabel')}
                      <select required value={interest} onChange={(e) => setInterest(e.target.value)}>
                        <option value="">{t('contact.interestPlaceholder')}</option>
                        {properties.map((p) => (
                          <option key={p.slug}>{p.name}</option>
                        ))}
                        {tours.map((t) => (
                          <option key={t.slug}>{t.name}</option>
                        ))}
                        <option>{t('contact.interestGeneral')}</option>
                      </select>
                    </label>
                    <label className="form-field">
                      {t('contact.arrivalLabel')}
                      <input
                        type="date"
                        lang={i18n.resolvedLanguage || i18n.language}
                        required
                        value={arrival}
                        onChange={(e) => setArrival(e.target.value)}
                      />
                    </label>
                    <label className="form-field">
                      {t('contact.departureLabel')}
                      <input
                        type="date"
                        lang={i18n.resolvedLanguage || i18n.language}
                        min={arrival || undefined}
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                      />
                    </label>
                    <label className="form-field">
                      {t('contact.guestsLabel')}
                      <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{formatNumber(n)}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                ) : (
                  <div className="form-grid">
                    <label className="form-field">
                      {t('contact.nameLabel')}
                      <input
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                    <label className="form-field">
                      {t('contact.emailLabel')}
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <label className="form-field full">
                      {t('contact.messageLabel')}
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('contact.messagePlaceholder')}
                      />
                    </label>
                  </div>
                )}

                {error && (
                  <p className="text-primary text-sm mt-4" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex gap-3 mt-7">
                  {step === 2 && (
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft />
                      {t('contact.buttonBack')}
                    </Button>
                  )}
                  <Button type="submit" size="lg">
                    {step === 1 ? t('contact.buttonContinue') : t('contact.buttonPrepare')}
                    <ArrowRight />
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside>
            <div className="eyebrow text-primary">{t('contact.aside.eyebrow')}</div>
            <h2>{t('contact.aside.title')}</h2>
            <p className="text-sm text-muted-foreground leading-7 mt-5 flex gap-2 items-center">
              <MapPin size={18} />
              {t('contact.aside.location')}
            </p>
            <p className="text-sm text-muted-foreground leading-7 mt-4">
              {t('contact.aside.status')}
            </p>
            <iframe
              title={t('contact.aside.mapTitle')}
              className="map"
              src={`https://maps.google.com/maps?q=Plaza%20de%20Armas%20Arequipa&z=14&output=embed&hl=${mapLanguage}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="editorial-note">{t('contact.aside.editorialNote')}</p>
          </aside>
        </div>

        <div className="faq mt-16">
          <h2>{t('contact.faq.title')}</h2>
          <details>
            <summary>{t('contact.faq.q1')}</summary>
            <p>{t('contact.faq.a1')}</p>
          </details>
          <details>
            <summary>{t('contact.faq.q2')}</summary>
            <p>{t('contact.faq.a2')}</p>
          </details>
          <details>
            <summary>{t('contact.faq.q3')}</summary>
            <p>{t('contact.faq.a3')}</p>
          </details>
          <details>
            <summary>{t('contact.faq.q4')}</summary>
            <p>{t('contact.faq.a4')}</p>
          </details>
        </div>
      </section>
    </Site>
  );
}
