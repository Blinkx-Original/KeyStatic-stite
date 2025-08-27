# Keystatic Add-on for Astro (Vercel)

These are the minimal files to enable Keystatic inside your Astro project on Vercel.

## 1) Install deps (locally or let Vercel do it)
```bash
npm install
```

## 2) Edit `keystatic.config.ts`
- Replace `OWNER/REPO` with your GitHub repo (e.g., `Blinkx-Original/your-repo`).
- Ensure `BRANCH` is correct (usually `main`).

## 3) Create GitHub OAuth App (if not created yet)
- Homepage URL: `https://<your-vercel-domain>`
- Authorization callback URL: `https://<your-vercel-domain>/keystatic/api/github/callback`

## 4) Add Vercel environment variables
Set these in your Vercel Project → Settings → Environment Variables:
- `PUBLIC_GITHUB_CLIENT_ID` = (GitHub OAuth Client ID)
- `GITHUB_CLIENT_SECRET` = (GitHub OAuth Client Secret)

> `PUBLIC_` prefix makes the client id available to the browser; the secret remains server-only.

## 5) Deploy
Push to GitHub; Vercel will rebuild. Visit:
```
https://<your-vercel-domain>/keystatic
```
You should be prompted to sign in with GitHub and then see the Keystatic UI.

## 6) Content paths
Keystatic will write Markdown/JSON under:
```
src/content/posts/
src/content/products/
src/content/siteSettings/
```
(Directories are created on first save.)

If you want listing/detail pages, add Astro routes that read those folders via `astro:content` later.
