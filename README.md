# Footforth Solutions website

The public marketing website for Footforth Solutions, a managed digital infrastructure service for small businesses.

It is a static single-page site built with React, TypeScript, Vite and Tailwind CSS. It has no backend, database or paid services, and deploys to Vercel or GitHub Pages.

## Local development

Requires Node.js 20.19 or newer (22 LTS recommended).

```bash
npm install
npm run dev       # start a local dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the production build locally
npm run lint
```

## Where things live

| Path | What it contains |
| --- | --- |
| `src/config/site.ts` | Business details: email, phone, location, social links, optional indicative price, navigation |
| `src/sections/` | One component per page section, in page order in `src/App.tsx` |
| `src/components/` | Shared UI: buttons, section headings, status pills, logo, social icons |
| `src/index.css` | Design tokens (colours, font) and a few shared utilities |
| `public/` | Favicon and social sharing image (`og-image.png`) |

### Editing business details

All contact details are in `src/config/site.ts`. The domain (`footforth.in`) and email (`support@footforth.in`) are confirmed. The phone number (`+91 96190 40970`), Mumbai location and LinkedIn and Instagram links were taken from the previous Footforth website. Check they are still current before launch.

To show an indicative starting price in the pricing section, set `indicativePrice`, for example:

```ts
indicativePrice: { amount: '₹X,XXX', period: 'per month' },
```

It is labelled as indicative on the page. Leave it as `null` to hide it.

## Contact form

The enquiry form works in one of two ways:

1. **Default (no setup):** submitting opens the visitor's email app with a message to `support@footforth.in`, filled in from the form. The page tells the visitor this before and after they submit. It needs no backend, but it relies on the visitor having an email app configured.
2. **Form service (recommended for launch):** set the environment variable `VITE_FORM_ENDPOINT` to a form endpoint that accepts a JSON `POST`, such as [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com) or Getform. The form then posts directly and shows a confirmation, or a clear error with the email address as a fallback.

   Fields sent: `enquiry` (audit, quote or general question), `name`, `business`, `email`, `website`, `message` and `_subject`.

   - **Vercel:** Project → Settings → Environment Variables → add `VITE_FORM_ENDPOINT`, then redeploy.
   - **GitHub Pages:** Repository → Settings → Secrets and variables → Actions → **Variables** → add `VITE_FORM_ENDPOINT`. The workflow reads it at build time.

   Some services (Web3Forms, for example) require an access key in the request body. If you choose one of those, add the key to the `fetch` body in `src/sections/Contact.tsx`.

The form asks visitors not to include passwords or login details, and it does not collect any.

## Deploying

### Vercel (recommended)

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. Vercel detects Vite automatically; `vercel.json` sets the build command (`npm run build`) and output directory (`dist`).
3. Optionally set environment variables:
   - `SITE_URL`: the public URL, for example `https://footforth.in`. It is used for canonical and social sharing tags and defaults to `https://footforth.in`.
   - `VITE_FORM_ENDPOINT`: see above.
4. Deploy. Every push to `main` redeploys.

**Custom domain:** Project → Settings → Domains → add your domain and follow the DNS instructions. Vercel issues the HTTPS certificate automatically.

### GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes the site on every push to `main`.

1. Repository → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Push to `main`, or run the workflow manually from the Actions tab.

The workflow takes the correct base path from GitHub. It uses `/<repository-name>/` for a project site, and `/` once a custom domain is set, so asset URLs work either way.

**Custom domain:** Settings → Pages → Custom domain. Add the DNS records GitHub shows you, then tick **Enforce HTTPS** once the certificate is issued.

### Building for a subpath manually

```bash
BASE_PATH=/Footforth_2026/ SITE_URL=https://<user>.github.io/Footforth_2026 npm run build
```

## Before launch

- [ ] Confirm the phone number and social links in `src/config/site.ts`.
- [ ] Set `VITE_FORM_ENDPOINT`, or accept the email-app fallback.
- [ ] Set `SITE_URL` if the site will not live at `https://footforth.in`.
- [ ] Decide whether to show an indicative price.
- [ ] Add a privacy policy page if you start collecting enquiries through a third-party form service. No privacy page is linked at present because none exists.
- [ ] Confirm your support hours. The FAQ says support is provided during working hours confirmed in each service agreement, and that 24/7 emergency response is not offered.
