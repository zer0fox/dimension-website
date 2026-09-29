import Content from '../components/Content';
import HomeBanner from '../components/HomeBanner';
import useHomePage from '@/hooks/useHomePage';

const Home = () => {
    const items = useHomePage();
    return (
        <div>
            <HomeBanner />
            {items.map((item, index) => (
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