import { useParams } from 'react-router-dom';
import Content from '../components/Content';
import PageNotFound from './PageNotFound';
import { getProject, projectSubtitle } from '../data/siteData';

const Project = () => {
    const { categorySlug, projectSlug } = useParams();
    const project = getProject(categorySlug, projectSlug);
    if (!project) return <PageNotFound />;

    const [cover, ...images] = project.images;
    return (
        <div>
            {project.description && <Content title={project.title} text={project.description} />}
            {cover && (
                <Content
                    image={cover.src}
                    alt={cover.alt}
                    imageTitle={project.title ?? undefined}
                    imageText={projectSubtitle(project)}
                    imageNote={project.credit ?? undefined}
                />
            )}
            {images.map((image) => (
                <Content key={image.src} image={image.src} alt={image.alt} />
            ))}
        </div>
    );
};

export default Project;