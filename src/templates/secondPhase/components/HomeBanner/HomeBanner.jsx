import PropTypes from 'prop-types';
import styles from './HomeBanner.module.css';

const HomeBanner = ({ title, subtitle }) => (
    <div className={styles.homeBanner}>
        <div className={styles.title}>{title}</div>
        <div>{subtitle}</div>
    </div>
);

HomeBanner.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

export default HomeBanner;