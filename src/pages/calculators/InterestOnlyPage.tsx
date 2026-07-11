/**
 * Interest-Only Mortgage Calculator
 * Target keywords:
 *   "interest only mortgage calculator"    — 9,900/mo, KD 30
 *   "interest only mortgage calculator uk" — 1,600/mo, KD 32
 *   "interest only repayment calculator"   — 880/mo,  KD 31
 */
import { useMemo, useState } from "react";
import { InterestOnlySEOContent } from "@/components/calculators/SEOContent";
import { useParams, Navigate, Link } from "react-router-dom";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { SiteShell } from "@/components/layout/SiteShell";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LenderTrustBadge } from "@/components/LenderTrustBadge";
import { getLenderBySlug } from "@/lib/uk/lenders";
import { calculateRepayment } from "@/lib/finance/repayment";
import { formatGBP } from "@/lib/finance/decimal";
import { ArrowRight, Info } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is an interest-only mortgage?",
    answer:
      "With an interest-only mortgage, your monthly payment covers only the interest on the loan. You do not repay any of the original loan amount (the capital) during the mortgage term. At the end of the term, you still owe the full original amount and must repay it — usually by selling the property, using savings, or switching to a repayment mortgage.",
  },
  {
    question: "How much cheaper is an interest-only mortgage per month?",
    answer:
      "Interest-only payments are significantly lower than repayment mortgages — often 25-40% lower on a 25-year term. However, the total cost over the full term is much higher because you are paying interest on the full balance throughout and still owe the capital at the end.",
  },
  {
    question: "Who offers interest-only mortgages in the UK?",
    answer:
      "Interest-only mortgages in the UK are typically available from specialist lenders and some high-street banks. They are more common for buy-to-let and are harder to obtain for residential mortgages. Lenders usually require a credible repayment vehicle (savings, investments, or property sale) before approving interest-only.",
  },
  {
    question: "What happens at the end of an interest-only mortgage?",
    answer:
      "At the end of an interest-only term, you owe the original loan amount in full. Most borrowers repay this by selling the property, switching to a repayment mortgage earlier, using an ISA or investment portfolio, or using a pension lump sum. Lenders will require you to have a credible repayment plan before granting an interest-only mortgage.",
  },
  {
    question: "Is interest-only cheaper overall?",
    answer:
      "No. Interest-only mortgages have lower monthly payments but significantly higher total costs. On a repayment mortgage you gradually reduce the balance, which reduces future interest. On interest-only, you pay interest on the full amount every month for the entire term. The total interest paid on an interest-only mortgage is much higher.",
  },
];


const InterestOnlyPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const lender = slug ? getLenderBySlug(slug) : undefined;

  if (slug && !lender) return <Navigate to="/calculators/interest-only" replace />;

  const [principal, setPrincipal] = useState(250_000);
  const [rate, setRate] = useState(lender ? lender.estimatedSvr : 4.5);
  const [term, setTerm] = useState(25);

  const ioResult = useMemo(
    () => calculateRepayment({ principal, annualRate: rate, termYears: term, interestOnly: true }),
    [principal, rate, term],
  );

  const repResult = useMemo(
    () => calculateRepayment({ principal, annualRate: rate, termYears: term }),
    [principal, rate, term],
  );

  const monthlySaving = repResult.monthlyPayment - ioResult.monthlyPayment;
  const extraInterest = ioResult.totalInterest - repResult.totalInterest;

  const seoTitle = lender
    ? `${lender.name} Interest-Only Mortgage Calculator 2026 — Independent | RepayWise`
    : "Interest-Only Mortgage Calculator UK 2026 | Free, No Login | RepayWise";

  const seoDesc = lender
    ? `Free ${lender.name} interest-only mortgage calculator. See monthly payments, total interest, and how interest-only compares to repayment. No login required. Independent.`
    : "Free UK interest-only mortgage calculator. See monthly payments, compare with repayment mortgage, and understand total interest costs. No login, no email. All UK lenders covered.";

  return (
    <SiteShell>
      <SEO
        title={seoTitle}
        description={seoDesc}
        path={lender ? `/calculators/interest-only/${lender.slug}` : "/calculators/interest-only"}
        faqItems={!lender ? FAQ_ITEMS : undefined}
        lender={lender ? { name: lender.name, maxLtv: lender.maxLtv, estimatedSvr: lender.estimatedSvr, description: lender.description, trustRating: lender.trustRating } : undefined}
        calculatorType="Interest-Only Mortgage Calculator"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "https://repaywise.co.uk/" },
          { name: "Interest-Only Calculator", href: "https://repaywise.co.uk/calculators/interest-only" },
          ...(lender ? [{ name: lender.name, href: `https://repaywise.co.uk/calculators/interest-only/${lender.slug}` }] : []),
        ]}
      />

      {lender && <LenderTrustBadge lenderName={lender.name} />}

      <CalculatorShell
        eyebrow={lender ? `${lender.name} · Interest-Only` : "Mortgage Calculator"}
        title={lender ? `${lender.name} Interest-Only Calculator` : "Interest-Only Mortgage Calculator"}
        intro={
          lender
            ? `Calculate monthly interest-only payments for a ${lender.name} mortgage. Compare with repayment to see the true total cost difference.`
            : "Calculate your interest-only mortgage payments and see exactly how they compare to a repayment mortgage. Understand the real total cost over your full term."
        }
        leadCalculator="interest_only"
      >
        <div className="space-y-5">
          <CurrencyInput label="Loan amount" value={principal} onChange={setPrincipal} min={10_000} max={5_000_000} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Interest rate (%)</label>
              <input
                type="number"
                value={rate}
                min={0.1}
                max={20}
                step={0.1}
                onChange={(e) => setRate(parseFloat(e.target.value) || 4.5)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Term (years)</label>
              <input
                type="number"
                value={term}
                min={1}
                max={40}
                step={1}
                onChange={(e) => setTerm(parseInt(e.target.value) || 25)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* RESULTS COMPARISON */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Interest-Only */}
          <div className="rounded-2xl border-2 border-accent bg-accent/5 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Interest-Only</p>
            <p className="text-4xl font-bold">{formatGBP(ioResult.monthlyPayment)}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly payment</span>
                <span className="font-semibold">{formatGBP(ioResult.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total interest paid</span>
                <span className="font-semibold">{formatGBP(ioResult.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capital owed at end</span>
                <span className="font-semibold text-amber-500">{formatGBP(principal)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">True total cost</span>
                <span className="font-bold">{formatGBP(ioResult.totalInterest + principal)}</span>
              </div>
            </div>
          </div>

          {/* Repayment comparison */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Repayment (compare)</p>
            <p className="text-4xl font-bold text-muted-foreground">{formatGBP(repResult.monthlyPayment)}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly payment</span>
                <span className="font-semibold text-muted-foreground">{formatGBP(repResult.monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total interest paid</span>
                <span className="font-semibold text-muted-foreground">{formatGBP(repResult.totalInterest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capital owed at end</span>
                <span className="font-semibold text-green-500">£0</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">True total cost</span>
                <span className="font-semibold text-muted-foreground">{formatGBP(repResult.totalPaid)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KEY INSIGHT */}
        <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
          <Info className="size-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p><strong className="text-foreground">Interest-only saves {formatGBP(monthlySaving)}/month</strong> but costs <strong className="text-foreground">{formatGBP(extraInterest)} more in total interest</strong> — plus you still owe {formatGBP(principal)} at the end of the term.</p>
          </div>
        </div>

        <RelatedCalculators currentPath="/calculators/interest-only" lenderSlug={lender?.slug} />
            {!lender && <InterestOnlySEOContent />}
    </CalculatorShell>

      {/* CONTENT */}
      <article className="max-w-3xl mx-auto px-4 pb-20 mt-4 space-y-10 text-sm sm:text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">What is an interest-only mortgage?</h2>
          <p>
            An interest-only mortgage is a loan where your monthly payment covers only the interest — not the capital (the original loan amount). Unlike a repayment mortgage where each payment gradually reduces what you owe, an interest-only mortgage leaves the original debt unchanged throughout the term.
          </p>
          <p className="mt-3">
            At the end of the term — typically 25 years — you must repay the full original amount in one go. This is called the capital balloon. Most borrowers plan to repay it by selling the property, using savings or investments, or switching to a repayment mortgage before the term ends.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Interest-only vs repayment: the real cost</h2>
          <p>
            The lower monthly payment of an interest-only mortgage is appealing, but the total cost is significantly higher. With a repayment mortgage, each monthly payment reduces the outstanding balance — which means next month you pay slightly less interest. Over 25 years this compound reduction saves a substantial amount.
          </p>
          <p className="mt-3">
            With interest-only, you pay interest on the full original loan every single month for the entire term. There is no reduction. On a £250,000 mortgage at 4.5%, a repayment mortgage costs approximately £105,000 in total interest. An interest-only mortgage on the same loan costs approximately £281,000 in interest — nearly three times as much — and you still owe the £250,000 at the end.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Who can get an interest-only mortgage in the UK?</h2>
          <p>
            Interest-only residential mortgages became harder to obtain after the 2008 financial crisis following new FCA rules requiring lenders to verify a credible repayment vehicle. Today, lenders offering residential interest-only typically require a minimum income, a maximum LTV (usually 75%), and evidence of a repayment plan such as an investment portfolio, pension, or the property itself.
          </p>
          <p className="mt-3">
            Buy-to-let mortgages are commonly offered on an interest-only basis, as landlords typically plan to repay from rental income savings or a future property sale.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQ_ITEMS.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-semibold text-foreground mb-2">Compare with other calculators</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/calculators/repayment" className="text-accent text-sm hover:underline flex items-center gap-1">
              Repayment calculator <ArrowRight className="size-3" />
            </Link>
            <Link to="/calculators/overpayment" className="text-accent text-sm hover:underline flex items-center gap-1">
              Overpayment calculator <ArrowRight className="size-3" />
            </Link>
            <Link to="/calculators/affordability" className="text-accent text-sm hover:underline flex items-center gap-1">
              Affordability calculator <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted-foreground border-t border-border pt-6">
          RepayWise is independent and not affiliated with any lender or bank. Calculations use standard interest-only and amortisation formulas. Always speak to an FCA-authorised mortgage adviser before making decisions about interest-only mortgages.
          <strong> Your home may be repossessed if you do not keep up repayments on your mortgage.</strong>
        </p>
      </article>
    </SiteShell>
  );
};

export default InterestOnlyPage;
