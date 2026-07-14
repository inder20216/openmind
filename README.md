# Open Mind Services Limited — Website Rebuild

React + Vite rebuild of [openmind.in](https://www.openmind.in), replacing the existing WordPress site.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion for animation
- Build-time prerendering (`scripts/prerender.mjs`) so crawlers and AI answer engines see real static HTML, not an empty SPA shell

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build + prerender
npm run preview  # preview the production build
```

## SEO / AEO

`public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt` cover crawler and AI-answer-engine discoverability. `index.html` carries Open Graph, Twitter card, and JSON-LD Organization structured data.
