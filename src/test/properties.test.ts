import { describe, expect, it } from 'vitest';
import { properties, getProperty, POR_CONFIRMAR, WHATSAPP_NUMBER } from '@/data/properties';
import { buildWhatsAppUrl, roomWhatsAppMessage } from '@/lib/whatsapp';
const hostal = properties[0];
const casa = properties[1];
const capua = properties[2];
describe('Documented property rules', () => {
  it('has 9 Hostal Viajeros rooms', () => expect(hostal?.rooms).toHaveLength(9));
  it('has 5 Casa Junto Al Rio rooms', () => expect(casa?.rooms).toHaveLength(5));
  it('has 3 Catarata Capua cabins', () => expect(capua?.rooms).toHaveLength(3));
  it('keeps hostal documented type distribution', () => expect(hostal?.rooms.map(r=>r.name)).toEqual(['Double or Twin Room','Double or Twin Room','Double Room','Double Room','Family Room with Private Bathroom','Family Room with Private Bathroom','Small Twin Room','Female Dormitory Room','Bed in 8-Bed Dormitory Room']));
  it('keeps hostal prices', () => expect(hostal?.rooms.map(r=>r.price)).toEqual([48,48,62,62,66,66,65,21,24]));
  it('keeps family capacity at documented two guests', () => expect(hostal?.rooms.filter(r=>r.name==='Family Room with Private Bathroom').map(r=>r.capacity)).toEqual([2,2]));
  it('does not invent Casa prices', () => expect(casa?.rooms.map(r=>r.price)).toEqual([undefined,undefined,undefined,undefined,undefined]));
  it('keeps unknown sizes unconfirmed', () => expect(casa?.rooms.map(r=>r.size)).toEqual(Array(5).fill(POR_CONFIRMAR)));
  it('keeps cabin prices', () => expect(capua?.rooms.map(r=>r.price)).toEqual([58,58,58]));
  it('keeps cabin flexible and single guest rates', () => expect(capua?.rooms[0]?.priceNote).toContain('2 personas: PEN 58 no reembolsable / PEN 65 flexible. 1 persona: PEN 52 no reembolsable / PEN 57 flexible.'));
  it('marks all room configurations as proposals', () => expect(properties.flatMap(p=>p.rooms).map(r=>r.isProposal)).toEqual(Array(17).fill(true)));
  it('keeps all contacts at the centralized placeholder', () => {expect(WHATSAPP_NUMBER).toBe('51999999999');expect(properties.map(p=>p.whatsappNumber)).toEqual(Array(3).fill(WHATSAPP_NUMBER));});
  it('keeps Capua check-in exactly documented', () => expect(capua?.checkIn).toBe('01:00–18:00'));
  it('does not add internet or parking at Capua', () => {expect(capua?.amenities).toContain('No hay internet');expect(capua?.amenities).toContain('No hay parking');});
  it('preserves old property URLs', () => expect(['hostal-sillar','hostal-miraflores','casa-del-valle'].map(s=>getProperty(s)?.slug)).toEqual(['hostal-viajeros-arequipa','casa-junto-al-rio','catarata-capua']));
});
describe('WhatsApp links', () => {
  it('encodes a room and property with documented price', () => {
    const property=hostal; const room=property?.rooms[0]; if(!property||!room) throw new Error('Missing fixture');
    const url=buildWhatsAppUrl(property.whatsappNumber,roomWhatsAppMessage(property,room));
    expect(url).toBe('https://wa.me/51999999999?text='+encodeURIComponent('Hola, quiero reservar la habitación *Double or Twin Room* en *Hostal Viajeros Arequipa*.\nFechas: [indicar fechas].\nHuéspedes: [indicar número].\nPrecio publicado: PEN 48.\n¿Está disponible?'));
  });
  it('requests price for Casa without invented amount', () => {
    const property=casa;const room=property?.rooms[0];if(!property||!room)throw new Error('Missing fixture');
    expect(roomWhatsAppMessage(property,room)).toContain('Precio: a consultar.\n');
    expect(roomWhatsAppMessage(property,room)).not.toContain('PEN');
  });
});
