import { describe, expect, it } from "vitest";
import { calculateRemortgageComparison } from "@/lib/finance/remortgage";

const example = {
  balance: 200_000,
  rateIfStaying: 4,
  remainingTermYears: 20,
  newRate: 5,
  newTermYears: 40,
  productFee: 1_500,
  earlyRepaymentCharge: 0,
  comparisonYears: 2,
};

describe("remortgage comparison", () => {
  it("does not call lower payments a saving when a longer, higher-rate loan leaves more debt", () => {
    const result = calculateRemortgageComparison(example);

    expect(result.current.monthlyPayment).toBeCloseTo(1_211.96, 1);
    expect(result.proposed.monthlyPayment).toBeCloseTo(964.39, 1);
    expect(result.proposed.monthlyPayment).toBeLessThan(result.current.monthlyPayment);
    expect(result.proposed.balanceAtEnd).toBeGreaterThan(result.current.balanceAtEnd);
    expect(result.costDifference).toBeLessThan(0);
    // Independent closed-form amortisation cross-check, with each monthly
    // payment rounded to pennies: the new deal costs about £5,859 more in 2y.
    expect(result.costDifference).toBeCloseTo(-5_858.73, 0);
    expect(result.current.balanceAtEnd).toBeCloseTo(186_398.81, 0);
    expect(result.proposed.balanceAtEnd).toBeCloseTo(196_699.22, 0);
    expect(result.proposed.borrowingCost).toBeCloseTo(
      result.proposed.interestOverPeriod + 1_500,
      2,
    );
  });

  it("accounts for the outstanding balance at a common 20-year horizon", () => {
    const result = calculateRemortgageComparison({ ...example, comparisonYears: 20 });

    expect(result.current.balanceAtEnd).toBeCloseTo(0, 0);
    expect(result.proposed.balanceAtEnd).toBeGreaterThan(146_000);
    expect(result.costDifference).toBeLessThan(-88_000);
    // At a common starting balance, payments plus outstanding principal
    // equal initial principal plus interest (within row-rounding tolerance).
    expect(result.proposed.paymentsOverPeriod + result.proposed.balanceAtEnd).toBeCloseTo(
      example.balance + result.proposed.interestOverPeriod,
      0,
    );
  });

  it("counts both upfront costs once when the rate and term are unchanged", () => {
    const result = calculateRemortgageComparison({
      ...example,
      newRate: example.rateIfStaying,
      newTermYears: example.remainingTermYears,
      productFee: 999,
      earlyRepaymentCharge: 2_000,
    });

    expect(result.current.balanceAtEnd).toBe(result.proposed.balanceAtEnd);
    expect(result.switchingCosts).toBe(2_999);
    expect(result.costDifference).toBe(-2_999);
  });

  it("reports a lower rate as lower cost when it exceeds the upfront fee", () => {
    const result = calculateRemortgageComparison({
      ...example,
      rateIfStaying: 5.5,
      newRate: 4.2,
      newTermYears: 20,
      productFee: 1_500,
    });

    expect(result.costDifference).toBeGreaterThan(0);
    expect(result.current.balanceAtEnd).toBeGreaterThan(result.proposed.balanceAtEnd);
  });

  it("handles a zero rate and rejects a period longer than either mortgage", () => {
    const zeroRate = calculateRemortgageComparison({
      ...example,
      rateIfStaying: 0,
      newRate: 0,
      newTermYears: 20,
      productFee: 0,
    });
    expect(zeroRate.current.interestOverPeriod).toBe(0);
    expect(zeroRate.costDifference).toBe(0);

    expect(() => calculateRemortgageComparison({
      ...example,
      remainingTermYears: 1,
    })).toThrow(RangeError);
  });
});
