import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Page from './Layout/Page';
import Hamburger from './components/Hamburger';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
            <Routes>
              <Route path="/" element={<Page name="home" />} />
              <Route path="/projects/*" element={<Page name="projects" />} />
              <Route path="/about" element={<Page name="about" />} />
              <Route path="/contact" element={<Page name="contact" />} />
              <Route path="*" element={<Page name="404" />} />
            </Routes>
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
