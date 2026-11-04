import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const hmrcSource =
  "https://www.gov.uk/government/publications/income-tax-changes-to-tax-rates-for-property-and-savings-income/income-tax-changes-to-tax-rates-for-property-and-savings-income";
const budgetSource = "https://www.gov.uk/government/publications/budget-2026-document/budget-2026-html";

const PropertyIncomeTaxNewsPage = () => (
  <SiteShell>
    <SEO
      title="Property income tax changes from April 2027: what landlords should check | RepayWise"
      description="Budget 2026 proposes higher property income tax rates from April 2027. See the dates, UK scope, a simple illustration and what buy-to-let owners should review."
      path="/news/property-income-tax-landlords-2027"
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides and news", href: "/guides" },
        { name: "Property income tax proposal", href: "/news/property-income-tax-landlords-2027" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Buy-to-let news · England, Wales and Northern Ireland
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Property income tax changes proposed for April 2027
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Budget 2026 proposes a two percentage point rise in the rates applied to property income.
            For a landlord assessing a buy-to-let mortgage, the useful question is how the change
            might affect after-tax cash flow, rather than the mortgage payment alone.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Published 4 November 2026 · As of 4 November 2026 · HMRC policy note published 29 October 2026
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What has been announced?</h2>
          <p>
            HMRC says the proposed property income rates from the 2027–28 tax year are 24% at the
            basic rate, 44% at the higher rate and 49% at the additional rate. Each is two percentage
            points above the corresponding rate set for 2027–28 before this proposal. The government
            intends to legislate through Finance Bill 2026–27, with effect from 6 April 2027.
            These are announced plans, not a change to a landlord’s 2026–27 tax bill.
          </p>
          <p>
            HMRC says the rates would apply to individuals in England, Wales and Northern Ireland
            who receive property income, including partners in partnerships. Scotland has separate
            income tax powers; do not assume these proposed rates apply to Scottish taxpayers.
            The measure is about income tax on property income, not a new rate of Stamp Duty Land Tax
            or a change to the mortgage interest rate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What could it mean for a rental budget?</h2>
          <p>
            A deliberately simple illustration: if £12,000 of a landlord’s property income were
            taxable entirely at a rate that rises by two percentage points, that rate change alone
            would add £240 to the annual income tax calculation (£12,000 × 0.02), or £20 a month.
            This is a comparison of two rates on the same assumed taxable amount. It is not a tax
            estimate for a real landlord.
          </p>
          <p>
            Actual liability depends on the amount of taxable property income, other income, tax
            bands, ownership, allowable expenses and the rules on finance cost relief. The amount
            and even the relevant tax treatment may differ for companies and for Scottish taxpayers.
            Ask a qualified tax adviser to model your own position before changing rent, ownership
            or borrowing arrangements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Three checks before taking on or refinancing a buy-to-let</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Rework cash flow after tax.</strong> Start with rent, allow for voids, maintenance,
              insurance and other costs, then model your own tax position. A headline rental yield
              is not the cash left after a mortgage and tax.
            </li>
            <li>
              <strong>Stress-test the mortgage payment.</strong> Use the{" "}
              <Link className="text-accent underline" to="/calculators/buy-to-let">
                buy-to-let calculator
              </Link>{" "}
              to explore borrowing costs and rental coverage, and the{" "}
              <Link className="text-accent underline" to="/calculators/repayment">
                repayment calculator
              </Link>{" "}
              to compare payment scenarios. Neither calculator estimates income tax.
            </li>
            <li>
              <strong>Check the final rules before acting.</strong> The measure is intended for
              Finance Bill 2026–27. Review the enacted law and current HMRC guidance before
              relying on these proposed rates for a 2027–28 return.
            </li>
          </ol>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Primary sources:</strong>{" "}
            <a className="text-accent underline" href={hmrcSource} rel="noopener noreferrer" target="_blank">
              HMRC’s 29 October 2026 property and savings income tax policy note
            </a>{" "}
            and{" "}
            <a className="text-accent underline" href={budgetSource} rel="noopener noreferrer" target="_blank">
              Budget 2026, property taxation section
            </a>.
          </p>
          <p>
            General information only, not personal tax, legal, mortgage or investment advice.
            The proposal and its jurisdiction may change during legislation. Confirm the final
            rules with HMRC and seek advice based on your circumstances.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default PropertyIncomeTaxNewsPage;
