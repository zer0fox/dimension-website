import { useParams } from 'react-router-dom';
import { getProject, projectSubtitle } from '@/data/siteData';
import useLanguage from './useLanguage';

// Returns null when the project does not exist or has no page of its own.
export default function useProjectPage() {
    const { categorySlug, projectSlug } = useParams();
    const { language } = useLanguage();
    const project = getProject(categorySlug, projectSlug, language);
    if (!project) return null;

    const [cover = null, ...gallery] = project.images;
    return { ...project, subtitle: projectSubtitle(project), cover, gallery };
}