import React, { Component } from 'react';
import ContentText from './ContentText';
import ContentImage from './ContentImage';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

class Content extends Component {
    static propTypes = {
        href: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        image: PropTypes.string,
        imageTitle: PropTypes.string,
        imageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        alt: PropTypes.string
    };
    static defaultProps = {
        href: ""
    };
    render() {
        let content = null;
        content = [];
        content.push(<ContentText {...this.props} key="content-text" />);
        if (this.props.href !== "") {
            content.push(<NavLink to={"/" + this.props.href} className="nav__link" key="nav-link">
                <ContentImage {...this.props} />
            </NavLink>);
        } else {
            content.push(<ContentImage {...this.props} key="content-image" />);
        }
        return <div className="content__item">
            {content}
        </div>;
    }
}

export default Content;
