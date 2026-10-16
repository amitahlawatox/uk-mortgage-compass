# Private daily SEO reporting (pending configuration)

**Status:** Proposed automation; this workflow does not run until merged into
the default branch and Google access is configured. Runs at 08:23 UK time
(GMT/BST; GitHub scheduled executions can be delayed).

## Why Google Sheets?

This GitHub repository is **public**. GA4 and Search Console details must NOT
be printed in job logs, commit history, GitHub issue comments, or public
artifacts. The workflow writes only **daily aggregate metrics** to a private
Google spreadsheet shared with the reporting service account. It does not
read or store individual user information or calculator inputs.

## Setup

1. Configure the existing Google Cloud project `repaywise-seo` for GitHub
   Workload Identity Federation, limited to the numeric GitHub repo and owner
   IDs and the `main` branch. Use short-lived credentials and **no JSON keys**.
2. Add `repaywise-reporting@repaywise-seo.iam.gserviceaccount.com`
   to GA4 with **Viewer** role and to the *correct GSC property* with
   read-only reporting permissions (try Restricted; increase only if required).
3. Enable `sheets.googleapis.com` on `repaywise-seo`.
4. Create a **private Google Sheet**, rename its first tab to `SEO Daily`,
   and share the spreadsheet with the service account as **Editor**. This edit
   right is for **that sheet only**; GA4 and GSC remain read-only.
5. In GitHub > repository > Settings > Secrets and variables > Actions >
   **Variables**, add:
   - `GOOGLE_WORKLOAD_IDENTITY_PROVIDER`: `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/repaywise-gh-pool/providers/repaywise-reports`
   - `GOOGLE_SERVICE_ACCOUNT`: `repaywise-reporting@repaywise-seo.iam.gserviceaccount.com`
   - `GA4_PROPERTY_ID`: numeric GA4 property ID (not measurement ID `G-...`)
   - `GSC_SITE_URL`: the exact GSC property, e.g. `sc-domain:repaywise.co.uk`
     **or** `https://repaywise.co.uk/`
   - `SEO_SHEET_ID`: ID from the private spreadsheet link
   - Optional `SEO_SHEET_TAB`: `SEO Daily` (default).
6. Once merged, run GitHub > Actions > Private daily GA4 and Search Console
   reporting > Run workflow. Verify the private sheet received a row.

## Data and limits

GA4 uses *yesterday* in UK time; Search Console uses *three days ago* to allow
for reporting lag. Empty reports are marked pending, not represented as zero.
Re-running on the same day updates the existing GA4-date row. The workflow
collects total active users, sessions, page views, Google organic search clicks,
impressions, CTR and average position.

This is a baseline daily reporter, not an autonomous content publisher, Vercel
firewall manager, or fully fledged SEO agent. It makes no production changes.

GitHub can automatically disable scheduled workflows after extended inactivity
in public repositories. Check for disabled scheduled workflows periodically.
