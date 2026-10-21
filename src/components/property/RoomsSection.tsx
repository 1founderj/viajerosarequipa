import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Property, Room } from '@/data/properties';
import { SectionHeading } from '@/components/travel/site';
import { RoomCard } from './RoomCard';
import { RoomModal } from './RoomModal';

export function RoomsSection({ property }: { property: Property }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Room | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const eyebrow =
    property.category === 'Glamping'
      ? t('roomsSection.cabinCount', { count: property.rooms.length, zone: property.zone })
      : t('roomsSection.roomCount', { count: property.rooms.length, zone: property.zone });

  return (
    <section className="section page-width section-divider">
      <SectionHeading eyebrow={eyebrow} title={t('roomsSection.title')} />
      <div className="rooms-grid">
        {property.rooms.map((room) => (
          <RoomCard
            key={room.id}
            property={property}
            room={room}
            onOpen={() => {
              opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
              setSelected(room);
            }}
          />
        ))}
      </div>
      <p className="editorial-note">{t('roomsSection.editorialNote')}</p>
      {selected && (
        <RoomModal
          key={selected.id}
          room={selected}
          property={property}
          onClose={() => setSelected(null)}
          onRestoreFocus={() => opener.current?.focus()}
        />
      )}
    </section>
  );
}
