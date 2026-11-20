import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const path = "/news/ons-rents-house-prices-november-2026";
const onsBulletin =
  "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/privaterentandhousepricesuk/november2026";
const onsRentDataset =
  "https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/privaterentpricemedianandquartilesenglandandwales";

const OnsRentsHousePricesNovember2026NewsPage = () => (
  <SiteShell>
    <SEO
      title="UK rents and house prices: November 2026 buyer budget check | RepayWise"
      description="ONS reports October rents and September house prices. See how to use the November 2026 release when planning a deposit and mortgage, without mistaking UK averages for a personal budget."
      path={path}
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides and news", href: "/guides" },
        { name: "ONS rents and house prices, November 2026", href: path },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Housing news · UK</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            UK rents and house prices: what the November 2026 figures mean for your buying budget
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            In its 18 November release, the Office for National Statistics (ONS) put average UK
            monthly private rent at £1,411 in October 2026, up 3.8% over a year. Its latest
            average UK house price was £273,000 in September, up 1.2% over a year. The two
            measures cover different months and homes. Neither tells you what a property in
            your area will cost or whether its mortgage will be affordable.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Published 20 November 2026 · Based on the ONS release of 18 November 2026;
            rent data are for October and house price data for September.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Read the dates before the headline</h2>
          <p>
            The ONS rent estimate is provisional and includes the private rental stock,
            not just newly advertised homes. It says the UK average rent was £51 a month
            higher than a year earlier. That is a change in the national estimate, not a
            forecast for your tenancy or a statement that every tenant received a £51 rise.
          </p>
          <p>
            The house price index is also provisional and can be revised as more sales are
            recorded. The UK average price was £273,000, but local prices move differently:
            the ONS reports annual falls in London and faster annual growth in the North East
            of England for September. A UK average is a starting point for a scenario,
            not a substitute for recent prices of comparable homes where you plan to buy.
          </p>
          <p>
            Country figures also need care. The ONS advises caution when comparing rent
            estimates for Scotland and Northern Ireland with those for England and Wales
            because collection methods differ. Northern Ireland&apos;s latest directly
            observed rent figure in this release is for August, not October.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A deposit decision using the headline house price</h2>
          <p>
            Suppose a home costs £273,000. This is a hypothetical purchase at the ONS UK
            average, not a typical first-time-buyer home or a price prediction. A 10% deposit
            would be £27,300 and leave a £245,700 mortgage. A 20% deposit would be £54,600
            and leave a £218,400 mortgage. The extra deposit is £27,300.
          </p>
          <p>
            At the <strong>same hypothetical 5% mortgage rate</strong> over 25 years, with
            monthly interest and level repayments, the monthly payments would be about
            £1,436 and £1,277 respectively: a difference of about £160. The rate is an
            illustration, not a current lender offer. Real rates and fees can differ by
            deposit size, product and borrower; holding the rate constant here isolates
            the effect of borrowing £27,300 less.
          </p>
          <p>
            If the buyer had £60,000 in savings, those deposits would leave £32,700 or
            £5,400 before tax, legal costs, moving costs and an emergency reserve. The
            lower monthly payment does not automatically make the larger deposit the safer
            choice. Our{" "}
            <Link className="text-accent underline" to="/guides/mortgage-deposit-vs-cash-reserve">
              deposit versus cash reserve guide
            </Link>{" "}
            walks through that trade-off. Enter a real quote and term in the{" "}
            <Link className="text-accent underline" to="/calculators/repayment">
              repayment calculator
            </Link>{" "}
            before comparing homes. Property taxes depend on where you buy and your
            circumstances; the{" "}
            <Link className="text-accent underline" to="/guides/first-time-buyer-stamp-duty">
              first-time-buyer tax guide
            </Link>{" "}
            points to the official calculators for each nation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">If you are renting while you save</h2>
          <p>
            Comparing the £1,411 UK average rent directly with the £1,436 example mortgage
            payment would give a misleading answer. The figures describe different
            properties and dates, and a mortgage payment excludes purchase costs, insurance,
            maintenance and possible service charges. It also does not show what happens
            when a mortgage deal ends. Use your own rent and a property you might actually
            buy for a useful comparison.
          </p>
          <p>
            The ONS also published a new England and Wales dataset of local median, lower
            quartile and upper quartile rents by area and bedroom count. That can help you
            judge the range of rents in a particular place. The ONS says these figures are
            monthly snapshots and <strong>should not be compared month to month</strong> to
            measure rent growth; use its rent price index for that question. The new dataset
            does not cover Scotland or Northern Ireland.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A practical check before changing plans</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Find recent prices for the property type and area you want, then set a realistic purchase price.</li>
            <li>Get a current mortgage quote and model the payment at that rate and at a higher rate you could still manage.</li>
            <li>Budget separately for the deposit, relevant property tax, fees and cash you want to keep accessible.</li>
            <li>Compare the full ownership budget with your actual rent, rather than two unrelated UK averages.</li>
          </ol>
          <p>
            This process can tell you whether a particular move fits your budget. The ONS
            release alone cannot tell you whether to buy now, wait or stay in your current
            tenancy.
          </p>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Primary sources:</strong>{" "}
            <a className="text-accent underline" href={onsBulletin} target="_blank" rel="noopener noreferrer">
              ONS private rent and house prices, November 2026
            </a>{" "}
            and{" "}
            <a className="text-accent underline" href={onsRentDataset} target="_blank" rel="noopener noreferrer">
              ONS local rent median and quartiles dataset
            </a>.
          </p>
          <p>
            General UK information, not a personal recommendation. ONS rent and house price
            estimates are provisional. The mortgage example is calculated from stated
            assumptions, excludes fees and assumes the same rate for the whole term; actual
            products, eligibility, taxes and household costs differ.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default OnsRentsHousePricesNovember2026NewsPage;
