#!/usr/bin/env python3
"""Save Google-indexed crawl snapshots for priority URLs to a private Sheet.

URL Inspection reports Google's indexed version, not a live fetch. Keep the
results out of public GitHub Actions logs and never treat them as proof that
current firewall rules allow verified crawlers.
"""

import os
import sys
from datetime import datetime
from urllib.parse import quote
from zoneinfo import ZoneInfo

import google.auth
from google.auth.transport.requests import AuthorizedSession

from private_daily_reporting import request_json, required, sheet_url

SCOPES = [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
]
BASE = "https://repaywise.co.uk"
PATHS = [
    "/",
    "/guides",
    "/calculators/overpayment/precise",
    "/calculators/overpayment/cumberland",
    "/news/your-first-home-equity-loan-2026",
    "/news/lifetime-isa-withdrawal-charge-2026",
]
HEADER = [
    "Inspection date (UK)",
    "URL",
    "Google last crawl (UTC)",
    "Page fetch state (indexed snapshot)",
    "Robots state (indexed snapshot)",
    "Indexing state (indexed snapshot)",
    "Index verdict",
    "Declared canonical",
    "Google canonical",
    "Recorded at (UK)",
]


def inspect_url(session, site_url, url):
    data = request_json(
        session,
        "POST",
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        "Search Console URL inspection",
        json_body={"inspectionUrl": url, "siteUrl": site_url},
    )
    result = data.get("inspectionResult", {}).get("indexStatusResult", {})
    return [
        result.get("lastCrawlTime", ""),
        result.get("pageFetchState", ""),
        result.get("robotsTxtState", ""),
        result.get("indexingState", ""),
        result.get("verdict", ""),
        result.get("userCanonical", ""),
        result.get("googleCanonical", ""),
    ]


def ensure_tab(session, sheet_id, tab):
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{quote(sheet_id, safe='')}"
    data = request_json(
        session, "GET", url, "Read private spreadsheet tabs",
        params={"fields": "sheets(properties(title))"},
    )
    titles = {sheet.get("properties", {}).get("title") for sheet in data.get("sheets", [])}
    if tab not in titles:
        request_json(
            session, "POST", url + ":batchUpdate", "Create private crawl tab",
            json_body={"requests": [{"addSheet": {"properties": {"title": tab}}}]},
        )


def save_rows(session, sheet_id, tab, rows):
    column = f"'{tab}'!A:B"
    data = request_json(
        session, "GET", sheet_url(sheet_id, column), "Read inspection dates",
        params={"valueRenderOption": "FORMATTED_VALUE"},
    )
    values = data.get("values", [])
    if not values:
        request_json(
            session, "PUT", sheet_url(sheet_id, f"'{tab}'!A1:J1"),
            "Create inspection header",
            params={"valueInputOption": "RAW"},
            json_body={"values": [HEADER]},
        )
        values = [HEADER]

    positions = {
        (value[0], value[1]): index
        for index, value in enumerate(values, start=1)
        if len(value) >= 2
    }
    for row in rows:
        position = positions.get((row[0], row[1]))
        if position:
            request_json(
                session, "PUT", sheet_url(sheet_id, f"'{tab}'!A{position}:J{position}"),
                "Update private inspection row",
                params={"valueInputOption": "RAW"},
                json_body={"values": [row]},
            )
        else:
            request_json(
                session, "POST", sheet_url(sheet_id, f"'{tab}'!A:J") + ":append",
                "Append private inspection row",
                params={"valueInputOption": "RAW", "insertDataOption": "INSERT_ROWS"},
                json_body={"values": [row]},
            )


def main():
    site_url = required("GSC_SITE_URL")
    if not (site_url.startswith("sc-domain:") or site_url.startswith("https://")):
        raise RuntimeError("GSC_SITE_URL must match the verified property")
    sheet_id = required("SEO_SHEET_ID")
    tab = os.getenv("SEO_CRAWL_TAB", "SEO Crawl").strip()
    if not tab or "'" in tab:
        raise RuntimeError("SEO_CRAWL_TAB must be a simple sheet tab name")

    now = datetime.now(ZoneInfo("Europe/London"))
    credentials, _ = google.auth.default(scopes=SCOPES)
    session = AuthorizedSession(credentials)
    ensure_tab(session, sheet_id, tab)
    rows = [
        [now.date().isoformat(), BASE + path, *inspect_url(session, site_url, BASE + path),
         now.isoformat(timespec="seconds")]
        for path in PATHS
    ]
    save_rows(session, sheet_id, tab, rows)
    print("Private Search Console indexed-snapshot audit updated; no results logged.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Private index inspection failed: {exc}", file=sys.stderr)
        sys.exit(1)
