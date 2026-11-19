import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const path = "/guides/first-time-buyer-stamp-duty";
const hmrcRates = "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates";
const hmrcRelief = "https://www.gov.uk/guidance/stamp-duty-land-tax-relief-for-land-or-property-transactions";
const hmrcCalculator = "https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/";
const hmrcNonResident = "https://www.gov.uk/guidance/rates-of-stamp-duty-land-tax-for-non-uk-residents";
const scotlandRelief = "https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance/lbtt3001-exemptions-reliefs/lbtt3010-tax-reliefs/lbtt3048-first-time-buyer-relief";
const scotlandCalculator = "https://revenue.scot/calculate-tax/calculate-property-transactions";
const walesOverview = "https://www.gov.wales/land-transaction-tax-overview";
const walesCalculator = "https://www.gov.wales/land-transaction-tax-calculator";
const buyingCosts = "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs";

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="text-accent underline" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const FirstTimeBuyerStampDutyGuidePage = () => (
  <SiteShell>
    <SEO
      title="First-time buyer stamp duty in 2026 | RepayWise"
      description="Check first-time buyer SDLT relief in England and Northern Ireland, the £500,000 limit and worked cash-budget examples. Find the official calculators for every UK nation."
      path={path}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "First-time buyer stamp duty: check the relief before setting your budget",
        description: "An England and Northern Ireland SDLT decision guide, with a UK jurisdiction check and worked purchase examples.",
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
      { name: "First-time buyer stamp duty", href: path },
    ]} />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="mx-auto max-w-3xl space-y-9 leading-relaxed">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link className="hover:text-foreground" to="/">Home</Link> /{" "}
          <Link className="hover:text-foreground" to="/guides">Guides</Link> /{" "}
          <span aria-current="page">First-time buyer stamp duty</span>
        </nav>
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">England and Northern Ireland buyer guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            First-time buyer stamp duty: check the tax before choosing your price ceiling
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A deposit is only one part of the cash you need to buy. In England and Northern Ireland,
            eligible first-time buyers can claim Stamp Duty Land Tax (SDLT) relief, but the relief
            disappears if the purchase price is over £500,000. Work out the tax at the price you
            can actually afford, then compare the mortgage payment and the cash left for other costs.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Published and sources checked 19 November 2026</p>
        </header>

        <nav aria-label="On this page" className="flex flex-wrap gap-3 text-sm">
          <a className="text-accent underline" href="#rules">Relief rules</a>
          <a className="text-accent underline" href="#worked-example">Worked examples</a>
          <a className="text-accent underline" href="#other-nations">Scotland and Wales</a>
          <a className="text-accent underline" href="#checklist">Buying checklist</a>
        </nav>

        <section id="rules" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">What the relief covers</h2>
          <p>
            For an eligible first-time buyer purchasing a main residence in England or Northern
            Ireland for <strong>£500,000 or less</strong>, HMRC charges no SDLT on the first £300,000
            and 5% on the portion from £300,001 to £500,000. If the purchase price exceeds
            £500,000, first-time buyer relief is unavailable and the standard rates apply to
            the <em>whole</em> price, not just the amount above £500,000. The current standard
            bands start at 0% to £125,000, 2% on the portion to £250,000 and 5% on the portion
            to £925,000. These are marginal bands, not a single rate on the full price.
          </p>
          <p>
            HMRC requires everyone buying together to be a first-time buyer, and the property
            must be intended as the buyer&apos;s main residence. If either point is uncertain,
            ask your conveyancer before assuming the relief applies. The rules for shared
            ownership, additional properties, non-resident buyers and unusual transactions
            need a transaction-specific check. HMRC says a <ExternalLink href={hmrcNonResident}>non-UK-resident surcharge</ExternalLink>{" "}
            can apply on top of first-time buyer rates. Use the <ExternalLink href={hmrcCalculator}>official HMRC SDLT calculator</ExternalLink>{" "}
            and confirm the result with your conveyancer.
          </p>
        </section>

        <section id="worked-example" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Three prices, one buyer: what changes at £500,000?</h2>
          <p>
            Assume one eligible first-time buyer who is UK-resident for SDLT purposes purchases
            a single main residence in England or Northern Ireland. No additional-property or
            non-UK-resident surcharge applies. The examples below use HMRC&apos;s published rates as checked
            on 19 November 2026. The 10% deposit and 4.5% mortgage rate are <strong>hypothetical</strong>;
            they are not a lender offer. The mortgage is a repayment loan over 25 years at an
            unchanged annual rate, with interest applied monthly. Product fees, insurance,
            other buying costs and future rate changes are excluded.
          </p>
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[680px] text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">Purchase price</th>
                  <th scope="col" className="px-4 py-3 text-right">SDLT</th>
                  <th scope="col" className="px-4 py-3 text-right">10% deposit</th>
                  <th scope="col" className="px-4 py-3 text-right">Deposit + SDLT</th>
                  <th scope="col" className="px-4 py-3 text-right">Modelled monthly payment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">£450,000</th><td className="px-4 py-3 text-right">£7,500</td><td className="px-4 py-3 text-right">£45,000</td><td className="px-4 py-3 text-right">£52,500</td><td className="px-4 py-3 text-right">£2,251.12</td></tr>
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">£500,000</th><td className="px-4 py-3 text-right">£10,000</td><td className="px-4 py-3 text-right">£50,000</td><td className="px-4 py-3 text-right">£60,000</td><td className="px-4 py-3 text-right">£2,501.25</td></tr>
                <tr><th scope="row" className="px-4 py-3 text-left font-medium">£525,000</th><td className="px-4 py-3 text-right">£16,250</td><td className="px-4 py-3 text-right">£52,500</td><td className="px-4 py-3 text-right">£68,750</td><td className="px-4 py-3 text-right">£2,626.31</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            At £450,000, the SDLT is 5% of the £150,000 above the relief&apos;s £300,000
            nil-rate band: £7,500. At £500,000, it is 5% of £200,000: £10,000. The
            £525,000 purchase cannot use the relief, so the standard calculation is
            £2,500 on the £125,000 between £125,000 and £250,000, plus £13,750 on the
            £275,000 above £250,000: £16,250.
          </p>
          <p>
            Moving from the £500,000 example to £525,000 adds £6,250 in modelled SDLT,
            £2,500 to the deposit and about £125.06 to the monthly payment at the same
            hypothetical rate. That is a comparison of two different homes, not a reason
            to set an artificial offer price. Compare the homes, the full cash requirement
            and the payment you could sustain. Use the <Link className="text-accent underline" to="/calculators/repayment">repayment calculator</Link>{" "}
            with an actual quoted rate and term to test your own mortgage; do not use the
            RepayWise property-tax estimate as your tax confirmation while its rate tables
            are under review.
          </p>
        </section>

        <section id="other-nations" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Buying in Scotland or Wales?</h2>
          <p>
            The SDLT examples above do <strong>not</strong> apply to homes in Scotland or Wales.
            Scotland charges Land and Buildings Transaction Tax (LBTT). Eligible Scottish
            first-time buyers can receive a higher nil-rate threshold of £175,000; check the
            full conditions in <ExternalLink href={scotlandRelief}>Revenue Scotland&apos;s relief guidance</ExternalLink>{" "}
            and use its <ExternalLink href={scotlandCalculator}>official LBTT calculator</ExternalLink>.
          </p>
          <p>
            Wales charges Land Transaction Tax (LTT) and does not have a separate first-time
            buyer relief. Its main residential rates and higher rates for some additional
            properties differ from SDLT. Read the <ExternalLink href={walesOverview}>Welsh Revenue Authority overview</ExternalLink>{" "}
            and use the <ExternalLink href={walesCalculator}>official LTT calculator</ExternalLink>.
            For any nation, the effective date and transaction details matter; your conveyancer
            can confirm the tax due.
          </p>
        </section>

        <section id="checklist" className="space-y-3 scroll-mt-24">
          <h2 className="text-2xl font-semibold">A cash-first checklist before you offer</h2>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Confirm where the property is and whether every buyer qualifies for the relevant relief.</li>
            <li>Check tax at the likely agreed price using the official national calculator, then ask your conveyancer to confirm it.</li>
            <li>Add the deposit and tax, then budget separately for legal work, surveys, moving, insurance and any property-specific costs. <ExternalLink href={buyingCosts}>MoneyHelper lists the main buying and moving costs</ExternalLink>.</li>
            <li>Compare mortgage offers using the actual loan amount, quoted rate, term and product fees. Check the payment if the rate changes after an initial deal.</li>
            <li>Keep accessible cash for costs and surprises. Our <Link className="text-accent underline" to="/guides/mortgage-deposit-vs-cash-reserve">deposit versus cash reserve guide</Link> helps with that separate decision.</li>
          </ol>
          <p>
            If the tax result or eligibility is uncertain, resolve it before committing your
            remaining savings to a larger deposit. An agreement in principle is not a final
            mortgage offer, and a tax estimate is not a conveyancer&apos;s confirmation.
          </p>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border glass-card p-6 sm:flex-row sm:items-center">
          <Calculator className="size-9 shrink-0 text-accent" />
          <div className="flex-1">
            <h2 className="font-semibold">Model the mortgage separately</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enter the loan, rate and term from an actual offer, then check the property tax with the relevant official calculator.</p>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" to="/calculators/repayment">
            Open repayment calculator <ArrowRight className="size-4" />
          </Link>
        </section>

        <footer className="space-y-2 rounded-2xl border p-5 text-sm text-muted-foreground">
          <p>
            <strong>Primary sources checked 19 November 2026:</strong>{" "}
            <ExternalLink href={hmrcRates}>HMRC residential SDLT rates</ExternalLink>,{" "}
            <ExternalLink href={hmrcRelief}>HMRC first-time buyer relief guidance</ExternalLink>,{" "}
            <ExternalLink href={hmrcNonResident}>HMRC non-UK-resident SDLT guidance</ExternalLink>,{" "}
            <ExternalLink href={scotlandRelief}>Revenue Scotland relief guidance</ExternalLink>,{" "}
            <ExternalLink href={walesOverview}>Welsh LTT overview</ExternalLink> and{" "}
            <ExternalLink href={buyingCosts}>MoneyHelper buying costs</ExternalLink>.
          </p>
          <p>
            General information, not personal mortgage or tax advice. The worked SDLT amounts
            assume an eligible first-time buyer who is UK-resident for SDLT purposes purchasing
            one ordinary residential main residence in England or Northern Ireland at the
            stated price, with no additional-property surcharge. The mortgage rate
            is hypothetical and held constant for the whole term. Confirm eligibility, tax,
            fees and finance terms for your own transaction before acting.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default FirstTimeBuyerStampDutyGuidePage;
