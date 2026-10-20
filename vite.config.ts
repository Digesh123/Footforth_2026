import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH: '/' for Vercel or a custom domain, '/<repo-name>/' for a GitHub Pages project site.
// SITE_URL: the full public URL of the site, used for canonical and social sharing tags.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.SITE_URL || 'https://footforth.in').replace(/\/+$/, '')

  return {
    base: env.BASE_PATH || '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'footforth-site-url',
        transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
      },
    ],
  }
})
