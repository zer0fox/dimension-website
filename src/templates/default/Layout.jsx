import { Outlet, useLocation } from 'react-router-dom';
import LanguageSwitch from '@/components/LanguageSwitch';
import Hamburger from './components/Hamburger';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './Layout.module.scss';

const Layout = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/' || pathname === '/en';
    return (
        <>
            <Hamburger />
            {isHome && <div className={styles.homeLanguage}><LanguageSwitch /></div>}
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-3">
                        <Header />
                    </div>
                    <div className="col-md-12 col-lg-9">
                        <main className={styles.content}>
                            <Outlet />
                        </main>
                    </div>
                </div>
                <div className="row d-block d-sm-block d-md-block d-lg-block">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;