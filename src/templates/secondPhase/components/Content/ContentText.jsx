import PropTypes from 'prop-types';
import styles from './Content.module.scss';

const ContentText = ({ title, text }) => {
    if (!title && !text) return null;
    return (
        <div className={styles.text}>
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