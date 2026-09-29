import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Hamburger from './components/Hamburger';
import Header from './components/Header';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import styles from './Layout.module.scss';

const Layout = () => {
    const isHome = useLocation().pathname === '/';
    const [heroPassed, setHeroPassed] = useState(false);

    useEffect(() => {
        if (!isHome) return undefined;
        const onScroll = () => setHeroPassed(window.scrollY > window.innerHeight * 0.85);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [isHome]);

    // Home is full-width (hero + gallery) with a top bar; other pages keep the sidebar layout.
    if (isHome) {
        return (
            <>
                <Hamburger />
                <TopBar solid={heroPassed} />
                <main>
                    <Outlet />
                </main>
                <div className={styles.homeFooter}>
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Hamburger />
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
