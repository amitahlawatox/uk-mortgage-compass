import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowLeft, ArrowRight, Check, Crown, Home, Sparkles, TrendingUp } from "lucide-react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { LenderContextCard } from "@/components/lenders/LenderContextCard";
import { SEO } from "@/components/SEO";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";
import { trackIntentClick } from "@/lib/analytics";
import { formatGBP } from "@/lib/finance/decimal";
import { buildSchedule, calculateRepayment } from "@/lib/finance/repayment";
import { buildLenderGuidePath, buildLenderPath, getLenderBySlug } from "@/lib/uk/lenders";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";

type Step = 0 | 1 | 2 | 3;

const presets = [
  { label: "First-time buyer", icon: Home, principal: 250_000, term: 30, blurb: "Typical UK FTB" },
  { label: "Mover", icon: TrendingUp, principal: 450_000, term: 25, blurb: "Mid-market upsizer" },
  { label: "Premium", icon: Crown, principal: 750_000, term: 25, blurb: "Higher-value home" },
];

const RepaymentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const lender = slug ? getLenderBySlug(slug) : undefined;

  if (slug && !lender) {
    return <Navigate to="/calculators/repayment" replace />;
  }

  const [step, setStep] = useState<Step>(0);
  const [propertyPrice, setPropertyPrice] = useState(312_500);
  const [deposit, setDeposit] = useState(62_500);
  const [depositMode, setDepositMode] = useState<"amount" | "percent">("amount");
  const principal = Math.max(0, propertyPrice - deposit);
  const depositPct = propertyPrice > 0 ? (deposit / propertyPrice) * 100 : 0;
  const ltv = 100 - depositPct;
  const [term, setTerm] = useState(25);
  const [rate, setRate] = useState(4.5);

  useEffect(() => {
    if (lender) {
      setRate(lender.estimatedSvr);
    }
  }, [lender]);

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
      .filter((_, index) => (index + 1) % 12 === 0)
      .map((row) => ({ year: row.month / 12, balance: row.balance }));
  }, [principal, rate, step, term]);

  const breakdown = useMemo(
    () => [
      { name: "Capital", value: principal, color: "hsl(var(--accent))" },
      { name: "Interest", value: result.totalInterest, color: "hsl(var(--accent-secondary))" },
    ],
    [principal, result.totalInterest],
  );

  const next = () => setStep((current) => Math.min(3, current + 1) as Step);
  const back = () => setStep((current) => Math.max(0, current - 1) as Step);

  useEffect(() => {
    if (step !== 0) return;
  }, [step]);

  const title = lender
    ? `Calculate monthly payments for ${lender.name} mortgages`
    : "Mortgage Repayment Calculator";
  const intro = lender
    ? `Run the repayment math for a ${lender.name} mortgage using an indicative ${lender.estimatedSvr.toFixed(2)}% standard variable rate. This is useful for stress-testing product transfer decisions and understanding what the fallback rate could mean for your monthly payment.`
    : "Three quick questions, one clear answer. We calculate your monthly payment using the standard amortisation formula in 28-digit decimal precision.";
  const pagePath = lender ? buildLenderPath("repayment", lender.slug) : "/calculators/repayment";
  const seoTitle = lender
    ? `${lender.name} Mortgage Repayment Calculator 2026 | RepayWise`
    : "UK Mortgage Calculator | Monthly Repayments | RepayWise";
  const seoDescription = lender
    ? `Estimate monthly payments for a ${lender.name} mortgage using an indicative ${lender.estimatedSvr.toFixed(2)}% SVR, total interest, and the full balance curve.`
    : "Easy 3-step UK mortgage calculator. See your monthly payment, total interest, and balance over time built on decimal-precision math.";

  return (
    <CalculatorShell
      eyebrow="Your monthly mortgage"
      title={title}
      intro={intro}
      leadCalculator="repayment"
      leadContext={{
        principal,
        rate,
        term,
        monthlyPayment: result.monthlyPayment,
        totalInterest: result.totalInterest,
        lender: lender?.slug,
      }}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        jsonLd={lender ? {
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          name: `${lender.name} Mortgage Repayment Calculator`,
          description: seoDescription,
          provider: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
          feesAndCommissionsSpecification: "Free to use. No personal data required.",
          areaServed: { "@type": "Country", name: "United Kingdom" },
          brand: { "@type": "Brand", name: lender.name },
        } : {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FinancialProduct",
              name: "UK Mortgage Repayment Calculator",
              description: seoDescription,
              provider: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
              feesAndCommissionsSpecification: "Free to use. No personal data required.",
              areaServed: { "@type": "Country", name: "United Kingdom" },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How is a UK mortgage repayment calculated?",
                  acceptedAnswer: { "@type": "Answer", text: "UK mortgage repayments are calculated using the standard amortisation formula. The monthly payment equals P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate, and n is the total number of monthly payments." },
                },
                {
                  "@type": "Question",
                  name: "What is a good mortgage interest rate in the UK in 2026?",
                  acceptedAnswer: { "@type": "Answer", text: "In 2026, competitive fixed-rate mortgages in the UK typically range from 3.5% to 5.5% depending on the loan-to-value ratio, term length, and lender. Standard variable rates (SVR) tend to be higher, often between 6.5% and 8.5%." },
                },
                {
                  "@type": "Question",
                  name: "How much deposit do I need for a UK mortgage?",
                  acceptedAnswer: { "@type": "Answer", text: "Most UK lenders require a minimum 5% deposit, though 10-20% deposits unlock better interest rates. Some specialist schemes may accept smaller deposits, but a larger deposit generally means lower monthly payments and better product availability." },
                },
                {
                  "@type": "Question",
                  name: "Can I overpay my UK mortgage?",
                  acceptedAnswer: { "@type": "Answer", text: "Most UK mortgages allow overpayments of up to 10% of the outstanding balance per year without early repayment charges. Overpaying reduces the total interest paid and can shorten your mortgage term significantly." },
                },
              ],
            },
          ],
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: lender ? `${lender.name} Mortgage Repayment` : "Mortgage Repayment Calculator", href: pagePath },
        ]}
      />

      {lender ? (
        <LenderContextCard
          lender={lender}
          title={`${lender.name} repayment planning`}
          body={`We start this page with an indicative ${lender.estimatedSvr.toFixed(2)}% standard variable rate for ${lender.name}. That gives you a realistic stress-test range for monthly payments if you miss a refinance window or roll onto the lender's fallback pricing.`}
          links={[
            { to: buildLenderGuidePath(lender.slug), label: `${lender.name} lender guide` },
            { to: buildLenderPath("overpayment", lender.slug), label: `${lender.name} overpayment view` },
            { to: buildLenderPath("max-borrowing", lender.slug), label: `${lender.name} borrowing view` },
          ]}
          className="mb-6"
        />
      ) : null}

      <Stepper step={step} />

      <div className="grid lg:grid-cols-5 gap-6 mt-8">
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 sm:p-8 min-h-[460px] flex flex-col">
          {step === 0 && (
            <StepPane
              eyebrow="Step 1 of 3"
              question="Property price and deposit"
              hint="Set the property price and your deposit. We will work out the loan you need."
            >
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {presets.map((preset) => {
                  const Icon = preset.icon;
                  const presetPrice = Math.round(preset.principal / 0.8);
                  const active = propertyPrice === presetPrice;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setPropertyPrice(presetPrice);
                        setDeposit(presetPrice - preset.principal);
                        setTerm(preset.term);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        active
                          ? "border-accent shadow-glow-cyan bg-secondary"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      <Icon className={`size-4 mb-3 ${active ? "text-accent" : "text-muted-foreground"}`} />
                      <p className="text-sm font-semibold">{preset.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{preset.blurb}</p>
                      <p className="text-base font-bold tabular-nums mt-2">{formatGBP(presetPrice)}</p>
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
                  onChange={(value) => {
                    setPropertyPrice(value);
                    if (deposit > value) setDeposit(Math.round(value * 0.1));
                  }}
                />

                <div>
                  <div className="flex items-center justify-end mb-2">
                    <div className="inline-flex rounded-lg border border-border bg-background p-0.5 text-[10px] font-bold uppercase tracking-wider">
                      <button
                        type="button"
                        onClick={() => setDepositMode("amount")}
                        className={`px-2.5 py-1 rounded-md transition-colors ${depositMode === "amount" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        £ Amount
                      </button>
                      <button
                        type="button"
                        onClick={() => setDepositMode("percent")}
                        className={`px-2.5 py-1 rounded-md transition-colors ${depositMode === "percent" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        % Percent
                      </button>
                    </div>
                  </div>

                  {depositMode === "amount" ? (
                    <BigSlider
                      label={`Deposit (${depositPct.toFixed(1)}%)`}
                      prefix="£"
                      value={deposit}
                      min={0}
                      max={propertyPrice}
                      step={1_000}
                      onChange={(value) => setDeposit(Math.min(value, propertyPrice))}
                    />
                  ) : (
                    <BigSlider
                      label={`Deposit (${formatGBP(deposit)})`}
                      suffix="%"
                      value={depositPct}
                      min={0}
                      max={100}
                      step={0.5}
                      decimals={1}
                      onChange={(pct) => setDeposit(Math.round((pct / 100) * propertyPrice))}
                    />
                  )}
                </div>

                <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-center rounded-2xl border border-border p-4 bg-secondary/40">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                      Loan you need
                    </p>
                    <p className="text-3xl font-bold tabular-nums tracking-tight mt-1">{formatGBP(principal)}</p>
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
                {[15, 20, 25, 30, 35, 40].map((years) => (
                  <button
                    key={years}
                    onClick={() => setTerm(years)}
                    className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                      term === years
                        ? "border-accent bg-secondary shadow-glow-cyan"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {years}y
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
              hint="Live UK 5-year fixed sits around 4.5%. We also show you what a 1% rise would mean."
            >
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map((currentRate) => (
                  <button
                    key={currentRate}
                    onClick={() => setRate(currentRate)}
                    className={`py-3 rounded-xl border text-sm font-semibold tabular-nums transition-all ${
                      Math.abs(rate - currentRate) < 0.01
                        ? "border-accent bg-secondary shadow-glow-cyan"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {currentRate.toFixed(1)}%
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
            <StepPane eyebrow="Your numbers" question="Here is what it costs">
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
                            {breakdown.map((slice) => (
                              <Cell key={slice.name} fill={slice.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              background: "hsl(var(--popover))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: 12,
                              fontSize: 12,
                            }}
                            formatter={(value: number) => formatGBP(value)}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      {breakdown.map((slice) => {
                        const total = principal + result.totalInterest;
                        const pct = total > 0 ? Math.round((slice.value / total) * 100) : 0;
                        return (
                          <div key={slice.name} className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2">
                              <span className="size-2 rounded-full" style={{ background: slice.color }} />
                              {slice.name} <span className="text-muted-foreground">({pct}%)</span>
                            </span>
                            <span className="tabular-nums font-semibold">{formatGBP(slice.value)}</span>
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
                          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
                          <Tooltip
                            contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                            formatter={(value: number) => [formatGBP(value), "Balance"]}
                            labelFormatter={(year) => `Year ${year}`}
                          />
                          <Area type="monotone" dataKey="balance" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#balGrad2)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <ShareCalculation
                  title="Mortgage Repayment Calculation"
                  calculator="repayment"
                  intro={`Property ${formatGBP(propertyPrice)} · Deposit ${formatGBP(deposit)} (${depositPct.toFixed(1)}%)`}
                  summary={[
                    { label: "Property price", value: formatGBP(propertyPrice) },
                    { label: `Deposit (${depositPct.toFixed(1)}%)`, value: formatGBP(deposit) },
                    { label: "Loan amount", value: formatGBP(principal) },
                    { label: "Rate", value: `${rate.toFixed(2)}%` },
                    { label: "Term", value: `${term} years` },
                    { label: "Monthly payment", value: formatGBP(result.monthlyPayment, { decimals: 2 }) },
                    { label: "Total interest", value: formatGBP(result.totalInterest) },
                    { label: "Stressed EMI (+1%)", value: formatGBP(stressed.monthlyPayment, { decimals: 2 }) },
                  ]}
                />
              </div>
            </StepPane>
          )}

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
                onClick={() => {
                  if (step === 2) {
                    trackIntentClick("repayment_wizard", pagePath, "See my payment", {
                      principal,
                      rate,
                      term,
                      lender: lender?.slug,
                    });
                  }
                  next();
                }}
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
                <SummaryRow label="Property" value={formatGBP(propertyPrice)} done />
                <SummaryRow label={`Deposit (${depositPct.toFixed(0)}%)`} value={formatGBP(deposit)} done />
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

      <LastUpdated date="30 April 2026" />
      <RelatedCalculators currentPath={pagePath} />
    </CalculatorShell>
  );
};

const Stepper = ({ step }: { step: Step }) => {
  const labels = ["Amount", "Term", "Rate", "Result"];
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {labels.map((label, index) => {
        const active = index === step;
        const done = index < step;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-none">
            <div
              className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                done
                  ? "bg-accent-secondary text-accent-secondary-foreground"
                  : active
                    ? "bg-primary text-primary-foreground shadow-glow-cyan"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {done ? <Check className="size-4" /> : index + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
            {index < labels.length - 1 && <div className="flex-1 h-px bg-border min-w-4" />}
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
    {hint ? <p className="text-sm text-muted-foreground mb-6 max-w-[50ch]">{hint}</p> : null}
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
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const clamp = (current: number) => Math.min(max, Math.max(min, current));
  const formatted = decimals > 0 ? value.toFixed(decimals) : String(value);
  const [draft, setDraft] = useState(formatted);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(formatted);
  }, [focused, formatted]);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3 gap-3">
        <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
        <div className="flex items-baseline gap-1 rounded-xl border border-border focus-within:border-accent focus-within:shadow-glow-cyan transition-all px-3 py-1.5 bg-background">
          {prefix ? <span className="text-base font-semibold text-muted-foreground">{prefix}</span> : null}
          <input
            type="text"
            inputMode="decimal"
            value={draft}
            onFocus={() => setFocused(true)}
            onChange={(event) => {
              const raw = event.target.value;
              setDraft(raw);
              if (raw === "" || raw === "-" || raw === "." || raw === "-.") {
                onChange(0);
                return;
              }
              const nextValue = Number(raw);
              if (Number.isFinite(nextValue)) onChange(nextValue);
            }}
            onBlur={(event) => {
              setFocused(false);
              const nextValue = Number(event.target.value);
              const clamped = Number.isFinite(nextValue) ? clamp(nextValue) : min;
              onChange(clamped);
              setDraft(decimals > 0 ? clamped.toFixed(decimals) : String(clamped));
            }}
            className="w-28 text-right bg-transparent text-2xl font-bold tabular-nums tracking-tight focus:outline-none"
          />
          {suffix ? <span className="text-base font-semibold text-muted-foreground">{suffix}</span> : null}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value)}
        onChange={(event) => onChange(Number(event.target.value))}
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
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const clamp = (current: number) => Math.min(max, Math.max(min, current));
  const formatted = decimals > 0 ? value.toFixed(decimals) : String(value);
  const [draft, setDraft] = useState(formatted);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(formatted);
  }, [focused, formatted]);

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2 gap-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
        <div className="flex items-baseline gap-0.5 rounded-lg border border-border focus-within:border-accent transition-all px-2 py-0.5 bg-background">
          {prefix ? <span className="text-xs text-muted-foreground">{prefix}</span> : null}
          <input
            type="text"
            inputMode="decimal"
            value={draft}
            onFocus={() => setFocused(true)}
            onChange={(event) => {
              const raw = event.target.value;
              setDraft(raw);
              if (raw === "" || raw === "-" || raw === "." || raw === "-.") {
                onChange(0);
                return;
              }
              const nextValue = Number(raw);
              if (Number.isFinite(nextValue)) onChange(nextValue);
            }}
            onBlur={(event) => {
              setFocused(false);
              const nextValue = Number(event.target.value);
              const clamped = Number.isFinite(nextValue) ? clamp(nextValue) : min;
              onChange(clamped);
              setDraft(decimals > 0 ? clamped.toFixed(decimals) : String(clamped));
            }}
            className="w-24 text-right bg-transparent text-sm font-semibold tabular-nums focus:outline-none"
          />
          {suffix ? <span className="text-xs text-muted-foreground">{suffix}</span> : null}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-foreground"
      />
    </div>
  );
};

export const BigStat = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`rounded-2xl p-5 ${highlight ? "bg-primary text-primary-foreground shadow-glow-cyan" : "glass-card"}`}>
    <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
      {label}
    </p>
    <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">{value}</p>
  </div>
);

export default RepaymentPage;
