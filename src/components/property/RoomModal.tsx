import { useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { roomPrice, type Property, type Room } from '@/data/properties';
import { AmenitiesGrid } from './AmenitiesGrid';
import { WhatsAppButton } from './WhatsAppButton';

export function RoomModal({
  room,
  property,
  onClose,
  onRestoreFocus,
}: {
  room: Room;
  property: Property;
  onClose: () => void;
  onRestoreFocus: () => void;
}) {
  const { t } = useTranslation();
  const [image, setImage] = useState(room.images[0]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const facts: [string, string][] = [
    [t('roomModal.factBeds'), room.beds],
    [t('roomModal.factSize'), room.size ?? t('common.toConfirm')],
    [t('roomModal.factMaxCapacity'), t('roomModal.capacity', { count: room.capacity })],
    [t('roomModal.factBathroom'), room.bathroom],
    [t('roomModal.factViews'), room.views],
  ];

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal>
        <DialogOverlay className="room-overlay" />
        <DialogPrimitive.Content
          className="room-modal"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            closeRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            onRestoreFocus();
          }}
        >
          <DialogClose asChild>
            <Button
              ref={closeRef}
              variant="outline"
              size="icon"
              className="room-modal-close"
              aria-label={t('roomModal.closeAria')}
            >
              <X />
            </Button>
          </DialogClose>
          <div className="room-gallery">
            <img src={image} alt={t('roomModal.imageAlt', { name: room.name })} width="800" height="600" />
            {room.images.length > 1 && (
              <div className="room-thumbnails">
                {room.images.map((src, i) => (
                  <Button
                    key={src}
                    variant={image === src ? 'default' : 'outline'}
                    aria-label={t('roomModal.viewImageAria', { index: i + 1 })}
                    aria-pressed={image === src}
                    onClick={() => setImage(src)}
                  >
                    <img
                      src={src}
                      alt={t('roomModal.thumbAlt', { index: i + 1, name: room.name })}
                      width="100"
                      height="75"
                      loading="lazy"
                    />
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="room-modal-copy">
            <span className="eyebrow text-primary">{property.name}</span>
            <DialogTitle className="room-modal-title">{room.name}</DialogTitle>
            <p className="room-spec">
              <Users size={16} />
              {t('roomModal.capacity', { count: room.capacity })}
            </p>
            <DialogDescription className="room-description">{room.description}</DialogDescription>
            <dl className="room-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <h3>{t('roomModal.resources')}</h3>
            <AmenitiesGrid items={room.amenities} />
            <div className="room-rate">
              <p className="room-price">
                {room.price !== undefined
                  ? t('common.fromPrice', { price: roomPrice(room) })
                  : roomPrice(room)}
              </p>
              <p>{room.priceNote ?? t('common.toConfirm')}</p>
            </div>
            <p className="editorial-note">{t('roomModal.editorialNote')}</p>
            <div className="room-actions">
              <WhatsAppButton property={property} room={room} />
              <DialogClose asChild>
                <Button variant="outline">{t('roomModal.closeButton')}</Button>
              </DialogClose>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
