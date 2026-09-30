import { getPage } from '@/data/siteData';
import useLanguage from './useLanguage';

// Page content from the `pages` table (heading, image, paragraphs, items).
export default function usePage(slug) {
    const { language } = useLanguage();
    const page = getPage(slug, language);
    if (!page) throw new Error(`Page "${slug}" is missing from the pages table`);
    return page;
}