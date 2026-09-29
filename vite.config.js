import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import siteData from './db/vite-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  // Deploy folder, e.g. /dimension-website/ for GitHub Pages; set by the workflow.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), siteData()],
})