import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const budgetSource = "https://www.gov.uk/government/publications/budget-2026-document/budget-2026-html";
const hmrcSource = "https://www.gov.uk/government/publications/lifetime-isa-withdrawal-charge";

const LifetimeIsaNewsPage = () => (
  <SiteShell>
    <SEO
      title="Lifetime ISA house-price cap change in 2026 | RepayWise"
      description="The Lifetime ISA withdrawal charge changed for first-time buyers purchasing above £450,000. See an example and what Budget 2026 says about a future ISA."
      path="/news/lifetime-isa-withdrawal-charge-2026"
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides and news", href: "/guides" },
        { name: "Lifetime ISA change", href: "/news/lifetime-isa-withdrawal-charge-2026" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">First-time-buyer news · UK</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Lifetime ISA change for homes above £450,000
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Budget 2026 reduced one Lifetime ISA withdrawal charge and announced a future First Time
            Buyer ISA. The two changes have different start dates and different effects on a deposit.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">As of 30 October 2026 · Budget and HMRC notes published 28 October 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What changed on 29 October?</h2>
          <p>
            For a relevant Lifetime ISA withdrawal to buy a first home costing more than £450,000,
            the charge fell from 25% to 20% from 29 October 2026. HMRC says this removes the
            government bonus while allowing affected savers to retain their own contributions.
            The 25% charge still applies to other unauthorised withdrawals. A home within the
            £450,000 cap can still qualify for a charge-free first-home withdrawal if the other
            Lifetime ISA conditions are met.
          </p>
          <p>
            The charge applies to the withdrawal amount, not just the bonus. Before committing to
            a purchase, confirm the rules and process with your ISA provider and conveyancer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A simple deposit example</h2>
          <p>
            Suppose a buyer has paid £10,000 into a Lifetime ISA and received £2,500 in government
            bonuses, with no investment growth or fees. The account holds £12,500. A 20% charge on
            a qualifying above-cap first-home withdrawal would be £2,500, leaving £10,000. Under
            the previous 25% charge, it would have left £9,375. This example explains the charge;
            it does not establish that a particular buyer or purchase qualifies.
          </p>
          <p>
            To plan the mortgage after deciding how much deposit is available, use the{" "}
            <Link className="text-accent underline" to="/calculators/repayment">repayment calculator</Link>.
            It estimates mortgage payments; it does not calculate ISA charges, tax or eligibility.
            Buyers in England or Northern Ireland can separately estimate purchase tax with the{" "}
            <Link className="text-accent underline" to="/calculators/stamp-duty">stamp duty calculator</Link>;
            Scotland and Wales have different property taxes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What about the new First Time Buyer ISA?</h2>
          <p>
            The Budget says a First Time Buyer ISA is planned from April 2029 for new savers, replacing
            the Lifetime ISA for them. It describes contributions of up to £4,000 a year and a 25%
            government bonus on a qualifying first-home withdrawal, with a £450,000 property cap.
            Existing Lifetime ISA holders will be able to continue using their accounts under the
            current rules. The new product is not available today; further terms may be published
            before launch.
          </p>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Primary sources:</strong>{" "}
            <a className="text-accent underline" href={hmrcSource} rel="noopener noreferrer" target="_blank">
              HMRC Lifetime ISA withdrawal-charge note
            </a>{" "}
            and{" "}
            <a className="text-accent underline" href={budgetSource} rel="noopener noreferrer" target="_blank">
              Budget 2026, property taxation section
            </a>, both published 28 October 2026.
          </p>
          <p>
            This is general information, not personal tax, legal or mortgage advice. Confirm the
            current rules with HMRC, your ISA provider and your conveyancer.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default LifetimeIsaNewsPage;
