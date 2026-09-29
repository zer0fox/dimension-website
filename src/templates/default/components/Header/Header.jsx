import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import styles from './Header.module.scss';

const Header = () => (
    <header className={styles.header}>
        <div className={styles.logo}>
            <NavLink to="/">
                <img src="/img/logo.png" alt="Logo" />
            </NavLink>
        </div>
        <div className="d-none d-sm-none d-md-none d-lg-block">
            <Navigation />
            <Footer isInHeader />
        </div>
    </header>
);

export default Header;