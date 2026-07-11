/**
 * RepayWise Quality Sitemap Generator
 * =====================================
 * SEO STRATEGY: Aggressive quality gate — fewer pages, stronger signals.
 *
 * WHAT IS INCLUDED (and why):
 *   1. All static / hub pages (homepage, legal, guides, new calculators)
 *   2. /calculators/{type}  — 7 base calculator pages (high-value hub pages)
 *   3. /calculators/overpayment/{lenderSlug}  — ALL lenders
 *      WHY: Overpayment pages rank #1-10 for specialist lender keywords.
 *           "[Bank] overpayment mortgage calculator" has near-zero competition.
 *           This is our proven traffic driver. Every lender gets one.
 *   4. /calculators/{other-type}/{unique-lender}  — ONLY 10 unique-content lenders
 *      WHY: These lenders have 300-500 words of genuine editorial content.
 *   5. /uk/{citySlug}  — 40 city regional pages (unique house prices, neighbourhoods, SDLT)
 *   6. /guides/lenders/{unique-lender}  — ONLY 10 unique-content lender guides
 *
 * WHAT IS EXCLUDED (and why):
 *   /calculators/{type}/{citySlug}  — city calculator variants
 *     These are identical calculators with only the city name in the title.
 *     Google flags them as "Alternate page with proper canonical" — they
 *     dilute authority across 240 near-duplicate pages. Removed.
 *   /calculators/{non-overpayment}/{non-unique-lender}
 *     Template pages where only the bank name changes. Excluded.
 *   /guides/lenders/{non-unique-lender}
 *     Template guide pages with <50 unique words. Excluded.
 *
 * HOW TO ADD MORE LENDERS TO FULL COVERAGE:
 *   1. Write unique content in src/lib/uk/lenderContent.ts
 *   2. Add the lender slug to UNIQUE_CONTENT_LENDERS below
 *   3. Run build — their calc + guide pages auto-enter the sitemap
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const publicDir = path.join(projectRoot, "public");
const siteUrl = "https://repaywise.co.uk";

// ─── QUALITY GATE ─────────────────────────────────────────────────────────────
// Mirrors src/lib/uk/uniqueLenders.ts (single source of truth for runtime code).
// Build scripts can't import .ts directly, so we duplicate the list here.
const UNIQUE_CONTENT_LENDERS = new Set([
  "barclays", "nationwide", "hsbc", "halifax", "lloyds-bank",
  "santander", "danske", "virgin-money", "natwest", "coventry",
  "accord", "leeds", "precise", "cumberland",
  "metro-bank", "principality", "suffolk", "clydesdale",
]);

// All 7 calculator types on the site
const CALC_TYPES = [
  "repayment",
  "overpayment",
  "max-borrowing",
  "stamp-duty",
  "affordability",
  "equity",
  "buy-to-let",
];

// Static / hub pages — always indexed
const STATIC_PAGES = [
  "/",
  "/about",
  "/contact",
  "/methodology",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-of-service",
  "/guides",
  "/guides/help-to-buy-repayment",
  "/guides/mortgage-overpayment-guide",
  "/calculators/compare",
  "/calculators/remortgage",
  "/calculators/home-improvement",
  "/calculators/rate-compare",
  "/calculators/fix-or-track",
  "/calculators/salary-to-mortgage",
  "/calculators/interest-only",
  "/calculators/stamp-duty/scotland",
  "/calculators/stamp-duty/wales",
  "/for-brokers",
];

// ─── SLUG EXTRACTION ──────────────────────────────────────────────────────────
// Reads slug values directly from TypeScript source files using regex.
// This keeps the sitemap in sync as lenders/cities are added — no manual updates needed.
async function extractSlugs(filePath) {
  const content = await readFile(filePath, "utf8");
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  // Filter out TypeScript type definition lines: `slug: string;`
  const slugs = matches.map((m) => m[1]).filter((s) => s !== "string");
  return [...new Set(slugs)];
}

// ─── URL BUILDER ──────────────────────────────────────────────────────────────
function url(path, priority, changefreq) {
  return { path, priority, changefreq };
}

// ─── BUILD URL LIST ───────────────────────────────────────────────────────────
const lenderSlugs = []; // replicas removed — canonical-only sitemap
const citySlugs = []; // replicas removed — canonical-only sitemap

const urls = [];

// 1. Static / hub pages
for (const p of STATIC_PAGES) {
  urls.push(
    url(
      p,
      p === "/" ? "1.0" : p.startsWith("/guides") ? "0.7" : "0.5",
      p === "/" ? "weekly" : "monthly",
    ),
  );
}

// 2. Calculator base pages (one per type, no lender/city slug)
for (const type of CALC_TYPES) {
  urls.push(url(`/calculators/${type}`, "0.9", "weekly"));
}

// 2b. Kept lender overpayment pages (solid unique content + proven ranking)
const KEEP_LENDERS = ["barclays","nationwide","hsbc","halifax","lloyds-bank","santander","danske","virgin-money","natwest","coventry","accord","leeds","precise","cumberland","metro-bank","principality","suffolk","clydesdale"];
for (const slug of KEEP_LENDERS) {
  urls.push(url(`/calculators/overpayment/${slug}`, "0.8", "weekly"));
}

// 3. Overpayment pages: ALL lenders
//    This is our #1 ranking pattern — every specialist lender gets one.
//    "[Bank] overpayment calculator" keywords have almost zero competition.
for (const slug of lenderSlugs) {
  urls.push(url(`/calculators/overpayment/${slug}`, "0.8", "weekly"));
}

// 4. Non-overpayment calculator pages
//    Rule: unique-content lenders ONLY (10 lenders). No city calc variants.
//    City calc pages are identical to the base calculator — only the title
//    changes. Google flagged 240 of these as duplicate/alternate canonical.
for (const type of CALC_TYPES) {
  if (type === "overpayment") continue; // handled above

  // Unique-content lenders: full coverage across all calc types
  for (const slug of lenderSlugs) {
    if (UNIQUE_CONTENT_LENDERS.has(slug)) {
      urls.push(url(`/calculators/${type}/${slug}`, "0.8", "weekly"));
    }
  }

  // City calc variants: EXCLUDED — thin content, identical calculator
  // Users can still navigate to /calculators/{type}/{city} via SPA routing,
  // but we don't submit these to Google. Authority consolidates on base pages.
}

// 5. City regional pages — all cities
for (const slug of citySlugs) {
  urls.push(url(`/uk/${slug}`, "0.7", "monthly"));
}

// 5b. Stamp duty city pages — UNIQUE per city (SDLT England, LBTT Scotland, LTT Wales)
//     These are NOT thin pages — the rate structure and thresholds change by country.
//     Edinburgh → LBTT. Cardiff → LTT. London → SDLT. Genuinely different outputs.
for (const slug of citySlugs) {
  urls.push(url(`/calculators/stamp-duty/${slug}`, "0.7", "monthly"));
}

// 6. Lender guide pages — ONLY unique-content lenders
//    Non-unique lender guides are template pages with <50 unique words.
//    The lender name, SVR, and LTV are plugged into boilerplate.
//    Keeping 137 thin guide pages dilutes domain authority.
for (const slug of lenderSlugs) {
  if (UNIQUE_CONTENT_LENDERS.has(slug)) {
    urls.push(url(`/guides/lenders/${slug}`, "0.7", "monthly"));
  }
}

// ─── XML BUILDER ──────────────────────────────────────────────────────────────
function buildSitemapXml(urls) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const u of urls) {
    lines.push(
      "  <url>",
      `    <loc>${siteUrl}${u.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      "  </url>",
    );
  }

  lines.push("</urlset>", "");
  return lines.join("\n");
}

// ─── WRITE OUTPUT ─────────────────────────────────────────────────────────────
const sitemapXml = buildSitemapXml(urls);

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");

// ─── REPORT ───────────────────────────────────────────────────────────────────
const overpaymentCount = lenderSlugs.length;
const uniqueLenderFullCount =
  [...lenderSlugs].filter((s) => UNIQUE_CONTENT_LENDERS.has(s)).length *
  (CALC_TYPES.length - 1);
const cityCalcExcluded = citySlugs.length * (CALC_TYPES.length - 1);
const nonUniqueLenderCalcExcluded =
  [...lenderSlugs].filter((s) => !UNIQUE_CONTENT_LENDERS.has(s)).length *
  (CALC_TYPES.length - 1);
const nonUniqueLenderGuideExcluded =
  [...lenderSlugs].filter((s) => !UNIQUE_CONTENT_LENDERS.has(s)).length;
const totalExcluded = cityCalcExcluded + nonUniqueLenderCalcExcluded + nonUniqueLenderGuideExcluded;

console.log(`\n✅ RepayWise Quality Sitemap Generated`);
console.log(`   Total URLs:            ${urls.length}`);
console.log(`   ─────────────────────────────────────`);
console.log(`   Static / hub:          ${STATIC_PAGES.length}`);
console.log(`   Calculator bases:      ${CALC_TYPES.length}`);
console.log(
  `   Overpayment (all ${lenderSlugs.length} lenders): ${overpaymentCount}`,
);
console.log(
  `   Full coverage (${UNIQUE_CONTENT_LENDERS.size} unique lenders × ${CALC_TYPES.length - 1} types): ${uniqueLenderFullCount}`,
);
console.log(`   City regional:         ${citySlugs.length}`);
console.log(`   Lender guides:         ${UNIQUE_CONTENT_LENDERS.size}`);
console.log(`   ─────────────────────────────────────`);
console.log(`   EXCLUDED (thin content):`);
console.log(`     City calc variants:  ${cityCalcExcluded} (identical calculators)`);
console.log(`     Non-unique lender:   ${nonUniqueLenderCalcExcluded} (template-swapped)`);
console.log(`     Non-unique guides:   ${nonUniqueLenderGuideExcluded} (boilerplate)`);
console.log(`     Total excluded:      ${totalExcluded}`);
console.log(
  `\n   To expand coverage: write content in lenderContent.ts → add slug to UNIQUE_CONTENT_LENDERS\n`,
);
