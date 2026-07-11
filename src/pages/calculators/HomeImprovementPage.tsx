import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { formatGBP } from "@/lib/finance/decimal";
import { calculateRepayment } from "@/lib/finance/repayment";
import { SliderField, BigStat } from "@/pages/calculators/RepaymentPage";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Hammer, Landmark, Scale } from "lucide-react";

const HomeImprovementPage = () => {
  // Project
  const [improvementCost, setImprovementCost] = useState(30_000);

  // Current mortgage (for remortgage option)
  const [currentBalance, setCurrentBalance] = useState(180_000);
  const [mortgageRate, setMortgageRate] = useState(4.5);
  const [mortgageTerm, setMortgageTerm] = useState(22);

  // Personal loan option
  const [loanRate, setLoanRate] = useState(7.9);
  const [loanTerm, setLoanTerm] = useState(5);

  // Remortgage option — add to existing balance
  const remortgageTotal = currentBalance + improvementCost;

  const personalLoan = useMemo(
    () => calculateRepayment({ principal: improvementCost, annualRate: loanRate, termYears: loanTerm }),
    [improvementCost, loanRate, loanTerm],
  );

  const currentMortgage = useMemo(
    () => calculateRepayment({ principal: currentBalance, annualRate: mortgageRate, termYears: mortgageTerm }),
    [currentBalance, mortgageRate, mortgageTerm],
  );

  const remortgageDeal = useMemo(
    () => calculateRepayment({ principal: remortgageTotal, annualRate: mortgageRate, termYears: mortgageTerm }),
    [remortgageTotal, mortgageRate, mortgageTerm],
  );

  // Cost of the improvement portion via remortgage
  const remortgageExtraInterest = remortgageDeal.totalInterest - currentMortgage.totalInterest;
  const remortgageExtraMonthly = remortgageDeal.monthlyPayment - currentMortgage.monthlyPayment;
  const personalLoanMonthly = personalLoan.monthlyPayment;

  // Combined monthly during loan period if taking personal loan
  const combinedMonthly = currentMortgage.monthlyPayment + personalLoanMonthly;
  const remortgageMonthly = remortgageDeal.monthlyPayment;

  const personalLoanTotalCost = personalLoan.totalPaid;
  const remortgageTotalCost = improvementCost + remortgageExtraInterest;

  const cheaper = personalLoanTotalCost < remortgageTotalCost ? "loan" : "remortgage";
  const saving = Math.abs(personalLoanTotalCost - remortgageTotalCost);

  const chartData = useMemo(() => [
    {
      name: "Monthly payment",
      "Personal loan": combinedMonthly,
      "Remortgage": remortgageMonthly,
    },
    {
      name: "Total cost of improvement",
      "Personal loan": personalLoanTotalCost,
      "Remortgage": remortgageTotalCost,
    },
  ], [combinedMonthly, remortgageMonthly, personalLoanTotalCost, remortgageTotalCost]);

  const pagePath = "calculators/home-improvement";
  const seoTitle = "Home Improvement: Loan vs Remortgage — Which Is Cheaper?";
  const seoDescription = "Personal loan or remortgage for home improvements? Compare monthly payments and total interest side-by-side. Free UK calculator — see which option saves you money.";

  return (
    <CalculatorShell
      eyebrow="Home Improvement"
      title="Loan vs Remortgage — Which Is Cheaper?"
      intro="Funding a home improvement? Compare the true cost of a personal loan against adding to your mortgage. See monthly payments, total interest, and which option saves you more over the full term."
      leadCalculator="home-improvement"
      leadContext={{ improvementCost, cheaper, saving }}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        calculatorType="Home Improvement Calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: "Home Improvement Calculator", href: "/calculators/home-improvement" },
        ]}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Hammer className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Your project</p>
            </div>
            <SliderField label="Improvement cost" prefix="£" value={improvementCost} min={1_000} max={150_000} step={1_000} onChange={setImprovementCost} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. Current mortgage</p>
            </div>
            <SliderField label="Outstanding balance" prefix="£" value={currentBalance} min={10_000} max={1_000_000} step={5_000} onChange={setCurrentBalance} />
            <SliderField label="Mortgage rate" suffix="%" value={mortgageRate} min={0.5} max={10} step={0.05} decimals={2} onChange={setMortgageRate} />
            <SliderField label="Remaining term (years)" value={mortgageTerm} min={1} max={35} step={1} onChange={setMortgageTerm} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Scale className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Personal loan option</p>
            </div>
            <SliderField label="Loan APR" suffix="%" value={loanRate} min={2} max={30} step={0.1} decimals={1} onChange={setLoanRate} />
            <SliderField label="Loan term (years)" value={loanTerm} min={1} max={10} step={1} onChange={setLoanTerm} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {/* Verdict */}
          <div className={`rounded-2xl p-6 border ${cheaper === "remortgage" ? "border-green-500/30 bg-green-50/5" : "border-blue-500/30 bg-blue-50/5"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Scale className={`size-4 ${cheaper === "remortgage" ? "text-green-500" : "text-blue-500"}`} />
              <p className="text-sm font-bold">
                {cheaper === "remortgage"
                  ? `Remortgaging saves ${formatGBP(saving)} overall`
                  : `Personal loan saves ${formatGBP(saving)} overall`
                }
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {cheaper === "remortgage"
                ? `Adding ${formatGBP(improvementCost)} to your mortgage at ${mortgageRate}% costs less in total interest than a ${loanRate}% personal loan — even spread over ${mortgageTerm} years. But your monthly payment is lower with the remortgage (${formatGBP(remortgageExtraMonthly)} extra/mo vs ${formatGBP(personalLoanMonthly)}/mo for the loan).`
                : `The personal loan at ${loanRate}% for ${loanTerm} years costs less in total than spreading ${formatGBP(improvementCost)} over ${mortgageTerm} years on your mortgage. You'll pay more per month (${formatGBP(personalLoanMonthly)}/mo vs ${formatGBP(remortgageExtraMonthly)} extra) but clear the debt faster.`
              }
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <BigStat label="Loan monthly (total)" value={formatGBP(combinedMonthly)} />
            <BigStat label="Remortgage monthly" value={formatGBP(remortgageMonthly)} highlight={cheaper === "remortgage"} />
            <BigStat label="Loan total cost" value={formatGBP(personalLoanTotalCost)} highlight={cheaper === "loan"} />
            <BigStat label="Remortgage total cost" value={formatGBP(remortgageTotalCost)} />
          </div>

          {/* Detail cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Personal Loan</p>
              <p className="text-sm"><span className="text-muted-foreground">Monthly:</span> <span className="font-semibold tabular-nums">{formatGBP(personalLoanMonthly)}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Interest paid:</span> <span className="font-semibold tabular-nums">{formatGBP(personalLoan.totalInterest)}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Debt-free in:</span> <span className="font-semibold">{loanTerm} years</span></p>
            </div>
            <div className="glass-card rounded-2xl p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Remortgage</p>
              <p className="text-sm"><span className="text-muted-foreground">Extra monthly:</span> <span className="font-semibold tabular-nums">{formatGBP(remortgageExtraMonthly)}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Extra interest:</span> <span className="font-semibold tabular-nums">{formatGBP(remortgageExtraInterest)}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Spread over:</span> <span className="font-semibold">{mortgageTerm} years</span></p>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Cost comparison</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={4}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatGBP(value)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Personal loan" fill="hsl(var(--accent-secondary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Remortgage" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <RelatedCalculators currentPath="/calculators/home-improvement" />
          <LastUpdated date="4 June 2026" />
        </div>
      </div>
    </CalculatorShell>
  );
};

export default HomeImprovementPage;
