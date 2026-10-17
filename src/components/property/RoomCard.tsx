import { BedDouble, Users, Maximize, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { POR_CONFIRMAR, roomPrice, type Property, type Room } from '@/data/properties';
import { WhatsAppButton } from './WhatsAppButton';
export function RoomCard({room, property, onOpen}: {room: Room; property: Property; onOpen: () => void}) {
  return <article className="room-card" tabIndex={0} role="button" aria-label={`Ver ${room.name} · ${room.id}`} onClick={onOpen} onKeyDown={e => {if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {e.preventDefault(); onOpen();}}}>
    <div className="room-media"><img src={room.images[0]} alt={`Foto de ejemplo de ${room.name} en ${property.name}`} width="800" height="600" loading="lazy"/>{import.meta.env.DEV && room.isProposal && <span className="proposal-badge">Propuesta</span>}</div>
    <div className="room-card-copy"><h3>{room.name}</h3><p className="room-spec"><BedDouble size={16}/>{room.beds}</p><div className="room-spec"><Users size={16}/>Hasta {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}{room.size && room.size !== POR_CONFIRMAR && <><Maximize size={15}/>{room.size}</>}</div><div className="room-badges">{room.amenities.slice(0, 4).map(a => <span key={a}>{a}</span>)}</div><p className="room-price">{room.price !== undefined && <span>Desde </span>}{roomPrice(room)}</p><div className="room-actions"><Button variant="outline" onClick={e => {e.stopPropagation(); onOpen();}}>Ver detalle<ArrowUpRight/></Button><WhatsAppButton property={property} room={room}/></div></div>
  </article>;
}
