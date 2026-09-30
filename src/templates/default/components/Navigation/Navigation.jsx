import PropTypes from 'prop-types';
import NavButton from './NavButton';
import useProjectsMenu from '@/hooks/useProjectsMenu';
import styles from './Navigation.module.scss';
import LanguageSwitch from '@/components/LanguageSwitch';
import useLanguage from '@/hooks/useLanguage';

const Navigation = ({ className, onNavigate }) => {
    const { open, toggle, categories } = useProjectsMenu();
    const { path, text } = useLanguage();

    return (
        <nav className={className}>
            <NavButton text={text('Αρχική', 'Home')} to={path('/')} onClick={onNavigate} />
            <NavButton text={text('Έργα', 'Projects')} to={path('/projects')} onClick={toggle} />
            <div className={open ? `${styles.showMore} ${styles.open}` : styles.showMore}>
                {categories.map((category) => (
                    <NavButton key={category.slug} text={category.name + '\u2590'} to={category.to} onClick={onNavigate} />
                ))}
            </div>
            <NavButton text={text('Σχετικά', 'About')} to={path('/about')} onClick={onNavigate} />
            <NavButton text={text('Επικοινωνία', 'Contact')} to={path('/contact')} onClick={onNavigate} />
            <LanguageSwitch className={styles.language} onNavigate={onNavigate} />
        </nav>
    );
};

Navigation.propTypes = {
    className: PropTypes.string,
    onNavigate: PropTypes.func,
};

export default Navigation;