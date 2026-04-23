import { useEffect, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateRepayment, buildSchedule } from "@/lib/finance/repayment";
import { formatGBP } from "@/lib/finance/decimal";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Pie, PieChart } from "recharts";
import { ArrowLeft, ArrowRight, Check, Sparkles, Home, TrendingUp, Crown } from "lucide-react";

type Step = 0 | 1 | 2 | 3;

const presets = [
  { label: "First-time buyer", icon: Home, principal: 250_000, term: 30, blurb: "Typical UK FTB" },
  { label: "Mover", icon: TrendingUp, principal: 450_000, term: 25, blurb: "Mid-market upsizer" },
  { label: "Premium", icon: Crown, principal: 750_000, term: 25, blurb: "Higher-value home" },
];

const RepaymentPage = () => {
  const [step, setStep] = useState<Step>(0);
  const [propertyPrice, setPropertyPrice] = useState(312_500);
  const [deposit, setDeposit] = useState(62_500);
  const principal = Math.max(0, propertyPrice - deposit);
  const depositPct = propertyPrice > 0 ? (deposit / propertyPrice) * 100 : 0;
  const ltv = 100 - depositPct;
  const [term, setTerm] = useState(25);
  const [rate, setRate] = useState(4.5);

  const setPrincipal = (newLoan: number) => {
    setPropertyPrice(newLoan + deposit);
  };

  const result = useMemo(
    () => calculateRepayment({ principal, annualRate: rate, termYears: term }),
    [principal, rate, term],
  );

  const stressed = useMemo(
    () => calculateRepayment({ principal, annualRate: rate + 1, termYears: term }),
    [principal, rate, term],
  );

  const chart = useMemo(() => {
    if (step < 3) return [];
    const { schedule } = buildSchedule({ principal, annualRate: rate, termYears: term });
    return schedule
      .filter((_, i) => (i + 1) % 12 === 0)
      .map((r) => ({ year: r.month / 12, balance: r.balance }));
  }, [principal, rate, term, step]);

  const breakdown = useMemo(
    () => [
      { name: "Capital", value: principal, color: "hsl(var(--accent))" },
      { name: "Interest", value: result.totalInterest, color: "hsl(var(--accent-secondary))" },
    ],
    [principal, result.totalInterest],
  );

  const next = () => setStep((s) => (Math.min(3, s + 1) as Step));
  const back = () => setStep((s) => (Math.max(0, s - 1) as Step));

  // Auto-advance after preset choice
  useEffect(() => {
    if (step !== 0) return;
  }, [step]);

  return (
    <CalculatorShell
      eyebrow="Your monthly mortgage"
      title="Mortgage Repayment Calculator"
      intro="Three quick questions, one clear answer. We'll calculate your exact monthly payment using the standard amortisation formula in 28-digit decimal precision."
      leadCalculator="repayment"
      leadContext={{ principal, rate, term, monthlyPayment: result.monthlyPayment, totalInterest: result.totalInterest }}
    >
      <SEO
        title="UK Mortgage Calculator | Monthly Repayments — RepayWise"
        description="Easy 3-step UK mortgage calculator. See your monthly payment, total interest and balance over time — built on decimal-precision math."
        path="/calculators/repayment"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          name: "UK Mortgage Repayment Calculator",
          description: "Free decimal-precision UK mortgage repayment calculator. Returns the monthly payment, total interest, and amortisation curve for any loan, rate and term.",
          provider: { "@type": "Organization", name: "RepayWise", url: "https://www.repaywise.co.uk" },
          feesAndCommissionsSpecification: "Free to use. No personal data required.",
          areaServed: { "@type": "Country", name: "United Kingdom" },
        }}
      />

      {/* Progress */}
      <Stepper step={step} />

      <div className="grid lg:grid-cols-5 gap-6 mt-8">
        {/* Wizard panel */}
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 sm:p-8 min-h-[460px] flex flex-col">
          {step === 0 && (
            <StepPane
              eyebrow="Step 1 of 3"
              question="Property price & deposit"
              hint="Set the property price and your deposit. We'll work out the loan you need."
            >
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {presets.map((p) => {
                  const Icon = p.icon;
                  const presetPrice = Math.round(p.principal / 0.8);
                  const active = propertyPrice === presetPrice;
                  return (
                    <button
                      key={p.label}
                      onClick={() => {
                        setPropertyPrice(presetPrice);
                        setDeposit(presetPrice - p.principal);
                        setTerm(p.term);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        active
                          ? "border-accent shadow-glow-cyan bg-secondary"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      <Icon className={`size-4 mb-3 ${active ? "text-accent" : "text-muted-foreground"}`} />
                      <p className="text-sm font-semibold">{p.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.blurb}</p>
                      <p className="text-base font-bold tabular-nums mt-2">
                        {formatGBP(presetPrice)}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-5">
                <BigSlider
                  label="Property price"
                  prefix="£"
                  value={propertyPrice}
                  min={50_000}
                  max={2_500_000}
                  step={5_000}
                  onChange={(v) => {
                    setPropertyPrice(v);
                    if (deposit > v) setDeposit(Math.round(v * 0.1));
                  }}
                />
                <BigSlider
                  label={`Deposit (${depositPct.toFixed(1)}%)`}
                  prefix="£"
                  value={deposit}
                  min={0}
                  max={propertyPrice}
                  step={1_000}
                  onChange={(v) => setDeposit(Math.min(v, propertyPrice))}
                />

                <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-center rounded-2xl border border-border p-4 bg-secondary/40">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                      Loan you need
                    </p>
                    <p className="text-3xl font-bold tabular-nums tracking-tight mt-1">
                      {formatGBP(principal)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                      LTV {ltv.toFixed(1)}% · Deposit {depositPct.toFixed(1)}%
                    </p>
                  </div>
                  <div className="h-24 w-24 mx-auto sm:mx-0">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Deposit", value: deposit, color: "hsl(var(--accent-secondary))" },
                            { name: "Loan", value: principal, color: "hsl(var(--accent))" },
                          ]}
                          dataKey="value"
                          innerRadius={26}
                          outerRadius={44}
                          paddingAngle={2}
                          stroke="none"
                        >
                          <Cell fill="hsl(var(--accent-secondary))" />
                          <Cell fill="hsl(var(--accent))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </StepPane>
          )}

          {step === 1 && (
            <StepPane
              eyebrow="Step 2 of 3"
              question="Over how many years?"
              hint="A longer term means smaller monthly payments but more interest over time."
            >
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[15, 20, 25, 30, 35, 40].map((y) => (
                  <button
                    key={y}
                    onClick={() => setTerm(y)}
                    className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                      term === y
                        ? "border-accent bg-secondary shadow-glow-cyan"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {y}y
                  </button>
                ))}
              </div>
              <BigSlider
                label="Term (years)"
                value={term}
                min={5}
                max={40}
                step={1}
                onChange={setTerm}
                suffix=" yrs"
              />
            </StepPane>
          )}

          {step === 2 && (
            <StepPane
              eyebrow="Step 3 of 3"
              question="What interest rate do you expect?"
              hint="Live UK 5-year fixed sits around 4.5%. We'll show you what a 1% rise would mean."
            >
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`py-3 rounded-xl border text-sm font-semibold tabular-nums transition-all ${
                      Math.abs(rate - r) < 0.01
                        ? "border-accent bg-secondary shadow-glow-cyan"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {r.toFixed(1)}%
                  </button>
                ))}
              </div>
              <BigSlider
                label="Rate"
                suffix="%"
                value={rate}
                min={0.5}
                max={12}
                step={0.05}
                decimals={2}
                onChange={setRate}
              />
            </StepPane>
          )}

          {step === 3 && (
            <StepPane eyebrow="Your numbers" question="Here's what it costs">
              <div className="space-y-4">
                <div className="rounded-2xl bg-primary text-primary-foreground p-6 shadow-glow-cyan">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-primary-foreground/60">
                    Monthly payment
                  </p>
                  <p className="text-5xl sm:text-6xl font-bold tabular-nums tracking-tight mt-1">
                    {formatGBP(result.monthlyPayment, { decimals: 2 })}
                  </p>
                  <div className="mt-4 pt-4 border-t border-primary-foreground/10 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                    <span className="text-primary-foreground/60">
                      If rates rise +1% →{" "}
                      <span className="text-primary-foreground font-semibold">
                        {formatGBP(stressed.monthlyPayment, { decimals: 2 })}/mo
                      </span>
                    </span>
                    <span className="text-primary-foreground/60">
                      Total interest →{" "}
                      <span className="text-primary-foreground font-semibold">
                        {formatGBP(result.totalInterest)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-5">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">
                      Principal vs interest
                    </p>
                    <div className="h-32 flex items-center">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie data={breakdown} dataKey="value" innerRadius={32} outerRadius={56} paddingAngle={2}>
                            {breakdown.map((b) => (
                              <Cell key={b.name} fill={b.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              background: "hsl(var(--popover))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: 12,
                              fontSize: 12,
                            }}
                            formatter={(v: number) => formatGBP(v)}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      {breakdown.map((b) => {
                        const total = principal + result.totalInterest;
                        const pct = total > 0 ? Math.round((b.value / total) * 100) : 0;
                        return (
                          <div key={b.name} className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2">
                              <span className="size-2 rounded-full" style={{ background: b.color }} />
                              {b.name} <span className="text-muted-foreground">({pct}%)</span>
                            </span>
                            <span className="tabular-nums font-semibold">{formatGBP(b.value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">
                      Balance over time
                    </p>
                    <div className="h-44">
                      <ResponsiveContainer>
                        <AreaChart data={chart} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                          <defs>
                            <linearGradient id="balGrad2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} />
                          <Tooltip
                            contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                            formatter={(v: number) => [formatGBP(v), "Balance"]}
                            labelFormatter={(y) => `Year ${y}`}
                          />
                          <Area type="monotone" dataKey="balance" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#balGrad2)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </StepPane>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-auto pt-6">
            <button
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            {step < 3 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow-cyan transition-all"
              >
                {step === 2 ? "See my payment" : "Next"} <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-sm font-semibold hover:bg-secondary/70 transition-colors"
              >
                <Sparkles className="size-4" /> Start over
              </button>
            )}
          </div>
        </div>

        {/* Sticky live preview */}
        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 space-y-3">
            <div className="glass-card rounded-3xl p-6">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-2">
                Live estimate
              </p>
              <p className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight">
                {formatGBP(result.monthlyPayment, { decimals: 2 })}
              </p>
              <p className="text-xs text-muted-foreground mt-1">per month</p>
              <div className="mt-5 space-y-2 text-sm">
                <SummaryRow label="Loan" value={formatGBP(principal)} done={step >= 1} />
                <SummaryRow label="Term" value={`${term} years`} done={step >= 2} />
                <SummaryRow label="Rate" value={`${rate.toFixed(2)}%`} done={step >= 3} />
              </div>
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">RepayWise tip:</span> A 1% rate rise on this
              loan adds {formatGBP(stressed.monthlyPayment - result.monthlyPayment, { decimals: 0 })}/mo.
              Always stress-test your affordability.
            </div>
          </div>
        </aside>
      </div>
    </CalculatorShell>
  );
};

const Stepper = ({ step }: { step: Step }) => {
  const labels = ["Amount", "Term", "Rate", "Result"];
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {labels.map((l, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div key={l} className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-none">
            <div
              className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                done
                  ? "bg-accent-secondary text-accent-secondary-foreground"
                  : active
                    ? "bg-primary text-primary-foreground shadow-glow-cyan"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {done ? <Check className="size-4" /> : i + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {l}
            </span>
            {i < labels.length - 1 && (
              <div className="flex-1 h-px bg-border min-w-4" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const StepPane = ({
  eyebrow,
  question,
  hint,
  children,
}: {
  eyebrow: string;
  question: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="animate-fade-in">
    <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">{eyebrow}</p>
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 leading-tight">{question}</h2>
    {hint && <p className="text-sm text-muted-foreground mb-6 max-w-[50ch]">{hint}</p>}
    {children}
  </div>
);

const BigSlider = ({
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
}) => {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3 gap-3">
        <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
        <div className="flex items-baseline gap-1 rounded-xl border border-border focus-within:border-accent focus-within:shadow-glow-cyan transition-all px-3 py-1.5 bg-background">
          {prefix && <span className="text-base font-semibold text-muted-foreground">{prefix}</span>}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={decimals > 0 ? Number(value.toFixed(decimals)) : value}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") return;
              const n = Number(raw);
              if (!Number.isFinite(n)) return;
              onChange(n);
            }}
            onBlur={(e) => onChange(clamp(Number(e.target.value) || min))}
            className="w-28 text-right bg-transparent text-2xl font-bold tabular-nums tracking-tight focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && <span className="text-base font-semibold text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 accent-foreground cursor-pointer"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground mt-1 tabular-nums">
        <span>{prefix}{min.toLocaleString("en-GB")}{suffix}</span>
        <span>{prefix}{max.toLocaleString("en-GB")}{suffix}</span>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, done }: { label: string; value: string; done: boolean }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
    <span className={`text-xs ${done ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
    <span className={`text-sm tabular-nums font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>
      {value}
    </span>
  </div>
);

// Re-exports kept for OverpaymentPage and AffordabilityPage that import from here
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
}) => {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2 gap-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
        <div className="flex items-baseline gap-0.5 rounded-lg border border-border focus-within:border-accent transition-all px-2 py-0.5 bg-background">
          {prefix && <span className="text-xs text-muted-foreground">{prefix}</span>}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={decimals > 0 ? Number(value.toFixed(decimals)) : value}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") return;
              const n = Number(raw);
              if (!Number.isFinite(n)) return;
              onChange(n);
            }}
            onBlur={(e) => onChange(clamp(Number(e.target.value) || min))}
            className="w-24 text-right bg-transparent text-sm font-semibold tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-foreground"
      />
    </div>
  );
};

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
