import { useMemo, useState } from "react";
import { SalaryToMortgageSEOContent } from "@/components/calculators/SEOContent";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { formatGBP } from "@/lib/finance/decimal";
import { calculateRepayment } from "@/lib/finance/repayment";
import { SliderField, BigStat } from "@/pages/calculators/RepaymentPage";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Briefcase, Home, PoundSterling } from "lucide-react";

// Simplified UK income tax calculation (2024/25 tax year)
function calculateNetMonthly(grossAnnual: number): number {
  const personalAllowance = 12_570;
  const basicRateLimit = 50_270;
  const higherRateLimit = 125_140;

  // Calculate adjusted personal allowance (tapered above £100k)
  const adjustedPA = grossAnnual > 100_000
    ? Math.max(0, personalAllowance - (grossAnnual - 100_000) / 2)
    : personalAllowance;

  const taxableIncome = Math.max(0, grossAnnual - adjustedPA);

  let tax = 0;

  // Basic rate (20%) — from £0 to (basicRateLimit - adjustedPA)
  const basicBand = Math.min(taxableIncome, basicRateLimit - adjustedPA);
  tax += basicBand * 0.2;

  // Higher rate (40%)
  if (taxableIncome > basicRateLimit - adjustedPA) {
    const higherBand = Math.min(taxableIncome - (basicRateLimit - adjustedPA), higherRateLimit - basicRateLimit);
    tax += higherBand * 0.4;
  }

  // Additional rate (45%)
  if (taxableIncome > higherRateLimit - adjustedPA) {
    const additionalBand = taxableIncome - (higherRateLimit - adjustedPA);
    tax += additionalBand * 0.45;
  }

  // National Insurance (simplified — Class 1, 2024/25)
  let ni = 0;
  const niThreshold = 12_570;
  const niUpperLimit = 50_270;
  if (grossAnnual > niThreshold) {
    const niBasic = Math.min(grossAnnual - niThreshold, niUpperLimit - niThreshold) * 0.08;
    const niHigher = Math.max(0, grossAnnual - niUpperLimit) * 0.02;
    ni = niBasic + niHigher;
  }

  const netAnnual = grossAnnual - tax - ni;
  return netAnnual / 12;
}

const SalaryToMortgagePage = () => {
  const [salary, setSalary] = useState(55_000);
  const [partnerSalary, setPartnerSalary] = useState(0);
  const [deposit, setDeposit] = useState(40_000);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(4.5);
  const [monthlyCommitments, setMonthlyCommitments] = useState(300);

  const totalGross = salary + partnerSalary;
  const netMonthly = calculateNetMonthly(salary) + calculateNetMonthly(partnerSalary);
  const disposableMonthly = netMonthly - monthlyCommitments;

  // Standard lender multiplier: 4.5x combined income
  const maxBorrowing45 = totalGross * 4.5;
  // Conservative: 4x
  const maxBorrowing40 = totalGross * 4.0;
  // Generous: 5x (specialist lenders)
  const maxBorrowing50 = totalGross * 5.0;

  const maxPropertyPrice = maxBorrowing45 + deposit;
  const lti = totalGross > 0 ? maxBorrowing45 / totalGross : 0;

  const mortgageResult = useMemo(
    () => calculateRepayment({ principal: maxBorrowing45, annualRate: rate, termYears: term }),
    [maxBorrowing45, rate, term],
  );

  // Affordability check: is monthly payment < 35% of net income?
  const paymentToIncomeRatio = netMonthly > 0 ? (mortgageResult.monthlyPayment / netMonthly) * 100 : 0;
  const affordable = paymentToIncomeRatio < 40;

  // Stress test at +3%
  const stressedResult = useMemo(
    () => calculateRepayment({ principal: maxBorrowing45, annualRate: rate + 3, termYears: term }),
    [maxBorrowing45, rate, term],
  );
  const stressedRatio = netMonthly > 0 ? (stressedResult.monthlyPayment / netMonthly) * 100 : 0;
  const passesStressTest = stressedRatio < 50;

  const budgetChart = useMemo(() => [
    { name: "Mortgage payment", value: mortgageResult.monthlyPayment, color: "hsl(var(--accent))" },
    { name: "Other commitments", value: monthlyCommitments, color: "hsl(var(--accent-secondary))" },
    { name: "Remaining", value: Math.max(0, netMonthly - mortgageResult.monthlyPayment - monthlyCommitments), color: "hsl(var(--muted-foreground))" },
  ], [mortgageResult.monthlyPayment, monthlyCommitments, netMonthly]);

  const pagePath = "calculators/salary-to-mortgage";
  const seoTitle = "Salary to Mortgage Calculator — How Much Can I Get?";
  const seoDescription = "Enter your salary and see how much mortgage you could get. UK income multiples (4-5x), affordability check, stress test, and net pay breakdown. Free, no login.";

  return (
    <CalculatorShell
      eyebrow="Salary → Mortgage"
      title="What Mortgage Can My Salary Get?"
      intro="Enter your gross salary and we'll calculate your maximum mortgage using standard UK lender multiples (4–5× income). Includes a stress test, affordability check against your net pay, and shows exactly what property price you can target."
      leadCalculator="salary-to-mortgage"
      leadContext={{ salary, maxBorrowing: maxBorrowing45, maxPropertyPrice, affordable }}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        calculatorType="Salary to Mortgage Calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: "Salary to Mortgage", href: "/calculators/salary-to-mortgage" },
        ]}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Income</p>
            </div>
            <SliderField label="Your gross salary" prefix="£" value={salary} min={15_000} max={250_000} step={1_000} onChange={setSalary} />
            <SliderField label="Partner's salary (optional)" prefix="£" value={partnerSalary} min={0} max={250_000} step={1_000} onChange={setPartnerSalary} />
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-muted-foreground">Combined gross</span>
              <span className="font-semibold tabular-nums">{formatGBP(totalGross)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Net monthly take-home</span>
              <span className="font-semibold tabular-nums">{formatGBP(netMonthly)}</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Home className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. Mortgage details</p>
            </div>
            <SliderField label="Deposit saved" prefix="£" value={deposit} min={0} max={500_000} step={5_000} onChange={setDeposit} />
            <SliderField label="Mortgage term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
            <SliderField label="Expected rate" suffix="%" value={rate} min={1} max={8} step={0.05} decimals={2} onChange={setRate} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <PoundSterling className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Commitments</p>
            </div>
            <SliderField label="Monthly outgoings (loans, cards, etc)" prefix="£" value={monthlyCommitments} min={0} max={3_000} step={50} onChange={setMonthlyCommitments} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <BigStat label="Max borrowing (4.5×)" value={formatGBP(maxBorrowing45)} highlight />
            <BigStat label="Max property price" value={formatGBP(maxPropertyPrice)} />
            <BigStat label="Monthly payment" value={formatGBP(mortgageResult.monthlyPayment)} />
            <BigStat label="Income ratio" value={`${lti.toFixed(1)}×`} />
          </div>

          {/* Multiplier breakdown */}
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lender multiples</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Conservative (4.0×)</span>
                <span className="font-semibold tabular-nums">{formatGBP(maxBorrowing40)} → {formatGBP(maxBorrowing40 + deposit)} property</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Standard (4.5×)</span>
                <span className="tabular-nums">{formatGBP(maxBorrowing45)} → {formatGBP(maxPropertyPrice)} property</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Generous (5.0×)</span>
                <span className="font-semibold tabular-nums">{formatGBP(maxBorrowing50)} → {formatGBP(maxBorrowing50 + deposit)} property</span>
              </div>
            </div>
          </div>

          {/* Affordability checks */}
          <div className={`rounded-2xl p-6 border ${affordable ? "border-green-500/30 bg-green-50/5" : "border-amber-500/30 bg-amber-50/5"}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Affordability checks</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>Payment-to-income ratio</span>
                <span className={`font-semibold ${paymentToIncomeRatio < 35 ? "text-green-500" : paymentToIncomeRatio < 45 ? "text-amber-500" : "text-red-500"}`}>
                  {paymentToIncomeRatio.toFixed(1)}% {paymentToIncomeRatio < 35 ? "— Comfortable" : paymentToIncomeRatio < 45 ? "— Tight" : "— Stretched"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Stress test (+3%)</span>
                <span className={`font-semibold ${passesStressTest ? "text-green-500" : "text-red-500"}`}>
                  {formatGBP(stressedResult.monthlyPayment)}/mo ({stressedRatio.toFixed(1)}%) {passesStressTest ? "— Pass" : "— Fail"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Remaining after mortgage</span>
                <span className="font-semibold tabular-nums">{formatGBP(Math.max(0, disposableMonthly - mortgageResult.monthlyPayment))}/mo</span>
              </div>
            </div>
          </div>

          {/* Budget chart */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Monthly budget split</p>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={budgetChart} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {budgetChart.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatGBP(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs">
              {budgetChart.map((entry, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}: {formatGBP(entry.value)}
                </span>
              ))}
            </div>
          </div>

          <RelatedCalculators currentPath="/calculators/salary-to-mortgage" />
          <LastUpdated date="4 June 2026" />
        </div>
      </div>
          <SalaryToMortgageSEOContent />
    </CalculatorShell>
  );
};

export default SalaryToMortgagePage;
