import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentImage extends Component {
    static propTypes = {
        image: PropTypes.string,
        imageTitle: PropTypes.string,
        imageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        alt: PropTypes.string
    };
    static defaultProps = {
        image: "",
        imageTitle: "",
        imageText: "",
        alt: ""
    };
    render() {
        if(this.props.image === "") return null;
        return (
            <div>
                <img src={this.props.image} alt={this.props.alt} />
                { this.props.imageTitle === "" && this.props.imageText === "" ? null :
                <div className="content__overlay">
                    <div className="content__overlay-mask"></div>
                    <div className="content__overlay-text">
                        <div>
                            <h2>{this.props.imageTitle}</h2>
                            <p>{this.props.imageText}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default ContentImage;
