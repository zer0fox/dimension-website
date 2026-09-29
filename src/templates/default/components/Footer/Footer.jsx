import PropTypes from 'prop-types';
import { contact, copyright } from '@/content/site';
import styles from './Footer.module.scss';

const Footer = ({ isInHeader = false }) => (
    <div className={isInHeader ? undefined : `col-12 ${styles.footer}`}>
        <div className={`${styles.text} ${styles.social}`}>
            {!isInHeader && <div className={styles.contactTitle}>Contact Details</div>}
            <a href={`mailto:${contact.email}`}>
                <img src="/img/social-mail.svg" alt="Mail" />
            </a>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                <img src="/img/social-instagram.svg" alt="Instagram" />
            </a>
        </div>
        <div className={styles.text}>{copyright}</div>
        <div>M: {contact.phone}</div>
    </div>
);

Footer.propTypes = {
    isInHeader: PropTypes.bool,
};

export default Footer;