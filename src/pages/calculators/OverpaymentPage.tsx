import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { DepositField } from "@/components/calculators/DepositField";
import { LenderContextCard } from "@/components/lenders/LenderContextCard";
import { SEO } from "@/components/SEO";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";
import { formatGBP } from "@/lib/finance/decimal";
import { buildSchedule, calculateRepayment } from "@/lib/finance/repayment";
import { buildLenderGuidePath, buildLenderPath, getLenderBySlug } from "@/lib/uk/lenders";
import { BigStat, SliderField } from "./RepaymentPage";

const OverpaymentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const lender = slug ? getLenderBySlug(slug) : undefined;

  if (slug && !lender) {
    return <Navigate to="/calculators/overpayment" replace />;
  }

  const [propertyPrice, setPropertyPrice] = useState(312_500);
  const [deposit, setDeposit] = useState(62_500);
  const [principal, setPrincipal] = useState(250_000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [monthlyOver, setMonthlyOver] = useState(200);
  const [quarterlyOver, setQuarterlyOver] = useState(0);
  const [annualOver, setAnnualOver] = useState(0);
  const [lumpSum, setLumpSum] = useState(0);
  const [lumpMonth, setLumpMonth] = useState(12);

  useEffect(() => {
    if (lender) {
      setRate(lender.estimatedSvr);
    }
  }, [lender]);

  const handlePropertyChange = (value: number) => {
    setPropertyPrice(value);
    const newDeposit = Math.min(deposit, value);
    if (newDeposit !== deposit) setDeposit(newDeposit);
    setPrincipal(Math.max(0, value - newDeposit));
  };

  const handleDepositChange = (value: number) => {
    const clamped = Math.min(value, propertyPrice);
    setDeposit(clamped);
    setPrincipal(Math.max(0, propertyPrice - clamped));
  };

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

    baseline.schedule.forEach((row, index) => {
      if ((index + 1) % stride === 0) {
        const year = (index + 1) / 12;
        map.set(year, { year, baseline: row.balance, accelerated: 0 });
      }
    });

    accelerated.schedule.forEach((row, index) => {
      if ((index + 1) % stride === 0) {
        const year = (index + 1) / 12;
        const existing = map.get(year);
        if (existing) {
          existing.accelerated = row.balance;
        } else {
          map.set(year, { year, baseline: 0, accelerated: row.balance });
        }
      }
    });

    return [...map.values()].sort((a, b) => a.year - b.year);
  }, [accelerated, baseline]);

  const title = lender
    ? `Calculate Interest Savings for ${lender.name} Mortgages`
    : "Overpayment Visualiser";
  const intro = lender
    ? `Model how regular overpayments or a one-off lump sum could reduce interest on a ${lender.name} mortgage. We preload the rate at an indicative ${lender.estimatedSvr.toFixed(2)}% SVR so you can pressure-test the fallback scenario before you decide whether to overpay, remortgage, or keep cash liquid.`
    : "Move the sliders. See exactly how a regular monthly overpayment or a one-off lump sum reshapes your mortgage: interest saved and years shaved off the term.";
  const pagePath = lender ? buildLenderPath("overpayment", lender.slug) : "/calculators/overpayment";
  const seoTitle = lender
    ? `${lender.name} Mortgage Overpayment Calculator 2026 | RepayWise`
    : "Mortgage Overpayment Calculator UK | Save Years and Pounds | RepayWise";
  const seoDescription = lender
    ? `See how much interest and time you could save by overpaying a ${lender.name} mortgage. RepayWise models monthly and lump-sum overpayments against an indicative ${lender.estimatedSvr.toFixed(2)}% SVR.`
    : "See how overpaying your UK mortgage cuts years off your term and saves thousands in interest. Free, FCA-aligned, decimal-precision amortisation. No login needed.";

  return (
    <CalculatorShell
      eyebrow="Pay off faster"
      title={title}
      intro={intro}
      leadCalculator="overpayment"
      leadContext={{
        principal,
        rate,
        term,
        monthlyOver,
        lumpSum,
        lumpMonth,
        interestSaved,
        monthsSaved,
        lender: lender?.slug,
      }}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: lender ? `${lender.name} Mortgage Overpayment Calculator` : "RepayWise Mortgage Overpayment Calculator",
              url: `https://repaywise.co.uk${pagePath}`,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              description: seoDescription,
              offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
              provider: {
                "@type": "Organization",
                name: "RepayWise",
                url: "https://repaywise.co.uk",
                areaServed: "GB",
              },
              ...(lender ? { brand: { "@type": "Brand", name: lender.name } } : {}),
            },
            {
              "@type": "HowTo",
              name: lender
                ? `How to calculate ${lender.name} mortgage overpayment savings`
                : "How to calculate mortgage overpayment savings in the UK",
              description: "Enter your balance, rate, term, and extra payment pattern to see how much interest and time you save.",
              step: [
                { "@type": "HowToStep", name: "Enter your loan details", text: "Set your current loan balance, interest rate, and remaining term." },
                { "@type": "HowToStep", name: "Add regular or one-off overpayments", text: "Choose a monthly overpayment, a quarterly or annual overpayment, or a one-off lump sum." },
                { "@type": "HowToStep", name: "Read the savings output", text: "Compare baseline versus accelerated repayment to see interest saved and term reduction." },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much can I save by overpaying my mortgage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The savings depend on your outstanding balance, interest rate, and overpayment amount. Use the RepayWise calculator to model your own figures and see the exact interest and time saved.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it better to overpay my mortgage or save in an ISA?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "It depends on your mortgage interest rate versus the savings rate available. If your mortgage rate exceeds the best ISA rate, overpaying usually wins mathematically. RepayWise helps you compare both scenarios.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are there penalties for overpaying a UK mortgage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Many UK lenders allow some overpayment without charge each year, but early repayment charges can apply if you exceed your product terms. Always check the lender's latest overpayment rules before acting.",
                  },
                },
              ],
            },
          ],
        }}
      />

      {lender ? (
        <LenderContextCard
          lender={lender}
          title={`${lender.name} overpayment planning`}
          body={`This version of the calculator starts from an indicative ${lender.estimatedSvr.toFixed(2)}% standard variable rate for ${lender.name}. Use it to test what happens if you stay on the lender's fallback rate, then compare the interest saved from overpaying against the value of remortgaging or keeping cash liquid.`}
          links={[
            { to: buildLenderGuidePath(lender.slug), label: `${lender.name} lender guide` },
            { to: buildLenderPath("repayment", lender.slug), label: `${lender.name} repayment view` },
            { to: buildLenderPath("max-borrowing", lender.slug), label: `${lender.name} borrowing view` },
          ]}
          className="mb-6"
        />
      ) : null}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Property and loan</p>
          <SliderField label="Property price" prefix="£" value={propertyPrice} min={50_000} max={2_500_000} step={5_000} onChange={handlePropertyChange} />
          <DepositField value={deposit} onChange={handleDepositChange} referencePrice={propertyPrice} />
          <SliderField label="Loan amount (override)" prefix="£" value={principal} min={0} max={2_500_000} step={5_000} onChange={setPrincipal} />
          <p className="text-[10px] text-muted-foreground -mt-3">Auto-calculated from property minus deposit. Edit to override.</p>
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
              <p className="text-[11px] text-primary-foreground/60 mt-1">EMI plus averaged extra payments</p>
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
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                    formatter={(value: number, name) => [formatGBP(value), name === "baseline" ? "Baseline" : "With overpayments"]}
                    labelFormatter={(year) => `Year ${year}`}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} formatter={(value) => (value === "baseline" ? "Baseline" : "With overpayments")} />
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
                  £
                  {baseline.totalInterest > 0
                    ? (interestSaved / Math.max(1, monthlyOver * accelerated.monthsTaken + lumpSum)).toFixed(2)
                    : "0.00"}
                </strong>{" "}
                in future interest, assuming the rate stays at {rate.toFixed(2)}%.
              </p>
            </div>
          ) : null}

          <ShareCalculation
            title="Mortgage Overpayment Plan"
            calculator="overpayment"
            intro={`Loan ${formatGBP(principal)} · ${rate.toFixed(2)}% · ${term} years`}
            summary={[
              { label: "Loan amount", value: formatGBP(principal) },
              { label: "Rate · Term", value: `${rate.toFixed(2)}% · ${term} years` },
              { label: "Current EMI", value: formatGBP(baseEmi, { decimals: 2 }) },
              { label: "Effective monthly outlay", value: formatGBP(effectiveMonthly, { decimals: 2 }) },
              ...(monthlyOver > 0 ? [{ label: "Monthly overpayment", value: formatGBP(monthlyOver) }] : []),
              ...(quarterlyOver > 0 ? [{ label: "Quarterly overpayment", value: formatGBP(quarterlyOver) }] : []),
              ...(annualOver > 0 ? [{ label: "Annual overpayment", value: formatGBP(annualOver) }] : []),
              ...(lumpSum > 0 ? [{ label: `Lump sum (month ${lumpMonth})`, value: formatGBP(lumpSum) }] : []),
              { label: "Interest saved", value: formatGBP(Math.max(0, interestSaved)) },
              { label: "Time saved", value: `${Math.floor(monthsSaved / 12)}y ${monthsSaved % 12}m` },
              { label: "New term", value: `${Math.floor(accelerated.monthsTaken / 12)}y ${accelerated.monthsTaken % 12}m` },
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
};

export default OverpaymentPage;
