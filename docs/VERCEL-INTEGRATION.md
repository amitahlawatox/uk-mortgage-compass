# Vercel integration for RepayWise

**Proposed, not active until merged.** A read-only check of Vercel's official
REST API runs daily at 08:37 Europe/London, and can be triggered manually.

## Credentials

**Use a dedicated monitoring token, not the token used for deployments.**
In Vercel > Account Settings > Tokens, create a token named
`repaywise-github-seo-monitor` with access to the scope that owns the
`uk-mortgage` project. Give it a finite expiration (e.g. 90 days), and
plan for rotation. Vercel personal access tokens may be capable of actions
beyond read-only, even when the workflow only uses GET requests.

In GitHub > Repository > Settings > Secrets and variables > Actions > Secrets,
create or update the **repository secret** `VERCEL_MONITOR_TOKEN` with the
token value. Never paste the value into ChatGPT, a GitHub Actions variable,
a public GitHub file or Cloud Shell. Keep the existing `VERCEL_TOKEN` (used
for deployment) unchanged. This prevents a monitoring token rotation from
breaking deployments.

## What this workflow does

1. `GET /v9/projects/{projectId}` to verify team/project credentials.
2. `GET /v6/deployments` scoped to production to detect READY deployments and
   compare commit metadata with the current GitHub main checkout.
3. Optional `GET /v1/security/firewall/config` to verify read access; it
   **never** displays rule contents, IPs or bypass details publicly.

A mismatch can occur when an uploaded/manual deploy omits git commit
metadata, so it is **not proof** production is stale. Confirm with Vercel
deployment details and actual served page HTML before making SEO conclusions.

The workflow makes **GET requests only**. It does not deploy, block bots,
modify firewall rules, or expose private API response bodies in public logs.

## First test

1. Merge the separate Vercel redirect fix PR #31 *after review*. The existing
   Vercel deploy workflow should be rerun and verified afterward.
2. Merge this PR and open GitHub > Actions > Vercel read-only production audit
   > Run workflow. Review sanitized check results.
3. If HTTP 401/403, verify token expiration and team scope. If no recent READY
   deployment is found, inspect Vercel dashboard directly.

This is one integration component; it is not a live Vercel connector
available directly in ChatGPT. In-depth Vercel firewall request diagnosis
requires separate access to firewall observability and carefully controlled
private reporting.
