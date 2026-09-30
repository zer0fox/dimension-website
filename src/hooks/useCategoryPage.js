import { useParams } from 'react-router-dom';
import { getCategory, projectPath, projectSubtitle } from '@/data/siteData';
import useLanguage from './useLanguage';

// Returns null when the category does not exist.
export default function useCategoryPage() {
    const { categorySlug } = useParams();
    const { language, path } = useLanguage();
    const category = getCategory(categorySlug, language);
    if (!category) return null;

    return {
        category,
        projects: category.projects
            .filter((project) => project.listed && project.images.length > 0)
            .map((project) => ({
                ...project,
                cover: project.images[0],
                subtitle: projectSubtitle(project),
                to: project.hasPage ? path(projectPath(category, project)) : null,
            })),
    };
}