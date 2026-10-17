import { useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Users } from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { POR_CONFIRMAR, roomPrice, type Property, type Room } from '@/data/properties';
import { AmenitiesGrid } from './AmenitiesGrid';
import { WhatsAppButton } from './WhatsAppButton';
export function RoomModal({room, property, onClose, onRestoreFocus}: {room: Room; property: Property; onClose: () => void; onRestoreFocus: () => void}) {
  const [image, setImage] = useState(room.images[0]);
  const closeRef = useRef<HTMLButtonElement>(null);
  return <Dialog open onOpenChange={open => {if (!open) onClose();}}><DialogPortal><DialogOverlay className="room-overlay"/><DialogPrimitive.Content className="room-modal" onOpenAutoFocus={e => {e.preventDefault(); closeRef.current?.focus();}} onCloseAutoFocus={e => {e.preventDefault(); onRestoreFocus();}}>
    <DialogClose asChild><Button ref={closeRef} variant="outline" size="icon" className="room-modal-close" aria-label="Cerrar habitación"><X/></Button></DialogClose>
    <div className="room-gallery"><img src={image} alt={`Foto de ejemplo de ${room.name}`} width="800" height="600"/>{room.images.length > 1 && <div className="room-thumbnails">{room.images.map((src, i) => <Button key={src} variant={image === src ? 'default' : 'outline'} aria-label={`Ver imagen ${i + 1}`} aria-pressed={image === src} onClick={() => setImage(src)}><img src={src} alt={`Miniatura ${i + 1} de ${room.name}`} width="100" height="75" loading="lazy"/></Button>)}</div>}</div>
    <div className="room-modal-copy"><span className="eyebrow text-primary">{property.name}</span><DialogTitle className="room-modal-title">{room.name}</DialogTitle><p className="room-spec"><Users size={16}/>Hasta {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}</p><DialogDescription className="room-description">{room.description}</DialogDescription><dl className="room-facts">{[['Camas',room.beds],['Tamaño',room.size ?? POR_CONFIRMAR],['Capacidad máxima',`${room.capacity} ${room.capacity === 1 ? 'persona' : 'personas'}`],['Baño',room.bathroom],['Vistas',room.views]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><h3>Recursos</h3><AmenitiesGrid items={room.amenities}/><div className="room-rate"><p className="room-price">{room.price !== undefined && <span>Desde </span>}{roomPrice(room)}</p><p>{room.priceNote ?? POR_CONFIRMAR}</p></div><p className="editorial-note">Fotografías de ejemplo. Tarifas documentadas, sujetas a confirmación para tus fechas. WhatsApp: número de ejemplo pendiente de reemplazar.</p><div className="room-actions"><WhatsAppButton property={property} room={room}/><DialogClose asChild><Button variant="outline">Cerrar</Button></DialogClose></div></div>
  </DialogPrimitive.Content></DialogPortal></Dialog>;
}
