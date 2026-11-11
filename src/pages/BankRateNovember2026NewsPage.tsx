import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const bankSource =
  "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/november-2026";
const fcaSource =
  "https://www.fca.org.uk/consumers/financial-impact-rising-costs-living/support-mortgages-interest-rates";

const BankRateNovember2026NewsPage = () => (
  <SiteShell>
    <SEO
      title="Bank Rate rises to 4%: what mortgage borrowers should check | RepayWise"
      description="The Bank of England raised Bank Rate to 4% on 5 November 2026. See what this may mean for fixed, tracker and variable mortgages, with an illustrative payment scenario."
      path="/news/bank-rate-november-2026-mortgages"
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides and news", href: "/guides" },
        { name: "November 2026 Bank Rate decision", href: "/news/bank-rate-november-2026-mortgages" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Mortgage news · UK
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Bank Rate rose to 4% in November 2026: what happens to your mortgage?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The Bank of England raised Bank Rate by 0.25 percentage points, from 3.75% to 4%,
            in its decision published on 5 November 2026. Your own mortgage payment depends on
            your deal: a Bank Rate increase is not a 0.25 percentage point increase for every borrower.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            As of 10 November 2026 · Bank of England decision published 5 November 2026
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What changed?</h2>
          <p>
            The Monetary Policy Committee voted 8–1 to raise Bank Rate to 4%. The Bank says
            policy is not on a pre-set path. Its next scheduled decision is 17 December 2026.
            This is a change to the central bank rate, not an announcement of a new rate for
            every mortgage product. Lenders set their own offers and standard variable rates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Which borrowers might see a payment change?</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Bank Rate trackers:</strong> a tracker linked to Bank Rate will normally
              move in line with it, subject to the terms of your deal, including any floor or
              timing rule. Check the lender&apos;s notice for your new rate and payment date.
            </li>
            <li>
              <strong>Standard variable and other variable rates:</strong> the lender decides
              whether and when to change its rate. Do not assume it will move by exactly 0.25
              percentage points.
            </li>
            <li>
              <strong>Existing fixed rates:</strong> the agreed rate and regular payment stay
              fixed during the deal. If your fix ends soon, compare the available replacement
              deals and fees before you move onto a follow-on rate.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A payment scenario, not a rate forecast</h2>
          <p>
            Suppose a borrower has a £200,000 repayment mortgage with 25 years remaining and
            pays 4% interest. At that assumed rate the monthly payment is about £1,056. If
            their mortgage rate rises by the full 0.25 percentage points to 4.25%, the same
            balance and remaining term give a payment of about £1,083, or roughly £28 more
            a month. The calculation assumes monthly interest and a level repayment schedule
            and no fees. It illustrates a change in the borrower&apos;s mortgage rate; it does
            not imply that a 4% mortgage is currently available or that every lender will
            pass the Bank Rate change through.
          </p>
          <p>
            Enter your actual balance, remaining term and lender-confirmed rates into the{" "}
            <Link className="text-accent underline" to="/calculators/repayment">
              repayment calculator
            </Link>{" "}
            to compare monthly payments. If your fixed deal is ending, use the{" "}
            <Link className="text-accent underline" to="/calculators/remortgage">
              remortgage calculator
            </Link>{" "}
            to explore payment changes and switching fees. Check the lender&apos;s
            offer for the full cost, including the balance left after the deal period.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What to check now</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Find your mortgage type, deal end date, outstanding balance and any early repayment charge in your offer or latest statement.</li>
            <li>If you are on a tracker or variable rate, wait for your lender&apos;s confirmed rate and effective date before changing your budget.</li>
            <li>If a higher payment would be difficult, contact your lender early. The FCA explains the support available to borrowers under financial pressure.</li>
          </ol>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Primary sources:</strong>{" "}
            <a className="text-accent underline" href={bankSource} rel="noopener noreferrer" target="_blank">
              Bank of England November 2026 Monetary Policy Summary
            </a>{" "}
            and{" "}
            <a className="text-accent underline" href={fcaSource} rel="noopener noreferrer" target="_blank">
              FCA support for mortgage borrowers facing rising costs
            </a>.
          </p>
          <p>
            General information for UK borrowers, not personal mortgage or financial advice.
            Your lender&apos;s terms determine your payment. The example is illustrative and
            excludes fees, insurance and changes to the balance or remaining term.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default BankRateNovember2026NewsPage;
