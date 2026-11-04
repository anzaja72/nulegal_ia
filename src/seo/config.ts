import { PAY_AS_YOU_GO_TIERS, NOVEMBER_2026_QUERIES, QUERY_COST_GUIDE } from '../data/legalQueriesData.ts';

/**
 * Única fuente de verdad del SEO/GEO. El prerender (scripts/prerender.mjs) la usa para
 * generar <head>, JSON-LD, sitemap.xml, robots.txt y llms.txt.
 *
 * Dominio público: se define con la variable SITE_URL al compilar
 *   SITE_URL=https://legal-ia.co npm run build
 */
export const SITE_URL = (
  (typeof process !== 'undefined' && process.env?.SITE_URL) || 'https://legal-ia.co'
).replace(/\/$/, '');

export const SITE_NAME = 'Legal-IA';
export const LAST_UPDATED = '2026-11-04';
export const LAST_UPDATED_LABEL = '4 de noviembre de 2026';
export const OG_IMAGE = '/og-image.png';
export const LOGO = '/logo.png';

export interface PageSeo {
  slug: 'resultado' | 'manifiesto' | 'en-vivo';
  path: string;
  title: string;
  description: string;
  /**
   * Las tres versiones comparten casi todo su contenido. Para no competir entre sí en Google,
   * /manifiesto/ y /en-vivo/ declaran como canónica a /resultado/ (siguen funcionando y se
   * pueden usar en campañas). Para indexarlas por separado, pon aquí su propio `path`.
   */
  canonicalPath: string;
  indexable: boolean;
}

export const PAGES: PageSeo[] = [
  {
    slug: 'resultado',
    path: '/resultado/',
    title: 'Legal-IA · Documentos jurídicos con IA para Colombia',
    description:
      'Describe tu caso y recibe tu derecho de petición o tutela listo para radicar. Consulta 11 registros oficiales de Colombia. Desde US$25, sin suscripción.',
    canonicalPath: '/resultado/',
    indexable: true,
  },
  {
    slug: 'manifiesto',
    path: '/manifiesto/',
    title: 'Legal-IA · Servicio jurídico automatizado para Colombia',
    description:
      'Legal-IA convierte el trabajo de un abogado en un servicio: redacta tutelas y peticiones y consulta 11 registros oficiales. Pagas por uso, sin suscripción.',
    canonicalPath: '/resultado/',
    indexable: true,
  },
  {
    slug: 'en-vivo',
    path: '/en-vivo/',
    title: 'Legal-IA · Consola en vivo de consultas jurídicas',
    description:
      'Prueba la consola de Legal-IA: consulta antecedentes, sociedades, vehículos, marcas y contratos del Estado en fuentes oficiales de Colombia. Pagas por uso.',
    canonicalPath: '/resultado/',
    indexable: true,
  },
];

export const abs = (path: string) => `${SITE_URL}${path}`;

/* ---------------- Preguntas frecuentes (visibles en la página y en JSON-LD) ---------------- */

const tierLine = PAY_AS_YOU_GO_TIERS.map((t) => `US$${t.priceUSD} = ${t.credits} créditos`).join('; ');
const queryTitles = NOVEMBER_2026_QUERIES.map((q) => q.title);

export const FAQ: { q: string; a: string }[] = [
  {
    q: '¿Qué es Legal-IA?',
    a: 'Legal-IA es una plataforma jurídica automatizada para Colombia. Describes tu caso con tus palabras y la IA investiga la normativa vigente y redacta el documento, por ejemplo un derecho de petición o una acción de tutela. También consulta registros oficiales desde el chat.',
  },
  {
    q: '¿Qué documentos puede redactar Legal-IA?',
    a: 'Acciones de tutela, derechos de petición, incidentes de desacato, contestaciones de demanda, recursos de reposición y apelación, solicitudes administrativas y contratos de servicios. Cada documento cita la normativa colombiana aplicable y queda listo para presentar ante la entidad correspondiente.',
  },
  {
    q: '¿Cuánto cuesta Legal-IA?',
    a: `Todos los planes son pay as you go: compras créditos y pagas solo lo que usas, sin suscripción mensual. ${tierLine}. Redactar un documento cuesta 5 créditos y la mayoría de las consultas a registros cuestan entre 1 y 3.`,
  },
  {
    q: '¿Qué registros oficiales puedo consultar?',
    a: `Once grupos de consulta: ${queryTitles.join('; ')}.`,
  },
  {
    q: '¿Qué pasa si una fuente oficial está caída?',
    a: 'Legal-IA lo informa. Una fuente que no respondió se reporta como «no consultada», nunca como «sin antecedentes». A noviembre de 2026 hay fuentes pendientes, como la Contraloría y la verificación de sanciones en SECOP, que están caídas en el origen.',
  },
  {
    q: '¿Qué tan actuales son las consultas?',
    a: 'Todas las fuentes de la lista de noviembre de 2026 se probaron contra el registro real el 2 y 3 de noviembre de 2026. Solo aparecen las que respondieron.',
  },
  {
    q: '¿Legal-IA reemplaza a un abogado?',
    a: 'Resuelve tareas repetitivas como peticiones, tutelas, certificados y verificaciones. En casos de alto riesgo, como penal, familia o grandes cuantías, recomienda acudir a un abogado humano. Si hay incertidumbre, Legal-IA lo dice y no inventa normas, sentencias ni radicados.',
  },
];

/* ---------------- JSON-LD ---------------- */

const orgId = `${SITE_URL}/#organization`;
const siteId = `${SITE_URL}/#website`;
const appId = `${SITE_URL}/#app`;

export function jsonLd(page: PageSeo) {
  const url = abs(page.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        url: SITE_URL + '/',
        logo: { '@type': 'ImageObject', url: abs(LOGO), width: 512, height: 512 },
        slogan: 'Tú pones los hechos. Nosotros ponemos el derecho.',
        areaServed: { '@type': 'Country', name: 'Colombia' },
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: SITE_URL + '/',
        name: SITE_NAME,
        inLanguage: 'es-CO',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebApplication',
        '@id': appId,
        name: SITE_NAME,
        url: SITE_URL + '/',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'es-CO',
        description:
          'Plataforma jurídica automatizada para Colombia: redacta documentos legales y consulta registros oficiales desde un chat.',
        provider: { '@id': orgId },
        areaServed: { '@type': 'Country', name: 'Colombia' },
        offers: PAY_AS_YOU_GO_TIERS.map((t) => ({
          '@type': 'Offer',
          name: `${t.name}: ${t.credits} créditos`,
          price: t.priceUSD,
          priceCurrency: 'USD',
          description: t.idealFor,
          url: abs('/resultado/') + '#pricing',
          availability: 'https://schema.org/InStock',
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': siteId },
        about: { '@id': appId },
        primaryImageOfPage: { '@type': 'ImageObject', url: abs(OG_IMAGE) },
        dateModified: LAST_UPDATED,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export { QUERY_COST_GUIDE };
