import { Outlet } from 'react-router-dom';
import Hamburger from './components/Hamburger';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => (
    <>
        <Hamburger />
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-3">
                    <Header />
                </div>
                <div className="col-md-12 col-lg-9">
                    <div className="content content-container">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="row d-block d-sm-block d-md-block d-lg-block">
                <Footer />
            </div>
        </div>
    </>
);

export default Layout;