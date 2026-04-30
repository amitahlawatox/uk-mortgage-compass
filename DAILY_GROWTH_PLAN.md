# RepayWise Growth Plan — 30 April 2026

## Current State (Baseline)

| Metric | Value | Target |
|--------|-------|--------|
| Daily active users | ~0 | 10,000 |
| GSC impressions (3 months) | 34 | 10,000/month |
| GSC clicks (3 months) | 0 | 1,000/month |
| Avg search position | 90.7 | < 10 |
| Indexed pages | 6 of 60 | 60 of 60 |
| Lighthouse Performance | 76 | 98+ |
| Lighthouse Accessibility | 96 | 98+ |
| Lighthouse Best Practices | 100 | 100 |
| Lighthouse SEO | 100 | 100 |
| AdSense status | Not applied | Approved |
| Backlinks | 0 | 50+ |

## Diagnosis

### Why zero clicks
1. **Average position 90.7** — buried on page 9-10 of Google. Nobody scrolls this far.
2. **Only 6 pages indexed** — 54 lender sub-pages marked "Discovered - currently not indexed" (thin content).
3. **Zero backlinks** — new domain with no authority (DR 0).
4. **No editorial content** — calculator-only sites rank poorly without supporting guides.
5. **LCP 4.4s** — slow render delay (86% of LCP is render delay from JS bundle).

### What competitors do better
| Competitor | DR | Monthly traffic | Key advantage |
|-----------|-----|----------------|---------------|
| MoneyHelper.org.uk | 80+ | 1.6M | Government authority, 248K keywords |
| MoneySuperMarket | 90+ | 5M+ | Brand, comparison engine, massive content |
| MortgageCalculator.co.uk | 50+ | 100K+ | Tool suite, scorecard simulator |
| ukcalculator.com | 30+ | 50K+ | Multi-tab calculator, current rates |
| MortgagePro.uk | 20+ | 10K+ | FCA referral, amortisation tables |

### RepayWise advantages
- Privacy-first (no data collection) — unique selling point
- SSG pre-rendered pages — fast TTFB
- Clean UK-focused brand
- 50 lender-specific calculator pages (unique content opportunity)
- FAQ schema already implemented

---

## 30-Day Sprint Plan

### Week 1: Technical Foundation (Performance + Indexing)
- [ ] **Fix LCP** — self-host Google Fonts, add `font-display: swap`, preconnect hints
- [ ] **Code split** — lazy-load non-critical JS bundles
- [ ] **Merge PR #6** — About/Contact pages + lender descriptions (fixes thin content)
- [ ] **Submit sitemap** to GSC — trigger re-crawl of all 60 pages
- [ ] **Request indexing** for top 10 pages manually via GSC URL Inspection

### Week 2: Content Engine (Target 15+ quality pages for AdSense)
Priority content based on GSC query data (keywords already showing impressions):

| Article | Target keyword | Est. monthly volume |
|---------|---------------|-------------------|
| Help to Buy Repayment Guide | help to buy repayment calculator | 1,000-2,500 |
| Mortgage Overpayment Calculator | early mortgage repayment calculator uk | 2,000-5,000 |
| Scotland Mortgage Guide | mortgage calculator scotland | 1,000-3,000 |
| Stamp Duty Calculator 2026 | stamp duty mortgage calculator | 5,000-10,000 |
| How Much Can I Borrow? | mortgage affordability calculator uk | 10,000-30,000 |
| Monthly Repayment Breakdown | mortgage repayment calculator uk | 50,000+ |
| First-Time Buyer Guide UK | first time buyer mortgage calculator | 10,000-30,000 |
| Buy-to-Let Calculator | buy to let mortgage calculator | 5,000-10,000 |
| Interest-Only vs Repayment | interest only mortgage calculator | 5,000-10,000 |
| Mortgage Comparison Tool | compare mortgage rates uk | 10,000-30,000 |

### Week 3: Backlinks + Authority
- [ ] Submit 3 guest posts to UK property blogs (see BACKLINK_OPPORTUNITIES.md)
- [ ] Submit RepayWise to UK finance tool directories
- [ ] Create a shareable infographic: "UK Mortgage Costs by Region 2026"
- [ ] Reach out to personal finance bloggers for tool reviews

### Week 4: Apply for AdSense + Monitor
- [ ] Apply for Google AdSense (requires: About, Contact, Privacy, 15+ pages)
- [ ] Set up ad placement zones (header, sidebar, between-content)
- [ ] Review GA4 data (should have 2+ weeks by now)
- [ ] Review GSC data for new keyword opportunities
- [ ] Adjust content plan based on what's ranking

---

## Quick Wins (< 1 hour each)

1. **Self-host Inter font** — saves ~971ms render-blocking time
2. **Add `<link rel="preconnect">` for Google Fonts** (if not self-hosting)
3. **Add JSON-LD BreadcrumbList** to all pages
4. **Add OG images** for social sharing
5. **Interlink all calculator pages** — boost internal PageRank
6. **Add "last updated" dates** to calculator pages (freshness signal)
7. **Submit XML sitemap** to GSC

---

## GSC Query Data (All 27 queries with impressions)

| Query | Impressions | Position |
|-------|------------|----------|
| help to buy repayment calculator | 5 | ~90 |
| mortgage calculator scotland | 2 | ~90 |
| how much would the repayments be on a 90000 mortgage | 2 | ~90 |
| early mortgage repayment calculator uk | 2 | ~90 |
| porting mortgage calculator | 1 | ~90 |
| mortgage calculator uk | 1 | ~90 |
| mortgage repayment calculator scotland | 1 | ~90 |
| mortgage calc | 1 | ~90 |
| lbtt calculator | 1 | ~90 |
| help to buy pay back calculator | 1 | ~90 |
| mortgage calculator uk repayment | 1 | ~90 |
| mortgage repayment on 500k | 1 | ~90 |
| stamp duty mortgage calculator | 1 | ~90 |
| what are the repayments on a 100k mortgage | 1 | ~90 |
| how much monthly mortgage payment calculator | 1 | ~90 |
| mortgage monthly repayment calculator uk | 1 | ~90 |
| recalculate mortgage payment | 1 | ~90 |
| repayments on mortgage calculator uk | 1 | ~90 |
| work out mortgage payments uk | 1 | ~90 |
| mortgage calculator repayment uk | 1 | ~90 |
| repayment calculator mortgage | 1 | ~90 |
| second home mortgage calculator uk | 1 | ~90 |
| monthly mortgage repayments calculator | 1 | ~90 |
| how much mortgage repayment | 1 | ~90 |
| mortgage installment calculator uk | 1 | ~90 |
| 80000 mortgage payment calculator | 1 | ~90 |
| what are the monthly repayments on a 100k mortgage | 1 | ~90 |

---

## Lighthouse Breakdown (30 April 2026)

| Metric | Score | Issue | Fix |
|--------|-------|-------|-----|
| Performance | 76 | LCP 4.4s (86% render delay) | Self-host fonts, code split |
| FCP | 2.9s | Render-blocking Google Fonts | `font-display: swap` + preconnect |
| LCP | 4.4s | JS bundle parse time | Lazy-load non-critical routes |
| TBT | 200ms | Acceptable | — |
| CLS | 0.049 | Good | — |
| Accessibility | 96 | Minor issues | Fix contrast ratios |
| Best Practices | 100 | — | — |
| SEO | 100 | — | — |

---

## KPIs to Track Every 3 Days
1. GA4: Active users, sessions, page views, bounce rate
2. GSC: Impressions, clicks, avg position, indexed pages
3. New keywords appearing in GSC
4. Backlink count (check via Google "link:repaywise.co.uk")
5. Lighthouse scores after each deployment

---

*Next review: 3 May 2026*
*Generated by Devin — Tech Lead for RepayWise*
