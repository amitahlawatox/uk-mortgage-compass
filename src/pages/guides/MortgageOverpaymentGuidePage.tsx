import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { trackIntentClick } from "@/lib/analytics";

const overpaymentSource =
  "https://www.moneyhelper.org.uk/en/homes/buying-a-home/should-you-pay-off-your-mortgage-early";
const mortgageTermsSource =
  "https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-interest-rate-options";
const ltvSource =
  "https://www.moneyhelper.org.uk/en/homes/buying-a-home/remortgaging-to-cut-costs";
const isaSource = "https://www.gov.uk/individual-savings-accounts";
const isaWithdrawalSource = "https://www.gov.uk/individual-savings-accounts/withdrawing-your-money";
const savingsTaxSource = "https://www.gov.uk/apply-tax-free-interest-on-savings";

const MortgageOverpaymentGuidePage = () => (
  <SiteShell>
    <SEO
      title="Mortgage Overpayment Guide UK | RepayWise"
      description="Work out what mortgage overpayments could save, check your lender's charges and compare overpaying with keeping money in a cash ISA."
      path="/guides/mortgage-overpayment-guide"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Mortgage overpayments: what you save and what to check first",
        description: "A UK decision guide to mortgage overpayments, lender charges and cash ISA alternatives.",
        url: "https://repaywise.co.uk/guides/mortgage-overpayment-guide",
        datePublished: "2026-04-30",
        dateModified: "2026-11-13",
        author: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
        publisher: { "@type": "Organization", name: "RepayWise", url: "https://repaywise.co.uk" },
      }}
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Mortgage overpayments", href: "/guides/mortgage-overpayment-guide" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-9 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">UK mortgage guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Mortgage overpayments: what you save and what to check first
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Paying more than your required mortgage payment can reduce interest and shorten
            the time you owe money. The right amount depends on your lender&apos;s rules, your
            cash reserve, the rate you actually pay and what accessible savings could earn.
            This guide shows how to test those tradeoffs without assuming today&apos;s market rates.
          </p>
          <div className="mt-4"><LastUpdated date="13 November 2026" /></div>
        </header>

        <nav aria-label="On this page" className="flex flex-wrap gap-3 text-sm">
          <a className="text-accent underline" href="#worked-example">Worked example</a>
          <a className="text-accent underline" href="#overpayment-charges">Check charges</a>
          <a className="text-accent underline" href="#isa-or-overpay">Cash ISA comparison</a>
        </nav>

        <section className="rounded-2xl border glass-card p-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Calculator className="size-9 shrink-0 text-accent" />
          <div className="flex-1">
            <h2 className="font-semibold">Start with your own mortgage figures</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Model your balance, rate, remaining term and regular or one-off overpayment.
              The result is an estimate; your lender&apos;s calculation and charges may differ.
            </p>
          </div>
          <Link
            to="/calculators/overpayment"
            onClick={() => trackIntentClick("overpayment_guide", "/calculators/overpayment", "open_calculator")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:ring-2 ring-accent"
          >
            Open calculator <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What changes when you overpay?</h2>
          <p>
            An overpayment is money paid in addition to the amount your mortgage contract
            requires. It reduces the outstanding balance. With a lower balance, less interest
            accrues under the same rate and schedule. Lenders differ in how they apply a lump
            sum: some recalculate the required monthly payment, while others can keep it level
            and reduce the remaining term. Ask your lender which outcome will apply before
            comparing savings estimates.
          </p>
          <p>
            MoneyHelper explains that overpayments can save interest, but an early repayment
            charge may reduce the benefit. An overpayment also uses cash you may need later.
            Access to previously overpaid money is a product feature, not something to assume.
          </p>
        </section>

        <section id="worked-example" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">A worked monthly overpayment example</h2>
          <p>
            Suppose a repayment mortgage has a £200,000 balance, 25 years remaining and a
            hypothetical 4.5% annual rate. With monthly interest and a level payment, the
            scheduled payment is about £1,111.66. If the borrower keeps that payment and adds
            £100 every month, our independent amortisation example gives:
          </p>
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left">Scenario</th>
                  <th className="px-4 py-3 text-right">Time to repay</th>
                  <th className="px-4 py-3 text-right">Total interest</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="px-4 py-3">Required payment only</td><td className="px-4 py-3 text-right">25 years</td><td className="px-4 py-3 text-right">About £133,499</td></tr>
                <tr><td className="px-4 py-3">£100 extra each month</td><td className="px-4 py-3 text-right">About 21 years 6 months</td><td className="px-4 py-3 text-right">About £112,358</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            That is roughly £21,142 less interest and 3 years 6 months earlier repayment in
            this model. It assumes the 4.5% rate stays unchanged for the entire term, payments
            remain level, interest is charged monthly and there are no fees or early repayment
            charges. Real mortgages can change rate and lenders can calculate interest or
            recast payments differently. The 4.5% rate is hypothetical, not a current offer.
          </p>
          <p>
            Use the <Link className="text-accent underline" to="/calculators/overpayment">overpayment calculator</Link>{" "}
            with your actual terms, then confirm the result and any charge with your lender.
          </p>
        </section>

        <section id="overpayment-charges" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Check the charge before sending money</h2>
          <p>
            Many mortgages permit some extra payment without an early repayment charge, but
            the allowance and charge depend on the product. MoneyHelper says a limit is often
            10% of the mortgage; that is a common example, not a rule for your deal. Check
            your offer or ask your lender:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>How much can I overpay without a charge during this allowance period?</li>
            <li>When does the period reset, and is the percentage based on the original or current balance?</li>
            <li>Will the overpayment shorten my term or reduce my required monthly payment?</li>
            <li>Is there a charge or another condition if I make a lump sum or switch deals soon?</li>
          </ul>
          <p>
            A tracker, standard variable, fixed or offset mortgage can each have different
            terms. Do not assume a product type alone guarantees unrestricted overpayments.
            If your fixed deal ends soon, compare any charge with waiting until the deal ends;
            our <Link className="text-accent underline" to="/guides/fixed-rate-ending">fixed-rate ending guide</Link>{" "}
            covers the timing of your next mortgage decision.
          </p>
        </section>

        <section id="isa-or-overpay" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Cash ISA or mortgage overpayment?</h2>
          <p>
            Compare the interest you could avoid on your mortgage with the interest you could
            earn on an accessible cash ISA, then account for charges and how much cash you need
            available. Mortgage interest avoided is a saving on a debt, not investment income.
            GOV.UK says ISA savings are tax-free. Interest outside an ISA may also be tax-free
            within your Personal Savings Allowance, which depends on your tax position.
          </p>
          <p>
            For a one-year illustration, use the £200,000 mortgage above and suppose you have
            £5,000 available immediately. Keeping the scheduled mortgage payment level, a
            £5,000 overpayment at the start would avoid about £230 of mortgage interest over
            the next 12 months at the assumed 4.5% rate. A hypothetical cash ISA paying 3.5%
            AER for a full year would earn £175 on £5,000. The overpayment is about £55 ahead
            on this narrow interest comparison, before any mortgage charge. Neither rate is a
            claim about a product available today. Future rates, fees and the ability to access
            your money can change the choice.
          </p>
          <p>
            MoneyHelper recommends keeping enough accessible savings to cover at least three
            months before paying off a mortgage early. A cash ISA&apos;s withdrawal terms vary:
            GOV.UK says you can normally withdraw, but your provider may have conditions or
            charges, and only a flexible ISA lets you replace withdrawn cash in the same tax
            year without using more of that year&apos;s allowance. A stocks and shares ISA
            carries investment risk and is a different comparison from a cash ISA.
          </p>
          <p>
            A split decision can be reasonable: retain cash for expected costs and emergencies,
            then consider an overpayment within the confirmed charge-free allowance. If you
            have other expensive debt or pension benefits, compare those separately rather
            than assuming the mortgage is always the best use of spare money.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Could an overpayment improve your loan-to-value?</h2>
          <p>
            Loan-to-value (LTV) is your mortgage balance divided by the lender&apos;s property
            valuation. For example, £202,500 divided by £250,000 is 81%. A £5,000 reduction
            in the balance, with the valuation unchanged, makes it 79%. If a lender offers a
            relevant 80% LTV product band, crossing that threshold might open different deals.
            It does not guarantee a lower rate: valuation, fees, eligibility and product
            availability matter. MoneyHelper explains how a lower LTV can help when comparing
            remortgage deals.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A practical order for your decision</h2>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Keep enough accessible cash for emergencies and costs you expect soon.</li>
            <li>Check your mortgage statement for the balance, rate, remaining term and deal end date.</li>
            <li>Ask the lender for your exact charge-free allowance, any charge and how payments will be applied.</li>
            <li>Model an affordable monthly amount or lump sum in the overpayment calculator.</li>
            <li>Compare the interest saved with a cash ISA or other savings after relevant tax, keeping access to cash in mind.</li>
            <li>Review the choice when your rate, savings return or circumstances change.</li>
          </ol>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p><strong>Sources checked 13 November 2026:</strong>{" "}
            <a className="text-accent underline" href={overpaymentSource} target="_blank" rel="noopener noreferrer">MoneyHelper on paying off a mortgage early</a>,{" "}
            <a className="text-accent underline" href={mortgageTermsSource} target="_blank" rel="noopener noreferrer">MoneyHelper on mortgage features and charges</a>,{" "}
            <a className="text-accent underline" href={ltvSource} target="_blank" rel="noopener noreferrer">MoneyHelper on LTV and remortgaging</a>,{" "}
            <a className="text-accent underline" href={isaSource} target="_blank" rel="noopener noreferrer">GOV.UK ISA rules</a>,{" "}
            <a className="text-accent underline" href={isaWithdrawalSource} target="_blank" rel="noopener noreferrer">GOV.UK ISA withdrawal rules</a>{" "}
            and <a className="text-accent underline" href={savingsTaxSource} target="_blank" rel="noopener noreferrer">GOV.UK tax on savings interest</a>.
          </p>
          <p>
            General information for UK borrowers, not personal mortgage, tax or investment
            advice. Examples are hypothetical and exclude charges, fees, changing rates and
            your lender&apos;s specific calculation method. Check your contract and current
            product terms before making an overpayment.
          </p>
        </footer>

        <RelatedCalculators currentPath="/guides/mortgage-overpayment-guide" />
      </div>
    </article>
  </SiteShell>
);

export default MortgageOverpaymentGuidePage;
