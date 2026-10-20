import colca from '@/assets/colca.jpg';
import { properties as lodgingProperties } from '@/data/properties';
export const images = {
 arequipa:'/images/general/arequipa1.jpg',
 stay:'/images/propiedades/hostalviajerosarequipa/viajerosarequipa19.jpg',
 colca,
 catalina:'/images/general/arequipa7.jpg',
};
export const properties = lodgingProperties.map(p => ({...p, location:`${p.zone}, Arequipa`, image:p.heroImage}));
export const tours = [
 {slug:'colca',name:'Colca, donde vuelan los cóndores',location:'Cañón del Colca',category:'Naturaleza',duration:'1 o 2 días',image:colca,description:'Entre montañas infinitas y pueblos llenos de historia. Un encuentro con la grandeza de los Andes.',long:'Recorre el Valle del Colca, sus terrazas agrícolas y sus paisajes andinos. La Cruz del Cóndor ofrece la oportunidad de observar estas aves en su hábitat natural; los avistamientos dependen de las condiciones del día.'},
 {slug:'city-tour',name:'Los secretos de la Ciudad Blanca',location:'Centro Histórico',category:'Cultura',duration:'Medio día',image:'/images/general/arequipa6.jpg',description:'Calles de sillar, patios de color y las historias que solo un local conoce.',long:'Un recorrido por el corazón de Arequipa: la Plaza de Armas, la arquitectura colonial y los alrededores del Monasterio de Santa Catalina. Sus muros de colores cuentan siglos de historia. Consulta las entradas y visitas incluidas.'},
 {slug:'misti',name:'Misti: una aventura en las alturas',location:'Volcán Misti',category:'Aventura',duration:'2 días',image:'/images/general/arequipa1.jpg',description:'Un desafío andino para quienes buscan mirar el mundo desde otra perspectiva.',long:'Una experiencia de montaña que requiere buena condición física, aclimatación y acompañamiento especializado. El Misti alcanza aproximadamente 5.822 metros de altitud. La ruta y la salida se confirman según las condiciones meteorológicas.'},
 {slug:'gastronomia',name:'Sabores que cuentan historias',location:'Picanterías de Arequipa',category:'Gastronomía',duration:'Medio día',image:'/images/general/arequipa10.jpg',description:'Rocoto relleno, tradición y conversaciones alrededor de una mesa arequipeña.',long:'Acércate a la tradición gastronómica de Arequipa a través de sus picanterías y sabores emblemáticos. Consulta el itinerario, las degustaciones disponibles y las opciones para necesidades alimentarias especiales.'},
 {slug:'salinas',name:'Salinas, un horizonte diferente',location:'Laguna de Salinas',category:'Naturaleza',duration:'1 día',image:colca,description:'Paisajes abiertos, volcanes y la belleza inesperada del altiplano.',long:'Descubre los paisajes de la Reserva Nacional de Salinas y Aguada Blanca. La apariencia de la laguna y la presencia de fauna cambian según la temporada. Consulta las condiciones de acceso antes de tu visita.'},
];
export function pageHead(title:string, description:string) {return {meta:[{title:`${title} – Viajeros Arequipa`},{name:'description',content:description},{property:'og:title',content:`${title} – Viajeros Arequipa`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}
