import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const path = "/guides/borrow-for-home-improvements";
const furtherAdvance = "https://www.moneyhelper.org.uk/en/homes/buying-a-home/increasing-your-mortgage-getting-a-further-advance";
const secondCharge = "https://www.moneyhelper.org.uk/en/homes/buying-a-home/second-charge-or-second-mortgages";
const securedBorrowing = "https://www.moneyhelper.org.uk/en/everyday-money/credit/secured-and-unsecured-borrowing-explained";
const fcaReview = "https://www.fca.org.uk/publications/good-and-poor-practice/second-charge-mortgages-improving-outcomes-consumers";

const SourceLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="text-accent underline" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const HomeImprovementBorrowingGuidePage = () => (
  <SiteShell>
    <SEO
      title="Borrowing for home improvements: compare four routes | RepayWise"
      description="Compare a further advance, remortgage, second charge and personal loan for UK home improvements. Model the term and total interest, then check fees and the risk to your home."
      path={path}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Borrowing for home improvements: compare the cost and risk",
        description: "A UK decision guide to funding home improvements with a further advance, remortgage, second charge or unsecured loan.",
        url: `https://repaywise.co.uk${path}`,
        datePublished: "2026-11-24",
        dateModified: "2026-11-24",
        author: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
        publisher: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
      }}
    />
    <BreadcrumbJsonLd items={[
      { name: "Home", href: "/" },
      { name: "Guides", href: "/guides" },
      { name: "Borrowing for home improvements", href: path },
    ]} />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="mx-auto max-w-3xl space-y-9 leading-relaxed">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link className="hover:text-foreground" to="/">Home</Link> /{" "}
          <Link className="hover:text-foreground" to="/guides">Guides</Link> /{" "}
          <span aria-current="page">Borrowing for home improvements</span>
        </nav>
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">UK mortgage decision guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Borrowing for home improvements: compare the cost and risk
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A lower monthly payment can hide a longer debt and more interest. Before choosing
            how to pay for a renovation, compare the extra borrowing on its own, the effect on
            your existing mortgage, every fee and what happens if you cannot keep up payments.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Published and sources checked 24 November 2026</p>
        </header>

        <nav aria-label="On this page" className="flex flex-wrap gap-3 text-sm">
          <a className="text-accent underline" href="#routes">Four routes</a>
          <a className="text-accent underline" href="#example">Worked example</a>
          <a className="text-accent underline" href="#quotes">Compare quotes</a>
          <a className="text-accent underline" href="#questions">Questions to ask</a>
        </nav>

        <section className="rounded-2xl border glass-card p-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Calculator className="size-9 shrink-0 text-accent" />
          <div className="flex-1">
            <h2 className="font-semibold">Model a loan against adding to the mortgage</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter a personal-loan rate and term alongside the existing mortgage balance,
              rate and term. The comparison assumes the extra mortgage borrowing has the same
              rate and term as the existing balance. It excludes fees, rate changes, eligibility
              and separate further-advance or second-charge terms.
            </p>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" to="/calculators/home-improvement">
            Open comparison <ArrowRight className="size-4" />
          </Link>
        </section>

        <section id="routes" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Four routes that solve different problems</h2>
          <p>
            Paying from savings avoids a new loan, but only if enough accessible cash remains
            for emergencies and the project&apos;s likely overruns. If borrowing is needed,
            compare these routes using written, personalised terms. Availability depends on
            affordability, equity and the lender&apos;s criteria.
          </p>
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-secondary/50"><tr>
                <th className="px-4 py-3 text-left">Route</th>
                <th className="px-4 py-3 text-left">What changes</th>
                <th className="px-4 py-3 text-left">Cost or risk to check</th>
              </tr></thead>
              <tbody className="divide-y">
                <tr><td className="px-4 py-3 font-medium">Further advance</td><td className="px-4 py-3">More borrowing from your current mortgage lender, often on a separate rate.</td><td className="px-4 py-3">Extra debt is linked to your home; ask for its own rate, term, fees and payment.</td></tr>
                <tr><td className="px-4 py-3 font-medium">Full remortgage</td><td className="px-4 py-3">A new mortgage replaces the existing one and may include the project amount.</td><td className="px-4 py-3">Compare the cost on the whole balance, plus exit charges, legal and product fees.</td></tr>
                <tr><td className="px-4 py-3 font-medium">Second charge</td><td className="px-4 py-3">Another lender lends against your home without replacing the first mortgage.</td><td className="px-4 py-3">Two secured loans remain; check fees, total repayment and both lenders&apos; terms.</td></tr>
                <tr><td className="px-4 py-3 font-medium">Unsecured personal loan</td><td className="px-4 py-3">A separate loan does not use your home as security.</td><td className="px-4 py-3">Check the actual APR, term, total repayment and whether the payment fits your budget.</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            MoneyHelper describes a <SourceLink href={furtherAdvance}>further advance</SourceLink> as
            extra borrowing from the current lender, usually at a rate different from the main
            mortgage. Its <SourceLink href={secondCharge}>second mortgage guide</SourceLink> explains
            that a second charge leaves the first mortgage in place. An unsecured loan has
            different recovery risks, but missed payments can still have serious consequences;
            see MoneyHelper&apos;s <SourceLink href={securedBorrowing}>secured and unsecured borrowing guide</SourceLink>.
          </p>
        </section>

        <section id="example" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Worked example: the repayment term can dominate</h2>
          <p>
            Suppose you borrow £20,000 at a hypothetical constant 6% annual interest rate,
            charged monthly, with level monthly payments and no fees. Holding the rate and
            loan amount equal isolates the effect of the term; these are not available offers
            or a comparison of secured and unsecured market rates.
          </p>
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[460px] text-sm">
              <thead className="bg-secondary/50"><tr>
                <th className="px-4 py-3 text-left">Term</th>
                <th className="px-4 py-3 text-right">Monthly payment</th>
                <th className="px-4 py-3 text-right">Interest over full term</th>
              </tr></thead>
              <tbody className="divide-y">
                <tr><td className="px-4 py-3">5 years</td><td className="px-4 py-3 text-right">About £386.66</td><td className="px-4 py-3 text-right">About £3,199</td></tr>
                <tr><td className="px-4 py-3">20 years</td><td className="px-4 py-3 text-right">About £143.29</td><td className="px-4 py-3 text-right">About £14,389</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The 20-year payment is about £243 lower each month, but the model adds about
            £11,189 more interest over the full term. It assumes the rate never changes and
            excludes fees, early repayment charges and the effect of changing your existing
            mortgage. Real offers may use different rates and terms. Test the extra borrowing
            with your actual quotes in the <Link className="text-accent underline" to="/calculators/home-improvement">home-improvement comparison</Link>,
            then use the lender&apos;s written illustration for costs the calculator leaves out.
          </p>
        </section>

        <section id="quotes" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Compare like with like before accepting an offer</h2>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Set a project budget and the amount you genuinely need to borrow; allow for a realistic overrun without automatically borrowing more.</li>
            <li>Get the rate, term, payment, total amount repayable, upfront fees and any fees added to the loan for each offer.</li>
            <li>For a remortgage, compare the whole existing balance as well as the new borrowing. Include any early repayment charge and switching costs.</li>
            <li>Check when a fixed or introductory rate ends, what rate follows and whether you could afford a higher payment.</li>
            <li>Ask what happens if you sell, repay early or want to refinance. A second charge may need repaying when the property is sold.</li>
            <li>Compare the cost over a period you expect to keep the borrowing, then the balance still owed at that point. Also inspect the full-term cost.</li>
          </ol>
          <p>
            The FCA&apos;s <SourceLink href={fcaReview}>2026 second charge review</SourceLink> found
            cases where people seeking home-improvement finance were steered toward larger,
            longer loans that included debt consolidation. It is reasonable to ask why any
            proposed loan is larger than your project need and to request a clear comparison
            with alternatives before signing. That finding does not mean every second charge
            is unsuitable.
          </p>
        </section>

        <section id="questions" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Take these questions to your lender or adviser</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Can my current lender quote a further advance without changing the rate on my existing balance?</li>
            <li>If I remortgage, what happens to my current deal and what would I pay to leave it?</li>
            <li>Is each proposed loan secured on my home, and what are the consequences of missed payments?</li>
            <li>What will the extra borrowing cost and what balance will remain after five years?</li>
            <li>Which fees are paid now and which are financed, so interest is charged on them?</li>
          </ul>
          <p>
            If you are already struggling with payments, tell the lender or a qualified debt
            adviser before adding borrowing. This page is general information, not a finding
            that any product is suitable for your circumstances.
          </p>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p><strong>Primary sources checked 24 November 2026:</strong>{" "}
            <SourceLink href={furtherAdvance}>MoneyHelper on further advances</SourceLink>,{" "}
            <SourceLink href={secondCharge}>MoneyHelper on second mortgages</SourceLink>,{" "}
            <SourceLink href={securedBorrowing}>MoneyHelper on secured and unsecured borrowing</SourceLink>{" "}
            and <SourceLink href={fcaReview}>FCA second charge review</SourceLink>.
          </p>
          <p>
            UK general information. The worked figures are independently calculated,
            illustrative estimates, not quotes or a recommendation. Mortgage and loan
            offers, affordability checks and fees depend on the lender and your circumstances.
            Your home may be repossessed if you do not keep up repayments on a loan secured on it.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default HomeImprovementBorrowingGuidePage;
