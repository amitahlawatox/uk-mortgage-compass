import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BoeData {
  rate: number;
  asOf: string;
}

const formatAsOf = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const RateTicker = () => {
  const [boe, setBoe] = useState<BoeData | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.functions
      .invoke("boe-base-rate")
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;

        const rate = data.rate;
        const asOf = data.asOf;
        const observedAt = typeof asOf === "string"
          ? Date.parse(`${asOf}T12:00:00Z`)
          : NaN;
        if (
          typeof rate !== "number" ||
          !Number.isFinite(rate) ||
          rate < 0 ||
          rate > 20 ||
          typeof asOf !== "string" ||
          !/^\d{4}-\d{2}-\d{2}$/.test(asOf) ||
          !Number.isFinite(observedAt) ||
          new Date(observedAt).toISOString().slice(0, 10) !== asOf ||
          observedAt > Date.now() + 12 * 60 * 60 * 1000 ||
          Date.now() - observedAt > 14 * 24 * 60 * 60 * 1000
        ) return;

        setBoe({ rate, asOf });
      })
      .catch(() => {
        // Keep the rate unavailable if the source cannot be reached.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full bg-primary text-primary-foreground py-2">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-3 text-xs tabular-nums">
        <span className="font-semibold">Bank of England Bank Rate</span>
        {boe ? (
          <>
            <span className="text-success font-medium">{boe.rate.toFixed(2)}%</span>
            <span className="text-primary-foreground/60">as of {formatAsOf(boe.asOf)}</span>
          </>
        ) : (
          <span className="text-primary-foreground/60">unavailable</span>
        )}
        <a
          href="https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 underline underline-offset-2 hover:text-success"
        >
          Bank of England source
        </a>
      </div>
    </div>
  );
};
