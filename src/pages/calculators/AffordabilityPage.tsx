import { useEffect, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateStampDuty, type Region } from "@/lib/finance/stampDuty";
import { calculateRepayment } from "@/lib/finance/repayment";
import { calculateAffordability } from "@/lib/finance/affordability";
import { formatGBP } from "@/lib/finance/decimal";
import { SliderField, BigStat } from "./RepaymentPage";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Home, Users, Building2, MapPin, CheckCircle2, AlertTriangle, Wallet, Receipt, Calculator, Info } from "lucide-react";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";

const FeeInput = ({ value, onChange, disabled }: { value: number; onChange: (v: number) => void; disabled?: boolean }) => {
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);
  useEffect(() => { if (!focused) setDraft(String(value)); }, [value, focused]);
  return (
    <input
      type="text"
      inputMode="numeric"
      value={draft}
      disabled={disabled}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        const raw = e.target.value;
        setDraft(raw);
        if (raw === "") { onChange(0); return; }
        const n = Number(raw);
        if (Number.isFinite(n) && n >= 0) onChange(n);
      }}
      onBlur={(e) => {
        setFocused(false);
        const n = Math.max(0, Number(e.target.value) || 0);
        onChange(n);
        setDraft(String(n));
      }}
      className="w-20 bg-background border border-border rounded-md px-2 py-1 text-xs text-right disabled:opacity-50"
    />
  );
};

type BuyerStatus = "first-time" | "mover" | "additional";

const REGION_OPTIONS: { value: Region; label: string; sub: string }[] = [
  { value: "england", label: "England & N. Ireland", sub: "SDLT" },
  { value: "scotland", label: "Scotland", sub: "LBTT" },
  { value: "wales", label: "Wales", sub: "LTT" },
];

const BUYER_OPTIONS: { value: BuyerStatus; label: string; icon: typeof Home; desc: string }[] = [
  { value: "first-time", label: "First-time buyer", icon: Home, desc: "Never owned a home before" },
  { value: "mover", label: "Moving home", icon: Users, desc: "Replacing your main residence" },
  { value: "additional", label: "Additional property", icon: Building2, desc: "2nd home / buy-to-let surcharge" },
];

const DEFAULT_FEES = {
  legal: 1500,
  survey: 500,
  arrangement: 1000,
  broker: 500,
  removals: 800,
};

type FeeKey = keyof typeof DEFAULT_FEES;

const FEE_META: Record<FeeKey, { label: string; hint: string }> = {
  legal: { label: "Legal / conveyancing", hint: "Solicitor fees, searches, Land Registry" },
  survey: { label: "Property survey", hint: "Homebuyer report or full structural" },
  arrangement: { label: "Mortgage arrangement fee", hint: "Lender product/booking fee" },
  broker: { label: "Mortgage broker fee", hint: "If using a fee-charging broker" },
  removals: { label: "Removals & moving", hint: "Van hire, packing, redirects" },
};

const AffordabilityPage = () => {
  // Property
  const [propertyPrice, setPropertyPrice] = useState(325_000);
  const [deposit, setDeposit] = useState(40_000);
  const [depositMode, setDepositMode] = useState<"amount" | "percent">("amount");
  const [region, setRegion] = useState<Region>("england");
  const [buyer, setBuyer] = useState<BuyerStatus>("first-time");

  // Mortgage
  const [rate, setRate] = useState(4.75);
  const [term, setTerm] = useState(30);

  // Income (for affordability sanity-check)
  const [income, setIncome] = useState(55_000);
  const [partner, setPartner] = useState(0);
  const [expenditure, setExpenditure] = useState(400);

  // Optional fees toggle
  const [includeFees, setIncludeFees] = useState(false);
  const [fees, setFees] = useState<Record<FeeKey, number>>({ ...DEFAULT_FEES });
  const [enabledFees, setEnabledFees] = useState<Record<FeeKey, boolean>>({
    legal: true, survey: true, arrangement: true, broker: false, removals: false,
  });

  const loanAmount = Math.max(0, propertyPrice - deposit);
  const depositPct = propertyPrice > 0 ? (deposit / propertyPrice) * 100 : 0;
  const ltv = 100 - depositPct;

  const stampDuty = useMemo(
    () => calculateStampDuty({
      price: propertyPrice,
      region,
      firstTimeBuyer: buyer === "first-time",
      additionalProperty: buyer === "additional",
    }),
    [propertyPrice, region, buyer],
  );

  const repayment = useMemo(
    () => calculateRepayment({ principal: loanAmount, annualRate: rate, termYears: term }),
    [loanAmount, rate, term],
  );

  const affordability = useMemo(
    () => calculateAffordability({
      grossAnnualIncome: income,
      partnerIncome: partner,
      monthlyExpenditure: expenditure,
      deposit,
      productRate: rate,
      termYears: term,
    }),
    [income, partner, expenditure, deposit, rate, term],
  );

  const feesTotal = useMemo(() => {
    if (!includeFees) return 0;
    return (Object.keys(fees) as FeeKey[])
      .filter((k) => enabledFees[k])
      .reduce((s, k) => s + (fees[k] || 0), 0);
  }, [fees, enabledFees, includeFees]);

  const cashUpfront = deposit + stampDuty.total + feesTotal;
  const withinBorrowing = loanAmount <= affordability.maxBorrowing;

  const cashChart = useMemo(() => [
    { name: "Deposit", value: deposit, color: "hsl(var(--accent))" },
    { name: "Stamp duty", value: stampDuty.total, color: "hsl(var(--accent-secondary))" },
    ...(feesTotal > 0 ? [{ name: "Fees", value: feesTotal, color: "hsl(var(--muted-foreground))" }] : []),
  ], [deposit, stampDuty.total, feesTotal]);

  const ltvChart = useMemo(() => [
    { name: "Deposit", value: deposit, color: "hsl(var(--accent))" },
    { name: "Loan", value: loanAmount, color: "hsl(var(--accent-secondary))" },
  ], [deposit, loanAmount]);

  return (
    <CalculatorShell
      eyebrow="Total Cost to Buy"
      title="Buying a home — full cost planner"
      intro="One unified view: property price, deposit, stamp duty by region, EMI, plus the optional upfront fees most buyers forget. See exactly how much cash you need before completion."
      leadCalculator="total-cost"
      leadContext={{ propertyPrice, deposit, region, buyer, loanAmount, stampDuty: stampDuty.total, cashUpfront, monthly: repayment.monthlyPayment }}
    >
      <SEO
        title="Total Cost to Buy a House UK — Deposit, Stamp Duty & EMI Calculator"
        description="Plan the full cost of buying a UK home: deposit, SDLT/LBTT/LTT stamp duty, mortgage EMI and optional legal/survey fees in one calculator."
        path="/calculators/affordability"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "RepayWise Total Cost to Buy Calculator",
              url: "https://repaywise.co.uk/calculators/affordability",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              description: "Free UK home-buying cost planner covering deposit, stamp duty, mortgage payments, and optional buying fees in one calculator.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
              provider: {
                "@type": "Organization",
                name: "RepayWise",
                url: "https://repaywise.co.uk",
                areaServed: "GB",
              },
            },
            {
              "@type": "HowTo",
              name: "How to estimate the full cost of buying a home in the UK",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Enter the property price and deposit",
                  text: "Set the asking price and your deposit to calculate the loan amount and loan-to-value ratio.",
                },
                {
                  "@type": "HowToStep",
                  name: "Choose your region and buyer status",
                  text: "Select the correct stamp duty regime and whether you are a first-time buyer, home mover, or additional-property buyer.",
                },
                {
                  "@type": "HowToStep",
                  name: "Add mortgage and fee assumptions",
                  text: "Model your mortgage payment, then include legal, survey, lender, broker, and moving fees to see the true cash needed upfront.",
                },
              ],
            },
          ],
        }}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* ---------------- Inputs ---------------- */}
        <div className="lg:col-span-2 space-y-4">
          {/* Step 1 — Property */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Home className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Your property</p>
            </div>
            <SliderField label="Property price" prefix="£" value={propertyPrice} min={50_000} max={2_000_000} step={5_000} onChange={setPropertyPrice} />
            <div>
              <div className="flex items-center justify-end mb-1.5">
                <div className="inline-flex rounded-md border border-border bg-background p-0.5 text-[9px] font-bold uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => setDepositMode("amount")}
                    className={`px-2 py-0.5 rounded transition-colors ${depositMode === "amount" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >£</button>
                  <button
                    type="button"
                    onClick={() => setDepositMode("percent")}
                    className={`px-2 py-0.5 rounded transition-colors ${depositMode === "percent" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >%</button>
                </div>
              </div>
              {depositMode === "amount" ? (
                <SliderField label={`Deposit (${depositPct.toFixed(1)}%)`} prefix="£" value={deposit} min={0} max={Math.max(propertyPrice, 50_000)} step={1_000} onChange={(v) => setDeposit(Math.min(v, propertyPrice))} />
              ) : (
                <SliderField label={`Deposit (${formatGBP(deposit)})`} suffix="%" value={depositPct} min={0} max={100} step={0.5} decimals={1} onChange={(pct) => setDeposit(Math.round((pct / 100) * propertyPrice))} />
              )}
            </div>
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>Loan needed</span>
              <span className="font-semibold text-foreground">{formatGBP(loanAmount)} · {ltv.toFixed(1)}% LTV</span>
            </div>
          </div>

          {/* Step 2 — Buyer status & region */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. Buyer status & region</p>
            </div>

            <div>
              <p className="text-xs font-semibold mb-2">Where are you buying?</p>
              <div className="grid grid-cols-3 gap-2">
                {REGION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRegion(opt.value)}
                    className={`text-left rounded-xl border p-3 transition-colors ${region === opt.value ? "border-accent bg-accent/10" : "border-border hover:bg-secondary/40"}`}
                  >
                    <p className="text-[11px] font-semibold leading-tight">{opt.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-2">Are you a…</p>
              <div className="space-y-2">
                {BUYER_OPTIONS.map(({ value, label, icon: Icon, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setBuyer(value)}
                    className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${buyer === value ? "border-accent bg-accent/10" : "border-border hover:bg-secondary/40"}`}
                  >
                    <Icon className="size-4 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold leading-tight">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 — Mortgage */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Your mortgage</p>
            </div>
            <SliderField label="Product rate" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
            <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
          </div>

          {/* Step 4 — Income (for sanity check) */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">4. Your income (optional)</p>
            </div>
            <SliderField label="Your gross income" prefix="£" value={income} min={15_000} max={300_000} step={1_000} onChange={setIncome} />
            <SliderField label="Partner income" prefix="£" value={partner} min={0} max={300_000} step={1_000} onChange={setPartner} />
            <SliderField label="Monthly committed outgoings" prefix="£" value={expenditure} min={0} max={5_000} step={50} onChange={setExpenditure} />
          </div>

          {/* Step 5 — Optional extra fees */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="size-4 text-accent" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">5. Other costs (optional)</p>
              </div>
              <button
                type="button"
                onClick={() => setIncludeFees((v) => !v)}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${includeFees ? "bg-accent text-accent-foreground border-accent" : "border-border hover:bg-secondary/40"}`}
              >
                {includeFees ? "Included" : "Add fees"}
              </button>
            </div>

            {!includeFees ? (
              <div className="text-xs text-muted-foreground flex gap-2 items-start">
                <Info className="size-3.5 mt-0.5 shrink-0" />
                <p>Most buyers also pay legal (~£1,500), survey (~£500) and a lender fee (~£1,000). Toggle on to include them in your cash-needed total.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(Object.keys(FEE_META) as FeeKey[]).map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`fee-${key}`}
                      checked={enabledFees[key]}
                      onChange={(e) => setEnabledFees((s) => ({ ...s, [key]: e.target.checked }))}
                      className="size-4 accent-accent"
                    />
                    <label htmlFor={`fee-${key}`} className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-tight">{FEE_META[key].label}</p>
                      <p className="text-[10px] text-muted-foreground">{FEE_META[key].hint}</p>
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">£</span>
                      <FeeInput
                        value={fees[key]}
                        disabled={!enabledFees[key]}
                        onChange={(v) => setFees((s) => ({ ...s, [key]: v }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---------------- Results ---------------- */}
        <div className="lg:col-span-3 space-y-4">
          {/* Headline cash-needed */}
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Total cash needed upfront</p>
            </div>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight">{formatGBP(cashUpfront)}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Deposit {formatGBP(deposit)} + {stampDuty.taxName} {formatGBP(stampDuty.total)}
              {feesTotal > 0 && <> + Fees {formatGBP(feesTotal)}</>}
            </p>
          </div>

          {/* Cash composition + LTV donut */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Cash composition</p>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={cashChart} dataKey="value" innerRadius={42} outerRadius={62} paddingAngle={2}>
                      {cashChart.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatGBP(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 text-xs">
                {cashChart.map((d) => (
                  <div key={d.name} className="flex justify-between">
                    <span className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: d.color }} />{d.name}</span>
                    <span className="font-semibold">{formatGBP(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Loan-to-value</p>
              <div className="h-[160px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ltvChart} dataKey="value" innerRadius={42} outerRadius={62} paddingAngle={2}>
                      {ltvChart.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatGBP(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-xl font-bold">{ltv.toFixed(1)}%</p>
                  <p className="text-[10px] text-muted-foreground">LTV</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span>Property</span><span className="font-semibold">{formatGBP(propertyPrice)}</span></div>
                <div className="flex justify-between"><span>Deposit ({depositPct.toFixed(1)}%)</span><span className="font-semibold">{formatGBP(deposit)}</span></div>
                <div className="flex justify-between"><span>Loan</span><span className="font-semibold">{formatGBP(loanAmount)}</span></div>
              </div>
            </div>
          </div>

          {/* Monthly + stamp duty stats */}
          <div className="grid sm:grid-cols-2 gap-4">
            <BigStat label="Monthly EMI" value={formatGBP(repayment.monthlyPayment, { decimals: 2 })} highlight />
            <BigStat label={`${stampDuty.taxName} payable`} value={formatGBP(stampDuty.total)} />
            <BigStat label="Total interest over term" value={formatGBP(repayment.totalInterest)} />
            <BigStat label={`Effective ${stampDuty.taxName} rate`} value={`${stampDuty.effectiveRate.toFixed(2)}%`} />
          </div>

          {/* Stamp duty breakdown */}
          {stampDuty.breakdown.length > 0 && (
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">{stampDuty.taxName} band breakdown</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground">
                    <tr className="text-left">
                      <th className="py-1 font-semibold">Band</th>
                      <th className="py-1 font-semibold text-right">Rate</th>
                      <th className="py-1 font-semibold text-right">Taxable</th>
                      <th className="py-1 font-semibold text-right">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stampDuty.breakdown.map((row, i) => (
                      <tr key={i} className="border-t border-border/60">
                        <td className="py-1.5">{row.band}</td>
                        <td className="py-1.5 text-right">{(row.rate * 100).toFixed(1)}%</td>
                        <td className="py-1.5 text-right">{formatGBP(row.taxable)}</td>
                        <td className="py-1.5 text-right font-semibold">{formatGBP(row.tax)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {stampDuty.notes.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {stampDuty.notes.map((n, i) => (
                    <li key={i} className="text-[11px] text-muted-foreground flex gap-1.5"><Info className="size-3 mt-0.5 shrink-0" />{n}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Affordability sanity check */}
          <div className={`glass-card rounded-2xl p-5 flex items-start gap-3 ${withinBorrowing && affordability.passesStressTest ? "border-success/40" : "border-destructive/40"}`}>
            {withinBorrowing && affordability.passesStressTest ? (
              <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <p className="font-semibold text-sm">
                {withinBorrowing && affordability.passesStressTest
                  ? "Within typical lender criteria"
                  : !withinBorrowing
                    ? `Loan exceeds typical max borrowing of ${formatGBP(affordability.maxBorrowing)}`
                    : "Fails +3% stress test"}
              </p>
              <p className="text-muted-foreground mt-1">
                Loan-to-income {(loanAmount / Math.max(1, income + partner)).toFixed(2)}× ·
                Stressed EMI {formatGBP(affordability.monthlyPaymentStressed, { decimals: 2 })} at {(rate + 3).toFixed(2)}% ·
                Max borrowing {formatGBP(affordability.maxBorrowing)}
              </p>
            </div>
          </div>

          <ShareCalculation
            title="Total Cost to Buy a Home"
            calculator="total-cost"
            intro={`Property ${formatGBP(propertyPrice)} · Deposit ${formatGBP(deposit)} (${depositPct.toFixed(1)}%) · ${REGION_OPTIONS.find(r => r.value === region)?.label} · ${BUYER_OPTIONS.find(b => b.value === buyer)?.label}`}
            summary={[
              { label: "Property price", value: formatGBP(propertyPrice) },
              { label: `Deposit (${depositPct.toFixed(1)}%)`, value: formatGBP(deposit) },
              { label: "Loan needed", value: `${formatGBP(loanAmount)} · ${ltv.toFixed(1)}% LTV` },
              { label: `${stampDuty.taxName} payable`, value: formatGBP(stampDuty.total) },
              ...(feesTotal > 0 ? [{ label: "Other fees", value: formatGBP(feesTotal) }] : []),
              { label: "Total cash needed upfront", value: formatGBP(cashUpfront) },
              { label: "Monthly EMI", value: formatGBP(repayment.monthlyPayment, { decimals: 2 }) },
              { label: "Total interest over term", value: formatGBP(repayment.totalInterest) },
              { label: `Rate · Term`, value: `${rate.toFixed(2)}% · ${term} years` },
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
};

export default AffordabilityPage;
