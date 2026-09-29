import Content from '../components/Content';
import HomeBanner from '../components/HomeBanner';
import usePage from '@/hooks/usePage';

const Home = () => {
    const page = usePage('home');
    return (
        <div>
            <HomeBanner title={page.heading ?? undefined} subtitle={page.subheading ?? undefined} />
            {page.items.map((item, index) => (
                <Content
                    key={index}
                    to={item.link ?? undefined}
                    image={item.image}
                    alt={item.alt}
                    imageTitle={item.imageTitle ?? undefined}
                />
            ))}
        </div>
    );
};

export default Home;