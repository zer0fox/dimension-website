import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContentText from './ContentText';
import ContentImage from './ContentImage';

const Content = ({ to, title, text, ...imageProps }) => (
    <div className="content__item">
        <ContentText title={title} text={text} />
        {to ? (
            <NavLink to={to} className="nav__link">
                <ContentImage {...imageProps} />
            </NavLink>
        ) : (
            <ContentImage {...imageProps} />
        )}
    </div>
);

Content.propTypes = {
    to: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.node,
    image: PropTypes.string,
    imageTitle: PropTypes.string,
    imageText: PropTypes.string,
    imageNote: PropTypes.string,
    alt: PropTypes.string,
};

export default Content;