# SEO deliverables — ai-resume-screener-fronted

Your app is a client-rendered Vite + React SPA (no SSR), deployed at
`https://ai-resume-screener-fronted-three.vercel.app`. The backend
(`ai-resume-screener`) is a pure REST API with no crawlable pages, so no
SEO changes were needed there.

## What's in this folder — drop each file into the matching path in the repo

| File | Destination |
|---|---|
| `index.html` | `/index.html` (repo root) |
| `robots.txt` | `/public/robots.txt` |
| `sitemap.xml` | `/public/sitemap.xml` |
| `site.webmanifest` | `/public/site.webmanifest` |
| `Seo.tsx` | `/src/components/common/Seo.tsx` (new file) |
| `Index.tsx` | `/src/pages/Index.tsx` |
| `Login.tsx` | `/src/pages/auth/Login.tsx` |
| `Register.tsx` | `/src/pages/auth/Register.tsx` |
| `ForgotPassword.tsx` | `/src/pages/auth/ForgotPassword.tsx` |
| `ResetPassword.tsx` | `/src/pages/auth/ResetPassword.tsx` |
| `NotFound.tsx` | `/src/pages/NotFound.tsx` |

All of this was applied to a clone of your repo and verified with `tsc -b` —
it compiles clean.

## What changed

**`index.html`** — real `<title>`, meta description, keywords, canonical URL,
robots directive, favicon/apple-touch-icon/manifest links, full Open Graph +
Twitter Card tags, and a `WebApplication` JSON-LD block. This is the static
fallback that social-media link scrapers and any bot that doesn't execute JS
will see.

**`Seo.tsx`** (new) — a tiny reusable component you drop at the top of any
page. It updates `document.title`, meta description, canonical link, and
OG/Twitter tags on route change (since this is a client-rendered SPA, this
is what makes each route distinct in the address bar / when Googlebot
renders it — see caveat below). Pass `noindex` for pages that should never
be indexed.

```tsx
<Seo
  title="Log In"
  description="Log in to your AI Resume Screener account..."
  path="/login"
/>
```

**Public pages wired up:** `/` (Index), `/login`, `/register`,
`/forgot-password`, `/reset-password`, and `NotFound` (marked `noindex`).

**`robots.txt`** — allows the public/auth pages, disallows the gated app
areas (`/dashboard`, `/jobs`, `/resume`, `/profile`, `/education`,
`/applications`, `/admin`) since they redirect unauthenticated users anyway
and add no SEO value, and points at the sitemap.

**`sitemap.xml`** — only the actually-public, indexable routes. Nothing
behind `RoleRoute` is included, since Google can't get past the redirect
regardless.

## Still on you (things I can't generate)

1. **`og-image.png`** — I referenced `/og-image.png` (1200×630) in
   `index.html` and `Seo.tsx` for social share previews, but you need to
   design/export the actual image and drop it in `/public`. Until it
   exists, social previews will show a broken image.
2. **Verify the canonical domain** — I used
   `https://ai-resume-screener-fronted-three.vercel.app` from your README.
   If you later move to a custom domain, update it in `index.html`,
   `Seo.tsx` (`SITE_URL` constant), `robots.txt`, and `sitemap.xml`.
3. **Google Search Console** — submit `sitemap.xml` there once deployed.

## Important caveat: SPA + noindex on gated routes

Marking `/dashboard`, `/admin`, etc. `noindex` in a page component only
helps if a crawler actually executes your JS and reaches that render (rare
for anything but Googlebot, and even then it's unreliable since
unauthenticated visits hit your `RoleRoute` redirect before that page ever
renders). `robots.txt` `Disallow` is the primary defense here — the
in-component `noindex` is just defense-in-depth for cases where a page
briefly renders before a redirect fires.

If you ever want jobs (`/jobs`) to be genuinely indexable for SEO (a common
ask — "let people find your job board via Google"), that requires making
job listings public (no `RoleRoute` gate) and ideally moving to SSR/SSG
(Next.js, or Vite SSR) since search engines and social scrapers don't
reliably execute client-side JS for meta tags. Happy to help with that if
it's a goal — just say the word.
