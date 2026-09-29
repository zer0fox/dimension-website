import Content from '../components/Content';
import HomeBanner from '../components/HomeBanner';
import { getPage } from '../data/siteData';

const Home = () => {
    const { items } = getPage('home');
    return (
        <div>
            <HomeBanner />
            {items.map((item) => (
                <Content
                    key={item.image}
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