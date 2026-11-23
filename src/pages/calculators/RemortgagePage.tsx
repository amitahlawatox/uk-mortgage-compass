import { useMemo, useState } from "react";
import { RemortgageSEOContent } from "@/components/calculators/SEOContent";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { formatGBP } from "@/lib/finance/decimal";
import { calculateRemortgageComparison } from "@/lib/finance/remortgage";
import { SliderField, BigStat } from "@/pages/calculators/RepaymentPage";
import { TrendingDown, Landmark } from "lucide-react";

// SliderField sends temporary drafts (including zero on clear) before blur.
// Keep the last valid calculation input until the user finishes editing.
const onValidInput = (
  setValue: (value: number) => void,
  min: number,
  max: number,
  wholeYears = false,
) => (value: number) => {
  if (Number.isFinite(value) && value >= min && value <= max) {
    setValue(wholeYears ? Math.round(value) : value);
  }
};

const RemortgagePage = () => {
  // Current mortgage
  const [currentBalance, setCurrentBalance] = useState(200_000);
  const [currentRate, setCurrentRate] = useState(5.5);
  const [currentTerm, setCurrentTerm] = useState(20);

  // New deal
  const [newRate, setNewRate] = useState(4.2);
  const [newTerm, setNewTerm] = useState(20);
  const [fees, setFees] = useState(1_500);
  const [earlyRepaymentCharge, setEarlyRepaymentCharge] = useState(0);
  const [selectedYears, setSelectedYears] = useState(2);
  const comparisonYears = Math.min(selectedYears, currentTerm, newTerm);

  const comparison = useMemo(() => calculateRemortgageComparison({
    balance: currentBalance,
    rateIfStaying: currentRate,
    remainingTermYears: currentTerm,
    newRate,
    newTermYears: newTerm,
    productFee: fees,
    earlyRepaymentCharge,
    comparisonYears,
  }), [currentBalance, currentRate, currentTerm, newRate, newTerm, fees, earlyRepaymentCharge, comparisonYears]);
  const newDealLower = comparison.costDifference > 1;
  const stayingLower = comparison.costDifference < -1;

  const pagePath = "calculators/remortgage";
  const seoTitle = "Remortgage Cost Comparison Calculator | RepayWise";
  const seoDescription = "Compare mortgage payments, interest, fees and remaining balances over the same period. Test a new rate and term against staying with your current mortgage.";

  return (
    <CalculatorShell
      eyebrow="Remortgage"
      title="Compare remortgage costs"
      intro="Model a new mortgage against staying with your current loan. Compare interest and fees over the same period, alongside monthly payments and the balance still owed."
      leadCalculator="remortgage"
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        calculatorType="Remortgage Calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: "Remortgage Calculator", href: "/calculators/remortgage" },
        ]}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Prefilled figures are examples, not current mortgage offers. Replace them with the rates, term, fees and balance from your own lender documents.
          </p>
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. If you stay</p>
            </div>
            <SliderField label="Outstanding balance" prefix="£" value={currentBalance} min={10_000} max={1_500_000} step={5_000} onChange={onValidInput(setCurrentBalance, 10_000, 1_500_000)} />
            <SliderField label="Assumed rate if staying" suffix="%" value={currentRate} min={0.5} max={12} step={0.05} decimals={2} onChange={onValidInput(setCurrentRate, 0.5, 12)} />
            <SliderField label="Remaining term (years)" value={currentTerm} min={1} max={40} step={1} onChange={onValidInput(setCurrentTerm, 1, 40, true)} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <TrendingDown className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. New deal</p>
            </div>
            <SliderField label="Assumed new rate" suffix="%" value={newRate} min={0.5} max={12} step={0.05} decimals={2} onChange={onValidInput(setNewRate, 0.5, 12)} />
            <SliderField label="New term (years)" value={newTerm} min={1} max={40} step={1} onChange={onValidInput(setNewTerm, 1, 40, true)} />
            <SliderField label="Arrangement / product fee" prefix="£" value={fees} min={0} max={5_000} step={50} onChange={onValidInput(setFees, 0, 5_000)} />
            <SliderField label="Early repayment charge (ERC)" prefix="£" value={earlyRepaymentCharge} min={0} max={20_000} step={100} onChange={onValidInput(setEarlyRepaymentCharge, 0, 20_000)} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Compare the same period</p>
            <div className="flex flex-wrap gap-2" aria-label="Comparison period">
              {([1, 2, 3, 4, 5] as const).filter((years) => years <= Math.min(currentTerm, newTerm)).map((years) => (
                <button
                  key={years}
                  type="button"
                  aria-pressed={comparisonYears === years}
                  onClick={() => setSelectedYears(years)}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold ${comparisonYears === years ? "border-accent bg-accent text-accent-foreground" : "border-border bg-secondary"}`}
                >
                  {years} year{years > 1 ? "s" : ""}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Choose a period covered by both mortgage terms and check whether each quoted rate lasts that long.</p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BigStat label="Stay: monthly payment" value={formatGBP(comparison.current.monthlyPayment)} />
            <BigStat label="New: monthly payment" value={formatGBP(comparison.proposed.monthlyPayment)} />
            <BigStat label={`Cost difference over ${comparison.years} year${comparison.years > 1 ? "s" : ""}`} value={formatGBP(Math.abs(comparison.costDifference), { decimals: 2 })} highlight={newDealLower} />
            <BigStat label="Upfront switch costs" value={formatGBP(comparison.switchingCosts)} />
          </div>

          <div className="rounded-2xl border glass-card p-6 space-y-3" aria-live="polite">
            <h2 className="text-lg font-semibold">
              {newDealLower
                ? `The new deal has ${formatGBP(comparison.costDifference, { decimals: 2 })} lower modelled borrowing cost over ${comparison.years} year${comparison.years > 1 ? "s" : ""}`
                : stayingLower
                  ? `Staying has ${formatGBP(-comparison.costDifference, { decimals: 2 })} lower modelled borrowing cost over ${comparison.years} year${comparison.years > 1 ? "s" : ""}`
                  : "Modelled borrowing costs are similar over this period"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Borrowing cost here means interest during the chosen period plus the new deal's upfront fees and early repayment charge. It excludes principal repaid, which reduces the loan balance shown below. Because both options start with the same balance, this is also payments made plus the ending balance, less the starting balance, plus switching costs. A lower monthly payment can leave more to repay later.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Position after {comparison.years} year{comparison.years > 1 ? "s" : ""}</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              {([
                { label: "Stay", option: comparison.current, upfront: 0 },
                { label: "New deal", option: comparison.proposed, upfront: comparison.switchingCosts },
              ] as const).map(({ label, option, upfront }) => (
                <div key={label} className="rounded-xl border border-border p-4 space-y-2">
                  <h3 className="font-semibold">{label}</h3>
                  <p>Payments made: <strong className="tabular-nums">{formatGBP(option.paymentsOverPeriod)}</strong></p>
                  <p>Interest paid: <strong className="tabular-nums">{formatGBP(option.interestOverPeriod)}</strong></p>
                  <p>Upfront switching costs: <strong className="tabular-nums">{formatGBP(upfront)}</strong></p>
                  <p>Interest + costs: <strong className="tabular-nums">{formatGBP(option.borrowingCost)}</strong></p>
                  <p>Balance still owed: <strong className="tabular-nums">{formatGBP(option.balanceAtEnd)}</strong></p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Illustration only. Rates are assumed unchanged throughout the chosen period; a real product may end sooner. Fees and any ERC are paid upfront, not added to the loan. The estimate omits cashback, other costs and future rate changes. Check both lender illustrations and your contract before deciding.
          </p>

          <RelatedCalculators currentPath="/calculators/remortgage" />
          <LastUpdated date="23 November 2026" />
        </div>
      </div>
          <RemortgageSEOContent />
    </CalculatorShell>
  );
};

export default RemortgagePage;
