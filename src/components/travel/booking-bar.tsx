import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { BedDouble, CalendarDays, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';

export function BookingBar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [property, setProperty] = useState('');
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <div className="page-width booking-wrap">
      <form
        className="booking-bar"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: '/contacto', search: { interest: property, arrival, departure, guests } });
        }}
      >
        <div className="booking-field">
          <label htmlFor="stay" className="booking-label">
            <BedDouble size={13} />
            {t('bookingBar.propertyLabel')}
          </label>
          <select id="stay" value={property} onChange={(e) => setProperty(e.target.value)}>
            <option value="">{t('bookingBar.propertyPlaceholder')}</option>
            {properties.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="booking-field">
          <label htmlFor="arrival" className="booking-label">
            <CalendarDays size={13} />
            {t('bookingBar.arrivalLabel')}
          </label>
          <input
            id="arrival"
            type="date"
            lang={i18n.resolvedLanguage || i18n.language}
            aria-label={t('bookingBar.arrivalAria')}
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
        </div>
        <div className="booking-field">
          <label htmlFor="departure" className="booking-label">
            <CalendarDays size={13} />
            {t('bookingBar.departureLabel')}
          </label>
          <input
            id="departure"
            type="date"
            lang={i18n.resolvedLanguage || i18n.language}
            aria-label={t('bookingBar.departureAria')}
            min={arrival || undefined}
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </div>
        <div className="booking-field">
          <label htmlFor="guests" className="booking-label">
            <Users size={13} />
            {t('bookingBar.guestsLabel')}
          </label>
          <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option value={n} key={n}>
                {t('bookingBar.traveler', { count: n })}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="lg" variant="hero" className="booking-submit">
          {t('bookingBar.submit')} <ArrowRight />
        </Button>
      </form>
    </div>
  );
}
