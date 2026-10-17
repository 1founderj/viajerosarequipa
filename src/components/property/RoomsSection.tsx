import { useRef, useState } from 'react';
import type { Property, Room } from '@/data/properties';
import { SectionHeading } from '@/components/travel/site';
import { RoomCard } from './RoomCard';
import { RoomModal } from './RoomModal';
export function RoomsSection({property}: {property: Property}) {
  const [selected, setSelected] = useState<Room | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  return <section className="section page-width section-divider"><SectionHeading eyebrow={`${property.rooms.length} ${property.category === 'Glamping' ? 'cabañas' : 'habitaciones'} · ${property.zone}`} title="Elige tu espacio."/><div className="rooms-grid">{property.rooms.map(room => <RoomCard key={room.id} property={property} room={room} onOpen={() => {opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setSelected(room);}}/>)}</div><p className="editorial-note">Distribución y fichas propuestas pendientes de validación. Fotografías de ejemplo; disponibilidad y tarifas deben confirmarse. El número de WhatsApp todavía es de ejemplo.</p>{selected && <RoomModal key={selected.id} room={selected} property={property} onClose={() => setSelected(null)} onRestoreFocus={() => opener.current?.focus()}/>}</section>;
}
