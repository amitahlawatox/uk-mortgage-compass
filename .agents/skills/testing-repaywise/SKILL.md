# Testing RepayWise (uk-mortgage-compass)

## Local Dev Server

```bash
cd /home/ubuntu/uk-mortgage-compass
npm install
npm run dev
# Default port 8080, will auto-increment if occupied (8081, 8082, etc.)
```

The dev server runs on Vite. The build uses `vite-react-ssg` for static site generation.

## Build & Lint

```bash
npm run build    # SSG build — generates all 217 static pages
npx tsc --noEmit # TypeScript type checking
```

No separate lint command configured. TypeScript checking is the primary code quality gate.

## Vercel Preview Deployments

Vercel previews may return 401 (authentication required) for branches. If the preview is inaccessible, test against the local dev server instead. Production site is at `https://repaywise.co.uk`.

## Key Testing Areas

### Font Loading
- The site uses Google Fonts (Inter) with a non-render-blocking loading pattern
- Verify via browser console: `getComputedStyle(document.querySelector('h1')).fontFamily` should include "Inter"
- Check `document.fonts` API for loaded status of Inter weights 400-700
- The `media="print"` attribute on the font stylesheet should swap to `media="all"` after load via the `onload` handler

### Calculator Regression
- Navigate to `/calculators/repayment`
- Default values: £312,500 property, 20% deposit (£62,500), 25yr term, 4.5% rate
- Expected monthly payment: £1,389.58
- Verify with amortisation formula: P * r * (1+r)^n / ((1+r)^n - 1)
- **Constraint:** Never modify the financial calculation logic

### Page Rendering
- `/about` — Company info, values, tool directory, FCA disclaimer
- `/contact` — 3 email channels, FAQ section
- `/calculators/repayment/:slug` — Lender-specific pages with unique descriptions
- Check footer for About/Contact links
- Check FAQ JSON-LD on `/calculators/repayment` (non-lender version only)

### Structured Data
- FinancialProduct + FAQPage JSON-LD on `/calculators/repayment`
- Verify via browser console: `JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)`
- FAQPage should NOT appear on lender sub-pages (`/calculators/repayment/:slug`)

## Lighthouse Audits

Lighthouse cannot launch its own Chrome when one is already running. Use the existing Chrome's CDP port:

```bash
npx lighthouse https://repaywise.co.uk --output=json --output=html --output-path=/home/ubuntu/lighthouse-report --port=29229
```

Alternatively, run with `--chrome-flags="--headless=new --no-sandbox"` but this may conflict with the running browser.

## GA4 & Search Console Access

GA4 and Google Search Console can be accessed via the browser by logging in to Google with the project's Google account.

- GA4 property: `www.repaywise.co.uk` under `uknetpay` account
- Measurement ID: `G-082C2XNJDW`
- Search Console property: `sc-domain:repaywise.co.uk`
- Analytics has consent mode enabled — data only flows when users click "Accept analytics"

## Devin Secrets Needed

- `GOOGLE_ANALYTICS_EMAIL` — Google account email for GA4/GSC access
- `GOOGLE_ANALYTICS_PASSWORD` — Google account password for GA4/GSC access

## Common Issues

- **Port conflicts:** Dev server auto-increments port if 8080 is busy. Check terminal output for actual port.
- **Vercel preview 401:** Use local dev server as fallback for testing.
- **GA4 "no data":** Expected for new installations or when consent mode blocks analytics. Not a bug.
- **Browserslist warning during build:** Cosmetic only, does not affect build output.
