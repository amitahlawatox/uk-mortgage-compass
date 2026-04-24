import { useState } from "react";
import { SliderField } from "@/pages/calculators/RepaymentPage";
import { formatGBP } from "@/lib/finance/decimal";

/**
 * Deposit input with a £ amount / % percent toggle.
 * - `referencePrice` is the property price the % is calculated from.
 *   When omitted (or 0), only the amount mode is shown.
 * - `value` and `onChange` always work in £ amount terms (the source of truth).
 */
export const DepositField = ({
  value,
  onChange,
  referencePrice,
  label = "Deposit",
  amountMin = 0,
  amountMax = 500_000,
  amountStep = 1_000,
}: {
  value: number;
  onChange: (v: number) => void;
  referencePrice?: number;
  label?: string;
  amountMin?: number;
  amountMax?: number;
  amountStep?: number;
}) => {
  const [mode, setMode] = useState<"amount" | "percent">("amount");
  const hasReference = !!referencePrice && referencePrice > 0;
  const pct = hasReference ? (value / referencePrice!) * 100 : 0;
  const maxAmount = hasReference ? Math.max(amountMax, referencePrice!) : amountMax;

  return (
    <div>
      {hasReference && (
        <div className="flex items-center justify-end mb-1.5">
          <div className="inline-flex rounded-md border border-border bg-background p-0.5 text-[9px] font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setMode("amount")}
              className={`px-2 py-0.5 rounded transition-colors ${mode === "amount" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >£</button>
            <button
              type="button"
              onClick={() => setMode("percent")}
              className={`px-2 py-0.5 rounded transition-colors ${mode === "percent" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >%</button>
          </div>
        </div>
      )}
      {mode === "amount" || !hasReference ? (
        <SliderField
          label={hasReference ? `${label} (${pct.toFixed(1)}%)` : label}
          prefix="£"
          value={value}
          min={amountMin}
          max={maxAmount}
          step={amountStep}
          onChange={(v) => onChange(hasReference ? Math.min(v, referencePrice!) : v)}
        />
      ) : (
        <SliderField
          label={`${label} (${formatGBP(value)})`}
          suffix="%"
          value={pct}
          min={0}
          max={100}
          step={0.5}
          decimals={1}
          onChange={(p) => onChange(Math.round((p / 100) * referencePrice!))}
        />
      )}
    </div>
  );
};
