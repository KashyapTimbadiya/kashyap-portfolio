# Kashyap Timbadiya — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.

## Setup
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Content
- All resume content lives in `lib/data.ts`; contact/social info in `lib/site.ts`.
- Resume PDF: `public/resume.pdf`.
- Project screenshots: drop files into `public/projects/` named after the project slug (e.g. `axis-jeweltech.png`).
- Live links: set `liveUrl` on a project in `lib/data.ts` (omit for private). Screenshots in `public/projects/` were captured from the live sites.

## Deploy (Vercel)
Import the repo on Vercel — zero config. Optionally set `NEXT_PUBLIC_SITE_URL` to your custom domain for sitemap/OG URLs.
