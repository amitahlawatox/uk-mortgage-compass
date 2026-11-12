import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const ukFinanceSource =
  "https://www.ukfinance.org.uk/news-and-insight/press-release/uk-finance-mortgage-arrears-and-possessions-q3-2026";
const ukFinanceData = "https://www.ukfinance.org.uk/data-and-research/data/arrears-and-possessions";
const fcaSource =
  "https://www.fca.org.uk/consumers/financial-impact-rising-costs-living/support-mortgages-interest-rates";

const MortgageArrearsQ32026NewsPage = () => (
  <SiteShell>
    <SEO
      title="Mortgage arrears fell in Q3 2026: what borrowers can do | RepayWise"
      description="UK Finance reports fewer homeowner mortgages in arrears in Q3 2026. Understand what the figures mean, when to contact your lender and how payment options can change total cost."
      path="/news/mortgage-arrears-q3-2026-borrower-support"
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides and news", href: "/guides" },
        { name: "Mortgage arrears Q3 2026", href: "/news/mortgage-arrears-q3-2026-borrower-support" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Mortgage news · UK</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Mortgage arrears fell in Q3 2026. What if your payment is becoming difficult?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            UK Finance reported 76,080 homeowner mortgages in arrears in the third quarter of
            2026, down 2% from the previous quarter and 10% from a year earlier. That is a
            snapshot of mortgages reported by UK Finance members, not a prediction for any one
            household. If your next payment
            looks difficult, you can speak to your lender before you miss it.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Published 12 November 2026 · Based on UK Finance Q3 2026 data released 12 November 2026
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What the new figures say</h2>
          <p>
            UK Finance says homeowner arrears fell for a tenth consecutive quarter. Mortgages
            in arrears represented 0.87% of outstanding homeowner mortgages in Q3. Buy-to-let
            arrears also fell, to 8,170 mortgages, down 3% on the quarter and 22% on the year.
            UK Finance&apos;s series covers first-charge mortgages provided by its members.
            These are counts of mortgage accounts, not a count of people receiving support or
            a measure of what an individual lender will decide.
          </p>
          <p>
            The possessions picture needs care too. Across homeowner and buy-to-let mortgages,
            possessions rose from 1,780 in Q2 to 1,840 in Q3, while remaining 20% below Q3
            2025. A quarterly rise and a yearly fall can both be true. The data describe
            completed outcomes in an earlier quarter; they do not tell you what will happen
            if you contact your lender today.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">If you are worried about the next payment</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Contact your lender early.</strong> Explain what has changed, the payment
              you expect to manage and whether the pressure is temporary. The FCA says lenders
              should offer support tailored to your circumstances. Simply talking to your
              lender does not affect your credit file.
            </li>
            <li>
              <strong>Ask what each option changes.</strong> The FCA describes possibilities
              such as a longer term, a temporary interest-only period or more time to make
              payments. Availability depends on your mortgage and circumstances. Ask for the
              new monthly payment, when it changes again, total cost and any credit-file effect.
            </li>
            <li>
              <strong>Keep the answer in writing.</strong> Before agreeing, check how any
              missed amount will be repaid and whether a later payment will rise. Some forms
              of support can increase total interest or affect your credit file; the lender
              should explain how the specific arrangement is reported.
            </li>
          </ol>
          <p>
            If you are already behind, tell the lender that too. Do not assume that lower
            national arrears figures remove the need to act on your own account. The FCA&apos;s
            borrower support page below is the primary source for the options described here.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How a longer term can change the maths</h2>
          <p>
            Consider an illustrative £180,000 repayment balance at a hypothetical 4.5% annual
            mortgage rate, with monthly interest and no fees. Over 20 years, the level monthly
            payment is about £1,139 and total interest about £93,305. If the same balance and
            rate were spread over 25 years, the payment would be about £1,000, roughly £138
            less each month, but total interest would be about £120,150, roughly £26,845 more.
            This comparison holds the rate unchanged for the entire term solely to isolate
            the effect of extra years; real mortgage rates and balances can change.
          </p>
          <p>
            Try your own balance, rate and remaining term in the{" "}
            <Link className="text-accent underline" to="/calculators/repayment">repayment calculator</Link>.
            Compare both the monthly amount and total cost. It is an estimate, not a lender
            offer or an eligibility assessment. If your fixed deal is ending, our{" "}
            <Link className="text-accent underline" to="/guides/fixed-rate-ending">fixed-rate ending guide</Link>{" "}
            explains how to compare a replacement deal with your lender&apos;s follow-on rate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Homeowner and buy-to-let borrowers</h2>
          <p>
            UK Finance reports homeowner and buy-to-let accounts separately. The FCA consumer
            guidance linked below concerns residential mortgage borrowers; a landlord should
            check the terms and support available on their own buy-to-let loan directly with
            the lender. Neither set of national figures is a lender-specific risk score.
          </p>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Primary sources:</strong>{" "}
            <a className="text-accent underline" href={ukFinanceSource} rel="noopener noreferrer" target="_blank">
              UK Finance Q3 2026 arrears and possessions release
            </a>,{" "}
            <a className="text-accent underline" href={ukFinanceData} rel="noopener noreferrer" target="_blank">
              UK Finance arrears series and scope
            </a>{" "}
            and{" "}
            <a className="text-accent underline" href={fcaSource} rel="noopener noreferrer" target="_blank">
              FCA mortgage borrower support guidance
            </a>.
          </p>
          <p>
            General UK information, not personal financial or debt advice. The numerical
            example is illustrative, assumes an unchanged rate throughout and excludes fees,
            charges, insurance and any existing arrears. Your lender&apos;s written terms govern
            the payment and support available to you.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default MortgageArrearsQ32026NewsPage;
