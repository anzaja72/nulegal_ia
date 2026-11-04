# Legal-IA

Landing con 3 versiones independientes: `/resultado/`, `/manifiesto/` y `/en-vivo/` (y `/` como índice).

```bash
npm install
npm run dev                                   # desarrollo (http://localhost:3000)
SITE_URL=https://tu-dominio.com npm run build # build + prerender + SEO/GEO
```

## SEO y GEO

`npm run build` ejecuta `vite build` y luego `scripts/prerender.mjs`, que:

- Prerenderiza cada versión a HTML estático (los rastreadores de IA que no ejecutan JavaScript ven el contenido).
- Escribe en cada página `title`, `description`, canonical, Open Graph, Twitter y JSON-LD
  (Organization, WebSite, WebApplication con las ofertas por créditos, WebPage y FAQPage).
- Genera `robots.txt`, `sitemap.xml` y `llms.txt` con el dominio de `SITE_URL`.

Todo el texto SEO vive en `src/seo/config.ts`. Las versiones `/manifiesto/` y `/en-vivo/` declaran como
canónica a `/resultado/` porque comparten casi todo el contenido; cambia `canonicalPath` si quieres indexarlas por separado.
Si cambias precios o textos del FAQ, edita `src/data/legalQueriesData.ts` y `src/seo/config.ts`: el JSON-LD se regenera solo.
