import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// The BoE Bank Rate is fetched live from the Bank of England's Interactive
// Statistical Database via our edge function. Lender product rates (fixed,
// tracker, SVR) are indicative weekly snapshots — there is no free
// authoritative feed for those, so they are clearly labelled as such.
interface BoeData {
  rate: number | null;
  asOf: string | null;
}

// Indicative lender rates — review weekly. Sourced from public best-buy
// tables (Moneyfacts/UK Finance averages). Update INDICATIVE_AS_OF when changed.
const INDICATIVE_AS_OF = "2026-04-14";
const indicative = [
  { label: "2yr Fixed", value: "4.12%", accent: true },
  { label: "5yr Fixed", value: "3.89%" },
  { label: "Tracker", value: "BBR + 0.45%" },
  { label: "Best Buy", value: "3.64%", lime: true },
  { label: "SVR Avg", value: "7.99%" },
];

const formatAsOf = (iso: string) => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};

export const RateTicker = () => {
  const [boe, setBoe] = useState<BoeData>({ rate: null, asOf: null });

  useEffect(() => {
    let cancelled = false;
    supabase.functions
      .invoke("boe-base-rate")
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setBoe({ rate: data.rate ?? null, asOf: data.asOf ?? null });
      })
      .catch(() => {
        /* silent — UI shows em-dash fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const boeDisplay = boe.rate != null ? `${boe.rate.toFixed(2)}%` : "—";
  const boeTooltip = boe.asOf
    ? `Bank of England Bank Rate, as of ${formatAsOf(boe.asOf)} (source: BoE IADB)`
    : "Bank of England Bank Rate";

  return (
    <div className="w-full bg-primary text-primary-foreground py-2">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4 sm:gap-8 overflow-hidden ticker-mask">
        <div className="flex items-center gap-2 shrink-0">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-primary-foreground/50 whitespace-nowrap">
            BoE Live · Indicative Rates
          </span>
        </div>
        <div className="flex gap-6 sm:gap-10 tabular-nums whitespace-nowrap">
          {/* Live BoE Bank Rate */}
          <div className="flex gap-2 text-xs items-baseline" title={boeTooltip}>
            <span className="text-primary-foreground/40">BoE Base</span>
            <span className="text-success font-medium">{boeDisplay}</span>
            {boe.asOf && (
              <span className="text-primary-foreground/30 text-[10px]">
                {formatAsOf(boe.asOf)}
              </span>
            )}
          </div>
          {indicative.map((r) => (
            <div
              key={r.label}
              className="flex gap-2 text-xs items-baseline"
              title={`Indicative — updated ${formatAsOf(INDICATIVE_AS_OF)}`}
            >
              <span className="text-primary-foreground/40">{r.label}</span>
              <span
                className={
                  r.lime
                    ? "text-accent-secondary font-medium"
                    : r.accent
                      ? "text-accent font-medium"
                      : "text-primary-foreground font-medium"
                }
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
