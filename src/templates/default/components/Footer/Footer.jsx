import PropTypes from 'prop-types';
import useSite from '@/hooks/useSite';
import useLanguage from '@/hooks/useLanguage';
import styles from './Footer.module.scss';
import { asset } from '@/data/siteData';

const Footer = ({ isInHeader = false }) => {
    const site = useSite();
    const { text } = useLanguage();

    return (
        <div className={isInHeader ? undefined : `col-12 ${styles.footer}`}>
            <div className={`${styles.text} ${styles.social}`}>
                {!isInHeader && <div className={styles.contactTitle}>{text('Στοιχεία επικοινωνίας', 'Contact Details')}</div>}
                <a href={`mailto:${site.email}`}>
                    <img src={asset('/img/social-mail.svg')} alt={text('Email', 'Mail')} />
                </a>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <img src={asset('/img/social-instagram.svg')} alt="Instagram" />
                </a>
            </div>
            <div className={styles.text}>{site.copyright}</div>
            <div>M: {site.phone}</div>
        </div>
    );
};

Footer.propTypes = {
    isInHeader: PropTypes.bool,
};

export default Footer;