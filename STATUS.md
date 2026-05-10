# RepayWise — Status Report

**Date:** 10 May 2026
**Goal:** 10,000 daily active users within 12 months
**Production:** https://repaywise.co.uk
**Repo:** https://github.com/amitahlawatox/uk-mortgage-compass

---

## Current Metrics (10 May 2026)

### Google Search Console — 3-Month Window

| Metric | 3 May baseline | 10 May | Change |
|--------|---------------|--------|--------|
| Total Impressions | 158 | 1,886 | +1,093% |
| Total Clicks | 0 | 4 | First clicks! |
| Peak Daily Impressions | 128 | 450 (7 May) | +251% |
| Average Position | 67.1 | 36.8 (best) | +30 positions |
| Unique Queries | 87 | 540 | +521% |
| Indexed Pages | 39 | 39 | stable |
| Not Indexed | 205 | 205 | 185 discovered, waiting |
| Sitemap URLs | 217 | 1,046 | +382% |

### First Clicks (7-Day Window)

| Page | Clicks | Impressions | Position |
|------|--------|-------------|----------|
| /calculators/overpayment/barclays | 2 | 146 | 9.26 |
| /calculators/overpayment/coventry | 1 | 15 | 9.67 |
| /calculators/repayment/bm-solutions | 1 | 12 | 11.17 |

### Top Impression Pages (7-Day)

| Page | Impressions | Position |
|------|-------------|----------|
| /calculators/max-borrowing | 240 | 95.73 |
| /calculators/repayment | 226 | 88.58 |
| /calculators/max-borrowing/danske | 163 | 7.17 |
| /calculators/overpayment/barclays | 146 | 9.26 |
| www (overpayment) | 115 | 85.66 |
| www (repayment) | 98 | 90.19 |
| /calculators/repayment/barclays | 93 | 12.61 |
| /calculators/repayment/hsbc | 92 | 22.83 |

### Top Queries (7-Day)

| Query | Impressions | Position | Opportunity |
|-------|-------------|----------|-------------|
| danske mortgage calculator | 58 | 5.88 | Near page 1 — high priority |
| danske bank mortgage calculator | 37 | 7.84 | Near page 1 |
| hsbc mortgage calculator | 26 | 31.04 | Needs content boost |
| monthly repayment calculator | 23 | 87.22 | Generic — long game |
| barclays mortgage overpayment calculator | 20 | 8.05 | Page 1! Generating clicks |
| repayment calculator uk | 16 | 86.50 | Generic target |
| mortgage overpayment calculator barclays | 12 | 7.83 | Page 1 |

### GSC Coverage Issues

| Issue | Pages |
|-------|-------|
| Not found (404) | 13 |
| Page with redirect | 3 |
| Alternate page with proper canonical | 2 |
| Discovered — currently not indexed | 185 |
| Crawled — currently not indexed | 2 |

### GA4 (1 Apr – 10 May)

| Metric | Value |
|--------|-------|
| Active Users | 10 |
| Page Views | 58 |
| Sessions | 17 |
| Top Pages | Overpayment calc (19), Homepage (13), Affordability (6) |
| Top Cities | Oxford (9), Croydon (1), London (1) |
| Events | calculator_viewed (12), intent_calculate_clicked (3) |

---

## What Was Done (Weeks 1–2, 25 Apr – 4 May)

### PRs Delivered by Devin (all merged)

| PR | Description | Impact |
|----|-------------|--------|
| [#5](https://github.com/amitahlawatox/uk-mortgage-compass/pull/5) | GA4 tag, security headers, audit fixes | Analytics + trust signals |
| [#6](https://github.com/amitahlawatox/uk-mortgage-compass/pull/6) | About/Contact pages, 50 lender descriptions, FAQ schema | AdSense-ready, indexing fix |
| [#8](https://github.com/amitahlawatox/uk-mortgage-compass/pull/8) | Non-render-blocking Google Fonts, growth plan, backlinks | ~971ms LCP improvement |
| [#10](https://github.com/amitahlawatox/uk-mortgage-compass/pull/10) | Help to Buy calculator, BreadcrumbList, internal linking, freshness signals | New content, SEO signals |
| [#11](https://github.com/amitahlawatox/uk-mortgage-compass/pull/11) | Mortgage Overpayment Guide (1500+ words) | Targeting overpayment queries |

### Key Results from Week 1–2

- Impressions grew from 34 → 158 → 1,886 (+5,447% from start)
- Moved from avg position 90.7 to 36.8
- First organic clicks ever recorded (4 clicks on 6–8 May)
- Structured data validated: 2 Breadcrumb + 3 FAQ items in GSC
- Sitemap submitted, 217 pages discovered by Google

---

## What Changed During 6-Day Gap (4–10 May)

116 commits pushed by other tools (gpt-engineer-app, RepayWise Fix, manual commits).

### Major Changes

1. **Lender expansion** — 50 → 110 lenders (building societies, specialists, digital, Islamic banks)
2. **City slug support** — 40 UK cities × 7 calc types = 280 new pages
3. **Sitemap expansion** — 217 → 1,046 URLs
4. **SEOHead component** — New component with schema markup, canonical tags, OG tags
5. **SEO component upgrade** — FAQPage, WebApplication, BreadcrumbList auto-generated for all lender pages
6. **Domain consolidation** — All traffic to `repaywise.co.uk` with HSTS + cache headers
7. **Mobile fixes** — Hamburger menu, iOS Safari, CurrencyInput (stuck-zero bug)
8. **Privacy overhaul** — Analytics custom events disabled (no-op stubs), AdComponent disabled, LeadCaptureModal disabled, PrivacyPolicy rewritten for zero data collection
9. **LenderTrustBadge** — Anti-phishing disclaimers on all calc pages
10. **FCA compliance** — Warning, independence notice in Footer
11. **Encoding repairs** — Multiple rounds fixing £ symbols, C1 control chars
12. **404 redirects** — Added for common URL patterns

### Critical Issues Found

1. **`calculators/max-borrowing/:slug` route is BROKEN** — Missing `lazy` and `getStaticPaths` properties. No static HTML generated for 150+ lender/city pages. Getting 240+ GSC impressions but serving empty content. Danske alone has 163 impressions at position 7.17.
2. **13 pages returning 404** in GSC — Need investigation
3. **www/non-www signal splitting** — www versions still getting separate impressions (115+98 = 213 impressions split from non-www)
4. **Security headers removed** from vercel.json — HSTS, X-Content-Type-Options, CSP all missing
5. **GA4 custom events disabled** — analytics.ts replaced with no-op stubs (basic GA4 pageview tag in index.html still works)

---

## 3-Day Action Plan (10–13 May)

### Day 1 — Critical Fixes (Today)

- [ ] Fix `max-borrowing/:slug` route — add missing `lazy` + `getStaticPaths`
- [ ] Restore security headers in `vercel.json` (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [ ] Verify build generates max-borrowing lender/city pages
- [ ] Create this STATUS.md
- [ ] Create PR, pass CI, merge

### Day 2 — Content Targeting Top Queries

- [ ] Optimize meta titles/descriptions for pages approaching page 1 (danske, barclays, hsbc)
- [ ] Create "How Much Can I Borrow" guide (targeting 240-impression max-borrowing queries)
- [ ] Add `lastmod` dates to sitemap entries for freshness signal

### Day 3 — Indexing & Technical SEO

- [ ] Investigate and fix 13 GSC 404 pages
- [ ] Add canonical tags to address www/non-www splitting
- [ ] Internal linking improvements between high-impression pages
- [ ] Verify new max-borrowing pages indexed by Google

---

## Architecture Summary

| Item | Value |
|------|-------|
| Framework | Vite + React + vite-react-ssg |
| Hosting | Vercel (Pro) |
| Static pages generated | 1,046 |
| Lenders | 110 |
| Cities | 40 |
| Calculator types | 8 (Repayment, Overpayment, Max Borrowing, Stamp Duty, Affordability, Equity, Buy-to-Let, Compare) |
| Guide pages | 3 (Help to Buy, Overpayment Guide, Lender guides ×110) |
| GA4 property | G-082C2XNJDW |
| SSL | Let's Encrypt R12 via Vercel (valid until 20 Jul 2026) |

---

*Next update: 13 May 2026*
