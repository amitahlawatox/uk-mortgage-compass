# RepayWise SEO Audit Log

---

## 2026-06-09 — Strategic Audit: "Chief SEO & Monetisation Strategist" Review

**Auditor:** Automated deep-dive (seo_skills.py + GSC + GA4 + PageSpeed + keyword research)
**Site:** repaywise.co.uk
**Milestone:** 10,000 daily users / £10,000 monthly revenue

---

### 1. WHY WE ARE STUCK — seo_skills.py Audit & Technical Bottlenecks

**33 issues found across 3 audits.**

#### 1A. Missing H1 Tags (8 Calculator Pages)

Every single core calculator page is missing an `<h1>`:

| Page | Issue |
|------|-------|
| AffordabilityPage.tsx | No `<h1>` |
| BuyToLetPage.tsx | No `<h1>` |
| ComparePage.tsx | No `<h1>` |
| EquityPage.tsx | No `<h1>` |
| MaxBorrowingPage.tsx | No `<h1>` |
| OverpaymentPage.tsx | No `<h1>` |
| RepaymentPage.tsx | No `<h1>` |
| StampDutyPage.tsx | No `<h1>` |
| HelpToBuyRepaymentPage.tsx | No `<h1>` |

**Impact:** Google uses H1 as a primary content signal. All 8 core money pages — the pages that map directly to high-volume keywords — are missing the single most important on-page SEO element. Google is literally guessing what these pages are about. This alone explains why head terms sit at position 85-100.

#### 1B. Broken JSON-LD Structured Data (6 Pages)

| Page | Error |
|------|-------|
| MaxBorrowingPage.tsx | Invalid JSON-LD (parse failure) |
| OverpaymentPage.tsx | Invalid JSON-LD (parse failure) |
| HelpToBuyRepaymentPage.tsx | Invalid JSON-LD (parse failure) |
| LenderGuidePage.tsx | Invalid JSON-LD (parse failure) |
| MortgageOverpaymentGuidePage.tsx | Invalid JSON-LD (parse failure) |
| RegionalPage.tsx | Invalid JSON-LD (parse failure) |

**Impact:** Google silently ignores invalid schema. Our FAQPage and FinancialProduct schemas — the ones designed to win rich snippets — are being thrown away at parse time. Zero rich results, zero SERP feature differentiation.

#### 1C. CLS Risk Flags (16 Component-Level)

Flagged in RateTicker, alert, card, chart, form, skeleton. PageSpeed confirms CLS = 0.00 on mobile (good), but desktop CLS = 0.023 (minor layout shift culprit flagged). These are mostly in UI primitives. Low real-world impact but technically non-compliant with the "perfect 0.00" rule.

#### 1D. Mobile Performance — The Real Killer

| Metric | Mobile | Desktop |
|--------|--------|---------|
| Performance Score | **68** | 97 |
| FCP | **4.0s** | 0.9s |
| LCP | **5.2s** | 1.2s |
| TBT | 20ms | 0ms |
| CLS | 0.00 | 0.023 |
| Speed Index | **5.5s** | 0.9s |

Mobile LCP of 5.2s is **FAILING Core Web Vitals**. Google's threshold is ≤2.5s for "Good". We're in the "Poor" bracket. Since 63% of our GSC impressions come from mobile, we are being penalized on the majority of our search surface.

**Unused JS: 164KB. Unused CSS: 15KB.** Render-blocking requests costing 150ms.

#### 1E. GSC Index Coverage Crisis

| Status | Pages |
|--------|-------|
| Indexed | 522 |
| Not Indexed | 785 |
| "Alternate page with proper canonical" | 553 |
| "Discovered — currently not indexed" | 120 |
| Redirects | 62 |
| 404s | 27 |
| Duplicate (Google chose different canonical) | 7 |

**553 pages** flagged as "Alternate page with proper canonical tag" — this means Google thinks more than half our lender/city pages are duplicate content. Google is consolidating them and only indexing the variant it considers canonical. The lender-specific pages that generate our only clicks are being cannibalised by Google's deduplication.

120 pages still in "Discovered — currently not indexed" limbo after 7 weeks.

#### 1F. Missing SEO Components

- NotFound.tsx — no `<SEO>` component (404 page leaking without proper meta)
- Methodology.tsx — no `<SEO>` component (trust/authority page invisible to search)

---

### 2. IS 10K DAILY USERS MATHEMATICALLY REALISTIC?

**Short answer: Yes, but not from mortgage overpayment keywords alone. And not in 12 months.**

#### UK Monthly Search Volume Estimates (approximated from multiple keyword tools)

| Keyword Cluster | Est. UK Monthly Volume | RepayWise Current Position |
|----------------|----------------------|--------------------------|
| "mortgage calculator" / "mortgage repayment calculator" | 110,000–200,000 | 88–95 (invisible) |
| "stamp duty calculator" | 100,000–368,000 | 79 (page 8) |
| "how much can I borrow mortgage" cluster | 80,000–120,000 | 95–100 (invisible) |
| "mortgage overpayment calculator" | 30,000–74,000 | Not ranking for head term |
| "equity calculator" / "home equity" cluster | 20,000–40,000 | 54–86 (climbing) |
| "buy to let calculator" cluster | 10,000–20,000 | 91–96 (invisible) |
| "help to buy calculator" | 10,000–20,000 | 71–74 |
| Lender-specific long-tail (×50+ lenders) | 500–5,000 each | 1–15 (our sweet spot) |
| City/regional mortgage keywords (×100+ cities) | 100–2,000 each | 28–85 (some traction) |

**Total addressable UK search market for mortgage calculators: ~500,000–900,000 searches/month.**

At a realistic 3-5% CTR across a mix of positions, that's 15,000–45,000 clicks/month = 500–1,500/day from organic search.

To reach 10,000/day (300,000/month), you need either:
- Position 1-3 on ALL head terms (impossible against MoneySuperMarket DR90+, MoneyHelper DR80+, NatWest, Barclays, etc.)
- OR: massive content expansion beyond calculators into guides, editorial, and adjacent keyword clusters (remortgaging, first-time buyer, property investment)
- OR: non-SEO channels (direct traffic, referral, social, email)

**Mathematical ceiling from SEO alone: ~5,000/day at absolute peak maturity (18-24 months).**

10K requires multi-channel. SEO gets you to 5K. The other 5K comes from brand, referral, social, email, and embeds.

---

### 3. PRIVACY REVENUE ENGINE — £10K/Month Blueprint

**Target: £33.33 RPM on 300,000 monthly visits.**

#### Current Traffic Reality Check

| Period | Active Users | Visits (est.) |
|--------|-------------|---------------|
| Last 7 days (Jun 2-8) | 32 | ~40 |
| Last 28 days | 109 | ~130 |
| Daily average | 4-5 | 5-7 |

We are at ~150 visits/month. The target is 300,000. We are **0.05%** of the way there.

#### Revenue Model Under Cookie-Free Constraints

| Revenue Stream | Est. RPM (per 1K visits) | Monthly @ 300K visits | Feasibility at Scale |
|---------------|------------------------|----------------------|---------------------|
| Contextual Ads (Carbon Ads, EthicalAds) | £2–£5 | £600–£1,500 | Proven, low ceiling |
| Fixed-Fee Lender Sponsorships (widget placement) | £8–£15 | £2,400–£4,500 | Requires sales effort |
| White-Label Calculator Licensing | £5–£10 | £1,500–£3,000 | Requires product packaging |
| Affiliate (mortgage broker referrals, no cookies needed) | £10–£20 | £3,000–£6,000 | Highest upside, FCA-careful |
| **Blended Total** | **£25–£50** | **£7,500–£15,000** | **£10K achievable at blend** |

**Critical insight:** Contextual ads alone will NEVER reach £33 RPM. Carbon Ads pays $2-4 CPM in finance niches. You need the layered model:

1. **Base layer (Month 1-6):** Contextual ads (Carbon Ads / EthicalAds) — £2-5 RPM. Covers hosting costs.
2. **Growth layer (Month 6-12):** Fixed-fee sponsorships from UK mortgage brokers. 5 brokers × £500/month = £2,500. Position as "Featured on the UK's independent mortgage calculator".
3. **Scale layer (Month 12-18):** White-label calculator widget. Package your overpayment/repayment calculator as an embeddable iframe. Charge estate agencies £50-200/month. 30 clients = £3,000/month. Each embed is also a backlink.
4. **Premium layer (Month 18-24):** Qualified lead referral. "Get a free mortgage consultation" CTA → route to broker partners. No cookies needed — simple form submission earns £20-80 per qualified lead. 150 leads/month at £40 = £6,000. Must be FCA-compliant — add disclaimers, don't give advice, just connect.

**£10K/month is realistic at ~200K-300K monthly visits with the full 4-layer stack. Timeline: 18-24 months minimum.**

---

### 4. THE 2-YEAR QUARTERLY ROADMAP

#### Q3 2026 (Jul-Sep): Fix the Foundation

- [ ] **Add H1 tags to all 8 calculator pages** (immediate, highest impact)
- [ ] **Fix all 6 broken JSON-LD schemas** (immediate, rich snippet eligibility)
- [ ] **Fix mobile LCP to ≤2.5s** — code-split, lazy-load Recharts, self-host fonts, compress images
- [ ] **Resolve 553 "alternate page" canonicalisation issue** — audit canonical tags, ensure each lender page has sufficiently unique content (not just a different lender name in the same template)
- [ ] **Add <SEO> to NotFound and Methodology pages**
- [ ] Submit sitemap refresh to GSC after fixes
- [ ] Target: 800+ indexed pages, mobile performance ≥80, position improvement on equity/help-to-buy clusters

#### Q4 2026 (Oct-Dec): Content Expansion + First Revenue

- [ ] Publish 20+ long-form guides (target: "how much can I borrow", "stamp duty 2026", "first time buyer guide UK", "mortgage overpayment guide", "remortgage guide")
- [ ] Build internal linking mesh: every calculator ↔ related guide ↔ city page
- [ ] Implement contextual ad placements (Carbon Ads or EthicalAds)
- [ ] Apply for and test first 2 broker sponsorship deals
- [ ] Begin backlink outreach (see BACKLINK_OPPORTUNITIES.md — execute Tier 1 and Tier 2)
- [ ] Target: 200-500 daily organic users, £200-500/month revenue

#### Q1 2027 (Jan-Mar): Authority Building + Widget Product

- [ ] Launch embeddable calculator widget product
- [ ] Publish "UK Mortgage Affordability Report 2027" (linkable asset)
- [ ] Guest post on 5+ UK property blogs
- [ ] Submit to ProductHunt, AlternativeTo, finance tool directories
- [ ] Launch on r/UKPersonalFinance, MoneySavingExpert forums
- [ ] Build email capture (mortgage rate alerts — no cookies, just email)
- [ ] Target: 1,000-2,000 daily users, 10+ backlinks, £1,000-2,000/month revenue

#### Q2 2027 (Apr-Jun): Scale + Lead Generation

- [ ] Implement qualified lead referral system (FCA-compliant)
- [ ] Scale broker sponsorships to 5-10 partners
- [ ] Scale widget licensing to 10-20 estate agency clients
- [ ] Expand to Scotland/Wales-specific content (LBTT, LTT calculators — already partially built)
- [ ] Target: 3,000-5,000 daily users, £3,000-5,000/month revenue

#### Q3-Q4 2027 (Jul-Dec): Multi-Channel + £10K Target

- [ ] Launch mortgage rate comparison feature (contextual, no tracking)
- [ ] Email newsletter to 5,000+ subscribers driving return visits
- [ ] Podcast/YouTube content with mortgage brokers (referral traffic)
- [ ] Full 4-layer revenue stack operational
- [ ] Target: 5,000-8,000 daily users, £7,000-10,000/month revenue

#### H1 2028: 10K Milestone

- [ ] SEO mature (1,200+ indexed pages ranking, 100+ backlinks)
- [ ] Brand recognition driving direct traffic
- [ ] Widget embeds driving referral traffic + backlinks
- [ ] Target: 10,000 daily users, £10,000+/month revenue

---

### Blunt Summary

**You are not stuck because of bad strategy. You are stuck because of bad execution.**

The strategy docs (DAILY_GROWTH_PLAN.md, DAY-ZERO-SEO-EXECUTION.md, BACKLINK_OPPORTUNITIES.md) are thorough. But the 8 calculator pages that should be your money pages are missing H1 tags. The JSON-LD schemas that should differentiate you in SERPs are broken and silently ignored. Mobile performance is in the "Poor" bracket. And Google thinks 553 of your pages are duplicates.

These are not minor issues. These are table-stakes errors that would disqualify any site from ranking, regardless of domain age or backlink profile.

**Fix the H1s. Fix the schemas. Fix mobile LCP. Fix the canonicalisation. Then, and only then, does the growth strategy have a chance to work.**

10K daily users in 12 months is not realistic. 18-24 months with perfect execution and multi-channel growth is the honest timeline. £10K/month is achievable but requires the full 4-layer privacy-compliant revenue stack, not just contextual ads.

---

## 2026-06-09 — Initial Setup

- Core Wiki profiles successfully set up (RepayWise Business Profile & Technical SEO Rules).
- Ready for weekly data inputs.
