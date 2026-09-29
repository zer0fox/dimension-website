import { getPage } from '@/data/siteData';

export default function useHomePage() {
    return getPage('home')?.items ?? [];
}