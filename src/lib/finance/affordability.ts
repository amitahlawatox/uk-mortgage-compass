/**
 * Affordability — UK lender-style 4.5x salary multiplier with stress test.
 * Designed to plug into Open Banking input later (Moneyhub / Plaid).
 */
import { D } from "./decimal";

export interface AffordabilityInput {
  grossAnnualIncome: number;
  partnerIncome?: number;
  monthlyExpenditure: number; // committed outgoings (loans, childcare, etc.)
  deposit: number;
  termYears: number;
  productRate: number; // % p.a.
  stressUplift?: number; // e.g. 3 for +3% stress test
  multiplier?: number;   // default 4.5
}

export interface AffordabilityResult {
  maxBorrowing: number;
  maxPropertyValue: number;
  monthlyPayment: number;
  monthlyPaymentStressed: number;
  passesStressTest: boolean;
  loanToIncome: number;
  notes: string[];
}

import { calculateRepayment } from "./repayment";

export function calculateAffordability(input: AffordabilityInput): AffordabilityResult {
  const totalIncome = D(input.grossAnnualIncome).plus(input.partnerIncome ?? 0);
  const multiplier = D(input.multiplier ?? 4.5);
  const stressUplift = input.stressUplift ?? 3;

  const incomeBased = totalIncome.times(multiplier);

  // Affordability constraint from disposable income: assume max 45% of net-of-expenditure
  // monthly income may go to mortgage (a conservative proxy).
  const monthlyGross = totalIncome.div(12);
  const monthlyAvailable = monthlyGross.minus(input.monthlyExpenditure).times(0.45);

  // Solve for max principal where calculated monthly payment ≤ available.
  // Binary search — fast enough and avoids algebra over Decimal.
  const maxByAffordability = solveMaxPrincipal(
    monthlyAvailable.toNumber(),
    input.productRate,
    input.termYears,
  );

  const maxBorrowing = Math.min(incomeBased.toNumber(), maxByAffordability);

  const monthly = calculateRepayment({
    principal: maxBorrowing,
    annualRate: input.productRate,
    termYears: input.termYears,
  }).monthlyPayment;

  const stressed = calculateRepayment({
    principal: maxBorrowing,
    annualRate: input.productRate + stressUplift,
    termYears: input.termYears,
  }).monthlyPayment;

  const passesStressTest = stressed <= monthlyAvailable.toNumber();

  const notes: string[] = [];
  if (maxBorrowing === incomeBased.toNumber()) {
    notes.push(`Capped by ${multiplier.toString()}× income multiplier.`);
  } else {
    notes.push("Capped by affordability (45% of disposable income).");
  }
  notes.push(`Stress-tested at ${(input.productRate + stressUplift).toFixed(2)}%.`);

  return {
    maxBorrowing: Math.max(0, Math.round(maxBorrowing)),
    maxPropertyValue: Math.max(0, Math.round(maxBorrowing + input.deposit)),
    monthlyPayment: monthly,
    monthlyPaymentStressed: stressed,
    passesStressTest,
    loanToIncome: totalIncome.gt(0)
      ? D(maxBorrowing).div(totalIncome).toDecimalPlaces(2).toNumber()
      : 0,
    notes,
  };
}

function solveMaxPrincipal(
  maxMonthly: number,
  rate: number,
  termYears: number,
): number {
  if (maxMonthly <= 0) return 0;
  let lo = 0;
  let hi = maxMonthly * 12 * termYears * 2;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const m = calculateRepayment({ principal: mid, annualRate: rate, termYears }).monthlyPayment;
    if (m > maxMonthly) hi = mid;
    else lo = mid;
  }
  return lo;
}
