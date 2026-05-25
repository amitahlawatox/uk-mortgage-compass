# RepayWise — Status Report

**Date:** 30 May 2026
**Goal:** 10,000 daily active users within 12 months
**Production:** https://repaywise.co.uk
**Repo:** https://github.com/amitahlawatox/uk-mortgage-compass

---

## Current Metrics (25 May 2026)

### Google Search Console — 28-Day Window

| Metric | 10 May | 17 May | 25 May | Change (17→25) |
|--------|--------|--------|--------|----------------|
| Total Impressions (28d) | 1,886 | 5,019 | 9,417 | +88% |
| Total Clicks (28d) | 4 | 8 | 218* | +2,625% |
| Unique Queries (28d) | 540 | 1,029 | 1,036 | +1% |
| Indexed Pages | 39 | 337 | 350 | +4% (plateau) |
| Pages in Queue | 205 | 880 | 869 | stable |
| Redirect Pages | 47 | 47 | 64 | +36% ⚠️ |
| 404 Pages | 13 | 13 | 23 | +77% ⚠️ |

*218 clicks includes 114 artificial clicks from bot traffic on May 22 (see incident below). Genuine clicks: ~104 in 28 days (~4-7/day).

### 7-Day Performance (18-24 May)

| Metric | Value |
|--------|-------|
| Impressions | 3,715 |
| Clicks | 208 (mostly bots) |
| Genuine clicks (est.) | ~35-50 |
| Mobile CTR | 12.88% |
| Desktop CTR | 0.44% |

### Top Performing Pages (genuine traffic)

| Page | Clicks | Impressions | CTR | Position |
|------|--------|-------------|-----|----------|
| /calculators/overpayment/atom-bank | 23 | 40 | 57.5% | 1.43 |
| /calculators/overpayment/bluestone | 15 | 27 | 55.6% | 1.70 |
| /calculators/overpayment/vida | 13 | 20 | 65.0% | 1.20 |
| /calculators/overpayment/barclays | 7 | 402 | 1.7% | 8.62 |
| /calculators/overpayment/danske | 5 | 380 | 1.3% | 7.99 |

---

## Critical Issue Found & Fixed (This Session)

### SSG Build Was Broken — Site Serving Single-Page App

**Root Cause:** During the May 22-25 maintenance window (Claude), the build script was changed from `vite-react-ssg build` (generates 1,274 static HTML pages) to `vite build` (single `index.html` shell). This meant:
- Google was crawling empty HTML shells (no content in initial response)
- All canonical tags, meta descriptions, and JSON-LD schema were client-side only
- The sitemap was generating 1 URL instead of 1,274
- This explains why indexed pages PLATEAUED at 350

**Fix Applied:** Restored SSG build. Each of the 1,274 pages now has in its static HTML:
- Unique `<title>` (e.g., "Barclays Overpayment Calculator 2026")
- Unique `<meta name="description">`
- Correct `<link rel="canonical">`
- Full OG/Twitter tags
- FAQPage + BreadcrumbList + WebApplication JSON-LD schema

### Bot Traffic Incident (May 22)

114 artificial clicks detected from headless browsers (DigitalOcean/Cloudflare IPs).
Claude enabled Vercel Bot Protection and hardened robots.txt. Assessment: Handled correctly.

### 301 Redirects Added

Fixed GSC 404 pages:
- `/uk/bath` → `/uk/bath-city` (slug mismatch)
- `/uk/cambridge` → `/uk/cambridge-city`
- `/uk/nottingham` → `/uk/nottingham-city`
- `/uk/newcastle` → `/uk/newcastle-city`
- `/uk/leeds` → `/uk/leeds-city`
- `/calculators/maximum-mortgage-borrowing-calculator` → `/calculators/max-borrowing`

---

## Honest 10K Assessment

**Can we hit 10,000 daily organic users from SEO alone in 12 months? No.**

### Why

1. **Domain age:** 5 weeks old. Google's sandbox lifts at 6-12 months.
2. **Zero backlinks:** Cannot rank for any keyword with >1K monthly searches.
3. **Niche ceiling:** Even with 1,500 pages at position 1, max long-tail traffic is ~5K/day.
4. **Head terms unreachable:** "repayment calculator" is at position 95 — won't crack page 1 for months against MoneySuperMarket, Martin Lewis, major banks.

### Realistic Timeline (SEO Only)

| Month | Projected Daily Users | Key Driver |
|-------|----------------------|------------|
| 3 (Jul) | 100-300 | Sandbox lifting, lender pages ranking |
| 6 (Oct) | 500-1,500 | 800+ pages indexed, city pages ranking |
| 9 (Jan) | 2,000-3,500 | Domain authority building, mid-tail terms |
| 12 (Apr) | 3,000-5,000 | SEO ceiling without backlinks |
| 15-18 | **10,000** | Only with backlinks + multi-channel |

### What Would Accelerate to 10K

1. **Backlinks** — Guest posts, mortgage broker widget, PR mentions
2. **Reddit** — r/UKPersonalFinance (500K members)
3. **MoneySavingExpert forum** — Direct engagement
4. **Email capture** — Returning users
5. **LinkedIn/content marketing** — Share calculator insights

---

## 3-Day Action Plan (30 May – 2 Jun)

### Completed Today
- [x] Restored SSG build (1,274 static HTML pages)
- [x] Fixed GSC 404 pages with 301 redirects
- [x] Removed duplicate meta tags from index.html template
- [x] Verified internal linking works correctly
- [x] Verified GA4 tag (G-Y8KJP7Q3MD) is clean

### Next 3 Days
- [ ] Monitor Vercel deployment — verify static HTML served in production
- [ ] Check GSC in 3 days for indexing acceleration (should see rapid increase now that HTML has content)
- [ ] Submit sitemap to GSC (new sitemap with 1,274 URLs vs the old 1)
- [ ] Plan backlink outreach to 5 independent mortgage brokers
- [ ] Create embeddable calculator widget (for backlinks)

---

## Technical Stack

| Component | Status |
|-----------|--------|
| Build | vite-react-ssg (SSG) ✅ |
| Pages Generated | 1,274 |
| Hosting | Vercel Pro |
| Analytics | GA4 (G-Y8KJP7Q3MD) |
| Bot Protection | Vercel Bot Protection ✅ |
| Security Headers | HSTS, X-Content-Type-Options, X-Frame-Options ✅ |
| Sitemap | Auto-generated from built HTML |
| Lenders | 151 |
| Cities | 42 |
| Calculators | 8 types |
