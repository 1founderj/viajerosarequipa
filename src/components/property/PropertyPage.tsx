import { Link } from '@tanstack/react-router';
import type { Property } from '@/data/properties';
import { Site, SectionHeading } from '@/components/travel/site';
import { PropertyHero } from './PropertyHero';
import { PropertyInfo } from './PropertyInfo';
import { AmenitiesGrid } from './AmenitiesGrid';
import { NearbyList } from './NearbyList';
import { RoomsSection } from './RoomsSection';
export function PropertyPage({property}: {property: Property}) {
  return <div className="property-shell"><Site><PropertyHero property={property}/><section className="section page-width"><Link to="/propiedades" className="text-link">← Todos los alojamientos</Link><SectionHeading eyebrow="Tu estancia" title="Todo lo que necesitas saber."/><PropertyInfo property={property}/></section><section className="property-services section"><div className="page-width"><SectionHeading eyebrow="Durante tu viaje" title="Servicios del alojamiento."/><AmenitiesGrid items={property.amenities}/></div></section><RoomsSection property={property}/><section className="section page-width section-divider"><SectionHeading eyebrow="Explora los alrededores" title="Cerca de ti."/><NearbyList items={property.nearby}/></section></Site></div>;
}
