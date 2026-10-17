import { MapPin } from 'lucide-react';
import type { Property } from '@/data/properties';
export function NearbyList({items}: {items: Property['nearby']}) {
  return <ul className="nearby-list">{items.map(item => <li key={item.name}><span><MapPin size={15}/>{item.name}</span><span>{item.distance}</span></li>)}</ul>;
}
