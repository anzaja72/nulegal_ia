import { PAY_AS_YOU_GO_TIERS, NOVEMBER_2026_QUERIES, QUERY_COST_GUIDE } from '../data/legalQueriesData.ts';

/**
 * Única fuente de verdad del SEO/GEO. El prerender (scripts/prerender.mjs) la usa para
 * generar <head>, JSON-LD, sitemap.xml, robots.txt y llms.txt de CADA sitio.
 *
 * Cada versión de la landing es un sitio independiente en su propio dominio:
 *   legal-ia.co              → abogados            (slug "resultado",  variante 1)
 *   emprendedor.legal-ia.co  → emprendedores/pymes (slug "manifiesto", variante 2)
 *   contador.legal-ia.co     → contadores          (slug "en-vivo",    variante 3)
 *   estados.legal-ia.co      → seguimiento de procesos (slug "estados", variante 4)
 * El dominio base se puede cambiar al compilar:  SITE_DOMAIN=otro-dominio.com npm run build
 */
export const SITE_DOMAIN =
  (typeof process !== 'undefined' && process.env?.SITE_DOMAIN) || 'legal-ia.co';

export const SITE_NAME = 'Legal-IA';
export const LAST_UPDATED = '2026-11-04';
export const LAST_UPDATED_LABEL = '4 de noviembre de 2026';
export const OG_IMAGE = '/og-image.png';
export const LOGO = '/logo.png';

export interface SiteSeo {
  slug: 'resultado' | 'manifiesto' | 'en-vivo' | 'estados';
  variant: 1 | 2 | 3 | 4;
  host: string;
  /** URL canónica (raíz del sitio). */
  url: string;
  /** Carpeta de salida en dist-sites/ (una por sitio de Netlify). */
  outDir: string;
  audience: string;
  title: string;
  description: string;
  indexable: boolean;
}

export const SITES: SiteSeo[] = [
  {
    slug: 'resultado',
    variant: 1,
    host: SITE_DOMAIN,
    url: `https://${SITE_DOMAIN}/`,
    outDir: 'legal-ia',
    audience: 'Abogados y firmas',
    title: 'Legal-IA · Copiloto jurídico para abogados en Colombia',
    description:
      'Acelera tu flujo de trabajo: Legal-IA redacta el primer borrador de tutelas y peticiones y verifica partes en 11 registros oficiales. Privacidad ZDR, desde US$25.',
    indexable: true,
  },
  {
    slug: 'manifiesto',
    variant: 2,
    host: `emprendedor.${SITE_DOMAIN}`,
    url: `https://emprendedor.${SITE_DOMAIN}/`,
    outDir: 'emprendedor',
    audience: 'Emprendedores y pymes',
    title: 'Legal-IA para emprendedores y pymes en Colombia',
    description:
      'Un área jurídica 24/7 sin nómina de abogados: documentos listos y verificación de proveedores y clientes en registros oficiales. Pagas solo lo que usas.',
    indexable: true,
  },
  {
    slug: 'en-vivo',
    variant: 3,
    host: `contador.${SITE_DOMAIN}`,
    url: `https://contador.${SITE_DOMAIN}/`,
    outDir: 'contador',
    audience: 'Contadores y asesores tributarios',
    title: 'Tributar-ia · Especialista tributario para contadores',
    description:
      'Consulta la doctrina de la DIAN con texto íntegro y 10 años de comercio exterior de un NIT. Pagas por consulta, con privacidad ZDR.',
    indexable: true,
  },
  {
    slug: 'estados',
    variant: 4,
    host: `estados.${SITE_DOMAIN}`,
    url: `https://estados.${SITE_DOMAIN}/`,
    outDir: 'estados',
    audience: 'Seguimiento de procesos judiciales',
    title: 'Legal-IA Estados · Consulta si tu proceso se movió',
    description:
      'Dale el radicado de 23 dígitos a Legal-IA y revisa los estados de los últimos 5 días hábiles y la información del proceso en la Rama Judicial. Privacidad ZDR.',
    indexable: true,
  },
];

/** Enlaces entre sitios (footer): enlazado interno útil para usuarios y buscadores. */
export const SITE_LINKS = SITES.map((s) => ({ audience: s.audience, url: s.url, slug: s.slug }));

export const MAIN_URL = SITES[0].url.replace(/\/$/, '');
export const abs = (site: SiteSeo, path: string) => `${site.url.replace(/\/$/, '')}${path}`;

/* ---------------- Preguntas frecuentes (visibles en la página y en JSON-LD) ---------------- */

const tierLine = PAY_AS_YOU_GO_TIERS.map((t) =>
  t.monthly
    ? `US$${t.priceUSD} al mes = ${t.credits} créditos${t.setupFeeUSD ? `, más US$${t.setupFeeUSD} de setup inicial` : ''} (plan Corporativo)`
    : `US$${t.priceUSD} = ${t.credits} créditos`
).join('; ');
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
    a: `Hay un plan gratis de $0 con hasta 10 documentos al mes, solo para derechos de petición, tutelas o acciones constitucionales del ciudadano, sin tarjeta. Los packs de créditos son pay as you go: compras créditos y pagas solo lo que usas, sin suscripción mensual. ${tierLine}. El plan Corporativo incluye alojamiento de modelo exclusivo y acceso solo desde el dominio de tu empresa. Redactar un documento cuesta 5 créditos y la mayoría de las consultas a registros cuestan entre 1 y 3.`,
  },
  {
    q: '¿Qué pasa con la privacidad de mis datos?',
    a: 'Legal-IA opera con ZDR (Zero Data Retention): lo que escribes y los documentos que generas no se almacenan en el proveedor del modelo ni se usan para entrenarlo. Con una IA genérica como ChatGPT tus datos pueden compartirse para entrenamiento, y cargar datos de clientes o de terceros implica el riesgo de incumplir la Ley 1581 de 2012 (Habeas Data).',
  },
  {
    q: '¿Cómo consulto si mi proceso se movió?',
    a: 'Escribe el número de radicado de 23 dígitos en el chat de Legal-IA. El chat revisa los estados de los últimos 5 días hábiles y te dice si el proceso se movió. Si salió en estado, te da el número de estado, la fecha y la anotación del auto. También consulta la información del proceso publicada en la Rama Judicial: estado, despacho, partes y actuaciones recientes.',
  },
  {
    q: '¿Necesito una suscripción para consultar estados y procesos?',
    a: 'No. La consulta de estados y procesos por radicado es pay as you go: cada consulta cuesta 3 créditos y pagas solo las que haces. Un pack de US$25 (100 créditos) alcanza para 33 consultas y uno de US$40 (200 créditos) para 66. No hay mensualidad ni plan que activar.',
  },
  {
    q: '¿Qué es el radicado de 23 dígitos?',
    a: 'Es el número que identifica un proceso judicial en Colombia. Sus bloques indican la ciudad o municipio, la corporación, la especialidad, el despacho, el año, el consecutivo y la instancia.',
  },
  {
    q: '¿Qué es Tributar-ia?',
    a: 'Tributar-ia es el especialista tributario y contable de Legal-IA. Consulta la doctrina de la DIAN (conceptos, oficios y providencias) con el texto íntegro y los datos de comercio exterior de un NIT, y apoya a contadores y asesores en sus consultas tributarias.',
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

const orgId = `${MAIN_URL}/#organization`;

export function jsonLd(site: SiteSeo) {
  const base = site.url.replace(/\/$/, '');
  const siteId = `${base}/#website`;
  const appId = `${base}/#app`;
  const pageId = `${base}/#webpage`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        url: MAIN_URL + '/',
        logo: { '@type': 'ImageObject', url: `${MAIN_URL}${LOGO}`, width: 512, height: 512 },
        slogan: 'Tú pones los hechos. Nosotros ponemos el derecho.',
        areaServed: { '@type': 'Country', name: 'Colombia' },
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: site.url,
        name: `${SITE_NAME} · ${site.audience}`,
        inLanguage: 'es-CO',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebApplication',
        '@id': appId,
        name: SITE_NAME,
        url: site.url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'es-CO',
        audience: { '@type': 'Audience', audienceType: site.audience },
        description:
          'Plataforma jurídica automatizada para Colombia: redacta documentos legales y consulta registros oficiales desde un chat, con privacidad ZDR (Zero Data Retention).',
        provider: { '@id': orgId },
        areaServed: { '@type': 'Country', name: 'Colombia' },
        offers: [
          {
            '@type': 'Offer',
            name: 'Plan Gratis',
            price: 0,
            priceCurrency: 'USD',
            description:
              'Hasta 10 documentos al mes: derechos de petición, tutelas o acciones constitucionales del ciudadano. Sin tarjeta de crédito.',
            url: 'https://free.legal-ia.co/',
            availability: 'https://schema.org/InStock',
          },
          ...PAY_AS_YOU_GO_TIERS.map((t) => ({
          '@type': 'Offer',
          name: `${t.name}: ${t.credits} créditos${t.monthly ? ' al mes' : ''}`,
          price: t.priceUSD,
          priceCurrency: 'USD',
          description: t.setupFeeUSD
            ? `${t.idealFor}. Incluye un setup inicial de US$${t.setupFeeUSD}.`
            : t.idealFor,
          url: `${site.url}#pricing`,
          availability: 'https://schema.org/InStock',
          ...(t.setupFeeUSD
            ? {
                priceSpecification: [
                  { '@type': 'UnitPriceSpecification', price: t.priceUSD, priceCurrency: 'USD', billingDuration: 1, unitCode: 'MON' },
                  { '@type': 'PriceSpecification', name: 'Setup inicial', price: t.setupFeeUSD, priceCurrency: 'USD' },
                ],
              }
            : {}),
        })),
        ],
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': siteId },
        about: { '@id': appId },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${base}${OG_IMAGE}` },
        dateModified: LAST_UPDATED,
      },
      {
        '@type': 'FAQPage',
        '@id': `${base}/#faq`,
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
