import type { Property, Room } from '@/data/properties';
export const buildWhatsAppUrl = (number: string, message: string) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
export const roomWhatsAppMessage = (property: Property, room: Room) =>
  `Hola, quiero reservar la habitación *${room.name}* en *${property.name}*.\n` +
  'Fechas: [indicar fechas].\nHuéspedes: [indicar número].\n' +
  (room.price !== undefined ? `Precio publicado: PEN ${room.price}.\n` : 'Precio: a consultar.\n') + '¿Está disponible?';
