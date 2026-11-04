/**
 * Post-build: separa las 3 versiones en 3 sitios independientes (uno por dominio),
 * prerenderiza cada una a HTML estático y genera sus archivos SEO/GEO.
 *
 *   npm run build  →  vite build  →  node scripts/prerender.mjs
 *
 * Salida:  dist-sites/legal-ia/        → legal-ia.co
 *          dist-sites/emprendedor/     → emprendedor.legal-ia.co
 *          dist-sites/contador/        → contador.legal-ia.co
 *
 * Motivo del prerender: sin esto el HTML sólo trae <div id="root"></div> y los rastreadores
 * que no ejecutan JavaScript (la mayoría de los de IA) no ven ningún contenido.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'dist-sites');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

fs.rmSync(out, { recursive: true, force: true });

const vite = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  logLevel: 'error',
});

try {
  const { SITES, SITE_NAME, OG_IMAGE, jsonLd, LAST_UPDATED, FAQ } = await vite.ssrLoadModule('/src/seo/config.ts');
  const { renderPage } = await vite.ssrLoadModule('/src/entries/ssr.tsx');

  // Archivos comunes (assets, logo, favicons, og-image): todo lo de dist salvo las páginas html.
  const shared = fs.readdirSync(dist).filter((f) => !f.endsWith('.html'));

  for (const site of SITES) {
    const dir = path.join(out, site.outDir);
    fs.mkdirSync(dir, { recursive: true });
    for (const f of shared) fs.cpSync(path.join(dist, f), path.join(dir, f), { recursive: true });

    const base = site.url.replace(/\/$/, '');
    let html = fs.readFileSync(path.join(dist, `${site.slug}.html`), 'utf8');
    const head = [
      `<title>${esc(site.title)}</title>`,
      `<meta name="description" content="${esc(site.description)}" />`,
      `<meta name="robots" content="${site.indexable ? 'index,follow,max-snippet:-1,max-image-preview:large' : 'noindex,follow'}" />`,
      `<link rel="canonical" href="${site.url}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:locale" content="es_CO" />`,
      `<meta property="og:title" content="${esc(site.title)}" />`,
      `<meta property="og:description" content="${esc(site.description)}" />`,
      `<meta property="og:url" content="${site.url}" />`,
      `<meta property="og:image" content="${base}${OG_IMAGE}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Legal-IA: tú pones los hechos, nosotros ponemos el derecho" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(site.title)}" />`,
      `<meta name="twitter:description" content="${esc(site.description)}" />`,
      `<meta name="twitter:image" content="${base}${OG_IMAGE}" />`,
      `<meta name="theme-color" content="#38B6FF" />`,
      `<script type="application/ld+json">${JSON.stringify(jsonLd(site)).replace(/</g, '\\u003c')}</script>`,
    ].map((l) => '    ' + l).join('\n');

    html = html.replace(/ *<!--seo:start-->[\s\S]*?<!--seo:end-->/, head);
    html = html.replace('<div id="root"></div>', `<div id="root">${renderPage(site.variant)}</div>`);
    fs.writeFileSync(path.join(dir, 'index.html'), html);

    // robots.txt: buscadores y buscadores de IA permitidos; el entrenamiento queda a criterio del dueño.
    const bots = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Applebot', 'Google-Extended', 'GPTBot', 'ClaudeBot'];
    fs.writeFileSync(
      path.join(dir, 'robots.txt'),
      [
        '# Legal-IA. Cambia "Allow" por "Disallow" en GPTBot, ClaudeBot y Google-Extended si prefieres',
        '# excluir tu contenido del entrenamiento de modelos sin salir de los buscadores de IA.',
        ...bots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${base}/sitemap.xml`,
        '',
      ].join('\n'),
    );

    fs.writeFileSync(
      path.join(dir, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${site.url}</loc>\n    <lastmod>${LAST_UPDATED}</lastmod>\n  </url>\n</urlset>\n`,
    );

    fs.writeFileSync(
      path.join(dir, 'llms.txt'),
      `# ${SITE_NAME} · ${site.audience}

> ${site.description} Plataforma jurídica automatizada para Colombia: redacta documentos legales y consulta registros oficiales desde un chat. Packs de créditos pay as you go, sin suscripción, y plan Corporativo con modelo exclusivo.

## Esta página

- [${site.title}](${site.url}): oferta, cómo funciona, precios y preguntas frecuentes para ${site.audience.toLowerCase()}.

## Preguntas frecuentes

${FAQ.map((f) => `- **${f.q}** ${f.a}`).join('\n')}

## Datos

- Idioma: español (Colombia). Cobertura: Colombia.
- Última actualización: ${LAST_UPDATED}.
`,
    );

    // Caché larga para assets con hash y cabeceras básicas de seguridad (Netlify).
    fs.writeFileSync(
      path.join(dir, '_headers'),
      `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`,
    );

    console.log(`sitio ${site.host.padEnd(26)} → dist-sites/${site.outDir}/   (${(html.length / 1024).toFixed(0)} KB html)`);
  }
} finally {
  await vite.close();
}
