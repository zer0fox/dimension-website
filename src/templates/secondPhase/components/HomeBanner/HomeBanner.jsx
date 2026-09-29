import { banner } from '@/content/site';
import styles from './HomeBanner.module.css';

const HomeBanner = () => (
    <div className={styles.homeBanner}>
        <div className={styles.title}>{banner.title}</div>
        <div>{banner.subtitle}</div>
    </div>
);

export default HomeBanner;