import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const publicDir = path.join(projectRoot, "public");
const siteUrl = "https://repaywise.co.uk";

async function walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkHtmlFiles(fullPath);
      return entry.name.endsWith(".html") ? [fullPath] : [];
    }),
  );

  return files.flat();
}

function toUrlPath(filePath) {
  const relative = path.relative(distDir, filePath).replace(/\\/g, "/");

  if (relative.startsWith("assets/")) return null;
  if (relative === "404.html" || relative.endsWith("/404.html")) return null;

  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"/index.html".length)}`;
  }

  if (relative.endsWith(".html")) {
    return `/${relative.slice(0, -".html".length)}`;
  }

  return null;
}

function getPriority(urlPath) {
  if (urlPath === "/") return "1.0";
  if (urlPath.startsWith("/calculators/") && urlPath.split("/").length === 3) return "0.9";
  if (urlPath.startsWith("/calculators/")) return "0.8";
  if (urlPath.startsWith("/guides/lenders/")) return "0.7";
  if (urlPath === "/guides") return "0.7";
  if (urlPath.startsWith("/uk/")) return "0.7";
  if (urlPath.endsWith("policy") || urlPath.endsWith("service")) return "0.3";
  return "0.6";
}

function getChangefreq(urlPath) {
  if (urlPath === "/") return "weekly";
  if (urlPath.startsWith("/calculators/")) return "weekly";
  if (urlPath.startsWith("/guides/")) return "monthly";
  if (urlPath.startsWith("/uk/")) return "monthly";
  return "yearly";
}

async function countWords(filePath) {
  const html = await readFile(filePath, "utf8");
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text ? text.split(" ").length : 0;
}

function buildSitemapXml(urls) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const url of urls) {
    lines.push(
      "  <url>",
      `    <loc>${siteUrl}${url.path}</loc>`,
      `    <changefreq>${url.changefreq}</changefreq>`,
      `    <priority>${url.priority}</priority>`,
      "  </url>",
    );
  }

  lines.push("</urlset>", "");
  return lines.join("\n");
}

const htmlFiles = await walkHtmlFiles(distDir);
const candidateUrls = await Promise.all(
  htmlFiles.map(async (filePath) => {
    const urlPath = toUrlPath(filePath);
    if (!urlPath) return null;

    const wordCount = await countWords(filePath);
    if (wordCount < 40 && urlPath !== "/") {
      return null;
    }

    return {
      path: urlPath,
      priority: getPriority(urlPath),
      changefreq: getChangefreq(urlPath),
    };
  }),
);

const urls = candidateUrls
  .filter(Boolean)
  .sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });

const sitemapXml = buildSitemapXml(urls);

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");

console.log(`Generated sitemap with ${urls.length} URLs.`);
