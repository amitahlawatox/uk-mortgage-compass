#!/usr/bin/env python3
"""Time-boxed SEO sprint planning: one actionable daily focus, no user data."""
from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo
import os

START = date(2026, 10, 17)
END = date(2026, 10, 31)
DAYS = [
    ("Verify live deployment and canonical domain", "Check non-www/www redirect, correct <title>, canonicals, robots, sitemap and example static HTML before SEO edits."),
    ("Inventory Search Console redirect and 404 examples", "Correlate the exported GSC page exclusions with source routes and Vercel redirects. Capture examples in a private report."),
    ("Check search-crawler firewall access", "Correlate Vercel firewall observations and Search Console crawl statistics; do not infer Googlebot blocks from synthetic monitoring."),
    ("Protect the existing overpayment traffic pages", "Verify indexing, canonical, content and internal links for Atom Bank, Bluestone, Vida and other historically ranking URLs."),
    ("Resolve broken internal navigation", "Audit menu, footer and calculator links; fix dead-end and obsolete URLs by reviewable pull request."),
    ("Find high-impression, weak-CTR keywords", "Use recent Search Console data to prioritise queries by ranking, impressions, CTR and matching landing page."),
    ("Audit titles, headings and schema", "Inspect the leading calculator pages; remove duplicate title/canonical/schema, correct missing H1 and invalid JSON-LD."),
    ("Improve Core Web Vitals with evidence", "Compare mobile LCP/CLS/INP and actual waterfall; propose a low-risk performance improvement with before/after tests."),
    ("Check calculator correctness", "Review mortgage amortisation, rounding and current UK stamp-duty assumptions. Add reliable test cases without collecting inputs."),
    ("Strengthen YMYL trust and privacy", "Review financial disclaimers, sources, methodology, editorial ownership and consent/GA4 collection."),
    ("Plan search-intent content clusters", "Draft a short-list of mortgage intent topics supported by GSC and avoid thin or repetitive city/lender pages."),
    ("Improve mortgage overpayment guidance", "Draft an evidenced update to the existing overpayment guide with accurate calculations, citations and internal links."),
    ("Improve remortgage cost guidance", "Draft practical remortgage fees/break-even guidance consistent with the calculator outputs and UK regulations."),
    ("Build legitimate mentions and distribution", "Develop genuine broker/blogger directory partnerships; no paid links, spam or customer data collection."),
    ("Evaluate 15-day recovery and next sprint", "Compare verified organic clicks, users, indexing and deployment health to baseline; prioritise the next 30 days."),
]


def main():
    today = datetime.now(ZoneInfo("Europe/London")).date()
    manual = os.environ.get("GITHUB_EVENT_NAME") == "workflow_dispatch"
    active = START <= today <= END
    day_number = (today - START).days + 1 if active else (1 if manual else 0)
    run = active or manual
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as f:
            f.write("active=" + ("true" if run else "false") + "\n")
    lines = [
        "# RepayWise 15-day SEO recovery sprint",
        "",
        "Scheduled window: 17-31 October 2026 at 05:00 Europe/London.",
        f"UK date: {today.isoformat()}",
        "",
    ]
    if run:
        title, focus = DAYS[day_number - 1]
        lines += [
            f"## Day {day_number}/15: {title}",
            "",
            focus,
            "",
            "### Automated checks in this workflow",
            "- Private aggregate GA4/Search Console daily row (no numbers in public logs).",
            "- Read-only Vercel project, production deployment and firewall API status.",
            "- Public site HTML, robots, sitemap and priority calculator smoke checks.",
            "",
            "### Human/agent follow-up needed",
            "This day's research, writing or code changes are a work objective, **not**",
            "an automatically executed AI edit. Review evidence and draft an isolated",
            "pull request; do not merge, deploy or alter security without approval.",
        ]
        if not active:
            lines += ["", "**Manual test outside sprint dates:** day 1 focus shown."]
    else:
        lines.append("Outside the 15-day sprint; no reports or checks triggered.")
    summary = "\n".join(lines) + "\n"
    print(summary)
    if os.getenv("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write(summary)


if __name__ == "__main__":
    main()
