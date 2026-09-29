import PropTypes from 'prop-types';
import GalleryCard from './GalleryCard';
import styles from './Gallery.module.scss';

const Gallery = ({ id, title, filters, active, onFilter, items }) => (
    <section id={id} className={styles.gallery}>
        <div className={styles.head}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.filters} role="group" aria-label="Filter the gallery">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        type="button"
                        className={filter.id === active ? `${styles.filter} ${styles.selected}` : styles.filter}
                        aria-pressed={filter.id === active}
                        onClick={() => onFilter(filter.id)}
                    >
                        {filter.name}
                    </button>
                ))}
            </div>
        </div>
        {/* Keyed by filter so the cards replay their entrance animation. */}
        <div key={active} className={styles.grid}>
            {items.map((item) => (
                <GalleryCard key={item.key} {...item} />
            ))}
        </div>
    </section>
);

Gallery.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
    active: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
