import { useEffect, useMemo, useState } from "react";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { Navigate, useParams } from "react-router-dom";
import { AlertTriangle, Calculator, CheckCircle2, Users, Wallet } from "lucide-react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { DepositField } from "@/components/calculators/DepositField";
import { LenderContextCard } from "@/components/lenders/LenderContextCard";
import { SEO } from "@/components/SEO";
import { LenderTrustBadge, CityTrustBadge } from "@/components/LenderTrustBadge";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";
import { calculateAffordability } from "@/lib/finance/affordability";
import { formatGBP } from "@/lib/finance/decimal";
import { buildLenderGuidePath, buildLenderPath, getLenderBySlug } from "@/lib/uk/lenders";
import { getCityBySlug } from "@/lib/uk/cities";
import { BigStat, SliderField } from "./RepaymentPage";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { LENDER_CUSTOM_META } from "@/lib/uk/lenderMeta";
import { LenderInsight } from "@/components/lenders/LenderInsight";

const MaxBorrowingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const lender = slug ? getLenderBySlug(slug) : undefined;
  const city = slug && !lender ? getCityBySlug(slug) : undefined;

  if (slug && !lender && !city) {
    return <Navigate to="/calculators/max-borrowing" replace />;
  }

  const [income, setIncome] = useState(55_000);
  const [partner, setPartner] = useState(0);
  const [expenditure, setExpenditure] = useState(400);
  const [deposit, setDeposit] = useState(40_000);
  const [rate, setRate] = useState(4.75);
  const [term, setTerm] = useState(30);

  useEffect(() => {
    if (lender) {
      setRate(lender.estimatedSvr);
    }
  }, [lender]);

  const result = useMemo(
    () =>
      calculateAffordability({
        grossAnnualIncome: income,
        partnerIncome: partner,
        monthlyExpenditure: expenditure,
        deposit,
        productRate: rate,
        termYears: term,
      }),
    [deposit, expenditure, income, partner, rate, term],
  );

  const totalIncome = income + partner;
  const lti = totalIncome > 0 ? result.maxBorrowing / totalIncome : 0;
  const title = lender
    ? `How much could ${lender.name} lend you?`
    : "UK Mortgage Affordability";
  const intro = lender
    ? `Sense-check how much you could borrow with ${lender.name}. We model a lender-style income multiple, disposable-income check, and stress test, while using the lender's indicative ${lender.estimatedSvr.toFixed(2)}% SVR and ${lender.maxLtv}% maximum LTV band as planning anchors.`
    : "Lender-style 4.5x income multiplier plus a disposable-income check and a +3% interest rate stress test. See your maximum borrowing and the property price you can target.";
  const pagePath = city ? `calculators/max-borrowing/${city.slug}` : lender ? `calculators/max-borrowing/${lender.slug}` : "calculators/max-borrowing";
  const canonicalUrl = `https://repaywise.co.uk/${pagePath}`;
  const seoTitle = city ? `${city.name} Maximum Borrowing Calculator | RepayWise` : lender
    ? `${lender.name} Max Borrowing Calculator 2026 — Independent | RepayWise`
    : "How Much Can I Borrow? UK Mortgage Calculator 2026 | RepayWise";
  const seoDescription = city
    ? `Free mortgage affordability calculator for ${city.name}. ${city.description} Find out how much you could borrow based on income and deposit.`
    : lender
    ? `RepayWise independent borrowing calculator for ${lender.name} customers. Estimate how much you could borrow — no ${lender.name} login or credit check required. Free third-party tool.`
    : "How much can you borrow for a UK mortgage? RepayWise independent calculator — income multiplier, stress test and deposit check. No login needed. Not affiliated with any lender.";

  return (
    <CalculatorShell
      eyebrow="How much can I borrow?"
      title={title}
      intro={intro}
      leadCalculator="affordability"
      leadContext={{ income, partner, expenditure, deposit, rate, term, maxBorrowing: result.maxBorrowing, lender: lender?.slug }}
    >
      
      {lender && (
        <LenderInsight slug={lender.slug} name={lender.name} maxLtv={lender.maxLtv} svr={lender.estimatedSvr} />
      )}

<SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: lender ? `${lender.name} Mortgage Affordability Calculator` : "RepayWise Mortgage Affordability Calculator",
              url: `https://repaywise.co.uk/${pagePath}`,
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
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much can I borrow for a mortgage in the UK?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Many lenders start around 4 to 4.5 times gross income, then reduce the loan if monthly outgoings are high or the stress-tested payment looks unaffordable.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why do lenders use a stress test?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Lenders typically test affordability at a higher rate than the headline product rate to check whether the borrower could still afford payments if rates rise.",
                  },
                },
              ],
            },
          ],
        }}
        lender={lender ? { name: lender.name, maxLtv: lender.maxLtv, estimatedSvr: lender.estimatedSvr, description: lender.description, trustRating: lender.trustRating } : undefined}
        calculatorType="Maximum Mortgage Borrowing Calculator"
      />
      {lender && <LenderTrustBadge lenderName={lender.name} />}
      {city && <CityTrustBadge cityName={city.name} />}
      

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: city ? `${city.name} Affordability Calculator` : lender ? `${lender.name} Affordability Calculator` : "Mortgage Affordability Calculator", href: pagePath },
        ]}
      />

      {lender ? (
        <LenderContextCard
          lender={lender}
          title={`${lender.name} borrowing signals`}
          body={`This page uses ${lender.name}'s indicative ${lender.estimatedSvr.toFixed(2)}% standard variable rate and ${lender.maxLtv}% maximum LTV band as planning anchors. It is not a product quote, but it gives you a better borrowing conversation starter than a generic national average.`}
          links={[
            { to: buildLenderGuidePath(lender.slug), label: `${lender.name} lender guide` },
            { to: buildLenderPath("repayment", lender.slug), label: `${lender.name} repayment view` },
            { to: buildLenderPath("overpayment", lender.slug), label: `${lender.name} overpayment view` },
          ]}
          className="mb-6"
        />
      ) : null}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Your income</p>
            </div>
            <SliderField label="Your gross annual income" prefix="£" value={income} min={15_000} max={300_000} step={1_000} onChange={setIncome} />
            <SliderField label="Partner annual income" prefix="£" value={partner} min={0} max={300_000} step={1_000} onChange={setPartner} />
            <SliderField label="Monthly committed outgoings" prefix="£" value={expenditure} min={0} max={5_000} step={50} onChange={setExpenditure} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Wallet className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. Your deposit</p>
            </div>
            <DepositField value={deposit} onChange={setDeposit} amountMax={500_000} label="Deposit available" />
            {lender ? (
              <p className="text-[11px] text-muted-foreground">
                Planning note: {lender.name} is currently modelled against a maximum LTV of {lender.maxLtv}%.
              </p>
            ) : null}
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Mortgage assumptions</p>
            </div>
            <SliderField label="Product rate" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
            <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Maximum you could borrow</p>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">{formatGBP(result.maxBorrowing)}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Property price you can target: <span className="font-semibold text-foreground">{formatGBP(result.maxPropertyValue)}</span> · Loan-to-income {lti.toFixed(2)}x
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <BigStat label="Monthly EMI at this loan" value={formatGBP(result.monthlyPayment, { decimals: 2 })} highlight />
            <BigStat label={`Stressed EMI at ${(rate + 3).toFixed(2)}%`} value={formatGBP(result.monthlyPaymentStressed, { decimals: 2 })} />
          </div>

          <div className={`glass-card rounded-2xl p-5 flex items-start gap-3 ${result.passesStressTest ? "border-success/40" : "border-destructive/40"}`}>
            {result.passesStressTest ? (
              <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <p className="font-semibold text-sm">
                {result.passesStressTest ? "Passes typical lender stress test" : "Fails +3% stress test - reduce loan or increase income"}
              </p>
              <ul className="text-muted-foreground mt-1 space-y-0.5">
                {result.notes.map((note, index) => <li key={index}>- {note}</li>)}
              </ul>
            </div>
          </div>

          <ShareCalculation
            title="UK Mortgage Affordability"
            calculator="affordability"
            intro={`Income ${formatGBP(totalIncome)} · Deposit ${formatGBP(deposit)} · Rate ${rate.toFixed(2)}%`}
            summary={[
              { label: "Combined income", value: formatGBP(totalIncome) },
              { label: "Monthly outgoings", value: formatGBP(expenditure) },
              { label: "Deposit", value: formatGBP(deposit) },
              { label: "Rate · Term", value: `${rate.toFixed(2)}% · ${term} years` },
              { label: "Maximum borrowing", value: formatGBP(result.maxBorrowing) },
              { label: "Max property price", value: formatGBP(result.maxPropertyValue) },
              { label: "Monthly EMI", value: formatGBP(result.monthlyPayment, { decimals: 2 }) },
              { label: "Stressed EMI (+3%)", value: formatGBP(result.monthlyPaymentStressed, { decimals: 2 }) },
              { label: "Loan-to-income", value: `${lti.toFixed(2)}x` },
            ]}
          />
        </div>
      </div>

      <LastUpdated date="30 April 2026" />
      <RelatedCalculators currentPath={pagePath} lenderSlug={lender?.slug} lenderName={lender?.name} citySlug={city?.slug} cityName={city?.name} />
    </CalculatorShell>
  );
};

export default MaxBorrowingPage;
