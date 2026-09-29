import { useParams } from 'react-router-dom';
import { getCategory, projectPath, projectSubtitle } from '@/data/siteData';

// Returns null when the category does not exist.
export default function useCategoryPage() {
    const { categorySlug } = useParams();
    const category = getCategory(categorySlug);
    if (!category) return null;

    return {
        category,
        projects: category.projects
            .filter((project) => project.listed && project.images.length > 0)
            .map((project) => ({
                ...project,
                cover: project.images[0],
                subtitle: projectSubtitle(project),
                to: project.hasPage ? projectPath(category, project) : null,
            })),
    };
}