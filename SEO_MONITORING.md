# RepayWise automated operations: public SEO monitor

This PR introduces a **read-only** daily external site check. The GitHub Action
runs at 08:17 Europe/London, with an optional manual run from the Actions tab.
It validates the home page, robots.txt, sitemap XML URL count, and several
historically important calculator/regional pages.

## Where to see each report
GitHub -> Actions -> Daily SEO health check -> latest run -> Summary.
Critical errors fail the workflow so GitHub can send an Actions failure
notification according to the account's notification settings.

## Scope and limits
* Never changes Vercel firewall rules, deploys code, or reads private user data.
* The monitor's user agent is **not** verified Googlebot. A security challenge to
  this monitor merits investigation but cannot prove real Googlebot is blocked.
* A 200 response does not mean Google indexed the page.
* Reports are in a **public repository**. Never print keys, IP logs,
  individual-level analytics, or private Search Console/GA4/Vercel data here.
* For automated private daily GA4/GSC/Vercel reports use a separate **private**
  operations repository or private reporting destination with secrets managed
  in GitHub Actions (not checked into code).
* GitHub may automatically disable scheduled workflows in public repositories
  after 60 days of inactivity. Check its status periodically or migrate to a
  private operations repository for long-lived reporting.

## Before treating alerts as confirmed SEO incidents
Correlate status changes with Search Console indexing/crawl stats, current
Vercel production deployments, and Vercel Firewall logs; check that the
canonical domain is intentionally the non-www host.

## Outstanding issue
The existing "Deploy to Vercel" workflow's last three runs on 7 Aug 2026 failed.
This monitor does not fix that deployment workflow. The build passed but
deployment failed on the latest run. Investigate the specific deployment error.
