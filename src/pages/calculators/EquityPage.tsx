import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { buildSchedule, calculateRepayment } from "@/lib/finance/repayment";
import { formatGBP } from "@/lib/finance/decimal";
import { SliderField, BigStat } from "./RepaymentPage";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Home, Landmark, TrendingUp, PiggyBank, Info } from "lucide-react";

const EquityPage = () => {
  const [purchasePrice, setPurchasePrice] = useState(300_000);
  const [currentValue, setCurrentValue] = useState(360_000);
  const [deposit, setDeposit] = useState(60_000);
  const [term, setTerm] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [yearsOwned, setYearsOwned] = useState(5);
  const [lumpSum, setLumpSum] = useState(0);
  const [lumpMonth, setLumpMonth] = useState(12);
  const [monthlyOver, setMonthlyOver] = useState(0);
  const [sellingCostsPct, setSellingCostsPct] = useState(2.5); // agent + legal typical 2-3%

  const originalLoan = Math.max(0, purchasePrice - deposit);

  const baseEmi = useMemo(
    () => calculateRepayment({ principal: originalLoan, annualRate: rate, termYears: term }).monthlyPayment,
    [originalLoan, rate, term],
  );

  // Run amortisation up to monthsElapsed to get outstanding balance today
  const schedule = useMemo(
    () => buildSchedule({
      principal: originalLoan,
      annualRate: rate,
      termYears: term,
      monthlyOverpayment: monthlyOver > 0 ? monthlyOver : undefined,
      lumpSum: lumpSum > 0 ? lumpSum : undefined,
      lumpSumMonth: lumpSum > 0 ? lumpMonth : undefined,
    }),
    [originalLoan, rate, term, lumpSum, lumpMonth, monthlyOver],
  );

  const monthsElapsed = Math.min(yearsOwned * 12, schedule.schedule.length);
  const outstanding = monthsElapsed === 0
    ? originalLoan
    : monthsElapsed >= schedule.schedule.length
      ? 0
      : schedule.schedule[monthsElapsed - 1].balance;

  const principalRepaid = originalLoan - outstanding;
  const appreciation = currentValue - purchasePrice;
  const yourEquity = Math.max(0, currentValue - outstanding);
  const equityPct = currentValue > 0 ? (yourEquity / currentValue) * 100 : 0;
  const banksEquity = Math.min(outstanding, currentValue);
  const banksEquityPct = currentValue > 0 ? (banksEquity / currentValue) * 100 : 0;

  const sellingCosts = (sellingCostsPct / 100) * currentValue;
  const netIfSold = Math.max(0, yourEquity - sellingCosts);

  const ltvNow = currentValue > 0 ? (outstanding / currentValue) * 100 : 0;
  const refinanceBand =
    ltvNow <= 60 ? "60% LTV — best rates"
    : ltvNow <= 75 ? "75% LTV — competitive rates"
    : ltvNow <= 85 ? "85% LTV — standard rates"
    : ltvNow <= 90 ? "90% LTV — limited choice"
    : "Above 95% LTV — very few products";

  const equitySplit = useMemo(() => [
    { name: "Your equity", value: yourEquity, color: "hsl(var(--accent-secondary))" },
    { name: "Bank's claim", value: banksEquity, color: "hsl(var(--accent))" },
  ], [yourEquity, banksEquity]);

  return (
    <CalculatorShell
      eyebrow="Home equity"
      title="UK Home Equity Calculator"
      intro="See exactly how much of your home you own today versus how much the bank still has a claim on. Plan a refinance or sale with full visibility of net proceeds and current LTV."
      leadCalculator="equity"
      leadContext={{ purchasePrice, currentValue, deposit, term, rate, yearsOwned, outstanding, yourEquity }}
    >
      <SEO
        title="Home Equity Calculator UK — Refinance, Sell or Remortgage"
        description="Calculate your current UK home equity. See outstanding mortgage, LTV, your equity, the bank's claim, and net proceeds if you sell."
        path="/calculators/equity"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Home className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Property values</p>
            </div>
            <SliderField label="Purchase price (when bought)" prefix="£" value={purchasePrice} min={50_000} max={2_000_000} step={5_000} onChange={setPurchasePrice} />
            <SliderField label="Current market value" prefix="£" value={currentValue} min={50_000} max={3_000_000} step={5_000} onChange={setCurrentValue} />
            <SliderField label="Deposit you put down" prefix="£" value={deposit} min={0} max={purchasePrice} step={1_000} onChange={(v) => setDeposit(Math.min(v, purchasePrice))} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. Mortgage details</p>
            </div>
            <SliderField label="Original term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
            <SliderField label="Interest rate (APR)" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
            <SliderField label="Years you've owned" value={yearsOwned} min={0} max={term} step={1} onChange={setYearsOwned} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <PiggyBank className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Optional adjustments</p>
            </div>
            <SliderField label="Monthly overpayment made" prefix="£" value={monthlyOver} min={0} max={2_000} step={25} onChange={setMonthlyOver} />
            <SliderField label="Lump-sum overpayment made" prefix="£" value={lumpSum} min={0} max={200_000} step={500} onChange={setLumpSum} />
            {lumpSum > 0 && (
              <SliderField label="Applied at month" value={lumpMonth} min={1} max={Math.max(1, yearsOwned * 12)} step={1} onChange={setLumpMonth} />
            )}
            <SliderField label="Selling costs (agent + legal)" suffix="%" value={sellingCostsPct} min={0} max={6} step={0.1} decimals={1} onChange={setSellingCostsPct} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-accent-secondary/15 to-transparent border-accent-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-4 text-accent-secondary" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent-secondary">Your home equity today</p>
            </div>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">{formatGBP(yourEquity)}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {equityPct.toFixed(1)}% of current value · Current LTV {ltvNow.toFixed(1)}%
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">You vs the bank</p>
              <div className="h-[160px] relative">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={equitySplit} dataKey="value" innerRadius={42} outerRadius={62} paddingAngle={2}>
                      {equitySplit.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatGBP(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-xl font-bold">{equityPct.toFixed(0)}%</p>
                  <p className="text-[10px] text-muted-foreground">yours</p>
                </div>
              </div>
              <div className="space-y-1 text-xs mt-2">
                {equitySplit.map((d) => (
                  <div key={d.name} className="flex justify-between">
                    <span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: d.color }} />{d.name}</span>
                    <span className="font-semibold tabular-nums">{formatGBP(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">If you sold today</p>
              <div className="space-y-1.5 text-sm">
                <Row label="Sale price" value={formatGBP(currentValue)} />
                <Row label="Pay off mortgage" value={`− ${formatGBP(outstanding)}`} />
                <Row label={`Selling costs (${sellingCostsPct.toFixed(1)}%)`} value={`− ${formatGBP(sellingCosts)}`} />
                <div className="h-px bg-border my-2" />
                <Row label="Net cash to you" value={formatGBP(netIfSold)} bold />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <BigStat label="Outstanding mortgage" value={formatGBP(outstanding)} />
            <BigStat label="Principal repaid" value={formatGBP(principalRepaid)} />
            <BigStat label={appreciation >= 0 ? "Appreciation gain" : "Value decline"} value={formatGBP(Math.abs(appreciation))} highlight={appreciation >= 0} />
          </div>

          <div className="glass-card rounded-2xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Refinance outlook</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Current EMI</p>
                <p className="text-xl font-bold tabular-nums">{formatGBP(baseEmi, { decimals: 2 })}/mo</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Likely lender LTV band</p>
                <p className="text-sm font-semibold">{refinanceBand}</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex gap-2 items-start">
              <Info className="size-3.5 mt-0.5 shrink-0" />
              <p>Lower LTV usually unlocks better rates. If your equity has grown, remortgaging when your fix ends could meaningfully cut your monthly payment.</p>
            </div>
          </div>

          <ShareCalculation
            title="UK Home Equity Snapshot"
            calculator="equity"
            intro={`Bought ${formatGBP(purchasePrice)} · Now worth ${formatGBP(currentValue)} · ${yearsOwned}y owned`}
            summary={[
              { label: "Purchase price", value: formatGBP(purchasePrice) },
              { label: "Current value", value: formatGBP(currentValue) },
              { label: "Original deposit", value: formatGBP(deposit) },
              { label: "Original loan", value: formatGBP(originalLoan) },
              { label: "Rate · Term", value: `${rate.toFixed(2)}% · ${term} years` },
              { label: "Years owned", value: `${yearsOwned}` },
              ...(lumpSum > 0 ? [{ label: `Lump sum (month ${lumpMonth})`, value: formatGBP(lumpSum) }] : []),
              { label: "Outstanding mortgage", value: formatGBP(outstanding) },
              { label: "Your equity", value: `${formatGBP(yourEquity)} (${equityPct.toFixed(1)}%)` },
              { label: "Bank's claim", value: `${formatGBP(banksEquity)} (${banksEquityPct.toFixed(1)}%)` },
              { label: "Current LTV", value: `${ltvNow.toFixed(1)}%` },
              { label: "Net cash if sold today", value: formatGBP(netIfSold) },
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex justify-between">
    <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
    <span className={`tabular-nums ${bold ? "font-bold text-base" : "font-semibold"}`}>{value}</span>
  </div>
);

export default EquityPage;
