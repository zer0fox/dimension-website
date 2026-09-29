import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Gallery.module.scss';

const GalleryCard = ({ image, alt = '', label, title, subtitle, to }) => {
    const body = (
        <>
            <div className={styles.frame}>
                <img src={image} alt={alt} loading="lazy" />
            </div>
            <div className={styles.caption}>
                <span className={styles.label}>{label}</span>
                {title && <h3 className={styles.cardTitle}>{title}</h3>}
                {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            </div>
        </>
    );

    return to ? (
        <NavLink to={to} className={`${styles.card} ${styles.linked}`}>{body}</NavLink>
    ) : (
        <div className={styles.card}>{body}</div>
    );
};

GalleryCard.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    to: PropTypes.string,
};

export default GalleryCard;
