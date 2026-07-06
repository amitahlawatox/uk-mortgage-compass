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
import { Landmark, Plus, X } from "lucide-react";

interface RateOption {
  id: number;
  label: string;
  rate: number;
  fixedPeriod: number;
  fee: number;
}

let nextId = 4;

const DEFAULT_RATES: RateOption[] = [
  { id: 1, label: "Deal A", rate: 4.19, fixedPeriod: 2, fee: 999 },
  { id: 2, label: "Deal B", rate: 4.49, fixedPeriod: 5, fee: 0 },
  { id: 3, label: "Deal C", rate: 4.89, fixedPeriod: 2, fee: 0 },
];

const RateComparePage = () => {
  const [loanAmount, setLoanAmount] = useState(250_000);
  const [term, setTerm] = useState(25);
  const [rates, setRates] = useState<RateOption[]>(DEFAULT_RATES);

  const results = useMemo(() =>
    rates.map((r) => {
      const result = calculateRepayment({ principal: loanAmount + r.fee, annualRate: r.rate, termYears: term });
      return {
        ...r,
        monthlyPayment: result.monthlyPayment,
        totalInterest: result.totalInterest,
        totalCost: result.totalPaid,
        trueCostIncFee: result.totalPaid,
      };
    }),
    [rates, loanAmount, term],
  );

  const cheapest = results.reduce((best, r) => r.trueCostIncFee < best.trueCostIncFee ? r : best, results[0]);

  const chartData = useMemo(() =>
    results.map((r) => ({
      name: r.label,
      "Monthly payment": r.monthlyPayment,
      "Total interest": r.totalInterest,
    })),
    [results],
  );

  const addRate = () => {
    if (rates.length >= 5) return;
    const label = `Deal ${String.fromCharCode(65 + rates.length)}`;
    setRates([...rates, { id: nextId++, label, rate: 5.0, fixedPeriod: 2, fee: 0 }]);
  };

  const removeRate = (id: number) => {
    if (rates.length <= 2) return;
    setRates(rates.filter((r) => r.id !== id));
  };

  const updateRate = (id: number, field: keyof RateOption, value: number | string) => {
    setRates(rates.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const pagePath = "calculators/rate-compare";
  const seoTitle = "Compare Mortgage Rates Side-by-Side — Free UK Calculator";
  const seoDescription = "Compare up to 5 mortgage rates side-by-side. See monthly payments, total interest, and true cost including fees. Find the cheapest deal for your mortgage.";

  return (
    <CalculatorShell
      eyebrow="Rate Comparison"
      title="Compare Mortgage Rates"
      intro="Put up to 5 mortgage deals side-by-side. We calculate the true cost of each including arrangement fees, so you can pick the cheapest deal — not just the lowest headline rate."
      leadCalculator="rate-compare"
      leadContext={{ loanAmount, term, cheapest: cheapest?.label }}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        calculatorType="Mortgage Rate Comparison Calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: "Rate Comparison", href: "/calculators/rate-compare" },
        ]}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your mortgage</p>
            </div>
            <SliderField label="Loan amount" prefix="£" value={loanAmount} min={25_000} max={1_500_000} step={5_000} onChange={setLoanAmount} />
            <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
          </div>

          {/* Rate cards */}
          {rates.map((r) => (
            <div key={r.id} className="glass-card rounded-2xl p-5 space-y-4 relative">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={r.label}
                  onChange={(e) => updateRate(r.id, "label", e.target.value)}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-transparent border-none focus:outline-none w-24"
                />
                {rates.length > 2 && (
                  <button onClick={() => removeRate(r.id)} className="p-1 rounded hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
              <SliderField label="Rate" suffix="%" value={r.rate} min={0.5} max={10} step={0.01} decimals={2} onChange={(v) => updateRate(r.id, "rate", v)} />
              <SliderField label="Fixed period (years)" value={r.fixedPeriod} min={1} max={10} step={1} onChange={(v) => updateRate(r.id, "fixedPeriod", v)} />
              <SliderField label="Product fee" prefix="£" value={r.fee} min={0} max={3_000} step={50} onChange={(v) => updateRate(r.id, "fee", v)} />
            </div>
          ))}

          {rates.length < 5 && (
            <button
              onClick={addRate}
              className="w-full rounded-2xl border border-dashed border-border p-4 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="size-3.5" /> Add another deal
            </button>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {/* Winner */}
          {cheapest && (
            <div className="rounded-2xl p-6 border border-green-500/30 bg-green-50/5">
              <p className="text-xs text-muted-foreground mb-1">Cheapest overall (including fees)</p>
              <p className="text-lg font-bold">{cheapest.label} — {cheapest.rate}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatGBP(cheapest.monthlyPayment)}/mo · Total cost: {formatGBP(cheapest.trueCostIncFee)}
                {cheapest.fee > 0 ? ` (includes ${formatGBP(cheapest.fee)} fee)` : " (fee-free)"}
              </p>
            </div>
          )}

          {/* Comparison table */}
          <div className="glass-card rounded-2xl p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Deal</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Rate</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Monthly</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Total interest</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">True cost</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className={`border-b border-border/50 ${r.id === cheapest?.id ? "bg-green-50/5" : ""}`}>
                    <td className="py-3 font-semibold">{r.label}</td>
                    <td className="py-3 text-right tabular-nums">{r.rate}%</td>
                    <td className="py-3 text-right tabular-nums">{formatGBP(r.monthlyPayment)}</td>
                    <td className="py-3 text-right tabular-nums">{formatGBP(r.totalInterest)}</td>
                    <td className="py-3 text-right tabular-nums font-semibold">{formatGBP(r.trueCostIncFee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Visual comparison</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={4}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatGBP(value)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Monthly payment" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Total interest" fill="hsl(var(--accent-secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <RelatedCalculators currentPath="/calculators/rate-compare" />
          <LastUpdated />
        </div>
      </div>
    </CalculatorShell>
  );
};

export default RateComparePage;
