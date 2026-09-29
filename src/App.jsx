import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Home, Category, Project, About, Contact, NotFound } from '@template';

// Routes are fixed for every template; templates only provide the components.
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:categorySlug" element={<Category />} />
          <Route path="projects/:categorySlug/:projectSlug" element={<Project />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App