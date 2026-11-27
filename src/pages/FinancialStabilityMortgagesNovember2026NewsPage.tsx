import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const bankReport = "https://www.bankofengland.co.uk/financial-stability-report/2026/november-2026";
const fcaSupport =
  "https://www.fca.org.uk/consumers/financial-impact-rising-costs-living/support-mortgages-interest-rates";

const FinancialStabilityMortgagesNovember2026NewsPage = () => (
  <SiteShell>
    <SEO
      title="Mortgage renewals: what the Bank's November 2026 report means | RepayWise"
      description="The Bank of England expects more fixed-deal borrowers to face higher payments. See the scope of its forecast and a worked mortgage payment comparison."
      path="/news/mortgage-renewals-financial-stability-november-2026"
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides and news", href: "/guides" },
        {
          name: "November 2026 mortgage renewal outlook",
          href: "/news/mortgage-renewals-financial-stability-november-2026",
        },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Mortgage news · UK</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            More mortgage renewals may cost more: how to plan your next payment
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The Bank of England&apos;s November 2026 Financial Stability Report projects that more
            owner-occupier borrowers will see their payments rise when they refinance. That is a
            market-wide projection, not a forecast for your mortgage. The useful question is what
            your own balance, remaining term and replacement offer would do to your payment.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Published 27 November 2026 · Source report published 26 November 2026 · Figures as at that report
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What the Bank actually projected</h2>
          <p>
            The Bank estimates that, of roughly 9 million outstanding owner-occupier mortgages,
            around 7 million will refinance between June 2026 and December 2029. Based on the
            rates and information used in the November report, it projects payment increases for
            around 6.5 million of them and decreases for around 350,000. The Bank&apos;s median
            projected increase for a typical owner-occupier rolling off a fixed deal over the
            next three years is around £100 per month. It says that is below the median increase
            of just under £200 experienced by borrowers refinancing in 2023 and 2024.
          </p>
          <p>
            These are estimates across many households. They do not say your payment will rise
            by £100, that any particular rate is available to you, or that everyone whose fix
            ends will pay more. The Bank also says just over one million households on mortgage
            rates below 3% are due to refinance by the end of 2027, a group that may face a
            larger change. The figures exclude buy-to-let mortgages and some mortgages held
            outside authorised lenders&apos; balance sheets.
          </p>
          <p>
            Read the Bank&apos;s{" "}
            <a className="text-accent underline" href={bankReport} target="_blank" rel="noopener noreferrer">
              Financial Stability Report
            </a>{" "}
            for its assumptions, scope and the wider economic context. Projections can change
            as market rates and household circumstances change.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A worked payment comparison</h2>
          <p>
            Suppose, purely as an illustration, you have a £200,000 repayment balance and 25
            years remaining. At a hypothetical 3% annual rate, a level monthly payment is
            £948.42. At a hypothetical 5% annual rate on the <em>same</em> balance and term, it
            is £1,169.18: £220.76 more per month. This uses monthly interest and 300 equal
            payments, holding each rate constant for all 25 years only to isolate the rate
            difference. It excludes product fees, early repayment charges, insurance and any
            changes to your balance or term.
          </p>
          <p>
            The £220.76 illustration is deliberately separate from the Bank&apos;s £100 median
            projection. They have different inputs and answer different questions; neither is
            a quote for a current mortgage product.
          </p>
          <p>
            Enter your actual outstanding balance and remaining term in the{" "}
            <Link className="text-accent underline" to="/calculators/repayment">repayment calculator</Link>.
            Compare the payment under your present rate, your lender&apos;s follow-on rate and
            each written replacement offer. If you are weighing a product transfer against a
            new lender, the{" "}
            <Link className="text-accent underline" to="/calculators/remortgage">remortgage comparison</Link>{" "}
            helps you include fees in the comparison. It does not determine eligibility or
            replace a lender&apos;s illustration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Three checks before your deal ends</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Confirm the dates and balance.</strong> Find when your current deal ends,
              the balance you expect then, the remaining mortgage term and any early repayment
              charge. A comparison based on your original loan amount can mislead.
            </li>
            <li>
              <strong>Compare the whole offer.</strong> Request written illustrations for a
              product transfer and alternatives you can access. Check product fees, how any
              fee is paid, the introductory period, the follow-on rate and the total amount
              payable. A lower headline rate need not mean a lower overall cost.
            </li>
            <li>
              <strong>Stress-test your monthly budget.</strong> Model a payment above your
              preferred offer as well as the offered payment, and keep room for essential
              costs. Our{" "}
              <Link className="text-accent underline" to="/guides/fixed-rate-ending">fixed-rate ending guide</Link>{" "}
              provides a fuller decision timeline.
            </li>
          </ol>
          <p>
            If an upcoming payment may be unaffordable, contact your lender early rather than
            waiting to miss it. The{" "}
            <a className="text-accent underline" href={fcaSupport} target="_blank" rel="noopener noreferrer">
              FCA explains support options for residential mortgage borrowers
            </a>.
            Options depend on your circumstances and can affect total cost; ask the lender to
            explain the consequences in writing.
          </p>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Primary sources:</strong>{" "}
            <a className="text-accent underline" href={bankReport} target="_blank" rel="noopener noreferrer">
              Bank of England Financial Stability Report, 26 November 2026
            </a>{" "}
            and{" "}
            <a className="text-accent underline" href={fcaSupport} target="_blank" rel="noopener noreferrer">
              FCA mortgage support guidance
            </a>.
          </p>
          <p>
            UK general information, not personal financial advice. The worked comparison is
            hypothetical, independently recalculated and does not imply that either rate is
            currently offered. Your own lender&apos;s terms, fees and circumstances determine
            the actual payment and options available.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default FinancialStabilityMortgagesNovember2026NewsPage;
