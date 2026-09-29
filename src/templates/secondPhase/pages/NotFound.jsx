import Content from '../components/Content';
import usePage from '@/hooks/usePage';

const NotFound = () => {
    const page = usePage('not-found');
    return (
        <div>
            <Content
                title={page.heading ?? undefined}
                text={page.paragraphs.map((paragraph) => paragraph.body).join(' ')}
            />
        </div>
    );
};

export default NotFound;