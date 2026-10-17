import { createFileRoute } from '@tanstack/react-router';
import { PropertiesIndex } from '@/components/property/PropertiesIndex';
import { pageHead } from '@/lib/travel-data';
export const Route=createFileRoute('/propiedades/')({head:()=>pageHead('Alojamientos en Arequipa','Hostal Viajeros Arequipa, Casa Junto Al Rio y Catarata Capua: habitaciones y cabañas en Centro Histórico, Yanahuara y Yura.'),component:PropertiesIndex});
