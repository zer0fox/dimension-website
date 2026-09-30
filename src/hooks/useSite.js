import { getSite } from '@/data/siteData';
import useLanguage from './useLanguage';

export default function useSite() {
    const { language } = useLanguage();
    return getSite(language);
}