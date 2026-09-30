import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useLanguage from '@/hooks/useLanguage';
import styles from './LanguageSwitch.module.scss';

export default function LanguageSwitch({ className, onNavigate }) {
    const { pathname } = useLocation();
    const { language, switchPath } = useLanguage();
    return (
        <div className={`${styles.switcher} ${className ?? ''}`} aria-label="Language">
            <NavLink to={language === 'el' ? pathname : switchPath} aria-label="Ελληνικά" aria-current={language === 'el' ? 'true' : undefined} onClick={onNavigate}>ΕΛ</NavLink>
            <span aria-hidden="true">/</span>
            <NavLink to={language === 'en' ? pathname : switchPath} aria-label="English" aria-current={language === 'en' ? 'true' : undefined} onClick={onNavigate}>EN</NavLink>
        </div>
    );
}

LanguageSwitch.propTypes = { className: PropTypes.string, onNavigate: PropTypes.func };