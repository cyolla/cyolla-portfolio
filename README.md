# Mission Cyolla

An immersive space-mission portfolio for Cyolla Monthi Menezes built with React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, React Three Fiber, Drei, and EmailJS.

## Features

- Cinematic intro with countdown launch sequence
- Fixed Three.js galaxy scene with stars, sparkles, planets, asteroid field, and spacecraft silhouette
- Solar-system navigation with desktop orbital mode and mobile command bar
- Animated sections for About, Skills, Experience, Projects, Certifications, GitHub, and Contact
- Searchable projects galaxy with modal mission briefs
- GitHub analytics dashboard using live public GitHub API data with graceful fallback content
- Theme toggle, synthesized ambient audio toggle, sound effects toggle, scroll progress bar, custom cursor, and voice narration trigger
- SEO-ready metadata, `robots.txt`, `sitemap.xml`, and JSON-LD

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## EmailJS Setup

Create a `.env` file in the project root and add:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The contact form will show a clear runtime message until these values are supplied.

## Deployment Guide

1. Push the repository to GitHub.
2. Import it into Vercel or Netlify.
3. Add the EmailJS environment variables in the deployment dashboard.
4. Set the production URL in `index.html`, `public/robots.txt`, and `public/sitemap.xml` if it differs from `https://cyolla-portfolio.vercel.app`.
5. Deploy and verify the GitHub API calls and contact flow in production.

## Notes

- The resume download currently points to a text resume in `public/Cyolla-Monthi-Menezes-Resume.txt`.
- Replace that asset with a PDF if you want a branded downloadable resume.
