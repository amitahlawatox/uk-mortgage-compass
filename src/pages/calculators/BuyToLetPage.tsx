import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateRepayment } from "@/lib/finance/repayment";
import { calculateStampDuty, type Region } from "@/lib/finance/stampDuty";
import { formatGBP } from "@/lib/finance/decimal";
import { SliderField, BigStat } from "./RepaymentPage";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";
import { DepositField } from "@/components/calculators/DepositField";
import { Building2, Landmark, Receipt, TrendingUp, Info } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";

type RepayType = "repayment" | "interest-only";

const BuyToLetPage = () => {
  const [housePrice, setHousePrice] = useState(250_000);
  const [deposit, setDeposit] = useState(62_500); // 25% default
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(25);
  const [repayType, setRepayType] = useState<RepayType>("interest-only");
  const [region, setRegion] = useState<Region>("england");
  const [monthlyRent, setMonthlyRent] = useState(1_400);
  const [monthlyCosts, setMonthlyCosts] = useState(180); // mgmt, insurance, maintenance

  const loan = Math.max(0, housePrice - deposit);
  const ltv = housePrice > 0 ? (loan / housePrice) * 100 : 0;

  const emi = useMemo(
    () => calculateRepayment({
      principal: loan,
      annualRate: rate,
      termYears: term,
      interestOnly: repayType === "interest-only",
    }).monthlyPayment,
    [loan, rate, term, repayType],
  );

  // BTL is an "additional property" — surcharge applies
  const stamp = useMemo(
    () => calculateStampDuty({ price: housePrice, region, firstTimeBuyer: false, additionalProperty: true }),
    [housePrice, region],
  );

  const grossYield = housePrice > 0 ? ((monthlyRent * 12) / housePrice) * 100 : 0;
  const netMonthly = monthlyRent - emi - monthlyCosts;
  const netAnnual = netMonthly * 12;
  const cashInvested = deposit + stamp.total;
  const cashOnCash = cashInvested > 0 ? (netAnnual / cashInvested) * 100 : 0;
  // ICR = rent / interest portion (lender stress test, usually ≥125% @ stressed rate)
  const monthlyInterest = (loan * (rate / 100)) / 12;
  const icr = monthlyInterest > 0 ? (monthlyRent / monthlyInterest) * 100 : 0;

  return (
    <CalculatorShell
      eyebrow="Buy-to-Let"
      title="UK Buy-to-Let Mortgage Calculator"
      intro="Model a UK BTL purchase end-to-end: deposit (25% default), interest-only or repayment EMI, stamp duty with the additional-property surcharge, gross yield, net cash flow, and lender ICR stress test."
      leadCalculator="repayment"
      leadContext={{ housePrice, deposit, loan, rate, term, region, emi, stampDuty: stamp.total }}
    >
      <SEO
        title="Buy-to-Let Mortgage Calculator UK — Yield, Stamp Duty & EMI"
        description="UK Buy-to-Let calculator. 25% deposit default, interest-only or repayment, stamp duty surcharge by region, rental yield, net cash flow and ICR."
        path="/calculators/buy-to-let"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "RepayWise Buy-to-Let Mortgage Calculator",
              url: "https://repaywise.co.uk/calculators/buy-to-let",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              description: "Free UK buy-to-let calculator covering deposit, stamp duty surcharge, mortgage payments, rental yield, cash flow, and lender ICR.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
              provider: {
                "@type": "Organization",
                name: "RepayWise",
                url: "https://repaywise.co.uk",
                areaServed: "GB",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much deposit do I need for a buy-to-let mortgage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Many UK buy-to-let mortgages start around a 25% deposit, although exact deposit requirements depend on the lender, rental income, and property type.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is ICR on a buy-to-let mortgage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ICR means Interest Coverage Ratio. It compares the expected rent to the mortgage interest payment and is often used by lenders to decide whether a buy-to-let case is affordable.",
                  },
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
          { name: "Buy-to-Let Calculator", href: "/calculators/buy-to-let" },
        ]}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Property & deposit</p>
            </div>
            <SliderField label="House price" prefix="£" value={housePrice} min={50_000} max={2_000_000} step={5_000} onChange={(v) => {
              setHousePrice(v);
              // keep deposit at ~current % of new price if user hasn't customised drastically
              const currentPct = housePrice > 0 ? deposit / housePrice : 0.25;
              setDeposit(Math.round(v * currentPct));
            }} />
            <DepositField
              value={deposit}
              onChange={(v) => setDeposit(Math.min(v, housePrice))}
              referencePrice={housePrice}
              label="Deposit (BTL standard 25%)"
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Loan amount</span>
              <span className="font-semibold tabular-nums">{formatGBP(loan)} · LTV {ltv.toFixed(1)}%</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. Mortgage</p>
            </div>
            <SliderField label="Interest rate (APR)" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
            <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
            <div>
              <p className="text-xs font-semibold mb-2">Repayment type</p>
              <div className="grid grid-cols-2 gap-2">
                {(["interest-only", "repayment"] as RepayType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setRepayType(t)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                      repayType === t
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {t === "interest-only" ? "Interest only" : "Repayment"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Receipt className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Region (stamp duty)</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["england", "scotland", "wales"] as Region[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border capitalize transition-colors ${
                    region === r
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-background text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  {r === "england" ? "England/NI" : r}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">
              BTL purchases pay the additional-property surcharge ({stamp.taxName}).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">4. Rental income & costs</p>
            </div>
            <SliderField label="Expected monthly rent" prefix="£" value={monthlyRent} min={200} max={10_000} step={50} onChange={setMonthlyRent} />
            <SliderField label="Monthly costs (mgmt, insurance, maintenance)" prefix="£" value={monthlyCosts} min={0} max={2_000} step={10} onChange={setMonthlyCosts} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-accent-secondary/15 to-transparent border-accent-secondary/30">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-secondary mb-2">Monthly mortgage payment</p>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">{formatGBP(emi, { decimals: 2 })}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {repayType === "interest-only" ? "Interest only" : "Capital + interest"} · {term}y · {rate.toFixed(2)}% APR · LTV {ltv.toFixed(1)}%
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <BigStat label={`Stamp duty (${stamp.taxName})`} value={formatGBP(stamp.total)} />
            <BigStat label="Gross rental yield" value={`${grossYield.toFixed(2)}%`} highlight={grossYield >= 5} />
            <BigStat label="Net monthly cash flow" value={formatGBP(netMonthly, { decimals: 0 })} highlight={netMonthly >= 0} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 space-y-2 text-sm">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Cash to complete</p>
              <Row label="Deposit" value={formatGBP(deposit)} />
              <Row label={`Stamp duty (${stamp.taxName} +surcharge)`} value={formatGBP(stamp.total)} />
              <div className="h-px bg-border my-1" />
              <Row label="Total cash needed" value={formatGBP(cashInvested)} bold />
            </div>
            <div className="glass-card rounded-2xl p-5 space-y-2 text-sm">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Lender stress (ICR)</p>
              <Row label="Monthly rent" value={formatGBP(monthlyRent)} />
              <Row label="Monthly interest" value={formatGBP(monthlyInterest, { decimals: 2 })} />
              <Row label="ICR coverage" value={`${icr.toFixed(0)}%`} bold />
              <p className={`text-[11px] mt-1 ${icr >= 125 ? "text-accent-secondary" : "text-destructive"}`}>
                {icr >= 125 ? "Meets typical 125% lender ICR threshold." : "Below typical 125% lender ICR — may not pass."}
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 text-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Annual returns</p>
            <Row label="Annual rent" value={formatGBP(monthlyRent * 12)} />
            <Row label="Annual mortgage" value={`− ${formatGBP(emi * 12)}`} />
            <Row label="Annual costs" value={`− ${formatGBP(monthlyCosts * 12)}`} />
            <div className="h-px bg-border my-1" />
            <Row label="Net annual profit" value={formatGBP(netAnnual)} bold />
            <Row label="Cash-on-cash return" value={`${cashOnCash.toFixed(2)}%`} bold />
            <div className="text-xs text-muted-foreground flex gap-2 items-start mt-2">
              <Info className="size-3.5 mt-0.5 shrink-0" />
              <p>Excludes income tax, void periods and capital gains. BTL income is taxed at your marginal rate; mortgage interest relief is capped at 20% basic-rate credit.</p>
            </div>
          </div>

          <ShareCalculation
            title="UK Buy-to-Let Snapshot"
            calculator="repayment"
            intro={`${formatGBP(housePrice)} BTL · ${formatGBP(deposit)} deposit · ${region}`}
            summary={[
              { label: "House price", value: formatGBP(housePrice) },
              { label: "Deposit", value: `${formatGBP(deposit)} (${(housePrice ? (deposit / housePrice) * 100 : 0).toFixed(1)}%)` },
              { label: "Loan", value: `${formatGBP(loan)} (LTV ${ltv.toFixed(1)}%)` },
              { label: "Rate · Term", value: `${rate.toFixed(2)}% · ${term} years` },
              { label: "Repayment type", value: repayType === "interest-only" ? "Interest only" : "Repayment" },
              { label: "Monthly payment", value: formatGBP(emi, { decimals: 2 }) },
              { label: `Stamp duty (${stamp.taxName})`, value: formatGBP(stamp.total) },
              { label: "Total cash to complete", value: formatGBP(cashInvested) },
              { label: "Monthly rent", value: formatGBP(monthlyRent) },
              { label: "Gross yield", value: `${grossYield.toFixed(2)}%` },
              { label: "Net monthly cash flow", value: formatGBP(netMonthly, { decimals: 0 }) },
              { label: "ICR coverage", value: `${icr.toFixed(0)}%` },
              { label: "Cash-on-cash return", value: `${cashOnCash.toFixed(2)}%` },
            ]}
          />
        </div>
      </div>

      <LastUpdated date="30 April 2026" />
      <RelatedCalculators currentPath="/calculators/buy-to-let" />
    </CalculatorShell>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex justify-between">
    <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
    <span className={`tabular-nums ${bold ? "font-bold text-base" : "font-semibold"}`}>{value}</span>
  </div>
);

export default BuyToLetPage;
