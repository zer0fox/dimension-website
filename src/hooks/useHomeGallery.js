import { useState } from 'react';
import { categories, getPage, projectPath, projectSubtitle } from '@/data/siteData';

const ARTICLES = { id: 'journal', name: 'Journal' };
const HERO_SLIDES = 5;

const projects = categories
    .flatMap((category) =>
        category.projects
            .filter((project) => project.listed && project.images.length > 0)
            .map((project) => ({
                key: `${category.slug}/${project.slug}`,
                group: category.slug,
                label: category.name,
                image: project.images[0].src,
                alt: project.title ?? project.images[0].alt,
                title: project.title,
                subtitle: projectSubtitle(project),
                to: project.hasPage ? projectPath(category, project) : null,
                year: project.year,
            })),
    )
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

const articles = (getPage('home')?.items ?? []).map((item, index) => ({
    key: `${ARTICLES.id}/${index}`,
    group: ARTICLES.id,
    label: ARTICLES.name,
    image: item.image,
    alt: item.alt,
    title: item.imageTitle,
    subtitle: null,
    to: item.link,
}));

// One article after every two projects keeps the "All" view mixed.
const allItems = [];
for (let p = 0, a = 0; p < projects.length || a < articles.length; ) {
    if (p < projects.length) allItems.push(projects[p++]);
    if (p < projects.length) allItems.push(projects[p++]);
    if (a < articles.length) allItems.push(articles[a++]);
}

const filters = [
    { id: 'all', name: 'All' },
    ...categories.filter((category) => projects.some((item) => item.group === category.slug)).map((category) => ({ id: category.slug, name: category.name })),
    ...(articles.length > 0 ? [ARTICLES] : []),
];

const homePage = getPage('home');
const slides = homePage?.image
    ? [{ src: homePage.image, alt: homePage.imageAlt ?? '' }]
    : projects.filter((item) => item.title).slice(0, HERO_SLIDES).map((item) => ({ src: item.image, alt: item.alt }));

// Home gallery: every listed project plus the home page items ("Journal"), filterable by group.
export default function useHomeGallery() {
    const [active, setActive] = useState('all');
    const items = active === 'all' ? allItems : allItems.filter((item) => item.group === active);
    return { filters, active, setActive, items, slides };
}
