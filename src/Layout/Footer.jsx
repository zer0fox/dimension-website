
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';

class Footer extends Component {
    static propTypes = {
        isInHeader: PropTypes.bool
    };

    static defaultProps = {
        isInHeader: false
    };

    render() {
        return (
            <div className={this.props.isInHeader ? "header__bottom" : `col-12 footer ${styles.footer}`}>
                <div className="footer-text footer__social">
                    {!this.props.isInHeader && <div className={styles.contactTitle}>Contact Details</div>}
                    <a href="mailto:dimitra.gogi@gmail.com">
                        <img src="/img/social-mail.svg" alt="Mail" />
                    </a>
                    <a href="https://www.instagram.com/dim_ension/" target="_blank" rel="noopener noreferrer">
                        <img src="/img/social-instagram.svg" alt="Instagram" />
                    </a>
                </div>
                <div className={"footer-text" + (this.props.isInHeader ? " header__copyright" : "")}>Dimitra Gogi @ 2025</div>
                <div>
                    M: (+30) 697 7070 170
                </div>
            </div>
        );
    }
}

export default Footer;