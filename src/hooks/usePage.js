import { getPage } from '@/data/siteData';

// Page content from the `pages` table (heading, image, paragraphs, items).
export default function usePage(slug) {
    const page = getPage(slug);
    if (!page) throw new Error(`Page "${slug}" is missing from the pages table`);
    return page;
}