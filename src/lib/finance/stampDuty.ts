/**
 * UK Stamp Duty engine — SDLT (England & NI), LBTT (Scotland), LTT (Wales).
 * Decimal.js precision throughout. Bands current as of 2024 post-Autumn-Statement
 * baseline; designed so band tables can be hot-swapped via Supabase later.
 */
import Decimal from "decimal.js";
import { D } from "./decimal";

export type Region = "england" | "scotland" | "wales";

export interface StampDutyInput {
  price: number;          // GBP
  region: Region;
  firstTimeBuyer: boolean;
  additionalProperty: boolean; // 2nd home / BTL surcharge
}

export interface StampDutyBand {
  /** Upper bound of the band in GBP. Use Infinity for the top band. */
  upTo: number;
  /** Marginal rate, e.g. 0.05 for 5%. */
  rate: number;
}

export interface StampDutyBreakdownRow {
  band: string;
  rate: number;
  taxable: number;
  tax: number;
}

export interface StampDutyResult {
  region: Region;
  taxName: "SDLT" | "LBTT" | "LTT";
  total: number;
  effectiveRate: number; // %
  breakdown: StampDutyBreakdownRow[];
  notes: string[];
}

// --- Band tables (2024) ---------------------------------------------------

const SDLT_STANDARD: StampDutyBand[] = [
  { upTo: 250_000, rate: 0 },
  { upTo: 925_000, rate: 0.05 },
  { upTo: 1_500_000, rate: 0.10 },
  { upTo: Infinity, rate: 0.12 },
];

const SDLT_FTB: StampDutyBand[] = [
  // FTB relief up to £625k purchase: 0% to £425k, 5% £425k–£625k, then standard.
  { upTo: 425_000, rate: 0 },
  { upTo: 625_000, rate: 0.05 },
];

const LBTT_STANDARD: StampDutyBand[] = [
  { upTo: 145_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 325_000, rate: 0.05 },
  { upTo: 750_000, rate: 0.10 },
  { upTo: Infinity, rate: 0.12 },
];
const LBTT_FTB_THRESHOLD = 175_000;

const LTT_STANDARD: StampDutyBand[] = [
  { upTo: 225_000, rate: 0 },
  { upTo: 400_000, rate: 0.06 },
  { upTo: 750_000, rate: 0.075 },
  { upTo: 1_500_000, rate: 0.10 },
  { upTo: Infinity, rate: 0.12 },
];

// Surcharge rates for additional dwellings (added on top of every band).
const SURCHARGE: Record<Region, number> = {
  england: 0.05,    // SDLT higher rate (Oct 2024 increase)
  scotland: 0.08,   // LBTT ADS (Dec 2024)
  wales: 0.05,      // LTT higher residential
};

// --------------------------------------------------------------------------

function computeBands(
  price: Decimal,
  bands: StampDutyBand[],
  surcharge: Decimal,
): { rows: StampDutyBreakdownRow[]; total: Decimal } {
  let lower = D(0);
  let total = D(0);
  const rows: StampDutyBreakdownRow[] = [];

  for (const band of bands) {
    if (price.lte(lower)) break;
    const upper = isFinite(band.upTo) ? D(band.upTo) : price;
    const taxable = Decimal.min(price, upper).minus(lower);
    if (taxable.lte(0)) {
      lower = upper;
      continue;
    }
    const effectiveRate = D(band.rate).plus(surcharge);
    const tax = taxable.times(effectiveRate);
    rows.push({
      band: `${formatBand(lower)} – ${isFinite(band.upTo) ? formatBand(upper) : "above"}`,
      rate: effectiveRate.toNumber(),
      taxable: taxable.toNumber(),
      tax: tax.toDecimalPlaces(2).toNumber(),
    });
    total = total.plus(tax);
    lower = upper;
    if (!isFinite(band.upTo)) break;
  }

  return { rows, total };
}

const formatBand = (v: Decimal) =>
  `£${v.toNumber().toLocaleString("en-GB")}`;

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const price = D(Math.max(0, input.price));
  const surcharge = input.additionalProperty
    ? D(SURCHARGE[input.region])
    : D(0);

  let bands: StampDutyBand[];
  let taxName: StampDutyResult["taxName"];
  const notes: string[] = [];

  switch (input.region) {
    case "england":
      taxName = "SDLT";
      if (input.firstTimeBuyer && !input.additionalProperty && price.lte(625_000)) {
        bands = SDLT_FTB;
        notes.push("First-time buyer relief applied (purchase ≤ £625,000).");
      } else {
        bands = SDLT_STANDARD;
        if (input.firstTimeBuyer && price.gt(625_000)) {
          notes.push("FTB relief unavailable: purchase exceeds £625,000.");
        }
      }
      break;

    case "scotland":
      taxName = "LBTT";
      bands = LBTT_STANDARD;
      // FTB in Scotland: nil-rate threshold raised to £175k (relief = 0% on first 175k).
      if (input.firstTimeBuyer && !input.additionalProperty) {
        bands = [
          { upTo: LBTT_FTB_THRESHOLD, rate: 0 },
          ...LBTT_STANDARD.filter(b => b.upTo > LBTT_FTB_THRESHOLD),
        ];
        notes.push("First-time buyer relief: nil-rate threshold raised to £175,000.");
      }
      break;

    case "wales":
      taxName = "LTT";
      bands = LTT_STANDARD;
      if (input.firstTimeBuyer) {
        notes.push("Wales LTT has no first-time buyer relief.");
      }
      break;
  }

  if (input.additionalProperty) {
    notes.push(
      `Additional-property surcharge of ${(SURCHARGE[input.region] * 100).toFixed(0)}% applied on top of every band.`,
    );
  }

  const { rows, total } = computeBands(price, bands, surcharge);
  const effective = price.gt(0) ? total.div(price).times(100).toDecimalPlaces(3).toNumber() : 0;

  return {
    region: input.region,
    taxName,
    total: total.toDecimalPlaces(2).toNumber(),
    effectiveRate: effective,
    breakdown: rows,
    notes,
  };
}
