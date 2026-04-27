/**
 * UK Stamp Duty engine: SDLT (England & NI), LBTT (Scotland), LTT (Wales).
 * Decimal.js precision throughout.
 *
 * Current baselines:
 * - SDLT: rates effective from 1 April 2025
 * - LBTT: current residential bands with 8% ADS
 * - LTT: higher residential rates effective from 11 December 2024
 */
import Decimal from "decimal.js";
import { D } from "./decimal";

export type Region = "england" | "scotland" | "wales";

export interface StampDutyInput {
  price: number;
  region: Region;
  firstTimeBuyer: boolean;
  additionalProperty: boolean;
}

export interface StampDutyBand {
  upTo: number;
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
  effectiveRate: number;
  breakdown: StampDutyBreakdownRow[];
  notes: string[];
}

const SDLT_STANDARD: StampDutyBand[] = [
  { upTo: 125_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 925_000, rate: 0.05 },
  { upTo: 1_500_000, rate: 0.10 },
  { upTo: Infinity, rate: 0.12 },
];

const SDLT_FTB: StampDutyBand[] = [
  { upTo: 300_000, rate: 0 },
  { upTo: 500_000, rate: 0.05 },
];

const SDLT_HIGHER: StampDutyBand[] = [
  { upTo: 125_000, rate: 0.05 },
  { upTo: 250_000, rate: 0.07 },
  { upTo: 925_000, rate: 0.10 },
  { upTo: 1_500_000, rate: 0.15 },
  { upTo: Infinity, rate: 0.17 },
];

const LBTT_STANDARD: StampDutyBand[] = [
  { upTo: 145_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 325_000, rate: 0.05 },
  { upTo: 750_000, rate: 0.10 },
  { upTo: Infinity, rate: 0.12 },
];

const LBTT_FTB_THRESHOLD = 175_000;
const LBTT_ADS_RATE = 0.08;

const LTT_STANDARD: StampDutyBand[] = [
  { upTo: 225_000, rate: 0 },
  { upTo: 400_000, rate: 0.06 },
  { upTo: 750_000, rate: 0.075 },
  { upTo: 1_500_000, rate: 0.10 },
  { upTo: Infinity, rate: 0.12 },
];

const LTT_HIGHER: StampDutyBand[] = [
  { upTo: 180_000, rate: 0.05 },
  { upTo: 250_000, rate: 0.085 },
  { upTo: 400_000, rate: 0.10 },
  { upTo: 750_000, rate: 0.125 },
  { upTo: 1_500_000, rate: 0.15 },
  { upTo: Infinity, rate: 0.17 },
];

function computeBands(
  price: Decimal,
  bands: StampDutyBand[],
): { rows: StampDutyBreakdownRow[]; total: Decimal } {
  let lower = D(0);
  let total = D(0);
  const rows: StampDutyBreakdownRow[] = [];

  for (const band of bands) {
    if (price.lte(lower)) break;

    const upper = Number.isFinite(band.upTo) ? D(band.upTo) : price;
    const taxable = Decimal.min(price, upper).minus(lower);

    if (taxable.lte(0)) {
      lower = upper;
      continue;
    }

    const rate = D(band.rate);
    const tax = taxable.times(rate);

    rows.push({
      band: `${formatBand(lower)} - ${Number.isFinite(band.upTo) ? formatBand(upper) : "above"}`,
      rate: rate.toNumber(),
      taxable: taxable.toNumber(),
      tax: tax.toDecimalPlaces(2).toNumber(),
    });

    total = total.plus(tax);
    lower = upper;

    if (!Number.isFinite(band.upTo)) break;
  }

  return { rows, total };
}

const formatBand = (value: Decimal) => `\u00A3${value.toNumber().toLocaleString("en-GB")}`;

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const price = D(Math.max(0, input.price));
  const notes: string[] = [];

  let bands: StampDutyBand[];
  let taxName: StampDutyResult["taxName"];
  let additionalFlatCharge = D(0);

  switch (input.region) {
    case "england":
      taxName = "SDLT";
      if (input.additionalProperty) {
        bands = SDLT_HIGHER;
        notes.push("Higher rates for additional dwellings applied.");
      } else if (input.firstTimeBuyer && price.lte(500_000)) {
        bands = SDLT_FTB;
        notes.push("First-time buyer relief applied (purchase <= \u00A3500,000).");
      } else {
        bands = SDLT_STANDARD;
        if (input.firstTimeBuyer && price.gt(500_000)) {
          notes.push("First-time buyer relief unavailable above \u00A3500,000.");
        }
      }
      break;

    case "scotland":
      taxName = "LBTT";
      bands = LBTT_STANDARD;
      if (input.firstTimeBuyer && !input.additionalProperty) {
        bands = [
          { upTo: LBTT_FTB_THRESHOLD, rate: 0 },
          ...LBTT_STANDARD.filter((band) => band.upTo > LBTT_FTB_THRESHOLD),
        ];
        notes.push("First-time buyer relief raises the nil-rate threshold to \u00A3175,000.");
      }
      if (input.additionalProperty) {
        additionalFlatCharge = price.times(LBTT_ADS_RATE);
        notes.push("Additional Dwelling Supplement of 8% applied to the full purchase price.");
      }
      break;

    case "wales":
      taxName = "LTT";
      bands = input.additionalProperty ? LTT_HIGHER : LTT_STANDARD;
      if (input.firstTimeBuyer) {
        notes.push("Wales LTT does not offer first-time buyer relief.");
      }
      if (input.additionalProperty) {
        notes.push("Higher residential rates applied.");
      }
      break;
  }

  const { rows, total: bandTotal } = computeBands(price, bands);

  if (additionalFlatCharge.gt(0)) {
    rows.push({
      band: "Additional Dwelling Supplement",
      rate: LBTT_ADS_RATE,
      taxable: price.toNumber(),
      tax: additionalFlatCharge.toDecimalPlaces(2).toNumber(),
    });
  }

  const total = bandTotal.plus(additionalFlatCharge);
  const effectiveRate = price.gt(0)
    ? total.div(price).times(100).toDecimalPlaces(3).toNumber()
    : 0;

  return {
    region: input.region,
    taxName,
    total: total.toDecimalPlaces(2).toNumber(),
    effectiveRate,
    breakdown: rows,
    notes,
  };
}
