import siteData from 'virtual:site-data';

export const site = siteData.site;

export const categories = siteData.categories;

export const getCategory = (slug) => categories.find((category) => category.slug === slug);

export const getProject = (categorySlug, projectSlug) =>
    getCategory(categorySlug)?.projects.find((project) => project.slug === projectSlug && project.hasPage);

export const getPage = (slug) => siteData.pages[slug] ?? null;

export const categoryPath = (category) => `/projects/${category.slug}`;

export const projectPath = (category, project) => `${categoryPath(category)}/${project.slug}`;

export const projectSubtitle = (project) => [project.year, project.location].filter(Boolean).join(' | ');