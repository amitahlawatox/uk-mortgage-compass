import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const source = "https://www.gov.uk/government/publications/your-first-home/your-first-home";

const YourFirstHomeNewsPage = () => (
  <SiteShell>
    <SEO
      title="Your First Home equity loan: Budget 2026 rules | RepayWise"
      description="What the new England-only Your First Home equity loan could mean for first-time buyers, with an illustrative mortgage and equity-loan example."
      path="/news/your-first-home-equity-loan-2026"
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides and news", href: "/guides" },
        { name: "Your First Home", href: "/news/your-first-home-equity-loan-2026" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Mortgage news · England</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Your First Home: how the new equity loan could work
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The government published details of a new first-time-buyer scheme on 28 October 2026.
            Applications are not open yet. Here is what buyers can check now, and what still needs confirming.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">As of 30 October 2026 · Official guidance published 28 October 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What has been announced?</h2>
          <p>
            Eligible first-time buyers in England could buy a participating new-build home with a deposit
            of at least 2.5%, a repayment mortgage from a participating lender, and a government equity
            loan worth 20% of the purchase price. The equity loan is interest-free for five years. It is
            a loan linked to the home&apos;s value, not a grant or a discount on the purchase price.
          </p>
          <p>
            Lenders will still carry out affordability and credit checks. The government says full
            eligibility rules, local property price caps, participating lenders and developers will be
            published before applications open.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Who may qualify?</h2>
          <p>
            The published outline is for first-time buyers using the new-build property as their main
            home. Household income must normally be no more than £110,000 outside London or £140,000
            in London. The home must fall within its area&apos;s price cap, and the buyer must obtain a
            mortgage from a participating lender. Check the final rules when applications open before
            making a purchase decision.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">An illustrative £250,000 purchase</h2>
          <p>
            If a £250,000 new-build home and its buyer qualified, a 2.5% deposit would be £6,250.
            The 20% equity loan would be £50,000, leaving a £193,750 repayment mortgage. Enter
            £193,750, 5% and 30 years in the <Link className="text-accent underline" to="/calculators/repayment">repayment calculator</Link>:
            the illustrative mortgage payment is about £1,040 a month. The 5% rate is an example,
            not a current offer or a forecast.
          </p>
          <p>
            On an unchanged £50,000 equity-loan amount, the published interest schedule would add
            £62.50 a month in year six at 1.5%, and £125 a month from year seven at 3%. These
            interest payments do not reduce the equity loan owed. The calculator models the mortgage
            only: add the separate equity-loan cost and allow for mortgage fees, insurance, service
            charges and other housing costs when comparing options.
          </p>
          <p>
            The amount needed to repay the equity loan can change with the home&apos;s value. If a
            £250,000 home later sold for £275,000 and the 20% share had not been repaid, that share
            would be £55,000, subject to the scheme&apos;s final terms and valuation process.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">When can buyers apply?</h2>
          <p>
            Government guidance expects pre-registration before the end of December 2026, full
            applications from February 2027 and the first sales from April 2027. Those dates are
            plans, not an open application service. Check the official page for changes.
          </p>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Primary source:</strong>{" "}
            <a className="text-accent underline" href={source} rel="noopener noreferrer" target="_blank">
              GOV.UK Your First Home guidance, published 28 October 2026
            </a>.
          </p>
          <p>
            RepayWise is an independent calculator site. This article is general information, not a
            scheme eligibility decision, mortgage offer or personal financial advice.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default YourFirstHomeNewsPage;
