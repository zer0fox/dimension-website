import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

class NavButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        className: PropTypes.string
    };
    static defaultProps = {
        onClick: () => { }
    };


    render() {
        return (
            <NavLink to={"/" + this.props.href} className={"nav__link" + (this.props.className ? " " + this.props.className : "")} onClick={this.props.onClick}>{this.props.text}</NavLink>
        );
    }
}
export default NavButton;
