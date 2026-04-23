import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { buildSchedule, calculateRepayment } from "@/lib/finance/repayment";
import { formatGBP } from "@/lib/finance/decimal";
import { SliderField, BigStat } from "./RepaymentPage";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const OverpaymentPage = () => {
  const [principal, setPrincipal] = useState(250_000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [monthlyOver, setMonthlyOver] = useState(200);
  const [quarterlyOver, setQuarterlyOver] = useState(0);
  const [annualOver, setAnnualOver] = useState(0);
  const [lumpSum, setLumpSum] = useState(0);
  const [lumpMonth, setLumpMonth] = useState(12);

  const baseEmi = useMemo(
    () => calculateRepayment({ principal, annualRate: rate, termYears: term }).monthlyPayment,
    [principal, rate, term],
  );

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
        quarterlyOverpayment: quarterlyOver,
        annualOverpayment: annualOver,
        lumpSum: lumpSum > 0 ? lumpSum : undefined,
        lumpSumMonth: lumpSum > 0 ? lumpMonth : undefined,
      }),
    [principal, rate, term, monthlyOver, quarterlyOver, annualOver, lumpSum, lumpMonth],
  );

  const monthsSaved = baseline.monthsTaken - accelerated.monthsTaken;
  const interestSaved = baseline.totalInterest - accelerated.totalInterest;
  const effectiveMonthly =
    baseEmi +
    monthlyOver +
    quarterlyOver / 3 +
    annualOver / 12 +
    (lumpSum > 0 ? lumpSum / Math.max(1, accelerated.monthsTaken) : 0);

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
        title="Mortgage Overpayment Calculator 2026 | Save Years &amp; £000s — RepayWise"
        description="See how overpaying your UK mortgage cuts years off your term and saves thousands in interest. Free, FCA-aligned, decimal-precision amortisation. No login needed."
        path="/calculators/overpayment"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "RepayWise Mortgage Overpayment Calculator",
              "url": "https://www.repaywise.co.uk/calculators/overpayment",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any",
              "description": "Free UK mortgage overpayment calculator. Compare baseline vs accelerated repayment. See interest saved, years cut, and month-by-month amortisation. FCA-aligned, no login required.",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
              "provider": {
                "@type": "Organization",
                "name": "RepayWise",
                "url": "https://www.repaywise.co.uk",
                "areaServed": "GB"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to calculate mortgage overpayment savings in the UK",
              "description": "Step-by-step: enter your loan, rate, term, and a regular overpayment or lump sum to see exactly how much interest you save and how many years come off your mortgage.",
              "step": [
                { "@type": "HowToStep", "name": "Enter loan details", "text": "Set your current loan balance, interest rate, and remaining term." },
                { "@type": "HowToStep", "name": "Add an overpayment", "text": "Choose a monthly overpayment amount or a one-off lump sum and the month to apply it." },
                { "@type": "HowToStep", "name": "Read the savings", "text": "See your interest saved, months cut from your term, and the full amortisation chart." }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much can I save by overpaying my mortgage?",
                  "acceptedAnswer": { "@type": "Answer", "text": "The savings depend on your outstanding balance, interest rate, and overpayment amount. On a £250,000 mortgage at 4.5% with £200/month overpayment, you could save over £20,000 in interest and cut 4+ years from your term. Use the RepayWise calculator to see your exact figures." }
                },
                {
                  "@type": "Question",
                  "name": "Is it better to overpay my mortgage or save in an ISA?",
                  "acceptedAnswer": { "@type": "Answer", "text": "It depends on your mortgage interest rate versus the savings rate available. If your mortgage rate exceeds the best ISA rate, overpaying usually wins mathematically. RepayWise helps you compare both scenarios." }
                },
                {
                  "@type": "Question",
                  "name": "Are there penalties for overpaying a UK mortgage?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Most UK lenders allow up to 10% of the outstanding balance per year as an overpayment without charge. Exceeding this may trigger an Early Repayment Charge (ERC). Always check your mortgage terms before overpaying." }
                }
              ]
            }
          ]
        }}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-5">
          <SliderField label="Loan amount" prefix="£" value={principal} min={25_000} max={2_000_000} step={5_000} onChange={setPrincipal} />
          <SliderField label="Interest rate" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
          <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
          <div className="h-px bg-border" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Extra payments</p>
          <SliderField label="Monthly overpayment" prefix="£" value={monthlyOver} min={0} max={2000} step={25} onChange={setMonthlyOver} />
          <SliderField label="Quarterly overpayment" prefix="£" value={quarterlyOver} min={0} max={6000} step={50} onChange={setQuarterlyOver} />
          <SliderField label="Annual overpayment" prefix="£" value={annualOver} min={0} max={25_000} step={100} onChange={setAnnualOver} />
          <SliderField label="One-off lump sum" prefix="£" value={lumpSum} min={0} max={100_000} step={500} onChange={setLumpSum} />
          {lumpSum > 0 && (
            <SliderField label="Apply lump sum at month" value={lumpMonth} min={1} max={term * 12} step={1} onChange={setLumpMonth} />
          )}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-2">Current EMI</p>
              <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">{formatGBP(baseEmi, { decimals: 2 })}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Contractual monthly payment</p>
            </div>
            <div className="rounded-2xl p-5 bg-primary text-primary-foreground shadow-glow-cyan">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-primary-foreground/60 mb-2">Effective monthly outlay</p>
              <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">{formatGBP(effectiveMonthly, { decimals: 2 })}</p>
              <p className="text-[11px] text-primary-foreground/60 mt-1">EMI + averaged extra payments</p>
            </div>
          </div>
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

          {monthlyOver > 0 || lumpSum > 0 ? (
            <div className="rounded-2xl bg-primary text-primary-foreground p-5 sm:p-6 shadow-glow-cyan">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-primary-foreground/60 mb-1">
                Your overpayment breakdown
              </p>
              <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
                You save {formatGBP(Math.max(0, interestSaved))} in interest
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-primary-foreground/60 uppercase tracking-widest font-semibold">Baseline interest</p>
                  <p className="font-bold tabular-nums text-base mt-1">{formatGBP(baseline.totalInterest)}</p>
                </div>
                <div>
                  <p className="text-primary-foreground/60 uppercase tracking-widest font-semibold">With overpayments</p>
                  <p className="font-bold tabular-nums text-base mt-1">{formatGBP(accelerated.totalInterest)}</p>
                </div>
                <div>
                  <p className="text-primary-foreground/60 uppercase tracking-widest font-semibold">Mortgage-free</p>
                  <p className="font-bold tabular-nums text-base mt-1">
                    {Math.floor(monthsSaved / 12)}y {monthsSaved % 12}m sooner
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-primary-foreground/60 leading-relaxed">
                Based on your inputs, every £1 overpaid saves roughly{" "}
                <strong className="text-primary-foreground">
                  £{baseline.totalInterest > 0
                    ? (interestSaved / Math.max(1, monthlyOver * accelerated.monthsTaken + lumpSum)).toFixed(2)
                    : "0.00"}
                </strong>{" "}
                in future interest, assuming the rate stays at {rate.toFixed(2)}%.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </CalculatorShell>
  );
};

export default OverpaymentPage;
