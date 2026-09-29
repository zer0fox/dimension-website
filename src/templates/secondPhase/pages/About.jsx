import Content from '../components/Content';
import { about } from '@/content/site';

const About = () => (
    <div>
        <Content
            title={about.name}
            text={
                <span className="content__profile">
                    <img src={about.photo} alt="Profile Pic" />
                    <strong>{about.studio}</strong> {about.intro}
                    {about.paragraphs.map((paragraph) => (
                        <span key={paragraph}><br />{paragraph}</span>
                    ))}
                </span>
            }
        />
    </div>
);

export default About;