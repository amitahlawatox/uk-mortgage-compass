# RepayWise: 15-day SEO recovery sprint

**17-31 October 2026, 05:00 Europe/London each day (BST to GMT switch
handled by GitHub schedule timezone).**

The new workflow `RepayWise 15-day 5AM SEO sprint` collects:
- Search Console & GA4 daily aggregates into an existing **private Google Sheet**
  using the already configured Google Workload Identity Federation access.
- Read-only Vercel deployment and firewall API health.
- Synthetic crawlability checks for robots, sitemap, and selected high-value pages.
- The **day's priority** in the GitHub Actions summary. No analytics figures,
  tokens or private firewall data are posted to the public repository.

A GitHub Actions schedule is not an autonomous AI coding agent. **It cannot
research fresh financial rules, publish articles or autonomously create tested
pull requests without a separately provisioned agent runtime**. The day plans
are an actionable queue for the SEO manager; deterministic checks are automated.
ChatGPT's unattended tasks cannot currently be created in this workspace
because workspace policy requires interactive approval of connected-app access.
An admin change or a suitable agent service is needed for fully unattended
AI execution. Never store visitor inputs or personal data.

## Days and acceptance criteria

| Day | Date | Core objective | Completion signal |
|---:|---|---|---|
| 1 | 17 Oct | Verify production/canonical/robots/sitemap | HTML and route evidence |
| 2 | 18 Oct | Triage GSC redirect errors and 404s | Evidence-backed fix queue |
| 3 | 19 Oct | Examine verified crawler vs Vercel firewall | Correlated crawl + firewall evidence |
| 4 | 20 Oct | Audit historically ranking overpayment URLs | Ranking-page safeguard list |
| 5 | 21 Oct | Audit internal links and obsolete URLs | Reviewed link-fix PR |
| 6 | 22 Oct | Identify high-impression keyword opportunities | Prioritised URL/query shortlist |
| 7 | 23 Oct | Correct titles, H1, schema | Validated metadata PR |
| 8 | 24 Oct | Performance/LCP review | Before/after measurement |
| 9 | 25 Oct | UK calculator correctness + tax assumptions | Reviewed tests and sources |
| 10 | 26 Oct | Privacy, regulatory disclaimer, trust | Consent and YMYL checklist |
| 11 | 27 Oct | SEO topic clustering | Evidence-led content briefs |
| 12 | 28 Oct | Existing overpayment guide refresh | Reviewed editorial PR |
| 13 | 29 Oct | Remortgage costs content | Reviewed editorial PR |
| 14 | 30 Oct | Legitimate backlinks/distribution | Quality outreach targets |
| 15 | 31 Oct | Evaluate indexing/visitors; next sprint | Private KPI review |

**Approval model:** Changes to live code, ads, firewall, DNS, and deployment
remain behind reviewed pull requests. Fixes are judged by crawl/indexing data,
not unverified promises of ranking increases.

## Running and visibility

Merge only after reviewing the workflow. Test manually in GitHub Actions, then
look under Actions > RepayWise 15-day 5AM SEO sprint. Expect ~05:00 UK but
GitHub may delay scheduled jobs under load. GitHub runs on the default branch.
The cron is limited to October 17-31. A script refuses scheduled processing
outside **2026**, so a subsequent October will not run expensive audits.

The pre-existing 08:23 private reporting and 08:37 Vercel monitoring schedules
remain in place as long-term fallbacks. Additional early runs are idempotent
for daily GA4 rows; compare GSC lag before making decisions.

**User targets:** 100 daily users by 16 Nov and 500 by March 2027 are
aspirations, not assured outcomes. Only aggregate, privacy-respecting metrics.
