import { Check } from 'lucide-react';
export function AmenitiesGrid({items}: {items: string[]}) {
  return <ul className="property-amenities">{items.map(item => <li key={item}><Check size={16}/><span>{item}</span></li>)}</ul>;
}
