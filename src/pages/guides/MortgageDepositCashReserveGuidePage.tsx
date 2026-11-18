import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const buyerSource = "https://www.moneyhelper.org.uk/en/homes/buying-a-home/first-time-buyer-money-tips";
const costsSource = "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs";
const emergencySource = "https://www.moneyhelper.org.uk/en/savings/types-of-savings/emergency-savings-how-much-is-enough";
const affordabilitySource = "https://www.fca.org.uk/consumers/financial-impact-rising-costs-living/support-mortgages-interest-rates";

const MortgageDepositCashReserveGuidePage = () => (
  <SiteShell>
    <SEO
      title="5% or 10% Mortgage Deposit? Keep Cash for Costs | RepayWise"
      description="Compare a 5%, 10% or 20% UK mortgage deposit with the cash left for buying costs and emergencies. Worked repayment examples and a practical decision checklist."
      path="/guides/mortgage-deposit-vs-cash-reserve"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Mortgage deposit size versus cash reserve: a first-time buyer decision guide",
        description: "A UK guide to comparing deposit size, repayment estimates and cash left after buying costs.",
        url: "https://repaywise.co.uk/guides/mortgage-deposit-vs-cash-reserve",
        datePublished: "2026-11-18",
        dateModified: "2026-11-18",
        author: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
        publisher: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
      }}
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Mortgage deposit and cash reserve", href: "/guides/mortgage-deposit-vs-cash-reserve" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="mx-auto max-w-3xl space-y-9 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">UK first-time buyer guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How much deposit should you put down without draining your cash?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A larger deposit means a smaller mortgage and may open different deals. It also leaves
            less money for fees, moving and unexpected costs. Compare both sides before deciding
            whether to buy with 5%, wait for 10%, or put in more.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Information checked 18 November 2026</p>
        </header>

        <nav aria-label="On this page" className="flex flex-wrap gap-3 text-sm">
          <a className="text-accent underline" href="#deposit-example">Deposit example</a>
          <a className="text-accent underline" href="#cash-left">Cash left after buying</a>
          <a className="text-accent underline" href="#compare-offers">Compare actual offers</a>
        </nav>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Start with the mortgage you would need</h2>
          <p>
            Loan-to-value (LTV) is the mortgage divided by the property value. On a £280,000
            home, a £14,000 deposit leaves a £266,000 mortgage, or 95% LTV. MoneyHelper says
            many first-time buyers need a deposit of at least 5% or 10%; a larger deposit
            can mean more choice and potentially lower rates. That is a market tendency, not
            a promise that a particular lender will offer you a better deal.
          </p>
          <p>
            Lenders also assess affordability. The FCA says they look at income and spending
            and whether you can keep up the repayments. A larger deposit does not replace
            that check, and the amount a lender will advance depends on the product and your
            circumstances.
          </p>
        </section>

        <section id="deposit-example" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">What 5%, 10% and 20% look like on a £280,000 home</h2>
          <p>
            These are original illustrations for a repayment mortgage over 25 years at the
            same <strong>hypothetical 4.5% annual rate</strong> in every row. Interest is applied
            monthly, the payment stays level and the rate is assumed unchanged for the whole
            term. The table isolates the effect of borrowing less; it is not a current rate
            quote or a comparison of real mortgage offers.
          </p>
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[540px] text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">Deposit</th>
                  <th scope="col" className="px-4 py-3 text-right">Mortgage</th>
                  <th scope="col" className="px-4 py-3 text-right">LTV</th>
                  <th scope="col" className="px-4 py-3 text-right">Monthly payment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">5% · £14,000</th><td className="px-4 py-3 text-right">£266,000</td><td className="px-4 py-3 text-right">95%</td><td className="px-4 py-3 text-right">£1,478.51</td></tr>
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">10% · £28,000</th><td className="px-4 py-3 text-right">£252,000</td><td className="px-4 py-3 text-right">90%</td><td className="px-4 py-3 text-right">£1,400.70</td></tr>
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">20% · £56,000</th><td className="px-4 py-3 text-right">£224,000</td><td className="px-4 py-3 text-right">80%</td><td className="px-4 py-3 text-right">£1,245.06</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            At the same assumed rate, increasing the deposit from 5% to 10% uses another
            £14,000 upfront and lowers the modelled monthly payment by about £77.81. In real
            offers, rates, product fees and eligibility can differ between LTV bands, so
            the actual gap may be larger or smaller. Use the{" "}
            <Link className="text-accent underline" to="/calculators/repayment">repayment calculator</Link>{" "}
            with each quoted rate, fee and term rather than treating this table as a quote.
          </p>
        </section>

        <section id="cash-left" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Test what remains after the deposit</h2>
          <p>
            Suppose you have £40,000 available and set aside a <strong>hypothetical £6,000</strong>
            for legal fees, a survey, moving and other buying costs. A 5% deposit on the
            £280,000 home would leave £20,000. A 10% deposit would leave £6,000. A 20%
            deposit would need £56,000 before any costs, so it is outside this budget.
            The £6,000 is an illustration, not a typical cost estimate or tax calculation.
          </p>
          <p>
            If your essential outgoings after moving would be £2,000 a month, the £6,000
            left after the 10% example covers three months. MoneyHelper suggests three
            to six months of essential outgoings in accessible emergency savings as a
            rule of thumb. Your own target may differ, especially if income varies or the
            home needs work. Property tax, insurance, furnishings and any unexpected costs
            would reduce the cash left further if they are not in the £6,000 allowance.
          </p>
          <p>
            Buying taxes depend on the property location and your circumstances: SDLT
            applies in England and Northern Ireland, LBTT in Scotland and LTT in Wales.
            Check the relevant official calculator: <a className="text-accent underline" href="https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/" target="_blank" rel="noopener noreferrer">HMRC for England and Northern Ireland</a>,{" "}
            <a className="text-accent underline" href="https://revenue.scot/calculate-tax/calculate-property-transactions" target="_blank" rel="noopener noreferrer">Revenue Scotland</a>{" "}
            or <a className="text-accent underline" href="https://www.gov.wales/land-transaction-tax-calculator" target="_blank" rel="noopener noreferrer">the Welsh Revenue Authority</a>.
            Ask your conveyancer to confirm the amount before committing cash. Do not
            assume the mortgage deposit is the entire amount due at completion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A smaller deposit has its own risk</h2>
          <p>
            With a 95% LTV loan, there is less initial equity to absorb a fall in the
            property value. In the £280,000 example, a 5% fall would put the value at
            £266,000, equal to the original £266,000 mortgage before repayments or sale
            costs. This is a sensitivity example, not a forecast. Your balance should
            fall as a repayment mortgage is paid down, but a sale can involve costs and
            prices may move in either direction.
          </p>
        </section>

        <section id="compare-offers" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Compare the actual choices, not just deposit percentages</h2>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Get a realistic purchase price and confirm the lender&apos;s valuation basis.</li>
            <li>Set aside buying costs, any property tax and an accessible cash reserve before choosing the deposit.</li>
            <li>Ask which products you qualify for at each LTV and compare monthly payments, product fees and the full cost over the same deal period.</li>
            <li>Check the repayment at a higher hypothetical rate as well as the quoted rate; a fixed deal will not necessarily last the full mortgage term.</li>
            <li>Consider whether waiting to save more has costs and benefits for your own housing situation. There is no universal best percentage.</li>
          </ol>
          <p>
            When comparing fixed deals, the{" "}
            <Link className="text-accent underline" to="/guides/fixed-rate-ending">fixed-rate ending guide</Link>{" "}
            explains why fees and the rate after the deal matter. If you are unsure about
            eligibility or deposit sources, speak to a qualified mortgage adviser and
            confirm the final numbers with your lender and conveyancer.
          </p>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border glass-card p-6 sm:flex-row sm:items-center">
          <Calculator className="size-9 shrink-0 text-accent" />
          <div className="flex-1">
            <h2 className="font-semibold">Model the mortgage payment</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enter the loan, rate and term from each offer to see a repayment estimate.</p>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" to="/calculators/repayment">
            Open calculator <ArrowRight className="size-4" />
          </Link>
        </section>

        <footer className="space-y-2 rounded-2xl border p-5 text-sm text-muted-foreground">
          <p>
            <strong>Primary sources checked 18 November 2026:</strong>{" "}
            <a className="text-accent underline" href={buyerSource} target="_blank" rel="noopener noreferrer">MoneyHelper on first-time buying and LTV</a>,{" "}
            <a className="text-accent underline" href={costsSource} target="_blank" rel="noopener noreferrer">MoneyHelper on buying and moving costs</a>,{" "}
            <a className="text-accent underline" href={emergencySource} target="_blank" rel="noopener noreferrer">MoneyHelper on emergency savings</a>{" "}
            and <a className="text-accent underline" href={affordabilitySource} target="_blank" rel="noopener noreferrer">FCA on mortgage affordability checks</a>.
          </p>
          <p>
            General information for UK buyers, not personal mortgage or tax advice.
            Worked figures are hypothetical, assume a constant rate and exclude
            product fees, transaction taxes and your lender&apos;s actual terms. Confirm
            eligibility and costs before making a purchase decision.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default MortgageDepositCashReserveGuidePage;
