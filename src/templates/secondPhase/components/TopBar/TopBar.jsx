import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import useProjectsMenu from '@/hooks/useProjectsMenu';
import styles from './TopBar.module.scss';
import { asset } from '@/data/siteData';

// Home-page navigation: transparent over the hero, solid once the hero is scrolled away.
const TopBar = ({ solid }) => {
    const { categories } = useProjectsMenu();

    return (
        <header className={solid ? `${styles.bar} ${styles.solid}` : styles.bar}>
            <NavLink to="/" className={styles.logo} tabIndex={solid ? undefined : -1}>
                <img src={asset('/img/logo.png')} alt="Logo" />
            </NavLink>
            <nav className={`${styles.nav} d-none d-lg-flex`}>
                <div className={styles.dropdown}>
                    <button type="button" className={styles.link} aria-haspopup="true">Projects</button>
                    <div className={styles.menu}>
                        {categories.map((category) => (
                            <NavLink key={category.slug} to={category.to}>{category.name}</NavLink>
                        ))}
                    </div>
                </div>
                <NavLink to="/about" className={styles.link}>About</NavLink>
                <NavLink to="/contact" className={styles.link}>Contact</NavLink>
            </nav>
        </header>
    );
};

TopBar.propTypes = {
    solid: PropTypes.bool,
};

export default TopBar;
