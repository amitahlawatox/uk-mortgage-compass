// Fetches the latest Bank of England official Bank Rate from the BoE
// Interactive Statistical Database (IADB). Series IUDSOIA = Bank Rate.
// Public data, no auth required. Cached in memory for 6 hours.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface CacheEntry {
  rate: number;
  asOf: string; // ISO date of the BoE observation
  fetchedAt: number; // epoch ms
}

let cache: CacheEntry | null = null;
const TTL_MS = 6 * 60 * 60 * 1000; // 6h

// BoE IADB CSV export — Bank Rate series IUDBEDR. Pull last ~90 days and
// pick the most recent observation. Endpoint requires following a 302.
function buildBoeUrl(): string {
  const today = new Date();
  const from = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}/${months[d.getMonth()]}/${d.getFullYear()}`;
  const params = new URLSearchParams({
    "csv.x": "yes",
    Datefrom: fmt(from),
    Dateto: "now",
    SeriesCodes: "IUDBEDR",
    CSVF: "TN",
    UsingCodes: "Y",
    VPD: "Y",
    VFD: "N",
  });
  return `https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?${params.toString()}`;
}

async function fetchBoeRate(): Promise<CacheEntry> {
  const res = await fetch(buildBoeUrl(), {
    redirect: "follow",
    headers: {
      Accept: "text/csv,*/*",
      "User-Agent": "Mozilla/5.0 RepayWise/1.0 (+https://www.repaywise.co.uk)",
    },
  });
  if (!res.ok) {
    throw new Error(`BoE fetch failed [${res.status}]`);
  }
  const text = await res.text();
  // CSV: header row then "DD MMM YY,rate" lines
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error("BoE CSV empty");
  const dataLines = lines.slice(1);
  // Last line = most recent observation
  const last = dataLines[dataLines.length - 1];
  const [dateStr, valueStr] = last.split(",").map((s) => s.trim());
  const rate = Number(valueStr);
  if (!Number.isFinite(rate)) throw new Error(`Bad rate value: ${valueStr}`);
  // Parse "DD MMM YY" -> ISO
  const d = new Date(dateStr);
  const asOf = isNaN(d.getTime()) ? dateStr : d.toISOString().slice(0, 10);
  return { rate, asOf, fetchedAt: Date.now() };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!cache || Date.now() - cache.fetchedAt > TTL_MS) {
      cache = await fetchBoeRate();
    }
    return new Response(
      JSON.stringify({
        rate: cache.rate,
        asOf: cache.asOf,
        source: "Bank of England (IADB, series IUDBEDR)",
        cachedAt: new Date(cache.fetchedAt).toISOString(),
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("boe-base-rate error:", message);
    // Fallback so the UI still renders something sensible
    return new Response(
      JSON.stringify({
        rate: null,
        asOf: null,
        source: "unavailable",
        error: message,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
