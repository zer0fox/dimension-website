import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Hamburger from './components/Hamburger';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Project from './Pages/Project';
import About from './Pages/About';
import Contact from './Pages/Contact';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <Router>
      <Hamburger />
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3">
            <Header />
          </div>
          <div className="col-md-12 col-lg-9">
            <div className="content content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:categorySlug" element={<Category />} />
                <Route path="/projects/:categorySlug/:projectSlug" element={<Project />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
        </div>
        <div className="row d-block d-sm-block d-md-block d-lg-block">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App