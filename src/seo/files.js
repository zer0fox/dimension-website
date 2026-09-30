import { categories, categoryPath, getPage, projectPath, projectSubtitle, site } from '@/data/siteData';
import { absoluteUrl, paragraphsText } from './meta';

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function headHtml(meta) {
    const tags = [
        `<title>${escapeHtml(meta.title)}</title>`,
        `<meta name="description" content="${escapeHtml(meta.description)}" />`,
        `<link rel="canonical" href="${escapeHtml(meta.url)}" />`,
        `<link rel="alternate" hreflang="${meta.language}" href="${escapeHtml(meta.url)}" />`,
        `<link rel="alternate" hreflang="${meta.language === 'el' ? 'en' : 'el'}" href="${escapeHtml(meta.alternate)}" />`,
        meta.noindex && '<meta name="robots" content="noindex" />',
        '<meta property="og:type" content="website" />',
        `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
        `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
        `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
        `<meta property="og:url" content="${escapeHtml(meta.url)}" />`,
        `<meta property="og:image" content="${escapeHtml(meta.image)}" />`,
        '<meta name="twitter:card" content="summary_large_image" />',
        ...meta.structuredData.map((data) =>
            `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`),
    ];
    return tags.filter(Boolean).join('\n    ');
}

export function sitemapXml(routes) {
    const urls = routes
        .filter((route) => route.inSitemap)
        .map((route) => `  <url><loc>${escapeHtml(absoluteUrl(route.path))}</loc></url>`);
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

// Plain-text summary for AI assistants and LLM crawlers (https://llmstxt.org).
export function llmsTxt() {
    const lines = [
        `# ${site.name}`,
        '',
        `> ${site.description}`,
        '',
        paragraphsText(getPage('about') ?? { paragraphs: [] }),
        '',
        '## Contact',
        '',
        `- ${site.ownerTitle ?? 'Owner'}: ${site.ownerName}`,
        site.email && `- Email: ${site.email}`,
        site.phone && `- Phone: ${site.phone}`,
        site.instagramUrl && `- Instagram: ${site.instagramUrl}`,
        site.city && `- Location: ${site.city}, Greece`,
        '',
        '## Pages',
        '',
        `- [Home](${absoluteUrl('/')})`,
        `- [About ${site.ownerName}](${absoluteUrl('/about')})`,
        `- [Contact](${absoluteUrl('/contact')})`,
    ];

    for (const category of categories) {
        const projects = category.projects.filter((project) => project.listed && project.title);
        lines.push('', `## ${category.name} projects`, '', `- [All ${category.name.toLowerCase()} projects](${absoluteUrl(categoryPath(category))})`);
        for (const project of projects) {
            const details = [projectSubtitle(project), project.credit, project.description].filter(Boolean).join('. ');
            const link = project.hasPage ? absoluteUrl(projectPath(category, project)) : absoluteUrl(categoryPath(category));
            lines.push(`- [${project.title}](${link})${details ? `: ${details}` : ''}`);
        }
    }
    return lines.filter((line) => line !== null && line !== undefined && line !== false).join('\n') + '\n';
}