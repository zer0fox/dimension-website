import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';

// Every template must export exactly these components.
export { default as Layout } from './Layout';
export { default as Home } from './pages/Home';
export { default as Category } from './pages/Category';
export { default as Project } from './pages/Project';
export { default as About } from './pages/About';
export { default as Contact } from './pages/Contact';
export { default as NotFound } from './pages/NotFound';