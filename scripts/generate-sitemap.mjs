/**
 * RepayWise Quality Sitemap Generator
 * =====================================
 * SEO STRATEGY: Quality over quantity.
 *
 * WHAT IS INCLUDED (and why):
 *   1. All static / hub pages
 *   2. /calculators/{type}  — 7 base calculator pages (high-value hub pages)
 *   3. /calculators/overpayment/{lenderSlug}  — ALL lenders
 *      WHY: Overpayment pages rank #1-3 for nearly every specialist lender.
 *           "[Bank] overpayment mortgage calculator" is a high-intent keyword
 *           with almost zero competition from big sites. This is our proven
 *           traffic driver. Every lender gets one.
 *   4. /calculators/{other-type}/{slug}  — ONLY unique-content lenders + all cities
 *      WHY: These pages only go in the sitemap if they have genuine unique
 *           content (300-500 words written per lender) OR unique regional
 *           data (city pages have real neighbourhood prices, SDLT info etc).
 *           Template-swapped pages with 94% identical content get flagged
 *           as duplicates by Google — we strip those out.
 *   5. /uk/{citySlug}  — all city regional pages (unique regional data)
 *   6. /guides/lenders/{lenderSlug}  — all lender guide pages
 *
 * WHAT IS EXCLUDED (and why):
 *   /calculators/{non-overpayment}/{non-unique-lender}
 *   These are template pages where only the bank name changes. Google flags
 *   them as "Duplicate without canonical" or "Alternate page with canonical" —
 *   both hurt domain authority. Keeping them out improves index quality.
 *
 * HOW TO ADD MORE LENDERS TO FULL COVERAGE:
 *   1. Write unique content in src/lib/uk/lenderContent.ts
 *   2. Add the lender slug to UNIQUE_CONTENT_LENDERS below
 *   3. Run build — their full calc pages auto-enter the sitemap
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
// Only these 10 lenders have 300-500 words of unique editorial content written
// for them in lenderContent.ts. They get ALL 7 calculator types in the sitemap.
// All other lenders get ONLY the overpayment calculator (our proven winner).
//
// TO EXPAND: write content in lenderContent.ts → add slug here → rebuild.
const UNIQUE_CONTENT_LENDERS = new Set([
  "barclays",
  "nationwide",
  "hsbc",
  "halifax",
  "lloyds-bank",
  "santander",
  "danske",
  "virgin-money",
  "natwest",
  "coventry",
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
  "/guides/mortgage-overpayment",
  "/calculators/compare",
  "/calculators/remortgage",
  "/calculators/home-improvement",
  "/calculators/rate-compare",
  "/calculators/fix-or-track",
  "/calculators/salary-to-mortgage",
];

// ─── SLUG EXTRACTION ──────────────────────────────────────────────────────────
// Reads slug values directly from TypeScript source files using regex.
// This keeps the sitemap in sync as lenders/cities are added — no manual updates needed.
async function extractSlugs(filePath) {
  const content = await readFile(filePath, "utf8");
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  // Filter out TypeScript type definition lines: `slug: string;`
  return matches.map((m) => m[1]).filter((s) => s !== "string");
}

// ─── URL BUILDER ──────────────────────────────────────────────────────────────
function url(path, priority, changefreq) {
  return { path, priority, changefreq };
}

// ─── BUILD URL LIST ───────────────────────────────────────────────────────────
const lenderSlugs = await extractSlugs(
  path.join(projectRoot, "src/lib/uk/lenders.ts"),
);
const citySlugs = await extractSlugs(
  path.join(projectRoot, "src/lib/uk/cities.ts"),
);

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

// 3. Overpayment pages: ALL lenders
//    This is our #1 ranking pattern — every specialist lender gets one.
//    "[Bank] overpayment calculator" keywords have almost zero competition.
for (const slug of lenderSlugs) {
  urls.push(url(`/calculators/overpayment/${slug}`, "0.8", "weekly"));
}

// 4. Non-overpayment calculator pages
//    Rule: unique-content lenders ONLY (10 lenders) + all cities
//    All other lenders excluded — their template pages are near-duplicate
for (const type of CALC_TYPES) {
  if (type === "overpayment") continue; // handled above

  // Unique-content lenders: full coverage across all calc types
  for (const slug of lenderSlugs) {
    if (UNIQUE_CONTENT_LENDERS.has(slug)) {
      urls.push(url(`/calculators/${type}/${slug}`, "0.8", "weekly"));
    }
  }

  // All cities: each has unique house prices, neighbourhood data, SDLT region
  for (const slug of citySlugs) {
    urls.push(url(`/calculators/${type}/${slug}`, "0.7", "monthly"));
  }
}

// 5. City regional pages — all cities
for (const slug of citySlugs) {
  urls.push(url(`/uk/${slug}`, "0.7", "monthly"));
}

// 6. Lender guide pages — all lenders
for (const slug of lenderSlugs) {
  urls.push(url(`/guides/lenders/${slug}`, "0.7", "monthly"));
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
const cityCalcCount = citySlugs.length * (CALC_TYPES.length - 1);
const excludedCount =
  [...lenderSlugs].filter((s) => !UNIQUE_CONTENT_LENDERS.has(s)).length *
  (CALC_TYPES.length - 1);

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
console.log(
  `   City calc pages (${citySlugs.length} cities × ${CALC_TYPES.length - 1} types): ${cityCalcCount}`,
);
console.log(`   City regional:         ${citySlugs.length}`);
console.log(`   Lender guides:         ${lenderSlugs.length}`);
console.log(`   ─────────────────────────────────────`);
console.log(`   Thin pages excluded:   ${excludedCount} (quality gate applied)`);
console.log(
  `\n   To expand coverage: write content in lenderContent.ts → add slug to UNIQUE_CONTENT_LENDERS\n`,
);
