import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './HomeHero.module.scss';
import { asset } from '@/data/siteData';
import useLanguage from '@/hooks/useLanguage';

const SLIDE_DURATION = 6000;

// Full-screen intro that stays pinned while the next section scrolls over it.
const HomeHero = ({ title, subtitle, logoAlt, slides, targetId }) => {
    const { text } = useLanguage();
    const heroRef = useRef(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const hero = heroRef.current;
        let frame = 0;
        const update = () => {
            frame = 0;
            const progress = Math.min(window.scrollY / window.innerHeight, 1);
            hero.style.setProperty('--hero-progress', progress.toFixed(3));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    useEffect(() => {
        if (slides.length < 2) return undefined;
        const timer = setInterval(() => setActive((index) => (index + 1) % slides.length), SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [slides.length]);

    const scrollDown = () => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section ref={heroRef} className={styles.hero}>
            <div className={styles.slides}>
                {slides.map((slide, index) => (
                    <img
                        key={slide.src}
                        src={slide.src}
                        alt={index === active ? slide.alt : ''}
                        aria-hidden={index !== active}
                        className={index === active ? `${styles.slide} ${styles.active}` : styles.slide}
                    />
                ))}
            </div>
            <div className={styles.shade} />
            <div className={styles.content}>
                <img className={styles.logo} src={asset('/img/logo.png')} alt={logoAlt} />
                {title && <h1 className={styles.title}>{title}</h1>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            <button type="button" className={styles.scroll} onClick={scrollDown}>
                <span>{text('Κύλιση', 'Scroll')}</span>
            </button>
        </section>
    );
};

HomeHero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    logoAlt: PropTypes.string,
    slides: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string.isRequired, alt: PropTypes.string })).isRequired,
    targetId: PropTypes.string.isRequired,
};

export default HomeHero;
