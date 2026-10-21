import { createFileRoute } from '@tanstack/react-router';
import { PropertiesIndex } from '@/components/property/PropertiesIndex';
import { pageHead } from '@/lib/travel-data';
import i18n from '@/i18n';

export const Route = createFileRoute('/propiedades/')({
  head: () => pageHead(i18n.t('meta.propertiesTitle'), i18n.t('meta.propertiesDescription')),
  component: PropertiesIndex,
});
