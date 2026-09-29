import PropTypes from 'prop-types';
import NavButton from './NavButton';
import useProjectsMenu from '@/hooks/useProjectsMenu';

const Navigation = ({ className, onNavigate }) => {
    const { open, toggle, categories } = useProjectsMenu();

    return (
        <nav className={className}>
            <NavButton text="Home" to="/" onClick={onNavigate} />
            <NavButton text="Projects" to="/projects" onClick={toggle} />
            <div className={'show-more' + (open ? ' show' : '')}>
                {categories.map((category) => (
                    <NavButton key={category.slug} text={category.name + '\u2590'} to={category.to} onClick={onNavigate} />
                ))}
            </div>
            <NavButton text="About" to="/about" onClick={onNavigate} />
            {/* <NavButton text="Contact" to="/contact" onClick={onNavigate} /> */}
        </nav>
    );
};

Navigation.propTypes = {
    className: PropTypes.string,
    onNavigate: PropTypes.func,
};

export default Navigation;