import { describe, it, expect } from "vitest";
import { calculateStampDuty } from "@/lib/finance/stampDuty";
import { calculateRepayment, buildSchedule } from "@/lib/finance/repayment";
import { calculateAffordability } from "@/lib/finance/affordability";

describe("Stamp Duty — England (SDLT)", () => {
  it("£250k standard purchase = £0", () => {
    const r = calculateStampDuty({ price: 250_000, region: "england", firstTimeBuyer: false, additionalProperty: false });
    expect(r.total).toBe(0);
  });
  it("£500k standard purchase = £12,500", () => {
    const r = calculateStampDuty({ price: 500_000, region: "england", firstTimeBuyer: false, additionalProperty: false });
    expect(r.total).toBe(12_500); // 5% of (500k - 250k)
  });
  it("£925k standard = £33,750", () => {
    const r = calculateStampDuty({ price: 925_000, region: "england", firstTimeBuyer: false, additionalProperty: false });
    expect(r.total).toBe(33_750); // 5% of 675k
  });
  it("£500k FTB = £3,750", () => {
    const r = calculateStampDuty({ price: 500_000, region: "england", firstTimeBuyer: true, additionalProperty: false });
    expect(r.total).toBe(3_750); // 5% of (500k - 425k)
  });
  it("£700k FTB falls back to standard rates", () => {
    const r = calculateStampDuty({ price: 700_000, region: "england", firstTimeBuyer: true, additionalProperty: false });
    expect(r.total).toBe(22_500); // standard SDLT on 700k
  });
  it("£500k second home applies 5% surcharge on every band", () => {
    const r = calculateStampDuty({ price: 500_000, region: "england", firstTimeBuyer: false, additionalProperty: true });
    // Bands: 0–250k @5%, 250–500k @10%
    // = 12,500 + 25,000 = 37,500
    expect(r.total).toBe(37_500);
  });
});

describe("Stamp Duty — Scotland (LBTT)", () => {
  it("£250k standard = £2,100", () => {
    const r = calculateStampDuty({ price: 250_000, region: "scotland", firstTimeBuyer: false, additionalProperty: false });
    // 0 on 145k + 2% on 105k = 2,100
    expect(r.total).toBe(2_100);
  });
  it("£175k FTB = £0", () => {
    const r = calculateStampDuty({ price: 175_000, region: "scotland", firstTimeBuyer: true, additionalProperty: false });
    expect(r.total).toBe(0);
  });
});

describe("Stamp Duty — Wales (LTT)", () => {
  it("£225k = £0", () => {
    const r = calculateStampDuty({ price: 225_000, region: "wales", firstTimeBuyer: false, additionalProperty: false });
    expect(r.total).toBe(0);
  });
  it("£400k = £10,500", () => {
    const r = calculateStampDuty({ price: 400_000, region: "wales", firstTimeBuyer: false, additionalProperty: false });
    expect(r.total).toBe(10_500); // 6% of 175k
  });
});

describe("Repayment", () => {
  it("£200k @ 5% over 25y ≈ £1,169.18/mo", () => {
    const r = calculateRepayment({ principal: 200_000, annualRate: 5, termYears: 25 });
    expect(r.monthlyPayment).toBeCloseTo(1169.18, 1);
  });
  it("interest-only: £200k @ 5% = £833.33/mo", () => {
    const r = calculateRepayment({ principal: 200_000, annualRate: 5, termYears: 25, interestOnly: true });
    expect(r.monthlyPayment).toBeCloseTo(833.33, 1);
  });
  it("0% rate divides evenly", () => {
    const r = calculateRepayment({ principal: 120_000, annualRate: 0, termYears: 10 });
    expect(r.monthlyPayment).toBe(1000);
  });
});

describe("Overpayment schedule", () => {
  it("£200/mo overpayment shortens 25y term materially", () => {
    const baseline = buildSchedule({ principal: 200_000, annualRate: 5, termYears: 25 });
    const withOverpay = buildSchedule({ principal: 200_000, annualRate: 5, termYears: 25, monthlyOverpayment: 200 });
    expect(withOverpay.monthsTaken).toBeLessThan(baseline.monthsTaken);
    expect(withOverpay.totalInterest).toBeLessThan(baseline.totalInterest);
  });
});

describe("Affordability", () => {
  it("£60k income capped by 4.5x multiplier", () => {
    const r = calculateAffordability({
      grossAnnualIncome: 60_000,
      monthlyExpenditure: 200,
      deposit: 30_000,
      termYears: 30,
      productRate: 4.5,
    });
    expect(r.maxBorrowing).toBeLessThanOrEqual(60_000 * 4.5);
  });
});
