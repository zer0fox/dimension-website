import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from './meta';

// Keeps <title>, description and canonical in sync during client-side navigation.
export default function usePageMeta() {
    const { pathname } = useLocation();

    useEffect(() => {
        const meta = getPageMeta(pathname);
        document.title = meta.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
        document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.url);
    }, [pathname]);
}