import type { Property, Room } from '@/data/properties';
import i18n from '@/i18n';
import { formatNumber } from '@/lib/utils';

export const buildWhatsAppUrl = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const roomWhatsAppMessage = (property: Property, room: Room) => {
  const priceText =
    room.price !== undefined
      ? i18n.t('whatsapp.publishedPrice', { price: formatNumber(room.price) })
      : i18n.t('whatsapp.priceOnConsult');

  return i18n.t('whatsapp.roomMessage', {
    roomName: room.name,
    propertyName: property.name,
    priceText,
  });
};
