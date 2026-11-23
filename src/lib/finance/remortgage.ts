import { D, toMoney } from "./decimal";
import { buildSchedule, calculateRepayment } from "./repayment";

export interface RemortgageComparisonInput {
  balance: number;
  rateIfStaying: number;
  remainingTermYears: number;
  newRate: number;
  newTermYears: number;
  productFee: number;
  earlyRepaymentCharge: number;
  comparisonYears: number;
}

export interface RemortgageOption {
  monthlyPayment: number;
  paymentsOverPeriod: number;
  interestOverPeriod: number;
  balanceAtEnd: number;
  // Interest is the cost of borrowing during the period. Principal repaid
  // reduces the balance, so it must not be counted as a cost twice.
  borrowingCost: number;
}

export interface RemortgageComparison {
  years: number;
  current: RemortgageOption;
  proposed: RemortgageOption;
  switchingCosts: number;
  // Positive means the proposed deal has lower modelled interest plus fees.
  costDifference: number;
}

function optionOverPeriod(
  balance: number,
  annualRate: number,
  termYears: number,
  months: number,
  upfrontCosts: number,
): RemortgageOption {
  const monthlyPayment = calculateRepayment({
    principal: balance,
    annualRate,
    termYears,
  }).monthlyPayment;
  const rows = buildSchedule({ principal: balance, annualRate, termYears }).schedule.slice(0, months);
  const paymentsOverPeriod = toMoney(rows.reduce((total, row) => total.plus(row.payment), D(0)));
  const interestOverPeriod = toMoney(rows.reduce((total, row) => total.plus(row.interest), D(0)));

  return {
    monthlyPayment,
    paymentsOverPeriod,
    interestOverPeriod,
    balanceAtEnd: rows.at(-1)?.balance ?? balance,
    borrowingCost: toMoney(D(interestOverPeriod).plus(upfrontCosts)),
  };
}

/** Compare the same starting balance at the same future date.
 * Rates are assumed constant for the selected period; fees and ERC are paid upfront.
 * Compare interest plus upfront costs, while separately showing cash paid and
 * remaining principal so a longer term cannot masquerade as a saving.
 */
export function calculateRemortgageComparison(input: RemortgageComparisonInput): RemortgageComparison {
  const {
    balance, rateIfStaying, remainingTermYears, newRate, newTermYears,
    productFee, earlyRepaymentCharge, comparisonYears,
  } = input;
  if (
    ![balance, rateIfStaying, remainingTermYears, newRate, newTermYears, productFee, earlyRepaymentCharge, comparisonYears]
      .every(Number.isFinite) ||
    balance < 0 || rateIfStaying < 0 || newRate < 0 ||
    remainingTermYears < 1 || newTermYears < 1 ||
    productFee < 0 || earlyRepaymentCharge < 0 ||
    !Number.isInteger(comparisonYears) || comparisonYears < 1 ||
    comparisonYears > Math.min(remainingTermYears, newTermYears)
  ) {
    throw new RangeError("Invalid remortgage comparison inputs");
  }

  const months = comparisonYears * 12;
  const switchingCosts = toMoney(D(productFee).plus(earlyRepaymentCharge));
  const current = optionOverPeriod(balance, rateIfStaying, remainingTermYears, months, 0);
  const proposed = optionOverPeriod(balance, newRate, newTermYears, months, switchingCosts);

  return {
    years: comparisonYears,
    current,
    proposed,
    switchingCosts,
    costDifference: toMoney(D(current.borrowingCost).minus(proposed.borrowingCost)),
  };
}
