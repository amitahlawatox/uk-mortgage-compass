#!/usr/bin/env python3
"""
RepayWise Technical SEO Skills — Automated Sanity Checks
=========================================================
Three audits to enforce the RepayWise Technical SEO Rules:
  1. Meta & Heading Auditor
  2. Layout Shift Guard
  3. JSON-LD Schema Validator

Usage:
    python seo_skills.py                       # audit all page files
    python seo_skills.py src/pages/Index.tsx   # audit a specific file
"""

import json
import os
import re
import sys
from pathlib import Path

PAGES_DIR = Path("src/pages")
COMPONENTS_DIR = Path("src/components")

# ─── 1. Meta & Heading Auditor ─────────────────────────────────────────────────

# Components that render their own <h1> from a `title` prop.
# Pages using these wrappers don't need an inline <h1>.
H1_WRAPPER_COMPONENTS = {"CalculatorShell"}


def audit_meta_and_headings(filepath: Path) -> list[str]:
    """Check that a page file has exactly one <h1> and a defined SEO/meta layout."""
    issues = []
    content = filepath.read_text(encoding="utf-8")

    # Count h1 tags (JSX style: <h1 ... > )
    h1_matches = re.findall(r"<h1[\s>]", content)

    # Detect wrapper components that provide their own <h1>
    uses_h1_wrapper = any(
        re.search(rf"<{comp}[\s\n]", content) for comp in H1_WRAPPER_COMPONENTS
    )

    if len(h1_matches) == 0 and not uses_h1_wrapper:
        issues.append(f"  MISSING <h1>: No h1 tag found (and no H1-providing wrapper component).")
    elif len(h1_matches) > 1:
        issues.append(f"  MULTIPLE <h1>: Found {len(h1_matches)} h1 tags (must be exactly 1).")

    # Check for SEO component usage (provides meta title + description)
    has_seo_component = bool(re.search(r"<SEO[\s\n]", content))
    has_meta_title = bool(re.search(r'title\s*=\s*["\'{]', content))
    has_meta_desc = bool(re.search(r'description\s*=\s*["\'{]', content))

    if not has_seo_component:
        issues.append(f"  MISSING META: No <SEO> component found (provides title/description).")
    else:
        if not has_meta_title:
            issues.append(f"  MISSING TITLE: <SEO> component present but no title prop detected.")
        if not has_meta_desc:
            issues.append(f"  MISSING DESCRIPTION: <SEO> component present but no description prop detected.")

    return issues


# ─── 2. Layout Shift Guard ─────────────────────────────────────────────────────

DIMENSION_PATTERNS = re.compile(
    r"(min-h-|min-w-|aspect-|h-\[|w-\[|min-height|min-width|aspect-ratio)"
)

CONTAINER_PATTERNS = re.compile(
    r"(className\s*=\s*[\"'][^\"']*(?:grid|flex|container|card|wrapper|shell|section)[^\"']*[\"'])",
    re.IGNORECASE,
)


def audit_layout_shift(filepath: Path) -> list[str]:
    """Scan UI component sheets for containers missing explicit dimensions."""
    issues = []
    content = filepath.read_text(encoding="utf-8")
    lines = content.splitlines()

    # Only flag actual JSX elements (lines opening a tag with className) that
    # render dynamic/calculator content without explicit height/width constraints.
    dynamic_keywords = re.compile(
        r"(result|output|display|chart|graph|skeleton)", re.IGNORECASE
    )

    for i, line in enumerate(lines, start=1):
        # Must be a JSX element line (contains < or className) to be relevant
        if not re.search(r"(<\w|className)", line):
            continue
        # Must reference a dynamic content keyword
        if not dynamic_keywords.search(line):
            continue
        # Check this line and surrounding 4 lines for dimension classes
        context = "\n".join(lines[max(0, i - 4):min(len(lines), i + 4)])
        if not DIMENSION_PATTERNS.search(context):
            stripped = line.strip()[:80]
            issues.append(
                f"  CLS RISK (line {i}): Dynamic block without explicit dimensions: {stripped}"
            )

    return issues


# ─── 3. JSON-LD Schema Validator ───────────────────────────────────────────────

def audit_json_ld(filepath: Path) -> list[str]:
    """Verify that JSON-LD structured data blocks use valid JSON syntax."""
    issues = []
    content = filepath.read_text(encoding="utf-8")

    # Pattern 1: jsonLd prop objects (JSX inline objects like jsonLd={{ ... }})
    # These are JSX expressions, not raw JSON. Ternaries, spread syntax, and
    # template literals are valid JSX but cannot be statically parsed to JSON.
    # We only flag blocks that are clearly malformed (mismatched braces, etc.)
    # rather than failing on JSX features the regex converter can't handle.
    json_ld_blocks = re.finditer(
        r"jsonLd\s*=\s*\{\{([\s\S]*?)\}\}", content
    )
    for match in json_ld_blocks:
        raw = match.group(1).strip()
        # Skip blocks that contain JSX expressions the converter can't handle:
        # ternaries, spread syntax, template literals, or JS variable references
        has_jsx_expressions = bool(re.search(
            r"(\?\.|"                               # optional chaining
            r"\.\.\.\(|"                            # spread syntax
            r"`\$\{|"                               # template literals
            r"\?\s*\{|"                             # ternary with object
            r":\s*\{\s*\}\s*\)|"                    # empty object in ternary
            r":\s*[a-z][a-zA-Z]*\.[a-zA-Z]|"       # variable.property as value
            r":\s*[a-z][a-zA-Z]+[,\s\n}\]])",       # bare variable as value
            raw
        ))
        if has_jsx_expressions:
            continue
        json_str = _js_object_to_json(raw)
        try:
            json.loads(json_str)
        except json.JSONDecodeError as e:
            line_num = content[:match.start()].count("\n") + 1
            issues.append(f"  INVALID JSON-LD (line {line_num}): {e.msg} — near: {raw[:60]}...")

    # Pattern 2: script type="application/ld+json" blocks
    script_blocks = re.finditer(
        r'<script[^>]*type\s*=\s*["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>',
        content,
    )
    for match in script_blocks:
        raw = match.group(1).strip()
        try:
            json.loads(raw)
        except json.JSONDecodeError as e:
            line_num = content[:match.start()].count("\n") + 1
            issues.append(f"  INVALID JSON-LD SCRIPT (line {line_num}): {e.msg}")

    return issues


def _js_object_to_json(js_str: str) -> str:
    """Best-effort conversion of a JS object literal to JSON for validation."""
    s = js_str
    # Protect quoted strings from key-quoting regex by replacing them temporarily
    strings: list[str] = []

    def _stash_string(m: re.Match) -> str:
        strings.append(m.group(0))
        return f'"__STR{len(strings) - 1}__"'

    s = re.sub(r'"[^"]*"', _stash_string, s)
    # Add quotes around unquoted keys including @-prefixed (safe now that strings are stashed)
    s = re.sub(r'(@?\w+)\s*:', r'"\1":', s)
    # Restore stashed strings
    for idx, original in enumerate(strings):
        s = s.replace(f'"__STR{idx}__"', original)
    # Replace single quotes with double quotes
    s = s.replace("'", '"')
    # Wrap in braces first, then remove trailing commas
    s = "{" + s + "}"
    s = re.sub(r",\s*([}\]])", r"\1", s)
    return s


# ─── Runner ────────────────────────────────────────────────────────────────────

def run_audit(targets: list[Path]) -> int:
    """Run all three audits on target files. Returns count of issues found."""
    total_issues = 0

    print("=" * 70)
    print("  RepayWise SEO Skills — Automated Sanity Check")
    print("=" * 70)

    # Audit 1: Meta & Heading (page files)
    print("\n[1/3] META & HEADING AUDITOR")
    print("-" * 40)
    page_files = [f for f in targets if "pages" in str(f)]
    if not page_files:
        page_files = list(PAGES_DIR.rglob("*.tsx"))
    for f in sorted(page_files):
        issues = audit_meta_and_headings(f)
        if issues:
            print(f"\n  {f}")
            for issue in issues:
                print(issue)
            total_issues += len(issues)
        else:
            print(f"  ✓ {f}")

    # Audit 2: Layout Shift Guard (component files)
    print("\n\n[2/3] LAYOUT SHIFT GUARD (CLS = 0.00)")
    print("-" * 40)
    component_files = [f for f in targets if "components" in str(f)]
    if not component_files:
        component_files = list(COMPONENTS_DIR.rglob("*.tsx"))
    cls_issues_total = 0
    for f in sorted(component_files):
        issues = audit_layout_shift(f)
        if issues:
            print(f"\n  {f}")
            for issue in issues[:5]:  # limit noise
                print(issue)
            if len(issues) > 5:
                print(f"  ... and {len(issues) - 5} more")
            cls_issues_total += len(issues)
    if cls_issues_total == 0:
        print("  ✓ All component containers have explicit dimensions.")
    total_issues += cls_issues_total

    # Audit 3: JSON-LD Validator (all target files)
    print("\n\n[3/3] JSON-LD SCHEMA VALIDATOR")
    print("-" * 40)
    all_files = targets if targets else list(PAGES_DIR.rglob("*.tsx"))
    json_issues_total = 0
    for f in sorted(all_files):
        issues = audit_json_ld(f)
        if issues:
            print(f"\n  {f}")
            for issue in issues:
                print(issue)
            json_issues_total += len(issues)
    if json_issues_total == 0:
        print("  ✓ All JSON-LD blocks are syntactically valid.")
    total_issues += json_issues_total

    # Summary
    print("\n" + "=" * 70)
    if total_issues == 0:
        print(f"  RESULT: ALL CHECKS PASSED — 0 issues found.")
    else:
        print(f"  RESULT: {total_issues} issue(s) found. Review above.")
    print("=" * 70)

    return total_issues


if __name__ == "__main__":
    os.chdir(Path(__file__).parent)

    if len(sys.argv) > 1:
        targets = [Path(arg) for arg in sys.argv[1:]]
    else:
        targets = list(PAGES_DIR.rglob("*.tsx"))

    issues = run_audit(targets)
    sys.exit(1 if issues > 0 else 0)
