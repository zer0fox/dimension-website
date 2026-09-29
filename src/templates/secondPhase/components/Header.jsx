import { NavLink } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Header = () => (
    <div className="header">
        <div className="header__logo">
            <NavLink to="/" className="nav__link">
                <img src="/img/logo.png" alt="Logo" />
            </NavLink>
        </div>
        <div className="d-none d-sm-none d-md-none d-lg-block">
            <Navigation />
            <Footer isInHeader />
        </div>
    </div>
);

export default Header;