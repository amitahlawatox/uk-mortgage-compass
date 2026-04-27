import { describe, expect, it } from "vitest";
import { calculateAffordability } from "@/lib/finance/affordability";
import { buildSchedule, calculateRepayment } from "@/lib/finance/repayment";
import { calculateStampDuty } from "@/lib/finance/stampDuty";

describe("Stamp Duty - England (SDLT)", () => {
  it("GBP 250k standard purchase = GBP 2,500 from April 2025", () => {
    const result = calculateStampDuty({
      price: 250_000,
      region: "england",
      firstTimeBuyer: false,
      additionalProperty: false,
    });
    expect(result.total).toBe(2_500);
  });

  it("GBP 295k standard purchase = GBP 4,750", () => {
    const result = calculateStampDuty({
      price: 295_000,
      region: "england",
      firstTimeBuyer: false,
      additionalProperty: false,
    });
    expect(result.total).toBe(4_750);
  });

  it("GBP 500k standard purchase = GBP 15,000", () => {
    const result = calculateStampDuty({
      price: 500_000,
      region: "england",
      firstTimeBuyer: false,
      additionalProperty: false,
    });
    expect(result.total).toBe(15_000);
  });

  it("GBP 925k standard purchase = GBP 36,250", () => {
    const result = calculateStampDuty({
      price: 925_000,
      region: "england",
      firstTimeBuyer: false,
      additionalProperty: false,
    });
    expect(result.total).toBe(36_250);
  });

  it("GBP 500k first-time buyer purchase = GBP 10,000", () => {
    const result = calculateStampDuty({
      price: 500_000,
      region: "england",
      firstTimeBuyer: true,
      additionalProperty: false,
    });
    expect(result.total).toBe(10_000);
  });

  it("GBP 700k first-time buyer purchase falls back to standard rates", () => {
    const result = calculateStampDuty({
      price: 700_000,
      region: "england",
      firstTimeBuyer: true,
      additionalProperty: false,
    });
    expect(result.total).toBe(25_000);
  });

  it("GBP 500k second home uses higher rates from April 2025", () => {
    const result = calculateStampDuty({
      price: 500_000,
      region: "england",
      firstTimeBuyer: false,
      additionalProperty: true,
    });
    expect(result.total).toBe(40_000);
  });
});

describe("Stamp Duty - Scotland (LBTT)", () => {
  it("GBP 250k standard purchase = GBP 2,100", () => {
    const result = calculateStampDuty({
      price: 250_000,
      region: "scotland",
      firstTimeBuyer: false,
      additionalProperty: false,
    });
    expect(result.total).toBe(2_100);
  });

  it("GBP 175k first-time buyer purchase = GBP 0", () => {
    const result = calculateStampDuty({
      price: 175_000,
      region: "scotland",
      firstTimeBuyer: true,
      additionalProperty: false,
    });
    expect(result.total).toBe(0);
  });

  it("GBP 250k additional dwelling includes the 8% ADS", () => {
    const result = calculateStampDuty({
      price: 250_000,
      region: "scotland",
      firstTimeBuyer: false,
      additionalProperty: true,
    });
    expect(result.total).toBe(22_100);
  });
});

describe("Stamp Duty - Wales (LTT)", () => {
  it("GBP 225k main-rate purchase = GBP 0", () => {
    const result = calculateStampDuty({
      price: 225_000,
      region: "wales",
      firstTimeBuyer: false,
      additionalProperty: false,
    });
    expect(result.total).toBe(0);
  });

  it("GBP 400k main-rate purchase = GBP 10,500", () => {
    const result = calculateStampDuty({
      price: 400_000,
      region: "wales",
      firstTimeBuyer: false,
      additionalProperty: false,
    });
    expect(result.total).toBe(10_500);
  });

  it("GBP 400k higher-rate purchase = GBP 29,950", () => {
    const result = calculateStampDuty({
      price: 400_000,
      region: "wales",
      firstTimeBuyer: false,
      additionalProperty: true,
    });
    expect(result.total).toBe(29_950);
  });
});

describe("Repayment", () => {
  it("GBP 200k at 5% over 25y is about GBP 1,169.18 per month", () => {
    const result = calculateRepayment({
      principal: 200_000,
      annualRate: 5,
      termYears: 25,
    });
    expect(result.monthlyPayment).toBeCloseTo(1169.18, 1);
  });

  it("interest-only GBP 200k at 5% = GBP 833.33 per month", () => {
    const result = calculateRepayment({
      principal: 200_000,
      annualRate: 5,
      termYears: 25,
      interestOnly: true,
    });
    expect(result.monthlyPayment).toBeCloseTo(833.33, 1);
  });

  it("0% rate divides evenly", () => {
    const result = calculateRepayment({
      principal: 120_000,
      annualRate: 0,
      termYears: 10,
    });
    expect(result.monthlyPayment).toBe(1000);
  });
});

describe("Overpayment schedule", () => {
  it("GBP 200 per month overpayment shortens the term materially", () => {
    const baseline = buildSchedule({
      principal: 200_000,
      annualRate: 5,
      termYears: 25,
    });
    const withOverpay = buildSchedule({
      principal: 200_000,
      annualRate: 5,
      termYears: 25,
      monthlyOverpayment: 200,
    });

    expect(withOverpay.monthsTaken).toBeLessThan(baseline.monthsTaken);
    expect(withOverpay.totalInterest).toBeLessThan(baseline.totalInterest);
  });
});

describe("Affordability", () => {
  it("GBP 60k income stays within the 4.5x multiplier cap", () => {
    const result = calculateAffordability({
      grossAnnualIncome: 60_000,
      monthlyExpenditure: 200,
      deposit: 30_000,
      termYears: 30,
      productRate: 4.5,
    });

    expect(result.maxBorrowing).toBeLessThanOrEqual(60_000 * 4.5);
  });
});
