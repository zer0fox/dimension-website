import { useRef } from 'react';
import Navigation from './Navigation';

const Hamburger = () => {
    const toggleRef = useRef(null);
    const close = () => {
        toggleRef.current.checked = false;
    };

    return (
        <div className="navigation d-block d-sm-block d-md-block d-lg-none">
            <input ref={toggleRef} type="checkbox" className="navigation__checkbox" id="nav-toggle" />
            <label htmlFor="nav-toggle" className="navigation__button">
                <span className="navigation__icon"></span>
            </label>
            <div className="navigation__background">&nbsp;</div>
            <Navigation className="navigation__nav" onNavigate={close} />
        </div>
    );
};

export default Hamburger;