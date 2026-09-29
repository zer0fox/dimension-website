import PropTypes from 'prop-types';
import { contact, copyright } from '@/content/site';
import styles from './Footer.module.css';

const Footer = ({ isInHeader = false }) => (
    <div className={isInHeader ? 'header__bottom' : `col-12 footer ${styles.footer}`}>
        <div className="footer-text footer__social">
            {!isInHeader && <div className={styles.contactTitle}>Contact Details</div>}
            <a href={`mailto:${contact.email}`}>
                <img src="/img/social-mail.svg" alt="Mail" />
            </a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                <img src="/img/social-instagram.svg" alt="Instagram" />
            </a>
        </div>
        <div className={'footer-text' + (isInHeader ? ' header__copyright' : '')}>{copyright}</div>
        <div>M: {contact.phone}</div>
    </div>
);

Footer.propTypes = {
    isInHeader: PropTypes.bool,
};

export default Footer;