import { useParams } from 'react-router-dom';
import Content from '../components/Content';
import PageNotFound from './PageNotFound';
import { getCategory, projectPath, projectSubtitle } from '../data/siteData';

const Category = () => {
    const { categorySlug } = useParams();
    const category = getCategory(categorySlug);
    if (!category) return <PageNotFound />;

    return (
        <div>
            {category.projects
                .filter((project) => project.listed && project.images.length > 0)
                .map((project) => {
                    const cover = project.images[0];
                    return (
                        <Content
                            key={project.slug}
                            to={project.hasPage ? projectPath(category, project) : undefined}
                            image={cover.src}
                            alt={project.title ?? cover.alt}
                            imageTitle={project.title ?? undefined}
                            imageText={projectSubtitle(project)}
                            imageNote={project.credit ?? undefined}
                        />
                    );
                })}
        </div>
    );
};

export default Category;