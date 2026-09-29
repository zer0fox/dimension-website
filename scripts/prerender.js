import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, getRoutes, getPageMeta, headHtml, sitemapXml, llmsTxt } =
    await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = readFileSync(path.join(distDir, 'index.html'), 'utf8');
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
const ROOT = '<div id="root"></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT)) {
    throw new Error('index.html must contain an <!--seo-->...<!--/seo--> block and an empty <div id="root"></div>');
}

// React emits a preload for every <img>; dropping them keeps gallery images from all downloading up front.
const renderBody = (url) => render(url).replace(/<link rel="preload" as="image"[^>]*\/>/g, '');

const renderPage = (url) => template
    .replace(SEO_BLOCK, () => headHtml(getPageMeta(url)))
    .replace(ROOT, () => `<div id="root" data-path="${url}">${renderBody(url)}</div>`);

const write = (file, content) => {
    const target = path.join(distDir, file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
};

const routes = getRoutes();
for (const route of routes) {
    write(route.path === '/' ? 'index.html' : path.join(route.path.slice(1), 'index.html'), renderPage(route.path));
}
write('404.html', renderPage('/404'));
write('sitemap.xml', sitemapXml(routes));
write('llms.txt', llmsTxt());

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages + 404.html, sitemap.xml, llms.txt`);