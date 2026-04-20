import Decimal from "decimal.js";

// 28 sig digits, ROUND_HALF_EVEN — banker's rounding for fairness.
Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_EVEN });

export type DecimalInput = Decimal.Value;
export const D = (v: DecimalInput) => new Decimal(v);

/** Round a Decimal to 2 dp (currency) and return number for display. */
export const toMoney = (v: Decimal): number => v.toDecimalPlaces(2, Decimal.ROUND_HALF_EVEN).toNumber();

/** Format pence-precise Decimal as GBP string. */
export const formatGBP = (v: Decimal | number, opts: { decimals?: number } = {}): string => {
  const n = v instanceof Decimal ? toMoney(v) : v;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: opts.decimals ?? 0,
    maximumFractionDigits: opts.decimals ?? 0,
  }).format(n);
};

export const formatPercent = (rate: number, decimals = 2): string =>
  `${rate.toFixed(decimals)}%`;
