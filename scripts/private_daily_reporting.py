#!/usr/bin/env python3
"""Daily aggregate GA4/GSC metrics -> private Google Sheet. No user-level data."""
import os
import sys
from datetime import datetime, timedelta
from urllib.parse import quote
from zoneinfo import ZoneInfo

import google.auth
from google.auth.transport.requests import AuthorizedSession

SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
]
HEADER = [
    "GA4 date (UK)", "Active users", "Sessions", "Page views",
    "GSC date (UK)", "Google clicks", "Impressions", "CTR (%)",
    "Average position", "GSC status", "Updated at (UK)",
]


def required(name):
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing configuration variable: {name}")
    return value


def request_json(session, method, url, label, *, json_body=None, params=None):
    response = session.request(
        method, url, json=json_body, params=params, timeout=40,
    )
    if not response.ok:
        # Do not copy private API response bodies into a public Actions log.
        raise RuntimeError(
            f"{label}: HTTP {response.status_code}; check API access and configuration"
        )
    return response.json()


def ga4_metrics(session, property_id, day):
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{quote(property_id, safe='')}:runReport"
    data = request_json(session, "POST", url, "GA4 report", json_body={
        "dateRanges": [{"startDate": day, "endDate": day}],
        "metrics": [
            {"name": "activeUsers"}, {"name": "sessions"},
            {"name": "screenPageViews"},
        ],
    })
    rows = data.get("rows", [])
    if not rows:
        return ["", "", ""]
    return [int(float(x["value"])) for x in rows[0]["metricValues"]]


def gsc_metrics(session, site_url, day):
    url = (
        "https://searchconsole.googleapis.com/webmasters/v3/sites/"
        f"{quote(site_url, safe='')}/searchAnalytics/query"
    )
    data = request_json(session, "POST", url, "GSC report", json_body={
        "startDate": day,
        "endDate": day,
        "type": "web",
        "rowLimit": 1,
    })
    rows = data.get("rows", [])
    if not rows:
        return ["", "", "", "", "PENDING_OR_NO_DATA"]
    row = rows[0]
    return [
        row.get("clicks", ""), row.get("impressions", ""),
        round(100 * row.get("ctr", 0), 3),
        round(row.get("position", 0), 2),
        "AVAILABLE",
    ]


def sheet_url(sheet_id, cell_range):
    return (
        f"https://sheets.googleapis.com/v4/spreadsheets/{quote(sheet_id, safe='')}"
        f"/values/{quote(cell_range, safe='')}"
    )


def save_daily_row(session, sheet_id, tab, row):
    column = f"'{tab}'!A:A"
    data = request_json(
        session, "GET", sheet_url(sheet_id, column),
        "Read report dates", params={"valueRenderOption": "FORMATTED_VALUE"},
    )
    dates = [x[0] if x else "" for x in data.get("values", [])]
    if not dates:
        request_json(
            session, "PUT", sheet_url(sheet_id, f"'{tab}'!A1:K1"),
            "Create report header",
            params={"valueInputOption": "RAW"},
            json_body={"values": [HEADER]},
        )
        dates = [HEADER[0]]

    if row[0] in dates:
        idx = dates.index(row[0]) + 1
        request_json(
            session, "PUT",
            sheet_url(sheet_id, f"'{tab}'!A{idx}:K{idx}"),
            "Update daily row",
            params={"valueInputOption": "RAW"},
            json_body={"values": [row]},
        )
        return "updated"

    request_json(
        session, "POST", sheet_url(sheet_id, f"'{tab}'!A:K") + ":append",
        "Append daily row",
        params={"valueInputOption": "RAW", "insertDataOption": "INSERT_ROWS"},
        json_body={"values": [row]},
    )
    return "appended"


def main():
    ga4_property = required("GA4_PROPERTY_ID")
    if not ga4_property.isdigit():
        raise RuntimeError("GA4_PROPERTY_ID should be a numeric GA4 property ID")
    site_url = required("GSC_SITE_URL")
    if not (site_url.startswith("sc-domain:") or site_url.startswith("https://")):
        raise RuntimeError("GSC_SITE_URL must match the exact verified property")
    sheet_id = required("SEO_SHEET_ID")
    tab = os.getenv("SEO_SHEET_TAB", "SEO Daily").strip()
    if "'" in tab:
        raise RuntimeError("SEO_SHEET_TAB must not contain an apostrophe")

    now = datetime.now(ZoneInfo("Europe/London"))
    ga4_day = (now.date() - timedelta(days=1)).isoformat()
    # Search Console data is typically delayed by multiple days.
    gsc_day = (now.date() - timedelta(days=3)).isoformat()

    credentials, _ = google.auth.default(scopes=SCOPES)
    session = AuthorizedSession(credentials)
    ga4 = ga4_metrics(session, ga4_property, ga4_day)
    gsc = gsc_metrics(session, site_url, gsc_day)
    row = [ga4_day, *ga4, gsc_day, *gsc, now.isoformat(timespec="seconds")]
    action = save_daily_row(session, sheet_id, tab, row)

    # Public Actions repository: print operational status ONLY, not metrics.
    print(f"Private daily GA4/GSC sheet report {action}; no metrics logged.")
    if os.getenv("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write("## Private RepayWise daily report\n\n")
            f.write(f"Daily aggregate metrics {action} to the private spreadsheet.\n")
            f.write("Numbers intentionally omitted from this public GitHub repository.\n")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"SEO reporting failed: {exc}", file=sys.stderr)
        sys.exit(1)
