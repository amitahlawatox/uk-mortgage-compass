# RepayWise Advisor Board Update
Date: April 29, 2026

## Executive Summary

RepayWise has moved from being a mostly client-rendered mortgage calculator site toward a search-ready, prerendered platform built for organic growth.

The current live stack already had strong SEO hygiene at the metadata level, but its architecture was still limiting discovery and mobile performance. The current rollout addresses that core issue by introducing static site generation for high-value routes, improving route-level indexability, and preparing the site for scaled SEO, AdSense, and future programmatic growth.

Before deployment, a full rollback snapshot was created:

- Rollback branch: `snapshot/pre-main-ssg-rollout-2026-04-29`
- Rollback tag: `snapshot/pre-main-ssg-rollout-2026-04-29`

This gives us a clean restore point if we need to revert the rollout quickly.

## Current Website Specs

### Product Scope

RepayWise is currently a UK mortgage intelligence website focused on high-intent consumer journeys:

- Mortgage repayment calculator
- Stamp duty calculator
- Mortgage overpayment visualiser
- Total cost to buy calculator
- Mortgage affordability / max borrowing calculator
- Home equity calculator
- Buy-to-let calculator
- Regional mortgage and stamp duty landing pages
- Guides section for long-form SEO content

### Technical Stack

- Frontend: Vite + React + TypeScript
- Styling: Tailwind CSS
- Routing: React Router
- Data/state: TanStack Query
- Backend/data services: Supabase
- Deployment: Vercel
- Source control: GitHub
- Analytics: GA4 and PostHog
- Search tooling: Google Search Console

### Compliance / Trust Position

- FCA repossession warning present in the initial HTML
- Cookie/analytics consent flow implemented
- Legal pages present for privacy, cookies, and terms
- Calculator schema coverage expanded across the main money pages

## Current Measured Position

### Search Console

As of April 28, 2026:

- Domain verification completed
- Sitemap submission successful
- Google had discovered `59` pages from the sitemap
- Initial search impressions had already started appearing

### Lighthouse

Latest measured live production benchmark before this rollout:

- Mobile performance: `54`
- Desktop performance: `82`
- SEO: `100`
- Best Practices: `100`
- Accessibility: `96`

This confirmed the main gap was not metadata quality, but mobile rendering speed and first-load delivery.

## What This Rollout Changes

The current engineering rollout does the following:

1. Introduces static site generation for the key public routes.
2. Ensures prerendered HTML contains real page content, not just an app shell.
3. Ensures each route ships with its own title, description, canonical URL, Open Graph tags, Twitter tags, and JSON-LD.
4. Updates Vercel routing so prerendered pages are served as clean static URLs instead of being rewritten back into a single-page app shell.
5. Makes the Supabase client safe for prerender/server execution.
6. Adds a `/guides` hub for SEO content expansion.
7. Adds ad-slot placeholders to prepare the layout for future AdSense integration.
8. Reduces unnecessary first-load JavaScript by deferring PDF export libraries until the user actually asks for an export.

## SEO Work Underway

My SEO work is being managed as an operating system, not a one-off task.

### Technical SEO

- Domain property verified in Search Console
- Sitemap submitted and validated
- Canonicals aligned to `https://repaywise.co.uk`
- JSON-LD added or expanded on calculator pages
- Direct-route crawlability fixed for calculators and regional pages
- Static HTML generation introduced for high-value landing pages

### Content SEO

- `/guides` content hub created
- Advisor content briefs translated into an execution-ready roadmap
- Internal linking between calculators, guides, and regional pages being expanded

### Conversion SEO

- GA4 implemented with consent-aware tracking
- CTA intent tracking added to key calculator entry points
- Ad placement zones scaffolded for future monetization

### Weekly SEO Operating Rhythm

Each week the SEO process will cover:

- Search Console query and index coverage review
- Lighthouse and Core Web Vitals review
- Internal linking and metadata improvements
- New content/page opportunity prioritization
- Indexing issue triage
- New experiment backlog for traffic growth and monetization readiness

## Blueprint: Next 30-60 Days

### Phase 1: Stabilize the Search Foundation

- Deploy the prerendered SSG rollout
- Re-measure live Lighthouse after deployment
- Validate live indexability with Search Console URL inspection
- Confirm clean crawl paths for all core calculators

### Phase 2: Improve Mobile Performance Further

- Reduce chart-heavy client bundle cost
- Defer more non-critical UI code
- Review font and image delivery
- Push the mobile performance score toward `80+`

### Phase 3: Build Topical Authority

- Publish the first mortgage guide cluster
- Link guides into calculators and vice versa
- Build out more regional landing pages

### Phase 4: Programmatic Expansion

- Add a proper lender dataset/table
- Generate lender-specific landing pages
- Expand sitemap coverage toward `100+` and then `200+` indexable URLs

### Phase 5: Monetization Readiness

- Finalize ad-safe content density on guides and calculators
- Review AdSense policy/compliance fit
- Tune ad placements for usability without damaging performance

## Current Constraints / Risks

- The lender-page factory cannot be completed yet because a real checked-in lender dataset/table is not available.
- Mobile performance will improve from this rollout, but additional bundle reduction work is still needed to hit an elite score.
- Live production metrics must be rechecked after deployment; local improvement alone is not enough.

## Recommendation to the Board

RepayWise is now beyond the “basic calculator site” stage and is being turned into a proper search-distributed fintech publishing asset.

The immediate recommendation is:

1. Deploy the current SSG rollout.
2. Re-measure live performance and indexing.
3. Begin the first guide cluster and lender-data preparation immediately after deployment validation.

This is the correct path if the company wants to compound organic traffic, improve user trust, and prepare the website for both lead generation and ad-based revenue.
