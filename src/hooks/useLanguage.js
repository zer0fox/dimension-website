import { useLocation } from 'react-router-dom';
import { languageFromPath, localizedPath, otherLanguagePath } from '@/data/siteData';

export default function useLanguage() {
    const { pathname } = useLocation();
    const language = languageFromPath(pathname);
    return {
        language,
        path: (to) => localizedPath(to, language),
        switchPath: otherLanguagePath(pathname),
        text: (greek, english) => language === 'el' ? greek : english,
    };
}