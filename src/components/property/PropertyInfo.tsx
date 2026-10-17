import type { Property } from '@/data/properties';
import { POR_CONFIRMAR } from '@/data/properties';
export function PropertyInfo({property}: {property: Property}) {
  return <div className="property-info"><dl><div><dt>Dirección</dt><dd>{property.address}</dd></div><div><dt>Entrada / salida</dt><dd>{property.checkIn} / {property.checkOut}</dd></div><div><dt>Valoración documentada</dt><dd>{property.rating === undefined ? POR_CONFIRMAR : `${property.rating} / 10 · ${property.reviewsCount} reseñas`}</dd></div><div><dt>Idiomas</dt><dd>{property.languages.join(', ')}</dd></div><div><dt>Gestor</dt><dd>{property.manager}</dd></div></dl><ul className="property-highlights">{property.highlights.map(h => <li key={h}>{h}</li>)}</ul></div>;
}
