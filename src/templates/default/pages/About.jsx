import Content from '../components/Content';
import { about } from '@/content/site';
import styles from './About.module.scss';

const About = () => (
    <div>
        <Content
            title={about.name}
            text={
                <span className={styles.profile}>
                    <img className={styles.photo} src={about.photo} alt="Profile Pic" />
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