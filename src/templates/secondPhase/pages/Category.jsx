import Content from '../components/Content';
import NotFound from './NotFound';
import useCategoryPage from '@/hooks/useCategoryPage';

const Category = () => {
    const page = useCategoryPage();
    if (!page) return <NotFound />;

    return (
        <div>
            {page.projects.map((project) => (
                <Content
                    key={project.slug}
                    to={project.to ?? undefined}
                    image={project.cover.src}
                    alt={project.title ?? project.cover.alt}
                    imageTitle={project.title ?? undefined}
                    imageText={project.subtitle}
                    imageNote={project.credit ?? undefined}
                />
            ))}
        </div>
    );
};

export default Category;