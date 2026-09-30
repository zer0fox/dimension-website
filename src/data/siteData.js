import siteData from 'virtual:site-data';

const BASE = import.meta.env.BASE_URL;

// Router basename: the deploy folder (e.g. "/dimension-website" on GitHub Pages) or "/".
export const basename = BASE.replace(/\/+$/, '') || '/';

// Root-relative public paths ("/img/...") prefixed with the deploy folder.
export const asset = (path) => (path?.startsWith('/') ? BASE + path.slice(1) : path);

// Inverse of asset(), for building URLs on the canonical site.
export const unprefixAsset = (path) => (path?.startsWith(BASE) ? '/' + path.slice(BASE.length) : path);

const withAsset = (image) => ({ ...image, src: asset(image.src) });

const dataFor = (language) => siteData[language] ?? siteData.el;

export const languageFromPath = (pathname) => pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'el';
export const localizedPath = (path, language) => language === 'en' && path.startsWith('/')
    ? `/en${path === '/' ? '' : path}` : path;
export const otherLanguagePath = (pathname) => languageFromPath(pathname) === 'en'
    ? pathname.replace(/^\/en(?=\/|$)/, '') || '/'
    : localizedPath(pathname, 'en');

export const site = dataFor('el').site;
export const getSite = (language = 'el') => dataFor(language).site;

const prepareCategories = (language) => dataFor(language).categories.map((category) => ({
    ...category,
    projects: category.projects.map((project) => ({ ...project, images: project.images.map(withAsset) })),
}));

const preparePages = (language) => Object.fromEntries(Object.entries(dataFor(language).pages).map(([slug, page]) => [slug, {
    ...page,
    image: asset(page.image),
    items: page.items.map((item) => ({ ...item, image: asset(item.image) })),
}]));

export const categories = prepareCategories('el');
export const getCategories = (language = 'el') => language === 'el' ? categories : prepareCategories(language);

const pages = preparePages('el');
export const getCategory = (slug, language = 'el') => getCategories(language).find((category) => category.slug === slug);

export const getProject = (categorySlug, projectSlug, language = 'el') =>
    getCategory(categorySlug, language)?.projects.find((project) => project.slug === projectSlug && project.hasPage);

export const getPage = (slug, language = 'el') => (language === 'el' ? pages : preparePages(language))[slug] ?? null;

export const categoryPath = (category) => `/projects/${category.slug}`;

export const projectPath = (category, project) => `${categoryPath(category)}/${project.slug}`;

export const projectSubtitle = (project) => [project.year, project.location].filter(Boolean).join(' | ');
