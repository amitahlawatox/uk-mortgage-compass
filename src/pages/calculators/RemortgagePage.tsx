import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { formatGBP } from "@/lib/finance/decimal";
import { calculateRepayment } from "@/lib/finance/repayment";
import { SliderField, BigStat } from "@/pages/calculators/RepaymentPage";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRight, TrendingDown, Landmark } from "lucide-react";

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

  const currentDeal = useMemo(
    () => calculateRepayment({ principal: currentBalance, annualRate: currentRate, termYears: currentTerm }),
    [currentBalance, currentRate, currentTerm],
  );

  // Calculate new deal WITHOUT fees in principal — fees are a one-off upfront cost
  const newDeal = useMemo(
    () => calculateRepayment({ principal: currentBalance, annualRate: newRate, termYears: newTerm }),
    [currentBalance, newRate, newTerm],
  );

  const monthlySaving = currentDeal.monthlyPayment - newDeal.monthlyPayment;
  const totalCostOfSwitch = fees + earlyRepaymentCharge;
  const breakEvenMonths = monthlySaving > 0 ? Math.ceil(totalCostOfSwitch / monthlySaving) : 0;

  // Compare total cost over the shorter of the two terms to avoid misleading results
  const comparisonMonths = Math.min(currentTerm, newTerm) * 12;
  const currentCostOverPeriod = currentDeal.monthlyPayment * comparisonMonths;
  const newCostOverPeriod = newDeal.monthlyPayment * comparisonMonths + totalCostOfSwitch;
  const netSaving = currentCostOverPeriod - newCostOverPeriod;
  const worthSwitching = netSaving > 0;

  const chart = useMemo(() => [
    { name: "Current total cost", value: currentDeal.totalPaid, color: "hsl(var(--accent-secondary))" },
    { name: "New total cost", value: newDeal.totalPaid, color: "hsl(var(--accent))" },
  ], [currentDeal.totalPaid, newDeal.totalPaid]);

  const pagePath = "calculators/remortgage";
  const seoTitle = "Should I Remortgage? Free UK Calculator — See Your Savings";
  const seoDescription = "Compare your current mortgage deal vs a new rate. See monthly savings, break-even point, and whether switching is worth the fees. Free remortgage calculator.";

  return (
    <CalculatorShell
      eyebrow="Remortgage"
      title="Should I Remortgage?"
      intro="Compare your current mortgage deal against a new rate. See exactly how much you'd save monthly, when you'd break even on fees, and whether switching makes financial sense."
      leadCalculator="remortgage"
      leadContext={{ currentBalance, currentRate, newRate, monthlySaving, breakEvenMonths }}
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
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Current mortgage</p>
            </div>
            <SliderField label="Outstanding balance" prefix="£" value={currentBalance} min={10_000} max={1_500_000} step={5_000} onChange={setCurrentBalance} />
            <SliderField label="Current rate" suffix="%" value={currentRate} min={0.5} max={12} step={0.05} decimals={2} onChange={setCurrentRate} />
            <SliderField label="Remaining term (years)" value={currentTerm} min={1} max={40} step={1} onChange={setCurrentTerm} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <TrendingDown className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. New deal</p>
            </div>
            <SliderField label="New rate" suffix="%" value={newRate} min={0.5} max={12} step={0.05} decimals={2} onChange={setNewRate} />
            <SliderField label="New term (years)" value={newTerm} min={1} max={40} step={1} onChange={setNewTerm} />
            <SliderField label="Arrangement / product fee" prefix="£" value={fees} min={0} max={5_000} step={50} onChange={setFees} />
            <SliderField label="Early repayment charge (ERC)" prefix="£" value={earlyRepaymentCharge} min={0} max={20_000} step={100} onChange={setEarlyRepaymentCharge} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <BigStat label="Monthly saving" value={monthlySaving > 0 ? formatGBP(monthlySaving) : "No saving"} highlight={monthlySaving > 0} />
            <BigStat label="Break-even" value={breakEvenMonths > 0 ? `${breakEvenMonths} months` : "Immediate"} />
            <BigStat label="Net saving over term" value={formatGBP(Math.abs(netSaving))} highlight={worthSwitching} />
            <BigStat label="Total switch cost" value={formatGBP(totalCostOfSwitch)} />
          </div>

          {/* Verdict */}
          <div className={`rounded-2xl p-6 border ${worthSwitching ? "border-green-500/30 bg-green-50/5" : "border-amber-500/30 bg-amber-50/5"}`}>
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className={`size-4 ${worthSwitching ? "text-green-500" : "text-amber-500"}`} />
              <p className="text-sm font-bold">{worthSwitching ? "Remortgaging saves you money" : "Switching may not be worth it"}</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {worthSwitching
                ? `After paying ${formatGBP(totalCostOfSwitch)} in fees, you'd still save ${formatGBP(netSaving)} over ${Math.min(currentTerm, newTerm)} years. You break even in ${breakEvenMonths} month${breakEvenMonths === 1 ? "" : "s"}.`
                : `The fees (${formatGBP(totalCostOfSwitch)}) outweigh the interest saving. Consider waiting until your current deal ends or your ERC drops.`
              }
            </p>
          </div>

          {/* Comparison */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Side-by-side comparison</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current deal</p>
                <p className="font-semibold tabular-nums">{formatGBP(currentDeal.monthlyPayment)}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                <p className="text-xs text-muted-foreground mt-1">Total interest: {formatGBP(currentDeal.totalInterest)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">New deal</p>
                <p className="font-semibold tabular-nums">{formatGBP(newDeal.monthlyPayment)}<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                <p className="text-xs text-muted-foreground mt-1">Total interest: {formatGBP(newDeal.totalInterest)}</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Total cost comparison</p>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chart} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {chart.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatGBP(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2 text-xs">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[hsl(var(--accent-secondary))]" />Current: {formatGBP(currentDeal.totalPaid)}</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[hsl(var(--accent))]" />New: {formatGBP(newDeal.totalPaid)}</span>
            </div>
          </div>

          <RelatedCalculators currentPath="/calculators/remortgage" />
          <LastUpdated date="4 June 2026" />
        </div>
      </div>
    </CalculatorShell>
  );
};

export default RemortgagePage;
