# Deployment Log

_Last verified: 2026-08-07_

## 2026-08-07 — Traffic collapse recovery

Restored the programmatic page set after wildcard 301 redirects and
route-generator deletions removed ~470 ranking pages from the index.

**Root causes fixed**
1. `vercel.json` wildcard 301s collapsing every lender/city page into its
   base calculator (11 rules removed)
2. Route generators deleted from `App.tsx` — pages no longer existed
   (repayment/:slug, max-borrowing/:slug, guides/lenders/:slug, uk/:slug
   restored; overpayment/:slug un-capped from 18 to all 147 lenders)
3. `noindex` applied to proven top-ranking pages (removed)
4. Sitemap generator hardcoded to empty slug arrays (extraction restored)

**Verified by full production build**
- 535 static HTML pages generated
- Sitemap: 647 canonical URLs
- Spot-checked present and `index, follow`:
  overpayment/atom-bank (GSC pos 2.84, 49% CTR)
  overpayment/bluestone (pos 2.08, 54% CTR)
  overpayment/vida (pos 5.03, 20% CTR)
  max-borrowing/castle-trust (pos 2.83, 83% CTR)
  guides/lenders/kent-reliance (pos 13, 22% CTR)
  uk/london

**Process note**
Typecheck alone is not sufficient verification for routing changes.
Run `npm run build` and confirm the page count before merging.
