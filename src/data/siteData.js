import siteData from 'virtual:site-data';

const BASE = import.meta.env.BASE_URL;

// Router basename: the deploy folder (e.g. "/dimension-website" on GitHub Pages) or "/".
export const basename = BASE.replace(/\/+$/, '') || '/';

// Root-relative public paths ("/img/...") prefixed with the deploy folder.
export const asset = (path) => (path?.startsWith('/') ? BASE + path.slice(1) : path);

// Inverse of asset(), for building URLs on the canonical site.
export const unprefixAsset = (path) => (path?.startsWith(BASE) ? '/' + path.slice(BASE.length) : path);

const withAsset = (image) => ({ ...image, src: asset(image.src) });

export const site = siteData.site;

export const categories = siteData.categories.map((category) => ({
    ...category,
    projects: category.projects.map((project) => ({ ...project, images: project.images.map(withAsset) })),
}));

const pages = Object.fromEntries(Object.entries(siteData.pages).map(([slug, page]) => [slug, {
    ...page,
    image: asset(page.image),
    items: page.items.map((item) => ({ ...item, image: asset(item.image) })),
}]));

export const getCategory = (slug) => categories.find((category) => category.slug === slug);

export const getProject = (categorySlug, projectSlug) =>
    getCategory(categorySlug)?.projects.find((project) => project.slug === projectSlug && project.hasPage);

export const getPage = (slug) => pages[slug] ?? null;

export const categoryPath = (category) => `/projects/${category.slug}`;

export const projectPath = (category, project) => `${categoryPath(category)}/${project.slug}`;

export const projectSubtitle = (project) => [project.year, project.location].filter(Boolean).join(' | ');
