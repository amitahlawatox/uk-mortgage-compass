/**
 * RepayWise sitemap generator: include paths backed by actual App.tsx routes.
 *
 * Only overpayment, repayment and max-borrowing have lender subpages.
 * Stamp duty has Scotland/Wales variants, not /:city or /:lender routes.
 * Never submit generated-looking URLs that resolve to NotFound.
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

// Only these calculators have lender /:slug routes in App.tsx.
const LENDER_CALCULATOR_TYPES = ["overpayment", "repayment", "max-borrowing"];

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
  "/news/your-first-home-equity-loan-2026",
  "/news/lifetime-isa-withdrawal-charge-2026",
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

// 4. Remaining lender calculator routes defined by App.tsx.
//    Keep existing lender URLs for repayment and max-borrowing.
for (const type of LENDER_CALCULATOR_TYPES) {
  if (type === "overpayment") continue;
  for (const slug of lenderSlugs) {
    urls.push(url(`/calculators/${type}/${slug}`, "0.8", "weekly"));
  }
}

// 5. City regional pages — all cities
for (const slug of citySlugs) {
  urls.push(url(`/uk/${slug}`, "0.7", "monthly"));
}

// /calculators/stamp-duty/scotland and /wales are in STATIC_PAGES.
// The router does not define stamp-duty city or lender variants.

// 6. Existing lender guide routes — preserve pending content audit.
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
// Guard against accidentally submitting the same URL twice.
if (new Set(urls.map(u => u.path)).size !== urls.length) {
  throw new Error("Duplicate URLs in sitemap");
}

console.log(`\nRepayWise sitemap generated: ${urls.length} URLs`);
console.log(`  Static: ${STATIC_PAGES.length}, calculator bases: ${CALC_TYPES.length}`);
console.log(`  Lender calc routes: ${urls.filter(u => LENDER_CALCULATOR_TYPES.some(type => u.path.startsWith(`/calculators/${type}/`))).length}`);
console.log(`  Regional city pages: ${citySlugs.length}, lender guides: ${lenderSlugs.length}`);
console.log("  Excludes unsupported lender/city calculator variants.");
