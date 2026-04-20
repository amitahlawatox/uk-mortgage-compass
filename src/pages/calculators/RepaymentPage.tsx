import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateRepayment, buildSchedule } from "@/lib/finance/repayment";
import { formatGBP } from "@/lib/finance/decimal";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const RepaymentPage = () => {
  const [principal, setPrincipal] = useState(250_000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [io, setIO] = useState(false);

  const result = useMemo(
    () => calculateRepayment({ principal, annualRate: rate, termYears: term, interestOnly: io }),
    [principal, rate, term, io],
  );

  const chart = useMemo(() => {
    if (io) return [];
    const { schedule } = buildSchedule({ principal, annualRate: rate, termYears: term });
    // sample yearly
    return schedule.filter((_, i) => (i + 1) % 12 === 0).map(r => ({
      year: r.month / 12,
      balance: r.balance,
    }));
  }, [principal, rate, term, io]);

  return (
    <CalculatorShell
      eyebrow="Monthly cost"
      title="Mortgage Repayment Calculator"
      intro="Capital-and-interest or interest-only. Calculates the exact monthly payment plus total interest over the term, using the standard amortisation formula in 28-digit decimal precision."
    >
      <SEO
        title="Mortgage Repayment Calculator UK | Velocity"
        description="Calculate UK mortgage monthly payments, total interest and amortisation schedule. Capital repayment or interest-only — instant, decimal-precision results."
        path="/calculators/repayment"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-5">
          <SliderField
            label="Loan amount"
            prefix="£"
            value={principal}
            min={25_000}
            max={2_000_000}
            step={5_000}
            onChange={setPrincipal}
          />
          <SliderField
            label="Interest rate"
            suffix="%"
            value={rate}
            min={0.5}
            max={12}
            step={0.05}
            decimals={2}
            onChange={setRate}
          />
          <SliderField
            label="Term (years)"
            value={term}
            min={5}
            max={40}
            step={1}
            onChange={setTerm}
          />
          <button
            onClick={() => setIO(!io)}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-border text-left"
          >
            <span className="text-sm font-medium">Interest-only</span>
            <span className={`relative w-10 h-6 rounded-full ${io ? "bg-accent" : "bg-secondary"}`}>
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-background shadow-soft transition-transform ${
                  io ? "translate-x-[18px]" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <BigStat label="Monthly payment" value={formatGBP(result.monthlyPayment, { decimals: 2 })} highlight />
            <BigStat label="Total interest" value={formatGBP(result.totalInterest)} />
            <BigStat label="Total paid" value={formatGBP(result.totalPaid)} />
          </div>

          {!io && chart.length > 0 && (
            <div className="glass-card rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Outstanding balance over time
              </p>
              <div className="h-64">
                <ResponsiveContainer>
                  <AreaChart data={chart} margin={{ top: 5, right: 8, left: -8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                      formatter={(v: number) => [formatGBP(v), "Balance"]}
                      labelFormatter={(y) => `Year ${y}`}
                    />
                    <Area type="monotone" dataKey="balance" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#balGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
};

export const SliderField = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix,
  suffix,
  decimals = 0,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => (
  <div>
    <div className="flex justify-between items-baseline mb-2">
      <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <span className="text-sm font-semibold tabular-nums">
        {prefix}
        {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString("en-GB")}
        {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full accent-foreground"
    />
  </div>
);

export const BigStat = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div
    className={`rounded-2xl p-5 ${
      highlight ? "bg-primary text-primary-foreground shadow-glow-cyan" : "glass-card"
    }`}
  >
    <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
      {label}
    </p>
    <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">{value}</p>
  </div>
);

export default RepaymentPage;
