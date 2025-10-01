import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentText extends Component {
    static propTypes = {
        title: PropTypes.string,
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    };
    static defaultProps = {
        title: "",
        text: ""
    };
    render() {
        if(this.props.title === "" && this.props.text === "" ) return null;
        return (
            <div className="content__text">
                {this.props.title ? <h2>{this.props.title}</h2> : null}
                {this.props.text ? <p>{this.props.text}</p> : null}
            </div>
        );
    }
}

export default ContentText;
