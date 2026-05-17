# RepayWise — Status Report

**Date:** 17 May 2026
**Goal:** 10,000 daily active users within 12 months
**Production:** https://repaywise.co.uk
**Repo:** https://github.com/amitahlawatox/uk-mortgage-compass

---

## Current Metrics (17 May 2026)

### Google Search Console — 28-Day Window (22 Apr – 17 May)

| Metric | 10 May | 17 May | Change |
|--------|--------|--------|--------|
| Total Impressions (28d) | 1,886 | 5,019 | +166% |
| Total Clicks (28d) | 4 | 8 | +100% |
| Peak Daily Impressions | 450 (7 May) | 554 (10 May) | +23% |
| Avg Daily Impressions (last 7d) | ~300 | 454 | +51% |
| Average Position (best day) | 36.8 | 37.5 | stable |
| Unique Queries (28d) | 540 | 1,029 | +90% |
| Indexed Pages | 39 | 337 | +764% |
| Not Indexed | 205 | 880 | crawl budget expanding |
| Total Pages Discovered | 244 | 1,217 | +399% |

### 7-Day Performance (9–15 May)

| Day | Clicks | Impressions | Avg Position |
|-----|--------|-------------|--------------|
| 9 May | 1 | 317 | 49.9 |
| 10 May | 0 | 554 | 37.6 |
| 11 May | 0 | 449 | 37.5 |
| 12 May | 2 | 398 | 59.1 |
| 13 May | 0 | 539 | 55.3 |
| 14 May | 1 | 402 | 39.3 |
| 15 May | 0 | 521 | 45.5 |
| **Total** | **4** | **3,180** | **46.2 avg** |

### 24-Hour Snapshot (16–17 May)

- **Impressions:** 452 | **Clicks:** 2 | **CTR:** 0.44%
- **Best hour:** 16:00 UTC — 119 impressions
- **First 2-click page:** `/calculators/overpayment/monmouthshire` — 2 clicks, position 4.5

### Pages Near Page 1 (Position < 15, 10+ Impressions)

| Page | Impressions | Clicks | Avg Position |
|------|-------------|--------|--------------|
| /calculators/max-borrowing/danske | 561 | 0 | 7.25 |
| /calculators/repayment/barclays | 221 | 1 | 11.6 |
| /calculators/overpayment/barclays | 193 | 2 | 8.69 |
| /calculators/overpayment/nationwide-remortgage | 129 | 0 | 12.71 |
| /calculators/repayment/coventry | 75 | 0 | 13.19 |
| /calculators/overpayment/santander | 63 | 0 | 10.24 |
| /calculators/max-borrowing/yorkshire | 63 | 0 | 10.57 |
| /calculators/repayment/tsb | 57 | 0 | 14.49 |
| /guides/lenders/lloyds-bank | 46 | 0 | 11.91 |
| /calculators/repayment/skipton | 34 | 0 | 10.88 |
| /guides/lenders/principality | 34 | 0 | 14.85 |
| /calculators/max-borrowing/santander | 32 | 0 | 12.16 |
| /calculators/repayment/west-brom | 28 | 0 | 7.57 |
| /calculators/max-borrowing/natwest | 24 | 0 | 12.12 |
| /calculators/max-borrowing/kensington | 23 | 0 | 6.13 |
| /calculators/max-borrowing/virgin-money | 22 | 0 | 8.73 |
| /calculators/max-borrowing/paragon | 22 | 0 | 6.73 |
| /calculators/repayment/danske | 21 | 0 | 7.43 |
| /calculators/repayment/bm-solutions | 21 | 1 | 11.62 |
| /calculators/overpayment/virgin-money | 21 | 0 | 7.95 |
| /calculators/overpayment/coventry | 20 | 1 | 8.85 |
| /calculators/max-borrowing/principality | 20 | 0 | 8.25 |
| /calculators/repayment/progressive | 19 | 0 | 7.26 |

**29 pages within striking distance of page 1** — combined 1,700+ impressions.

### Top Queries (28-Day)

| Query | Impressions | Position | Click Opportunity |
|-------|-------------|----------|-------------------|
| danske bank mortgage calculator | 163 | 7.71 | Near page 1 — 0 clicks yet |
| danske mortgage calculator | 153 | 5.35 | **Page 1!** Just needs CTR |
| nationwide overpayment calculator | 66 | 9.29 | Near page 1 |
| repayment calculator | 51 | 91.63 | Generic — long game |
| monthly repayment calculator | 49 | 89.71 | Generic |
| hsbc mortgage calculator | 48 | 41.15 | Improving, needs push |
| barclays mortgage overpayment calculator | 20 | 8.05 | Page 1! 1 click |
| mortgage overpayment calculator uk barclays | 3 | 6.33 | Page 1! 1 click |

### GSC Coverage Issues

| Issue | 10 May | 17 May | Change | Status |
|-------|--------|--------|--------|--------|
| Alternate page with proper canonical | 2 → 545 | 556 | +11 | PR #13 fix deployed 11 May, awaiting re-crawl |
| Page with redirect | 3 | 47 | +44 | **NEW BUG — city slugs redirect** |
| Not found (404) | 13 | 23 | +10 | Need investigation |
| Discovered — currently not indexed | 185 | 232 | +47 | Normal — Google processing |
| Crawled — currently not indexed | 2 | 5 | +3 | Normal |
| Duplicate without user-selected canonical | — | 16 | new | Investigate |
| Duplicate, Google chose different | — | 1 | new | Investigate |

### www Signal Splitting (28-Day)

| www URL | Impressions | Position |
|---------|-------------|----------|
| www.repaywise.co.uk/calculators/overpayment | 188 | 85.6 |
| www.repaywise.co.uk/calculators/repayment | 183 | 89.04 |
| www.repaywise.co.uk/ | 25 | 80.32 |
| www.repaywise.co.uk/calculators/stamp-duty | 18 | 79.39 |
| **Total www waste** | **416** | — |

www→non-www 301 redirect is working correctly (verified). These are legacy impressions that will fade as Google re-crawls.

### Device & Geography

| Device | Clicks | Impressions | CTR | Position |
|--------|--------|-------------|-----|----------|
| Mobile | 6 | 1,455 | 0.41% | 28.62 |
| Desktop | 2 | 3,554 | 0.06% | 55.41 |
| Tablet | 0 | 10 | 0% | 9.7 |

**89% UK traffic** (4,487 of 5,019 impressions) — correctly targeting domestic audience.

---

## What Was Done (Weeks 1–3, 25 Apr – 17 May)

### PRs Delivered by Devin (all merged)

| PR | Description | Impact |
|----|-------------|--------|
| [#5](https://github.com/amitahlawatox/uk-mortgage-compass/pull/5) | GA4 tag, security headers, audit fixes | Analytics + trust signals |
| [#6](https://github.com/amitahlawatox/uk-mortgage-compass/pull/6) | About/Contact pages, 50 lender descriptions, FAQ schema | AdSense-ready, indexing fix |
| [#8](https://github.com/amitahlawatox/uk-mortgage-compass/pull/8) | Non-render-blocking Google Fonts, growth plan, backlinks | ~971ms LCP improvement |
| [#10](https://github.com/amitahlawatox/uk-mortgage-compass/pull/10) | Help to Buy calculator, BreadcrumbList, internal linking | New content, SEO signals |
| [#11](https://github.com/amitahlawatox/uk-mortgage-compass/pull/11) | Mortgage Overpayment Guide (1500+ words) | Targeting overpayment queries |
| [#12](https://github.com/amitahlawatox/uk-mortgage-compass/pull/12) | Fix max-borrowing/:slug route + security headers | 147 broken pages fixed |
| [#13](https://github.com/amitahlawatox/uk-mortgage-compass/pull/13) | Dynamic canonicals for 545 lender/city pages | Canonical tag fix |

### Week 3 Wins

- **Indexed pages: 39 → 337 (+764%)** — massive jump as Google processes sitemap
- **1,029 unique queries** — site appearing for long-tail mortgage searches
- **29 pages near page 1** — lender-specific calculators gaining authority
- **First CTR improvements** — 2 clicks on a single page (Monmouthshire overpayment, position 4.5!)
- **Danske mortgage calculator at position 5.35** — top organic position achieved

---

## Critical Issues Found (17 May)

### 1. City Slug Redirect Bug (47 pages) — HIGH PRIORITY

**Root cause:** `OverpaymentPage.tsx` and `MaxBorrowingPage.tsx` have:
```typescript
if (slug && !lender) {
    return <Navigate to="/calculators/overpayment" replace />;
}
```
This redirects ALL non-lender slugs, including valid city slugs. The city variable is correctly resolved on the previous line but the redirect fires before it can be used.

**Impact:** 47 overpayment/city + max-borrowing/city pages redirect to base page → Google marks as "Page with redirect" → pages not indexed.

**Fix:** Change to `if (slug && !lender && !city)` (matching RepaymentPage pattern).

### 2. City Pages Missing pagePath + seoDescription

Both pages set `pagePath` to base URL for city pages:
```typescript
const pagePath = lender ? buildLenderPath("overpayment", lender.slug) : "/calculators/overpayment";
```
No city branch. City pages get wrong canonical URL, wrong breadcrumbs, generic description.

### 3. 23 Pages Returning 404

Up from 13 → 23. Needs investigation — likely old URL patterns or sitemap entries for non-existent pages.

### 4. 16 Duplicate Without User-Selected Canonical

New issue. Likely pages where canonical is set but Google disagrees. Need to check.

---

## 3-Day Action Plan (17–20 May)

### Today — Critical Fix

- [ ] Fix city slug redirect in OverpaymentPage.tsx and MaxBorrowingPage.tsx
- [ ] Add city branch to pagePath, seoDescription, title, breadcrumbs
- [ ] Add `<Head>` SSR canonical tags for city pages
- [ ] Create PR → CI → merge

### Day 2 — Indexing Optimization

- [ ] Investigate 23 GSC 404 pages — fix or add redirects
- [ ] Investigate 16 "Duplicate without canonical" pages
- [ ] Optimize meta titles for top 10 near-page-1 pages (Danske, Barclays, Coventry)

### Day 3 — Content & Internal Linking

- [ ] Create "How Much Can I Borrow" guide (targeting max-borrowing generic queries, 486 impressions at position 94)
- [ ] Internal linking from guides to top-performing lender pages
- [ ] Submit updated sitemap with fresh lastmod dates

---

## Architecture Summary

| Item | Value |
|------|-------|
| Framework | Vite + React + vite-react-ssg |
| Hosting | Vercel (Pro) |
| Static pages generated | ~1,193 |
| Lenders | 110 |
| Cities | 40 |
| Calculator types | 8 |
| Guide pages | 3+ |
| GA4 property | G-082C2XNJDW |
| SSL | Let's Encrypt R12 via Vercel (valid until 20 Jul 2026) |

---

*Next update: 20 May 2026*
