# RepayWise Day Zero SEO Execution Manual

This is the handoff for the developers and writers so we are SEO-ready by the morning without losing time to framework mismatch or duplicate work.

## Current baseline

- Search Console is verified for `repaywise.co.uk`.
- `https://www.repaywise.co.uk/sitemap.xml` was read successfully on April 28, 2026.
- Google has already discovered `59` pages from the sitemap.
- Search Console has already started showing impressions.

## What is already done

- Canonicals, sitemap, and `robots.txt` point at `https://repaywise.co.uk`.
- Deep calculator routes no longer 404 on Vercel.
- GA4 and PostHog are installed with consent-aware tracking.
- The FCA repossession warning is already mounted globally in `src/App.tsx`.
- Structured data already existed on the homepage, repayment calculator, overpayment calculator, and regional pages.

## Important correction before the team starts

Do **not** follow Vue-oriented `vite-ssg` instructions in this repo.

This is a React app. The React-specific SSG route is `vite-react-ssg`, not `vite-ssg`.

Why this matters:

- `vite-ssg` documentation most people find first is Vue-flavoured and will send the team down the wrong integration path.
- We already use `react-router-dom` and `react-helmet-async`, which fits the `vite-react-ssg` model better.
- The clean migration path here is route objects plus `ViteReactSSG`, not bolting server rendering onto `ReactDOM.createRoot`.

## Technical implementation guide

### 1. Stage the SSG migration safely

Do this in two steps so production is never blocked by one refactor.

1. Add the package:

```bash
npm install -D vite-react-ssg
```

2. Add a parallel build script first:

```json
{
  "scripts": {
    "build": "vite build",
    "build:ssg": "vite-react-ssg build"
  }
}
```

3. Only replace `build` with `vite-react-ssg build` after the SSG build is green and QA has passed.

This avoids the team breaking the main deployment pipeline while the router is being converted.

### 2. Refactor routing from `BrowserRouter` JSX routes to SSG-friendly route objects

Current state:

- `src/main.tsx` uses `createRoot`
- `src/App.tsx` mounts `BrowserRouter` and inline `<Routes>`

Target state:

- `src/main.tsx` should export `createRoot = ViteReactSSG(...)`
- route definitions should live in a route-object array
- shared providers and layout should wrap the route tree once

Recommended shape:

- Create a root layout component that holds:
  - `QueryClientProvider`
  - `HelmetProvider`
  - theme/tooltip/toaster providers
  - analytics route tracker
  - `FCABanner`
  - `<Outlet />`
- Export `routes` from `src/App.tsx` or a dedicated `src/routes.tsx`
- Use `lazy` route imports for calculator pages and regional pages

### 3. Pre-render every known static route

Pre-render these pages on Day Zero:

- `/`
- `/calculators/repayment`
- `/calculators/stamp-duty`
- `/calculators/overpayment`
- `/calculators/affordability`
- `/calculators/max-borrowing`
- `/calculators/equity`
- `/calculators/buy-to-let`
- `/privacy-policy`
- `/terms-of-service`
- `/cookie-policy`

### 4. Pre-render city routes with `getStaticPaths`

We already have a finite city dataset in `src/lib/uk/cities.ts`.

That means `/uk/:slug` is SSG-ready today.

Use `getStaticPaths` for:

- `/uk/london`
- `/uk/manchester`
- `/uk/edinburgh`
- `/uk/cardiff`

If more city pages are added to `cities.ts`, they should automatically be included in the static path list.

### 5. Do not build lender routes yet

The original brief suggested:

- dynamic lender sitemap entries from Supabase
- `/calculators/overpayment/[lender]`

That is **not ready in the current repo**.

Current Supabase state:

- there is a `leads` table migration
- there is no lender table or lender route dataset in the repository

So the correct Day Zero instruction is:

- do **not** spend time wiring lender SSG today
- first define the lender schema and content source
- then add dynamic route generation and sitemap expansion in the next phase

### 6. Dynamic sitemap generation: split today vs next

Day Zero:

- keep the static sitemap working
- ensure every live calculator and city route is listed

Next phase:

- add a build-time sitemap script that fetches lender slugs from Supabase
- append lender URLs only after the lender dataset exists

### 7. Server-side compatibility checks

For SSG, focus on anything that tries to use browser-only globals during render.

Check for:

- `window`
- `document`
- `localStorage`
- browser-only fetch assumptions

Good news:

- most mortgage math here is already in pure utility functions under `src/lib/finance`
- calculator pages use default state values plus `useMemo`, which is compatible with static rendering for the initial HTML

The main caution is interactive or analytics code, not the mortgage formulas themselves.

### 8. Build verification checklist

After the SSG refactor:

1. Run:

```bash
npm run build:ssg
```

2. Open built HTML files and confirm they contain real page copy, not an empty shell.

Minimum checks:

- `dist/calculators/overpayment/index.html` contains `Overpayment Visualiser`
- `dist/calculators/stamp-duty/index.html` contains `UK Stamp Duty Calculator`
- `dist/calculators/repayment/index.html` contains `Mortgage Repayment Calculator`
- `dist/uk/london/index.html` contains `London`

3. Confirm canonical tags and JSON-LD appear in the built HTML.

4. Smoke test production after deployment:

- homepage
- one calculator route
- one city route
- sitemap
- `robots.txt`

## Same-day SEO fixes already landed

These are the immediate wins already addressed or ready to ship:

- completed structured data coverage across the remaining calculator pages
- fixed the incorrect canonical path on the max-borrowing page
- confirmed the FCA warning is already global, so no extra engineering time is needed there

## Writer content briefs

Writers should produce these three articles first. The goal is topical authority, AdSense readiness, and strong internal linking into the calculator stack.

### Article 1: The 2026 SVR Cliff Strategy

- Primary keyword: `mortgage fixed rate ending 2026`
- Secondary keyword: `standard variable rate survival`
- Goal: catch remortgage-intent traffic before borrowers roll onto SVR

Outline:

1. The problem: borrowers moving from low fixed rates to materially higher SVR rates
2. The math: illustrate payment shock on a realistic mortgage balance
3. The decision window: explain when to review options before a fix ends
4. The action plan: product transfer vs remortgage vs temporary overpayment strategy
5. RepayWise embed: link to and embed the repayment calculator mid-article

Internal links:

- `/calculators/repayment`
- `/calculators/overpayment`
- relevant city pages where helpful

### Article 2: ISA vs Mortgage Overpayment (2026)

- Primary keyword: `overpay mortgage or ISA 2026`
- Secondary keyword: `best savings for homeowners`
- Goal: win high-intent comparison traffic

Outline:

1. The logic: compare mortgage rate vs savings rate
2. The tax angle: why mortgage overpayment is a tax-free return equivalent
3. The liquidity trade-off: emergency cash vs balance-sheet optimisation
4. A practical framework: when to favour ISA, when to favour overpayments, when to split
5. RepayWise embed: link to and embed the overpayment calculator

Internal links:

- `/calculators/overpayment`
- `/calculators/equity`

### Article 3: First-Time Buyer Stamp Duty Guide (Post-2025)

- Primary keyword: `stamp duty thresholds 2026`
- Secondary keyword: `FTB relief UK`
- Goal: win first-time buyer informational traffic with strong calculator conversion

Outline:

1. What changed after April 1, 2025
2. How first-time buyer relief works by region
3. How stamp duty affects deposit planning and total cash needed
4. Negotiation angles with sellers and developers
5. RepayWise embed: link to and embed the stamp duty calculator

Internal links:

- `/calculators/stamp-duty`
- `/calculators/affordability`
- `/calculators/max-borrowing`

## Day Zero checklist

### Critical

- Add `vite-react-ssg`
- Create a working `build:ssg` path
- Convert router to route objects
- Pre-render all calculator pages and city pages
- Verify built HTML contains real content

### High

- Keep the global FCA warning in place
- Ensure every calculator page has JSON-LD
- Verify canonical tags are unique per route

### Medium

- Keep the static sitemap complete
- Prepare the lender data model before attempting lender routes
- Draft internal linking rules for the new articles

## CEO summary

RepayWise is no longer at the “invisible app” stage. Search Console is verified, the sitemap is live, Google has already discovered pages, and impressions have started. The next step is not guessing at SEO tricks; it is completing a React-appropriate SSG migration so the built HTML for each calculator and city guide is crawlable before hydration. Once that is done, the content plan will have a solid technical foundation instead of pointing traffic at a thin client-rendered shell.
