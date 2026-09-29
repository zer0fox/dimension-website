import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { normalizePath } from './seo/meta'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered HTML is only reused when it was rendered for this exact URL (e.g. not for the 404 fallback).
const prerenderedPath = container.dataset.path
if (prerenderedPath && normalizePath(prerenderedPath) === normalizePath(window.location.pathname)) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}