# Legal-IA

Landing con 3 versiones independientes: `/resultado/`, `/manifiesto/` y `/en-vivo/` (y `/` como índice).

```bash
npm install
npm run dev                                   # desarrollo (http://localhost:3000)
SITE_URL=https://tu-dominio.com npm run build # build + prerender + SEO/GEO
```

## SEO y GEO

`npm run build` ejecuta `vite build` y luego `scripts/prerender.mjs`, que prerenderiza cada versión a HTML estático, escribe `title`, `description`, canonical, Open Graph y JSON-LD, y genera `robots.txt`, `sitemap.xml` y `llms.txt` de cada sitio.

Todo el texto SEO vive en `src/seo/config.ts`. Las versiones `/manifiesto/` y `/en-vivo/` declaran como
canónica a `/resultado/` porque comparten casi todo el contenido; cambia `canonicalPath` si quieres indexarlas por separado.
Si cambias precios o textos del FAQ, edita `src/data/legalQueriesData.ts` y `src/seo/config.ts`: el JSON-LD se regenera solo.

## Un sitio por audiencia

`npm run build` deja en `dist-sites/` tres sitios listos para desplegar, cada uno con su propio dominio:

| Carpeta | Dominio | Audiencia |
|---|---|---|
| `dist-sites/legal-ia/` | legal-ia.co | Abogados y firmas |
| `dist-sites/emprendedor/` | emprendedor.legal-ia.co | Emprendedores y pymes |
| `dist-sites/contador/` | contador.legal-ia.co | Contadores (especialista Tributar-ia) |
| `dist-sites/estados/` | estados.legal-ia.co | Seguimiento de procesos: estados y radicado |

Cada carpeta incluye su `index.html` prerenderizado, `robots.txt`, `sitemap.xml`, `llms.txt` y `_headers`.
El dominio base se puede cambiar con `SITE_DOMAIN=otro.com npm run build`. Los textos por audiencia están en
`src/content/audience.ts` y los metadatos en `src/seo/config.ts`.
