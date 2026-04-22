import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { buildSchedule } from "@/lib/finance/repayment";
import { formatGBP } from "@/lib/finance/decimal";
import { SliderField, BigStat } from "./RepaymentPage";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const OverpaymentPage = () => {
  const [principal, setPrincipal] = useState(250_000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [monthlyOver, setMonthlyOver] = useState(200);
  const [lumpSum, setLumpSum] = useState(0);
  const [lumpMonth, setLumpMonth] = useState(12);

  const baseline = useMemo(
    () => buildSchedule({ principal, annualRate: rate, termYears: term }),
    [principal, rate, term],
  );

  const accelerated = useMemo(
    () =>
      buildSchedule({
        principal,
        annualRate: rate,
        termYears: term,
        monthlyOverpayment: monthlyOver,
        lumpSum: lumpSum > 0 ? lumpSum : undefined,
        lumpSumMonth: lumpSum > 0 ? lumpMonth : undefined,
      }),
    [principal, rate, term, monthlyOver, lumpSum, lumpMonth],
  );

  const monthsSaved = baseline.monthsTaken - accelerated.monthsTaken;
  const interestSaved = baseline.totalInterest - accelerated.totalInterest;

  const chart = useMemo(() => {
    const map = new Map<number, { year: number; baseline: number; accelerated: number }>();
    const stride = 12;
    baseline.schedule.forEach((r, i) => {
      if ((i + 1) % stride === 0) {
        const year = (i + 1) / 12;
        map.set(year, { year, baseline: r.balance, accelerated: 0 });
      }
    });
    accelerated.schedule.forEach((r, i) => {
      if ((i + 1) % stride === 0) {
        const year = (i + 1) / 12;
        const existing = map.get(year);
        if (existing) existing.accelerated = r.balance;
        else map.set(year, { year, baseline: 0, accelerated: r.balance });
      }
    });
    return [...map.values()].sort((a, b) => a.year - b.year);
  }, [baseline, accelerated]);

  return (
    <CalculatorShell
      eyebrow="Pay off faster"
      title="Overpayment Visualiser"
      intro="Move the sliders. See exactly how a regular monthly overpayment or a one-off lump sum reshapes your mortgage — interest saved and years shaved off the term."
      leadCalculator="overpayment"
      leadContext={{ principal, rate, term, monthlyOver, lumpSum, lumpMonth, interestSaved, monthsSaved }}
    >
      <SEO
        title="Mortgage Overpayment Calculator UK — RepayWise"
        description="Visualise how monthly overpayments and lump sums cut your UK mortgage interest and shorten the term. Decimal-precision amortisation."
        path="/calculators/overpayment"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to calculate mortgage overpayment savings in the UK",
          description: "Step-by-step: enter your loan, rate, term, and a regular overpayment or lump sum to see exactly how much interest you save and how many years come off your mortgage.",
          step: [
            { "@type": "HowToStep", name: "Enter loan details", text: "Set your current loan balance, interest rate, and remaining term." },
            { "@type": "HowToStep", name: "Add an overpayment", text: "Choose a monthly overpayment amount or a one-off lump sum and the month to apply it." },
            { "@type": "HowToStep", name: "Read the savings", text: "RepayWise shows interest saved, months shaved off the term, and the new payoff date instantly." },
          ],
        }}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-5">
          <SliderField label="Loan amount" prefix="£" value={principal} min={25_000} max={2_000_000} step={5_000} onChange={setPrincipal} />
          <SliderField label="Interest rate" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
          <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
          <div className="h-px bg-border" />
          <SliderField label="Monthly overpayment" prefix="£" value={monthlyOver} min={0} max={2000} step={25} onChange={setMonthlyOver} />
          <SliderField label="Lump sum" prefix="£" value={lumpSum} min={0} max={100_000} step={500} onChange={setLumpSum} />
          {lumpSum > 0 && (
            <SliderField label="Apply lump sum at month" value={lumpMonth} min={1} max={term * 12} step={1} onChange={setLumpMonth} />
          )}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <BigStat label="Interest saved" value={formatGBP(Math.max(0, interestSaved))} highlight />
            <BigStat label="Time saved" value={`${Math.floor(monthsSaved / 12)}y ${monthsSaved % 12}m`} />
            <BigStat label="New term" value={`${Math.floor(accelerated.monthsTaken / 12)}y ${accelerated.monthsTaken % 12}m`} />
          </div>

          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Balance: baseline vs accelerated
            </p>
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={chart} margin={{ top: 5, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="accelGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent-secondary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--accent-secondary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                    formatter={(v: number, name) => [formatGBP(v), name === "baseline" ? "Baseline" : "With overpayments"]}
                    labelFormatter={(y) => `Year ${y}`}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => v === "baseline" ? "Baseline" : "With overpayments"} />
                  <Area type="monotone" dataKey="baseline" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} fill="url(#baseGrad)" />
                  <Area type="monotone" dataKey="accelerated" stroke="hsl(var(--accent-secondary))" strokeWidth={2.5} fill="url(#accelGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
};

export default OverpaymentPage;
