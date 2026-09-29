import { categories, categoryPath, getCategory, getPage, getProject, projectPath, projectSubtitle, site } from '@/data/siteData';

export const absoluteUrl = (path) => new URL(path, site.url).href;

export const normalizePath = (pathname) => pathname.replace(/\/+$/, '') || '/';

const truncate = (text, max = 160) =>
    text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)) + '…';

export const paragraphsText = (page) =>
    page.paragraphs.map((paragraph) => [paragraph.lead, paragraph.body].filter(Boolean).join(' ')).join(' ');

const aboutPage = getPage('about');

const studio = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#studio`,
    name: site.name,
    url: site.url,
    logo: absoluteUrl('/img/logo.png'),
    ...(site.defaultImage && { image: absoluteUrl(site.defaultImage) }),
    description: site.description,
    ...(site.email && { email: site.email }),
    ...(site.phone && { telephone: site.phone.replace(/[^\d+]/g, '') }),
    ...(site.founded && { foundingDate: site.founded }),
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
    areaServed: 'Greece',
    ...(site.instagramUrl && { sameAs: [site.instagramUrl] }),
    founder: {
        '@type': 'Person',
        name: site.ownerName,
        ...(site.ownerTitle && { jobTitle: site.ownerTitle }),
        ...(aboutPage?.image && { image: absoluteUrl(aboutPage.image) }),
        alumniOf: [
            { '@type': 'CollegeOrUniversity', name: 'National Technical University of Athens (NTUA)' },
            { '@type': 'EducationalOrganization', name: 'IED Barcelona' },
        ],
    },
};

const pageMeta = ({ path, title, description, image = site.defaultImage, noindex = false, structuredData = [] }) => ({
    title,
    description: truncate(description),
    url: absoluteUrl(path),
    image: absoluteUrl(image ?? '/img/logo.png'),
    noindex,
    structuredData: [studio, ...structuredData],
});

// Meta for a row in the pages table; NULL meta columns fall back to the given defaults.
const staticPageMeta = (slug, path, defaults) => {
    const page = getPage(slug);
    return pageMeta({
        path,
        title: page?.metaTitle ?? defaults.title,
        description: page?.metaDescription ?? defaults.description,
        image: page?.image ?? undefined,
        noindex: defaults.noindex,
    });
};

const notFound = (path) => staticPageMeta('not-found', path, {
    title: `Page not found | ${site.name}`,
    description: site.description,
    noindex: true,
});

// Metadata for any URL; used for prerendered <head> tags and client-side title updates.
export function getPageMeta(pathname) {
    const path = normalizePath(pathname);
    const [section, categorySlug, projectSlug, ...rest] = path.split('/').filter(Boolean);

    if (path === '/') {
        return staticPageMeta('home', path, { title: site.name, description: site.description });
    }
    if (path === '/about') {
        return staticPageMeta('about', path, {
            title: `About ${site.ownerName} | ${site.name}`,
            description: aboutPage ? paragraphsText(aboutPage) : site.description,
        });
    }
    if (path === '/contact') {
        return staticPageMeta('contact', path, {
            title: `Contact | ${site.name}`,
            description: `Contact ${site.ownerName}, architect and interior designer in ${site.city}. Email ${site.email}, phone ${site.phone}.`,
        });
    }
    if (section !== 'projects' || rest.length > 0) return notFound(path);

    const category = getCategory(categorySlug);
    if (!category) return notFound(path);

    if (!projectSlug) {
        const titles = category.projects.filter((p) => p.listed && p.title).map((p) => p.title);
        return pageMeta({
            path,
            title: `${category.name} Projects | ${site.name}`,
            description: `${category.name} architecture and interior design projects by ${site.name}, ${site.city}` +
                (titles.length ? `: ${titles.join(', ')}.` : '.'),
            image: category.projects.find((p) => p.images.length)?.images[0].src,
        });
    }

    const project = getProject(categorySlug, projectSlug);
    if (!project) return notFound(path);

    const subtitle = projectSubtitle(project);
    return pageMeta({
        path,
        title: `${project.title}${subtitle ? ` (${subtitle})` : ''} | ${site.name}`,
        description: project.description ??
            `${project.title}: ${category.name.toLowerCase()} project${project.location ? ` in ${project.location}` : ''}` +
            `${project.year ? `, ${project.year}` : ''}, designed by ${site.ownerName}, ${site.name}.`,
        image: project.images[0]?.src,
        structuredData: [{
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            url: absoluteUrl(path),
            genre: `${category.name} architecture`,
            ...(project.description && { description: project.description }),
            ...(project.year && { dateCreated: String(project.year) }),
            ...(project.location && { locationCreated: { '@type': 'Place', name: project.location } }),
            image: project.images.map((image) => absoluteUrl(image.src)),
            creator: { '@id': studio['@id'] },
        }],
    });
}

// Every URL that has its own page; unlisted projects are prerendered but kept out of the sitemap.
export function getRoutes() {
    return [
        { path: '/', inSitemap: true },
        { path: '/about', inSitemap: true },
        { path: '/contact', inSitemap: true },
        ...categories.flatMap((category) => [
            { path: categoryPath(category), inSitemap: true },
            ...category.projects
                .filter((project) => project.hasPage)
                .map((project) => ({ path: projectPath(category, project), inSitemap: project.listed })),
        ]),
    ];
}