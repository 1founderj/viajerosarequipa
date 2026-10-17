// TODO: reemplazar por imagen oficial en /public/images/<slug>/<room-id>.jpg
const placeholder = (label: string, width: number, height: number) =>
  `https://placehold.co/${width}x${height}/EEE/31343C?text=${encodeURIComponent(label)}`;
export const roomImage = (name: string) => placeholder(name, 800, 600);
export const propertyHero = (name: string) => placeholder(name, 1600, 700);
export const galleryImage = (name: string, i: number) => placeholder(`${name} · ${i === 0 ? 'Habitación' : 'Detalle'}`, 800, 600);
