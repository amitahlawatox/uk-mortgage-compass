/**
 * Mortgage repayment & amortisation.
 * Standard capital-repayment formula, computed in Decimal.js.
 *   M = P · r(1+r)^n / ((1+r)^n − 1)
 */
import Decimal from "decimal.js";
import { D } from "./decimal";

export interface RepaymentInput {
  principal: number;     // GBP loan amount
  annualRate: number;    // e.g. 4.5 for 4.5%
  termYears: number;
  interestOnly?: boolean;
}

export interface RepaymentResult {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
}

export interface AmortRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export function monthlyRate(annualRatePct: number): Decimal {
  return D(annualRatePct).div(100).div(12);
}

export function calculateRepayment(input: RepaymentInput): RepaymentResult {
  const P = D(input.principal);
  const r = monthlyRate(input.annualRate);
  const n = D(input.termYears).times(12);

  if (input.interestOnly) {
    const monthly = P.times(r);
    const total = monthly.times(n).plus(P);
    return {
      monthlyPayment: monthly.toDecimalPlaces(2).toNumber(),
      totalPaid: total.toDecimalPlaces(2).toNumber(),
      totalInterest: monthly.times(n).toDecimalPlaces(2).toNumber(),
    };
  }

  if (r.eq(0)) {
    const monthly = P.div(n);
    return {
      monthlyPayment: monthly.toDecimalPlaces(2).toNumber(),
      totalPaid: P.toDecimalPlaces(2).toNumber(),
      totalInterest: 0,
    };
  }

  const onePlusR_n = r.plus(1).pow(n);
  const monthly = P.times(r).times(onePlusR_n).div(onePlusR_n.minus(1));
  const total = monthly.times(n);
  const interest = total.minus(P);

  return {
    monthlyPayment: monthly.toDecimalPlaces(2).toNumber(),
    totalPaid: total.toDecimalPlaces(2).toNumber(),
    totalInterest: interest.toDecimalPlaces(2).toNumber(),
  };
}

/** Build full amortisation schedule with optional regular monthly overpayment
 *  and an optional one-off lump-sum applied at `lumpSumMonth`.
 *  Returns final-state metrics so we can show "term shortened by X" etc. */
export function buildSchedule(
  input: RepaymentInput & {
    monthlyOverpayment?: number;
    quarterlyOverpayment?: number;
    annualOverpayment?: number;
    lumpSum?: number;
    lumpSumMonth?: number; // 1-indexed
  },
): {
  schedule: AmortRow[];
  monthsTaken: number;
  totalInterest: number;
  totalPaid: number;
  totalOverpaid: number;
} {
  const r = monthlyRate(input.annualRate);
  const baseMonthly = D(calculateRepayment(input).monthlyPayment);
  const overpay = D(input.monthlyOverpayment ?? 0);
  const quarterly = D(input.quarterlyOverpayment ?? 0);
  const annual = D(input.annualOverpayment ?? 0);
  let balance = D(input.principal);
  const schedule: AmortRow[] = [];
  let totalInterest = D(0);
  let totalPaid = D(0);
  let totalOverpaid = D(0);
  const maxMonths = input.termYears * 12;

  for (let m = 1; m <= maxMonths && balance.gt(0.005); m++) {
    const interest = balance.times(r);
    let principalPaid = baseMonthly.minus(interest).plus(overpay);
    let extraThisMonth = overpay;

    if (m % 3 === 0 && quarterly.gt(0)) {
      principalPaid = principalPaid.plus(quarterly);
      extraThisMonth = extraThisMonth.plus(quarterly);
    }
    if (m % 12 === 0 && annual.gt(0)) {
      principalPaid = principalPaid.plus(annual);
      extraThisMonth = extraThisMonth.plus(annual);
    }
    if (input.lumpSum && input.lumpSumMonth === m) {
      principalPaid = principalPaid.plus(input.lumpSum);
      extraThisMonth = extraThisMonth.plus(input.lumpSum);
    }

    if (principalPaid.gt(balance)) {
      principalPaid = balance;
    }

    const payment = interest.plus(principalPaid);
    balance = balance.minus(principalPaid);
    totalInterest = totalInterest.plus(interest);
    totalPaid = totalPaid.plus(payment);
    totalOverpaid = totalOverpaid.plus(extraThisMonth);

    schedule.push({
      month: m,
      payment: payment.toDecimalPlaces(2).toNumber(),
      interest: interest.toDecimalPlaces(2).toNumber(),
      principal: principalPaid.toDecimalPlaces(2).toNumber(),
      balance: balance.toDecimalPlaces(2).toNumber(),
    });
  }

  return {
    schedule,
    monthsTaken: schedule.length,
    totalInterest: totalInterest.toDecimalPlaces(2).toNumber(),
    totalPaid: totalPaid.toDecimalPlaces(2).toNumber(),
    totalOverpaid: totalOverpaid.toDecimalPlaces(2).toNumber(),
  };
}
