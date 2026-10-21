import { describe, expect, it, vi } from 'vitest';
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import i18n, { setupI18nRouterSync } from '@/i18n';

function stringKeys(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => stringKeys(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      stringKeys(item, prefix ? `${prefix}.${key}` : key)
    );
  }
  return typeof value === 'string' ? [prefix] : [];
}

describe('i18n', () => {
  it('provides the same translation keys in all supported languages', () => {
    const expected = stringKeys(es).sort();
    expect(stringKeys(en).sort()).toEqual(expected);
    expect(stringKeys(fr).sort()).toEqual(expected);
  });

  it('updates the document language and invalidates the router when language changes', async () => {
    const invalidate = vi.fn();
    const cleanup = setupI18nRouterSync({ invalidate });

    try {
      await i18n.changeLanguage('fr-CA');
      expect(i18n.resolvedLanguage).toBe('fr');
      expect(document.documentElement.lang).toBe('fr');
      expect(window.localStorage.getItem('i18nextLng')).toBe('fr');
      expect(invalidate).toHaveBeenCalled();

      await i18n.changeLanguage('de-DE');
      expect(i18n.resolvedLanguage).toBe('es');
      expect(document.documentElement.lang).toBe('es');
    } finally {
      cleanup();
      await i18n.changeLanguage('es');
    }
  });

  it('uses the correct singular and plural forms in Spanish, English, and French', async () => {
    for (const [language, singular, plural] of [
      ['es', '1 viajero', '2 viajeros'],
      ['en', '1 traveler', '2 travelers'],
      ['fr', '1 voyageur', '2 voyageurs'],
    ]) {
      await i18n.changeLanguage(language);
      expect(i18n.t('bookingBar.traveler', { count: 1 })).toBe(singular);
      expect(i18n.t('bookingBar.traveler', { count: 2 })).toBe(plural);
    }

    await i18n.changeLanguage('es');
  });
});
