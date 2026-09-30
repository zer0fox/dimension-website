import { Routes, Route } from 'react-router-dom';
import { Layout, Home, Category, Project, About, Contact, NotFound } from '@template';
import usePageMeta from '@/seo/usePageMeta';

// Routes are fixed for every template; templates only provide the components.
function App() {
  usePageMeta();

  return (
    <Routes>
      {['/', '/en'].map((prefix) => (
        <Route key={prefix} path={prefix} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:categorySlug" element={<Category />} />
        <Route path="projects/:categorySlug/:projectSlug" element={<Project />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  );
}

export default App