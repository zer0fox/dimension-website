import PropTypes from 'prop-types';
import useSite from '@/hooks/useSite';
import styles from './Footer.module.css';

const Footer = ({ isInHeader = false }) => {
    const site = useSite();

    return (
        <div className={isInHeader ? 'header__bottom' : `col-12 footer ${styles.footer}`}>
            <div className="footer-text footer__social">
                {!isInHeader && <div className={styles.contactTitle}>Contact Details</div>}
                <a href={`mailto:${site.email}`}>
                    <img src="/img/social-mail.svg" alt="Mail" />
                </a>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    <img src="/img/social-instagram.svg" alt="Instagram" />
                </a>
            </div>
            <div className={'footer-text' + (isInHeader ? ' header__copyright' : '')}>{site.copyright}</div>
            <div>M: {site.phone}</div>
        </div>
    );
};

Footer.propTypes = {
    isInHeader: PropTypes.bool,
};

export default Footer;