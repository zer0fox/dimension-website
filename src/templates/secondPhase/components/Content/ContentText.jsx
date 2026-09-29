import PropTypes from 'prop-types';

const ContentText = ({ title, text }) => {
    if (!title && !text) return null;
    return (
        <div className="content__text">
            {title && <h2>{title}</h2>}
            {text && <p>{text}</p>}
        </div>
    );
};

ContentText.propTypes = {
    title: PropTypes.string,
    text: PropTypes.node,
};

export default ContentText;