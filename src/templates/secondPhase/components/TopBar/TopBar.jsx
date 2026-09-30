import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import useProjectsMenu from '@/hooks/useProjectsMenu';
import styles from './TopBar.module.scss';
import { asset } from '@/data/siteData';
import useLanguage from '@/hooks/useLanguage';
import LanguageSwitch from '@/components/LanguageSwitch';

// Home-page navigation: transparent over the hero, solid once the hero is scrolled away.
const TopBar = ({ solid }) => {
    const { categories } = useProjectsMenu();
    const { path, text } = useLanguage();

    return (
        <header className={solid ? `${styles.bar} ${styles.solid}` : styles.bar}>
            <NavLink to={path('/')} className={styles.logo} tabIndex={solid ? undefined : -1}>
                <img src={asset('/img/logo.png')} alt="Logo" />
            </NavLink>
            <nav className={`${styles.nav} d-none d-lg-flex`}>
                <div className={styles.dropdown}>
                    <button type="button" className={styles.link} aria-haspopup="true">{text('Έργα', 'Projects')}</button>
                    <div className={styles.menu}>
                        {categories.map((category) => (
                            <NavLink key={category.slug} to={category.to}>{category.name}</NavLink>
                        ))}
                    </div>
                </div>
                <NavLink to={path('/about')} className={styles.link}>{text('Σχετικά', 'About')}</NavLink>
                <NavLink to={path('/contact')} className={styles.link}>{text('Επικοινωνία', 'Contact')}</NavLink>
            </nav>
            <LanguageSwitch className={styles.language} />
        </header>
    );
};

TopBar.propTypes = {
    solid: PropTypes.bool,
};

export default TopBar;
