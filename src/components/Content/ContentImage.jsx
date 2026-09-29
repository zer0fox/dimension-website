import PropTypes from 'prop-types';

const ContentImage = ({ image, alt = '', imageTitle, imageText, imageNote }) => {
    if (!image) return null;
    const hasOverlay = imageTitle || imageText || imageNote;
    return (
        <div>
            <img src={image} alt={alt} />
            {hasOverlay && (
                <div className="content__overlay">
                    <div className="content__overlay-mask"></div>
                    <div className="content__overlay-text">
                        <div>
                            <h2>{imageTitle}</h2>
                            <p>
                                {imageText}
                                {imageNote && <><br /><span className="small-text">{imageNote}</span></>}
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