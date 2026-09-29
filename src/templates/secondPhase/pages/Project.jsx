import Content from '../components/Content';
import NotFound from './NotFound';
import useProjectPage from '@/hooks/useProjectPage';

const Project = () => {
    const project = useProjectPage();
    if (!project) return <NotFound />;

    return (
        <div>
            {project.description && <Content title={project.title} text={project.description} />}
            {project.cover && (
                <Content
                    image={project.cover.src}
                    alt={project.cover.alt}
                    imageTitle={project.title ?? undefined}
                    imageText={project.subtitle}
                    imageNote={project.credit ?? undefined}
                />
            )}
            {project.gallery.map((image) => (
                <Content key={image.src} image={image.src} alt={image.alt} />
            ))}
        </div>
    );
};

export default Project;