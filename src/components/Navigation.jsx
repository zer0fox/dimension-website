import { useState } from 'react';
import PropTypes from 'prop-types';
import NavButton from './NavButton';
import { categories, categoryPath } from '../data/siteData';

const Navigation = ({ className, onNavigate }) => {
    const [showProjects, setShowProjects] = useState(false);

    const toggleProjects = (event) => {
        event.preventDefault();
        setShowProjects((show) => !show);
    };

    return (
        <nav className={className}>
            <NavButton text="Home" to="/" onClick={onNavigate} />
            <NavButton text="Projects" to="/projects" onClick={toggleProjects} />
            <div className={'show-more' + (showProjects ? ' show' : '')}>
                {categories.map((category) => (
                    <NavButton
                        key={category.slug}
                        text={category.name + '\u2590'}
                        to={categoryPath(category)}
                        onClick={onNavigate}
                    />
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