import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavButton = ({ text, to, onClick }) => (
    <NavLink to={to} onClick={onClick}>{text}</NavLink>
);

NavButton.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default NavButton;