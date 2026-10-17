import { createFileRoute, notFound } from '@tanstack/react-router';
import { getProperty } from '@/data/properties';
import { PropertyPage } from '@/components/property/PropertyPage';
import { pageHead } from '@/lib/travel-data';
export const Route=createFileRoute('/propiedades/$slug')({loader:({params})=>{const item=getProperty(params.slug);if(!item)throw notFound();return item;},head:({loaderData})=>{const head=pageHead(loaderData?.name??'Alojamiento no disponible',loaderData?.description??'Consulta nuestros alojamientos en Arequipa.');return {...head,meta:[...head.meta,...(loaderData?[{property:'og:image',content:loaderData.heroImage},{name:'twitter:image',content:loaderData.heroImage}]:[{name:'robots',content:'noindex'}])]};},component:Property});
function Property(){return <PropertyPage property={Route.useLoaderData()}/>;}
