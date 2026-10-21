import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const defaultNS = 'translation';
export const resources = {
  es: { translation: es },
  en: { translation: en },
  fr: { translation: fr },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'fr'],
    load: 'languageOnly',
    defaultNS,
    resources,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export function setupI18nRouterSync(router: { invalidate: () => void }) {
  const updateDocumentLanguage = (language: string) => {
    const baseLanguage = (i18n.resolvedLanguage || language).split('-')[0] || 'es';
    if (typeof document !== 'undefined') {
      document.documentElement.lang = baseLanguage;
    }

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('i18nextLng', baseLanguage);
      } catch (error) {
        console.warn('Unable to persist the selected language.', error);
      }
    }

    router.invalidate();
  };

  if (typeof document !== 'undefined') {
    document.documentElement.lang = (i18n.resolvedLanguage || i18n.language || 'es').split('-')[0] || 'es';
  }
  i18n.on('languageChanged', updateDocumentLanguage);

  return () => i18n.off('languageChanged', updateDocumentLanguage);
}

export default i18n;
