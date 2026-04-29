import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Building2, Calculator, CircleHelp, TrendingDown, Wallet } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { LenderContextCard } from "@/components/lenders/LenderContextCard";
import { buildLenderGuidePath, buildLenderPath, getLenderBySlug } from "@/lib/uk/lenders";

const LenderGuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const lender = slug ? getLenderBySlug(slug) : undefined;

  if (!lender) {
    return <Navigate to="/guides" replace />;
  }

  const overpaymentPath = buildLenderPath("overpayment", lender.slug);
  const repaymentPath = buildLenderPath("repayment", lender.slug);
  const maxBorrowingPath = buildLenderPath("max-borrowing", lender.slug);

  return (
    <SiteShell>
      <SEO
        title={`${lender.name} Mortgage Guide 2026 | RepayWise`}
        description={`Planning a ${lender.name} mortgage in 2026? Compare indicative SVR, max LTV, overpayment strategy, repayment modelling, and borrowing power in one place.`}
        path={buildLenderGuidePath(lender.slug)}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: `${lender.name} mortgage guide`,
              url: `https://repaywise.co.uk${buildLenderGuidePath(lender.slug)}`,
              description: `RepayWise guide to planning a ${lender.name} mortgage with repayment, overpayment, and borrowing calculators.`,
            },
            {
              "@type": "FinancialService",
              name: lender.name,
              areaServed: "GB",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: lender.trustRating.toFixed(1),
                bestRating: "5",
                ratingCount: "1",
              },
            },
          ],
        }}
      />

      <article className="px-4 pt-16 pb-24 sm:pt-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">Lender Guide</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {lender.name} mortgage planning, without the guesswork
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-[68ch] leading-relaxed">
            Use this page as a planning layer around our calculators. We pair {lender.name}'s indicative SVR,
            typical maximum loan-to-value band, and lender category with repayment, overpayment, and borrowing
            models so you can pressure-test a decision before you speak to an adviser or product team.
          </p>

          <LenderContextCard
            lender={lender}
            title={`What to watch with ${lender.name}`}
            body={`If you are comparing deals or preparing for a remortgage, ${lender.name}'s indicative standard variable rate of ${lender.estimatedSvr.toFixed(2)}% is a useful stress-test anchor. We also use the published ${lender.maxLtv}% maximum LTV band as a quick sense-check for deposit planning and borrowing conversations.`}
            links={[
              { to: repaymentPath, label: `${lender.name} repayment calculator` },
              { to: overpaymentPath, label: `${lender.name} overpayment calculator` },
              { to: maxBorrowingPath, label: `${lender.name} borrowing calculator` },
            ]}
            className="mt-8"
          />

          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <Card
              icon={Calculator}
              title="Repayment planning"
              text={`Model monthly payments at ${lender.name}'s indicative ${lender.estimatedSvr.toFixed(2)}% SVR so you can see the payment range before you commit to a product transfer or remortgage.`}
              to={repaymentPath}
              cta="Open repayment model"
            />
            <Card
              icon={TrendingDown}
              title="Overpayment strategy"
              text={`See how regular or one-off overpayments could reduce interest if you are already with ${lender.name} or comparing whether staying put beats refinancing.`}
              to={overpaymentPath}
              cta="Open overpayment model"
            />
            <Card
              icon={Wallet}
              title="Borrowing power"
              text={`Use ${lender.name}'s max LTV band and a lender-style stress test to sense-check how much you could target before fees, valuation, or underwriting caveats.`}
              to={maxBorrowingPath}
              cta="Open borrowing model"
            />
          </section>

          <section className="mt-12 rounded-3xl border glass-card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <CircleHelp className="size-4 text-accent" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent">How to use this page</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Step
                number="1"
                title="Stress-test the payment"
                body={`Start with the repayment calculator so you can compare today's deal against a fallback around ${lender.estimatedSvr.toFixed(2)}%.`}
              />
              <Step
                number="2"
                title="Check the overpayment trade-off"
                body={`If you already hold a ${lender.name} mortgage, use the overpayment calculator to see whether spare cash is better used reducing interest or staying liquid.`}
              />
              <Step
                number="3"
                title="Sense-check affordability"
                body={`Finish with the borrowing calculator to see whether income, deposit, and lender-style stress tests still line up with the price bracket you want.`}
              />
            </div>
          </section>

          <section className="mt-12 rounded-3xl border border-border bg-card-muted p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="size-4 text-accent" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent">Important note</p>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[68ch]">
              RepayWise is not a lender or broker, and these pages are not product recommendations. They are
              decision-support tools built around indicative public-market assumptions. Final rates, maximum LTV,
              and overpayment rules depend on product, credit profile, property type, and the lender's current
              underwriting policy.
            </p>
            <div className="mt-5">
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
              >
                Back to guides hub <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </div>
      </article>
    </SiteShell>
  );
};

const Card = ({
  icon: Icon,
  title,
  text,
  to,
  cta,
}: {
  icon: typeof Calculator;
  title: string;
  text: string;
  to: string;
  cta: string;
}) => (
  <Link to={to} className="rounded-3xl border glass-card p-6 hover:border-foreground transition-colors">
    <Icon className="size-5 text-accent mb-4" />
    <h2 className="text-xl font-bold tracking-tight">{title}</h2>
    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p>
    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
      {cta} <ArrowRight className="size-4" />
    </span>
  </Link>
);

const Step = ({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) => (
  <div className="rounded-2xl border border-border bg-background/80 p-5">
    <p className="text-[11px] font-bold uppercase tracking-widest text-accent">Step {number}</p>
    <h2 className="mt-2 text-lg font-bold tracking-tight">{title}</h2>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
  </div>
);

export default LenderGuidePage;
