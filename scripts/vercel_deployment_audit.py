#!/usr/bin/env python3
"""Read-only Vercel API diagnostic. Prints sanitized operational status only."""
import json
import os
import sys
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, quote
from urllib.request import Request, urlopen


def require(name):
    val = os.environ.get(name, "").strip()
    if not val:
        raise ValueError(f"Missing {name}; add it in GitHub Actions configuration")
    return val


def get_json(token, endpoint, params, *, optional=False):
    qs = urlencode(params)
    url = "https://api.vercel.com" + endpoint + ("?" + qs if qs else "")
    req = Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
            "User-Agent": "RepayWise-ReadOnly-Deployment-Audit/1.0",
        },
        method="GET",
    )
    try:
        with urlopen(req, timeout=30) as response:
            return json.load(response), "OK"
    except HTTPError as exc:
        # Avoid printing Vercel response bodies that may reveal account data.
        if optional:
            return None, f"HTTP {exc.code} (optional endpoint)"
        raise RuntimeError(
            f"Vercel API returned HTTP {exc.code}. Check token scope, team, and project IDs."
        ) from None
    except (URLError, TimeoutError, OSError):
        if optional:
            return None, "Network error (optional endpoint)"
        raise RuntimeError("Vercel API could not be reached") from None


def sha_from_deployment(dep):
    meta = dep.get("meta") or {}
    git = dep.get("gitSource") or {}
    return (
        meta.get("githubCommitSha")
        or meta.get("gitCommitSha")
        or git.get("sha")
        or ""
    )


def main():
    token = require("VERCEL_TOKEN")
    team_id = require("VERCEL_TEAM_ID")
    project_id = require("VERCEL_PROJECT_ID")
    expected_sha = os.getenv("GITHUB_SHA", "").strip()

    project, _ = get_json(
        token,
        "/v9/projects/" + quote(project_id, safe=""),
        {"teamId": team_id},
    )
    if not isinstance(project, dict) or str(project.get("id", "")) != project_id:
        raise RuntimeError("Vercel project lookup returned an unexpected project")

    payload, _ = get_json(
        token, "/v6/deployments",
        {"teamId": team_id, "projectId": project_id, "target": "production", "limit": 25},
    )
    deployments = payload.get("deployments", [])
    latest = deployments[0] if deployments else {}
    last_ready = next(
        (d for d in deployments if d.get("readyState", d.get("state")) == "READY"),
        None,
    )
    latest_status = latest.get("readyState") or latest.get("state") or "UNKNOWN"
    ready_status = "FOUND" if last_ready else "NOT_FOUND"
    ready_sha = sha_from_deployment(last_ready or {})
    same_commit = (
        "MATCH" if expected_sha and ready_sha == expected_sha else
        "DIFFERENT" if expected_sha and ready_sha else
        "UNAVAILABLE"
    )
    # Optional GET-only request. Never print the security policy or IP data
    # into a public repository Actions log.
    _, firewall_status = get_json(
        token, "/v1/security/firewall/config",
        {"teamId": team_id, "projectId": project_id}, optional=True,
    )

    lines = [
        "# RepayWise: Vercel read-only deployment audit",
        "",
        "Run: " + datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "",
        "| Check | Result |",
        "|---|---|",
        "| Team/project API authentication | SUCCESS |",
        f"| Most recent deployment state | {latest_status} |",
        f"| Recent READY production deployment | {ready_status} |",
        f"| READY deployment matches latest GitHub main SHA | {same_commit} |",
        f"| Firewall configuration read API | {firewall_status} |",
        "",
        "**Note:** Git SHA may be missing from manually uploaded Vercel deployments. "
        "DIFFERENT or UNAVAILABLE is a triage signal, not conclusive evidence "
        "of outdated source. A READY deployment is not proof that the live "
        "domain points at it. Check domain alias assignment and production HTML.",
        "",
        "Only GET API requests were used. No Vercel settings, security rules, "
        "or deployments were changed. No raw private API payloads are logged.",
    ]
    summary = "\n".join(lines) + "\n"
    print(summary)
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write(summary)
    if not last_ready:
        raise RuntimeError("No READY production deployment found among latest 25")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Vercel audit failed: {exc}", file=sys.stderr)
        sys.exit(1)
