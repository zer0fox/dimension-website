import PropTypes from 'prop-types';
import styles from './Content.module.scss';

const ContentImage = ({ image, alt = '', imageTitle, imageText, imageNote }) => {
    if (!image) return null;
    const hasOverlay = imageTitle || imageText || imageNote;
    return (
        <div>
            <img src={image} alt={alt} />
            {hasOverlay && (
                <div className={styles.overlay}>
                    <div className={styles.overlayMask}></div>
                    <div className={styles.overlayText}>
                        <div>
                            <h2>{imageTitle}</h2>
                            <p>
                                {imageText}
                                {imageNote && <><br /><span className={styles.smallText}>{imageNote}</span></>}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ContentImage.propTypes = {
    image: PropTypes.string,
    alt: PropTypes.string,
    imageTitle: PropTypes.string,
    imageText: PropTypes.string,
    imageNote: PropTypes.string,
};

export default ContentImage;