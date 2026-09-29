import HomeHero from '../components/HomeHero';
import Gallery from '../components/Gallery';
import usePage from '@/hooks/usePage';
import useSite from '@/hooks/useSite';
import useHomeGallery from '@/hooks/useHomeGallery';

const GALLERY_ID = 'work';

const Home = () => {
    const page = usePage('home');
    const site = useSite();
    const gallery = useHomeGallery();

    return (
        <div>
            <HomeHero
                title={page.heading ?? undefined}
                subtitle={page.subheading ?? undefined}
                logoAlt={site.name}
                slides={gallery.slides}
                targetId={GALLERY_ID}
            />
            <Gallery
                id={GALLERY_ID}
                title="Projects & Journal"
                filters={gallery.filters}
                active={gallery.active}
                onFilter={gallery.setActive}
                items={gallery.items}
            />
        </div>
    );
};

export default Home;
