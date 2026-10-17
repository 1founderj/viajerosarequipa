import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Site, Hero, TourCard } from '@/components/travel/site';
import { Button } from '@/components/ui/button';
import { tours, images, pageHead } from '@/lib/travel-data';
export const Route=createFileRoute('/tours/')({head:()=>pageHead('Tours y experiencias en Arequipa','Explora tours Colca, Santa Catalina, volcán Misti y gastronomía arequipeña. Encuentra tu aventura con esencia local.'),component:Tours});
function Tours(){const [category,setCategory]=useState('Todas');return <Site><Hero title="Experiencias que se quedan." eyebrow="Explora. Conecta. Recuerda." description="Arequipa tiene muchas historias. Elige cómo quieres vivir la tuya." image={images.colca}/><section className="section page-width"><div className="filter-row">{['Todas','Cultura','Naturaleza','Aventura','Gastronomía'].map(c=><Button key={c} variant={c===category?'default':'outline'} aria-pressed={c===category} onClick={()=>setCategory(c)}>{c}</Button>)}</div><div className="two-grid">{tours.filter(t=>category==='Todas'||t.category===category).map(item=><TourCard item={item} key={item.slug}/>)}</div><p className="editorial-note">Itinerarios e imágenes referenciales. Consulta tarifas, guías, idiomas, modalidad y servicios incluidos antes de reservar.</p></section></Site>}
