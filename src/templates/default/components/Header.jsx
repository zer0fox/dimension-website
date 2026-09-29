import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Footer from './Footer';
import { NavLink } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header__logo">
                    <NavLink to="/" className="nav__link">
                        <img src="/img/logo.png" alt="Logo" />
                    </NavLink>
                </div>
                <div className="d-none d-sm-none d-md-none d-lg-block">
                    <Navigation />
                    <Footer isInHeader={true} />
                </div>
            </div>
        );
    }
}

export default Header;