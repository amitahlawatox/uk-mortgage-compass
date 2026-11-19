import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const path = "/guides/interest-only-vs-repayment-mortgage";
const repaymentOptions = "https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-repayment-options";
const interestOnlyPlan = "https://www.moneyhelper.org.uk/en/homes/buying-a-home/ways-of-repaying-an-interest-only-mortgage";
const fcaSupport = "https://www.fca.org.uk/news/statements/guidance-firms-supporting-mortgage-borrowers-rising-cost-living";

const SourceLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="text-accent underline" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const InterestOnlyVsRepaymentGuidePage = () => (
  <SiteShell>
    <SEO
      title="Interest-only vs repayment mortgage: compare the real cost | RepayWise"
      description="Compare interest-only and repayment mortgages using a worked £250,000 example. Check the capital still owed, repayment plan, savings gap and questions to ask your lender."
      path={path}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Interest-only or repayment mortgage: compare the payment and the capital still owed",
        description: "A UK decision guide to mortgage repayment type, end-of-term capital and repayment plans.",
        url: `https://repaywise.co.uk${path}`,
        datePublished: "2026-11-19",
        dateModified: "2026-11-19",
        author: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
        publisher: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
      }}
    />
    <BreadcrumbJsonLd items={[
      { name: "Home", href: "/" },
      { name: "Guides", href: "/guides" },
      { name: "Interest-only versus repayment", href: path },
    ]} />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="mx-auto max-w-3xl space-y-9 leading-relaxed">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link className="hover:text-foreground" to="/">Home</Link> /{" "}
          <Link className="hover:text-foreground" to="/guides">Guides</Link> /{" "}
          <span aria-current="page">Interest-only versus repayment</span>
        </nav>
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">UK mortgage decision guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Interest-only or repayment mortgage: what will you still owe?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Interest-only can lower the monthly mortgage payment, but it does not clear the
            loan. Before comparing products, put a value and a date on the capital you must
            repay. A credible plan matters as much as an affordable payment today.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Published and sources checked 19 November 2026</p>
        </header>

        <nav aria-label="On this page" className="flex flex-wrap gap-3 text-sm">
          <a className="text-accent underline" href="#comparison">Worked comparison</a>
          <a className="text-accent underline" href="#plan">Repayment plan</a>
          <a className="text-accent underline" href="#existing">Existing interest-only loan</a>
          <a className="text-accent underline" href="#questions">Decision checklist</a>
        </nav>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">The payment covers different things</h2>
          <p>
            A capital-and-interest repayment mortgage pays down some of the loan each month
            as well as the interest. If you keep up the agreed payments and the assumptions
            in the offer hold, the mortgage is scheduled to be cleared at the end of its
            term. On an interest-only mortgage, the monthly mortgage payment covers interest;
            the original capital remains to be repaid at the end. MoneyHelper says the borrower
            needs a repayment plan for that capital and that relatively few new residential
            interest-only mortgages are offered. Availability and acceptable plans depend on
            the lender and product, so this guide is not an eligibility promise.
          </p>
          <p>
            A fixed interest rate is a separate choice from repayment type. A mortgage can
            have an introductory fixed rate that ends before the full loan term. Check the
            quoted rate, how long it lasts, the follow-on rate and any product or switching
            fees when comparing actual offers. Our <Link className="text-accent underline" to="/guides/fixed-rate-ending">fixed-rate ending guide</Link>{" "}
            covers that timing decision.
          </p>
        </section>

        <section id="comparison" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">A £250,000 comparison at a hypothetical 4.5% rate</h2>
          <p>
            Both columns model a £250,000 loan over 25 years at the <strong>same hypothetical
            4.5% annual rate</strong>, applied monthly and held unchanged for the whole term.
            Figures are rounded to the nearest pound where shown without pence. This is a
            mathematical comparison, not a current mortgage quote. It excludes product fees,
            insurance, any separate savings or investment costs, taxes, and rate changes.
          </p>
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">Measure</th>
                  <th scope="col" className="px-4 py-3 text-right">Interest-only</th>
                  <th scope="col" className="px-4 py-3 text-right">Repayment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">Monthly mortgage payment</th><td className="px-4 py-3 text-right">£937.50</td><td className="px-4 py-3 text-right">£1,389.58</td></tr>
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">Loan balance after five years</th><td className="px-4 py-3 text-right">£250,000</td><td className="px-4 py-3 text-right">About £219,645</td></tr>
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">Interest paid over 25 years</th><td className="px-4 py-3 text-right">£281,250</td><td className="px-4 py-3 text-right">About £166,874</td></tr>
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">Capital due at term end</th><td className="px-4 py-3 text-right">£250,000</td><td className="px-4 py-3 text-right">£0 if paid as scheduled</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Interest-only reduces the modelled mortgage payment by about £452.08 a month.
            But its £250,000 capital has not gone away. Over the full unchanged-rate term,
            interest-only also incurs about £114,376 more mortgage interest than repayment.
            That comparison excludes any return or cost from a separate capital plan.
          </p>
          <p>
            If the borrower simply set aside the £452.08 monthly difference in an account
            earning <strong>zero</strong> interest for 300 months, they would accumulate
            £135,624, leaving roughly £114,376 of the £250,000 capital still unfunded. This
            is a deliberately simple stress test, not a savings recommendation: investment
            returns can rise or fall, charges and tax may apply, and a lender may not accept
            a proposed strategy. Use the <Link className="text-accent underline" to="/calculators/interest-only">interest-only calculator</Link>{" "}
            with your actual loan and rate, then test the separate capital plan in its own right.
          </p>
        </section>

        <section id="plan" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Make the end-of-term plan testable</h2>
          <p>
            MoneyHelper says you must be able to show the lender how you will repay the
            original loan. Savings, investments or other assets may form part of a plan, but
            the lender decides what is acceptable. A hoped-for inheritance, bonus or future
            house-price rise is not a dependable substitute for a credible strategy.
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li><strong>Write down the target:</strong> the capital due and the date it becomes payable. Include any part of the mortgage that is interest-only.</li>
            <li><strong>Identify the asset:</strong> note its current value, contributions, access restrictions and any tax or selling costs. If it is an investment, test a weak-return outcome rather than one growth forecast.</li>
            <li><strong>Check the gap:</strong> compare a cautious value at the term end with the amount owed. Do not count the same asset twice for retirement and mortgage repayment without considering both needs.</li>
            <li><strong>Review regularly:</strong> update the plan after rate, income, market or family changes. Ask your lender what evidence it expects and whether overpayments or a partial switch to repayment are permitted.</li>
          </ol>
          <p>
            Selling the home may be a possible strategy in some circumstances, but the sale
            price and costs are uncertain, and you would still need somewhere to live. Ask
            the lender and an adviser to assess whether that plan is acceptable and realistic
            for your housing needs. MoneyHelper warns against assuming future property price
            growth will solve a shortfall.
          </p>
        </section>

        <section id="existing" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Already on interest-only and worried about a shortfall?</h2>
          <p>
            Contact your lender early rather than waiting for the term end. Ask for your
            current balance, maturity date, repayment-plan evidence on file and the options
            available for your circumstances. MoneyHelper suggests checking savings and
            investments, asking about overpayments or moving part of the balance onto
            repayment, and checking fees before changing the mortgage. A new lender may
            assess affordability and scrutinise the repayment plan if you remortgage.
          </p>
          <p>
            Temporary interest-only payments used as mortgage support are a different
            decision from taking a full-term interest-only loan. The FCA says lenders should
            explain the implications of a payment change and consider a credible way to
            repay capital. If payments are becoming difficult, speak to the lender promptly
            and get independent debt or mortgage advice. A temporary lower payment can
            leave a larger balance or higher later payments.
          </p>
        </section>

        <section id="questions" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Questions to ask before choosing</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>How much of the loan is interest-only, and what exact amount must be repaid at the end?</li>
            <li>Which repayment vehicles will this lender accept, and what evidence or periodic reviews will it require?</li>
            <li>What is the total mortgage interest under each option at the same assumed rate and term, including product fees?</li>
            <li>Could you still afford the payment and capital-plan contributions if your rate rises after an initial deal?</li>
            <li>What are the early repayment charges, overpayment limits and costs of switching part or all of the balance to repayment?</li>
          </ul>
          <p>
            There is no universal best type. Repayment gives a scheduled path to clear
            capital; interest-only needs a separate and credible route to the same end.
            Compare lender terms and discuss the plan with a qualified mortgage adviser
            before making a commitment.
          </p>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border glass-card p-6 sm:flex-row sm:items-center">
          <Calculator className="size-9 shrink-0 text-accent" />
          <div className="flex-1">
            <h2 className="font-semibold">Compare the mortgage payments</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enter the loan, rate and term from a real offer, then check the capital plan separately.</p>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" to="/calculators/interest-only">
            Open calculator <ArrowRight className="size-4" />
          </Link>
        </section>

        <footer className="space-y-2 rounded-2xl border p-5 text-sm text-muted-foreground">
          <p>
            <strong>Primary sources checked 19 November 2026:</strong>{" "}
            <SourceLink href={repaymentOptions}>MoneyHelper on repayment types</SourceLink>,{" "}
            <SourceLink href={interestOnlyPlan}>MoneyHelper on interest-only repayment plans</SourceLink>{" "}
            and <SourceLink href={fcaSupport}>FCA guidance on mortgage payment changes</SourceLink>.
          </p>
          <p>
            General UK information, not personal mortgage, investment or tax advice. The
            worked example assumes the same hypothetical rate for 25 years; real rates,
            fees, investment outcomes, lender criteria and repayment dates can differ.
            Confirm the mortgage offer and any capital strategy with your lender and an
            appropriately qualified adviser.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default InterestOnlyVsRepaymentGuidePage;
