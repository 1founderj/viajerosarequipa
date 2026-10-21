import { useTranslation } from 'react-i18next';
import type { Property } from '@/data/properties';
import { formatNumber } from '@/lib/utils';

export function PropertyInfo({ property }: { property: Property }) {
  const { t } = useTranslation();

  return (
    <div className="property-info">
      <dl>
        <div>
          <dt>{t('propertyInfo.address')}</dt>
          <dd>{property.address}</dd>
        </div>
        <div>
          <dt>{t('propertyInfo.checkInOut')}</dt>
          <dd>
            {property.checkIn} / {property.checkOut}
          </dd>
        </div>
        <div>
          <dt>{t('propertyInfo.rating')}</dt>
          <dd>
            {property.rating === undefined
              ? t('common.toConfirm')
              : t('propertyInfo.reviewCount', {
                  rating: formatNumber(property.rating, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
                  reviewsCount: formatNumber(property.reviewsCount ?? 0),
                  count: property.reviewsCount,
                })}
          </dd>
        </div>
        <div>
          <dt>{t('propertyInfo.languages')}</dt>
          <dd>{property.languages.join(', ')}</dd>
        </div>
        <div>
          <dt>{t('propertyInfo.manager')}</dt>
          <dd>{property.manager}</dd>
        </div>
      </dl>
      <ul className="property-highlights">
        {property.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </div>
  );
}
