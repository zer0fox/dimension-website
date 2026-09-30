import { categories, categoryPath, getCategory, getPage, getProject, getSite, languageFromPath, localizedPath, projectPath, projectSubtitle, site, unprefixAsset } from '@/data/siteData';

export const absoluteUrl = (path) => new URL(unprefixAsset(path), site.url).href;

export const normalizePath = (pathname) => pathname.replace(/\/+$/, '') || '/';

const truncate = (text, max = 160) =>
    text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)) + '…';

export const paragraphsText = (page) =>
    page.paragraphs.map((paragraph) => [paragraph.lead, paragraph.body].filter(Boolean).join(' ')).join(' ');

const studioFor = (language) => {
const site = getSite(language);
const aboutPage = getPage('about', language);
return {
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
};

const pageMeta = ({ path, title, description, image = site.defaultImage, noindex = false, structuredData = [], language = 'el' }) => ({
    language,
    alternate: absoluteUrl(language === 'en' ? path.replace(/^\/en(?=\/|$)/, '') || '/' : localizedPath(path, 'en')),
    title,
    description: truncate(description),
    url: absoluteUrl(path),
    image: absoluteUrl(image ?? '/img/logo.png'),
    noindex,
    structuredData: [studioFor(language), ...structuredData],
});

// Meta for a row in the pages table; NULL meta columns fall back to the given defaults.
const staticPageMeta = (slug, path, defaults, language) => {
    const page = getPage(slug, language);
    return pageMeta({
        path,
        language,
        title: page?.metaTitle ?? defaults.title,
        description: page?.metaDescription ?? defaults.description,
        image: page?.image ?? undefined,
        noindex: defaults.noindex,
    });
};

const notFound = (path, language) => staticPageMeta('not-found', path, {
    title: `Page not found | ${site.name}`,
    description: site.description,
    noindex: true,
}, language);

// Metadata for any URL; used for prerendered <head> tags and client-side title updates.
export function getPageMeta(pathname) {
    const path = normalizePath(pathname);
    const language = languageFromPath(path);
    const localSite = getSite(language);
    const routePath = language === 'en' ? path.replace(/^\/en(?=\/|$)/, '') || '/' : path;
    const [section, categorySlug, projectSlug, ...rest] = routePath.split('/').filter(Boolean);

    if (routePath === '/') {
        return staticPageMeta('home', path, { title: localSite.name, description: localSite.description }, language);
    }
    if (routePath === '/about') {
        return staticPageMeta('about', path, {
            title: `${language === 'el' ? 'Σχετικά με' : 'About'} ${localSite.ownerName} | ${localSite.name}`,
            description: paragraphsText(getPage('about', language)),
        }, language);
    }
    if (routePath === '/contact') {
        return staticPageMeta('contact', path, {
            title: `${language === 'el' ? 'Επικοινωνία' : 'Contact'} | ${localSite.name}`,
            description: language === 'el'
                ? `Επικοινωνήστε με τη ${localSite.ownerName} στην ${localSite.city}. Email ${localSite.email}, τηλέφωνο ${localSite.phone}.`
                : `Contact ${localSite.ownerName}, architect and interior designer in ${localSite.city}. Email ${localSite.email}, phone ${localSite.phone}.`,
        }, language);
    }
    if (section !== 'projects' || rest.length > 0) return notFound(path, language);

    const category = getCategory(categorySlug, language);
    if (!category) return notFound(path, language);

    if (!projectSlug) {
        const titles = category.projects.filter((p) => p.listed && p.title).map((p) => p.title);
        return pageMeta({
            path,
            language,
            title: `${category.name} ${language === 'el' ? 'έργα' : 'Projects'} | ${localSite.name}`,
            description: language === 'el'
                ? `Έργα ${category.name} του ${localSite.name}, ${localSite.city}.`
                : `${category.name} architecture and interior design projects by ${localSite.name}, ${localSite.city}` +
                    (titles.length ? `: ${titles.join(', ')}.` : '.'),
            image: category.projects.find((project) => project.images.length)?.images[0].src,
        });
    }

    const project = getProject(categorySlug, projectSlug, language);
    if (!project) return notFound(path, language);

    const subtitle = projectSubtitle(project);
    return pageMeta({
        path,
        language,
        title: `${project.title}${subtitle ? ` (${subtitle})` : ''} | ${site.name}`,
        description: project.description ?? (language === 'el'
            ? `${project.title}: έργο ${category.name.toLowerCase()}${project.location ? ` στην περιοχή ${project.location}` : ''}${project.year ? `, ${project.year}` : ''} από το ${localSite.name}.`
            : `${project.title}: ${category.name.toLowerCase()} project${project.location ? ` in ${project.location}` : ''}` +
                `${project.year ? `, ${project.year}` : ''}, designed by ${localSite.ownerName}, ${localSite.name}.`),
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
            creator: { '@id': studioFor(language)['@id'] },
        }],
    });
}

// Every URL that has its own page; unlisted projects are prerendered but kept out of the sitemap.
export function getRoutes() {
    const routes = [
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
    return routes.flatMap((route) => [route, { ...route, path: localizedPath(route.path, 'en') }]);
}