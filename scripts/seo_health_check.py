#!/usr/bin/env python3
"""Public, read-only daily SEO smoke test for RepayWise.

Does not authenticate as Googlebot or inspect private analytics.
A blocked request from GitHub Actions is evidence for follow-up, not proof
that verified search-engine crawlers are blocked.
"""
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import os
import sys
import xml.etree.ElementTree as ET

BASE = "https://repaywise.co.uk"
CHECKS = (
    ("/", "html"),
    ("/robots.txt", "robots"),
    ("/sitemap.xml", "sitemap"),
    ("/calculators/overpayment/atom-bank", "html"),
    ("/calculators/overpayment/barclays", "html"),
    ("/calculators/remortgage", "html"),
    ("/uk/london", "html"),
)

class PageHead(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = ""
        self.robots = ""
        self.title = ""
        self.in_title = False
        self.h1_count = 0

    def handle_starttag(self, tag, attrs):
        at = dict(attrs)
        if tag == "link" and "canonical" in (at.get("rel") or "").lower().split():
            self.canonical = at.get("href", "")
        elif tag == "meta" and (at.get("name") or "").lower() == "robots":
            self.robots = at.get("content", "")
        elif tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.h1_count += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data

def get(url):
    request = Request(url, headers={"User-Agent": "RepayWise-Daily-SEO-Monitor/1.0"})
    try:
        with urlopen(request, timeout=25) as response:
            return response.status, response.geturl(), response.read(2000000).decode("utf-8", "replace"), ""
    except HTTPError as exc:
        return exc.code, exc.geturl(), exc.read(50000).decode("utf-8", "replace"), ""
    except (URLError, TimeoutError, OSError) as exc:
        return 0, url, "", str(exc).replace("|", "/")[:160]

def main():
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = ["# RepayWise SEO health check", "", f"Run: {now}", "",
             "Read-only synthetic checks from a GitHub-hosted runner. "
             "This does **not** verify genuine Googlebot/Bingbot access or show GA4/GSC data.", "",
             "| Path | Status | Final host | Notes |",
             "|---|---:|---|---|"]
    critical = []
    warnings = []

    for path, kind in CHECKS:
        code, final_url, body, error = get(BASE + path)
        host = urlparse(final_url).netloc
        notes = []
        if code != 200:
            critical.append(f"{path}: HTTP {code or 'connection failure'}")
            notes.append(error or "Unexpected HTTP status")
        elif "security checkpoint" in body.lower() or "vercel security" in body.lower():
            critical.append(f"{path}: security challenge returned")
            notes.append("Security challenge")
        elif kind == "html":
            head = PageHead()
            head.feed(body)
            if "noindex" in head.robots.lower():
                critical.append(f"{path}: noindex directive")
                notes.append("Noindex")
            if not head.title.strip():
                critical.append(f"{path}: missing initial HTML title")
                notes.append("No server-rendered title")
            if not head.canonical:
                warnings.append(f"{path}: missing canonical in HTML")
                notes.append("No canonical")
            elif urlparse(head.canonical).netloc != "repaywise.co.uk":
                warnings.append(f"{path}: canonical host is {urlparse(head.canonical).netloc}")
                notes.append("Canonical host differs")
            if head.h1_count == 0:
                warnings.append(f"{path}: initial HTML contains no H1")
                notes.append("No initial H1")
        elif kind == "sitemap":
            try:
                root = ET.fromstring(body)
                ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
                locs = root.findall(".//sm:loc", ns)
                if not locs:
                    locs = root.findall(".//loc")
                count = len(locs)
                notes.append(f"{count} URLs")
                if count < 400:
                    critical.append(f"Sitemap has only {count} URLs (expected at least 400)")
            except ET.ParseError:
                critical.append("Sitemap is not valid XML")
                notes.append("Invalid XML")
        elif kind == "robots":
            if "User-agent: Googlebot" not in body:
                warnings.append("robots.txt: Googlebot section not found")
                notes.append("No explicit Googlebot section")
            if "sitemap:" not in body.lower():
                warnings.append("robots.txt: sitemap declaration missing")
                notes.append("No sitemap declaration")

        if code == 200 and host != "repaywise.co.uk":
            warnings.append(f"{path}: redirects to {host}; check canonical consistency")
            notes.append("Host redirect: verify canonical")
        note_text = "; ".join(notes) if notes else "OK"
        lines.append(f"| `{path}` | {code or 'Error'} | `{host}` | {note_text.replace('|', '/')} |")

    lines.extend(["", f"**Critical alerts:** {len(critical)}",
                  f"**Warnings:** {len(warnings)}", ""])
    if critical:
        lines.append("## Critical alerts")
        lines.extend(f"- {x}" for x in critical)
    if warnings:
        lines.append("## Warnings")
        lines.extend(f"- {x}" for x in warnings)
    lines.extend(["", "## Interpretation",
                  "A firewall challenge to this synthetic monitor is **not** proof that a verified crawler "
                  "is blocked. Correlate with Vercel Firewall logs and Search Console crawl statistics.",
                  "If the deployment monitor fails, inspect the latest Vercel production build before publishing content."])
    report = "\n".join(lines) + "\n"
    print(report)
    if os.getenv("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as stream:
            stream.write(report)
    sys.exit(1 if critical else 0)

if __name__ == "__main__":
    main()
