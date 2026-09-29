import { useRef } from 'react';
import Navigation from '../Navigation';
import styles from './Hamburger.module.scss';

const Hamburger = () => {
    const toggleRef = useRef(null);
    const close = () => {
        toggleRef.current.checked = false;
    };

    return (
        <div className="d-block d-sm-block d-md-block d-lg-none">
            <input ref={toggleRef} type="checkbox" className={styles.checkbox} id="nav-toggle" />
            <label htmlFor="nav-toggle" className={styles.button}>
                <span className={styles.icon}></span>
            </label>
            <div className={styles.background}>&nbsp;</div>
            <Navigation className={styles.nav} onNavigate={close} />
        </div>
    );
};

export default Hamburger;