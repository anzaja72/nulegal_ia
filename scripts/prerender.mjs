/**
 * Post-build: prerenderiza las 3 versiones a HTML estático y genera los archivos SEO/GEO.
 *   npm run build  →  vite build  →  node scripts/prerender.mjs
 * Motivo: sin esto el HTML sólo trae <div id="root"></div> y los rastreadores que no ejecutan
 * JavaScript (la mayoría de los de IA) no ven ningún contenido.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const vite = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  logLevel: 'error',
});

try {
  const { PAGES, SITE_URL, SITE_NAME, OG_IMAGE, abs, jsonLd, LAST_UPDATED, FAQ } = await vite.ssrLoadModule('/src/seo/config.ts');
  const { renderPage } = await vite.ssrLoadModule('/src/entries/ssr.tsx');
  const variants = { resultado: 1, manifiesto: 2, 'en-vivo': 3 };

  for (const page of PAGES) {
    const file = path.join(dist, page.slug, 'index.html');
    let html = fs.readFileSync(file, 'utf8');
    const url = abs(page.path);
    const canonical = abs(page.canonicalPath);
    const head = [
      `<title>${esc(page.title)}</title>`,
      `<meta name="description" content="${esc(page.description)}" />`,
      `<meta name="robots" content="${page.indexable ? 'index,follow,max-snippet:-1,max-image-preview:large' : 'noindex,follow'}" />`,
      `<link rel="canonical" href="${canonical}" />`,
      ...(canonical === url
        ? [`<link rel="alternate" hreflang="es-CO" href="${url}" />`, `<link rel="alternate" hreflang="x-default" href="${url}" />`]
        : []),
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:locale" content="es_CO" />`,
      `<meta property="og:title" content="${esc(page.title)}" />`,
      `<meta property="og:description" content="${esc(page.description)}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${abs(OG_IMAGE)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Legal-IA: tú pones los hechos, nosotros ponemos el derecho" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(page.title)}" />`,
      `<meta name="twitter:description" content="${esc(page.description)}" />`,
      `<meta name="twitter:image" content="${abs(OG_IMAGE)}" />`,
      `<meta name="theme-color" content="#38B6FF" />`,
      `<script type="application/ld+json">${JSON.stringify(jsonLd(page)).replace(/</g, '\\u003c')}</script>`,
    ].map((l) => '    ' + l).join('\n');

    html = html.replace(/ *<!--seo:start-->[\s\S]*?<!--seo:end-->/, head);
    const app = renderPage(variants[page.slug]);
    html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    fs.writeFileSync(file, html);
    console.log(`prerender ${page.path}  ${(html.length / 1024).toFixed(0)} KB`);
  }

  // ---- raíz: índice de versiones (no se indexa; el dominio debe apuntar a /resultado/) ----
  const idx = path.join(dist, 'index.html');
  let r = fs.readFileSync(idx, 'utf8');
  r = r.replace('<meta name="robots" content="noindex" />', `<meta name="robots" content="noindex,follow" />\n    <link rel="canonical" href="${abs('/resultado/')}" />`);
  fs.writeFileSync(idx, r);

  // ---- robots.txt: buscadores y buscadores de IA permitidos; entrenamiento a criterio del dueño ----
  const allow = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Applebot', 'Google-Extended', 'GPTBot', 'ClaudeBot'];
  const robots = [
    '# Legal-IA. Cambia "Allow" por "Disallow" en GPTBot, ClaudeBot y Google-Extended si prefieres',
    '# excluir tu contenido del entrenamiento de modelos sin salir de los buscadores de IA.',
    ...allow.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

  // ---- sitemap.xml: sólo URLs canónicas indexables ----
  const canon = [...new Set(PAGES.filter((p) => p.indexable).map((p) => p.canonicalPath))];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${canon
    .map((p) => `  <url>\n    <loc>${abs(p)}</loc>\n    <lastmod>${LAST_UPDATED}</lastmod>\n  </url>`)
    .join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

  // ---- llms.txt (convención llmstxt.org; sin garantía de efecto, coste cero) ----
  const llms = `# ${SITE_NAME}

> Plataforma jurídica automatizada para Colombia. Redacta documentos legales (acciones de tutela, derechos de petición, incidentes de desacato, contestaciones de demanda, recursos y contratos) y consulta 11 grupos de registros oficiales desde un chat. Modelo pay as you go: se compran créditos y se paga solo lo que se usa, sin suscripción.

## Páginas

- [Legal-IA: documentos jurídicos con IA](${abs('/resultado/')}): qué es, cómo funciona, precios y preguntas frecuentes.
- [Versión Manifiesto](${abs('/manifiesto/')}): misma oferta, enfoque en el modelo de servicio.
- [Consola en vivo](${abs('/en-vivo/')}): demostración de consultas a registros oficiales.

## Preguntas frecuentes

${FAQ.map((f) => `- **${f.q}** ${f.a}`).join('\n')}

## Datos

- Idioma: español (Colombia). Cobertura: Colombia.
- Última actualización: ${LAST_UPDATED}.
`;
  fs.writeFileSync(path.join(dist, 'llms.txt'), llms);
  console.log('robots.txt, sitemap.xml y llms.txt generados para', SITE_URL);
} finally {
  await vite.close();
}
