import { Link } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const moneyHelperRemortgage =
  "https://www.moneyhelper.org.uk/en/homes/buying-a-home/remortgaging-to-cut-costs.html";
const moneyHelperSupport =
  "https://www.moneyhelper.org.uk/en/money-troubles/cost-of-living/worried-about-rising-mortgages";
const fcaCharter = "https://www.fca.org.uk/data/mortgage-charter-uptake";

const FixedRateEndingGuidePage = () => (
  <SiteShell>
    <SEO
      title="Fixed mortgage ending? Plan your next deal and payment | RepayWise"
      description="A practical UK guide to the end of a fixed mortgage: when to start, how to compare a product transfer with remortgaging, and how to model a payment change."
      path="/guides/fixed-rate-ending"
    />
    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Fixed mortgage ending", href: "/guides/fixed-rate-ending" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto space-y-9 leading-relaxed">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Mortgage decision guide · UK
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Your fixed mortgage is ending: a decision plan before the new payment starts
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A fixed-rate deal gives payment certainty for a set period, not for the full
            mortgage term. Before it ends, compare what your current lender will offer with
            a deal from another lender, including fees and your remaining balance. The right
            choice depends on your contract and circumstances, not a headline rate alone.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Information checked 11 November 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">First, find the date and the fallback rate</h2>
          <p>
            Your mortgage offer or lender statement should show the fixed deal&apos;s end date,
            the rate that follows it, any early repayment charge and your remaining term.
            If you take no action, you will move to the contractual reversion rate,
            often the lender&apos;s standard variable rate (SVR), but it can be another
            type of rate. Ask the lender to confirm your actual follow-on rate and
            the first payment date;
            neither a national average nor a rate displayed on a comparison site is your
            contractual rate.
          </p>
          <p>
            MoneyHelper suggests starting to shop around around six months before a deal
            ends. Treat that as a planning prompt: the window for reserving or switching
            a deal depends on the lender and product, and leaving a fixed deal early may
            trigger a charge.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">A three-stage timeline</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>About six months out:</strong> collect your latest balance, estimated
              property value, term, deal end date and early repayment charge. Ask your
              lender when you may reserve a new product, whether a later better offer can
              replace it, and when any switch would take effect. Check your loan-to-value
              (LTV) using balance divided by property value; the lender&apos;s valuation may
              differ from yours.
            </li>
            <li>
              <strong>When offers are available:</strong> compare a product transfer from
              your current lender with a remortgage to another lender. Compare the full
              cost over the same deal period: monthly payments, product and legal fees,
              any valuation or broker fees, charges for leaving the existing deal, and
              the balance you expect to owe at the end. Note whether fees are paid upfront
              or added to the loan, where they can themselves incur interest.
            </li>
            <li>
              <strong>Before the fix ends:</strong> confirm the offer is still valid,
              the rate, the start date, fees and any early repayment charge. Ask the lender
              or broker what happens if completion is delayed and you spend time on the
              contractual reversion rate.
              Keep a budget for the first payment at the new rate.
            </li>
          </ol>
          <p>
            Some lenders signed up to the Mortgage Charter allow eligible customers to lock
            in a new deal up to six months ahead and request a better like-for-like deal
            before it starts, if one is available. Confirm whether your own lender and deal
            offer this; it is not a promise that every borrower can switch without cost.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Model the payment change before choosing</h2>
          <p>
            Here is a deliberately hypothetical budget test. Suppose the balance at the
            switch date is £180,000 with 20 years left. At 2% interest a level repayment
            would be about £911 a month. At an assumed 4.5% mortgage rate it would be
            about £1,139, roughly £228 more each month. The calculation holds the balance
            and term constant, applies monthly interest and excludes all fees. The rates
            are example inputs, not current offers or a prediction of your lender&apos;s SVR.
          </p>
          <p>
            Put your lender-confirmed rate, actual balance and remaining term into the{" "}
            <Link className="text-accent underline" to="/calculators/repayment">
              repayment calculator
            </Link>. Then use the{" "}
            <Link className="text-accent underline" to="/calculators/remortgage">
              remortgage calculator
            </Link>{" "}
            to compare alternatives and their fees. A lower monthly payment is not always
            the cheaper deal if it extends the term or adds a large fee. For two offers,
            compare the same period and check the remaining loan balance as well as cash paid.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Product transfer or a new lender?</h2>
          <p>
            A <strong>product transfer</strong> keeps the loan with your existing lender
            but changes its deal. A <strong>remortgage</strong> moves the mortgage to
            another lender. The current lender&apos;s offer may be simpler, while another
            lender might offer a better total cost. Eligibility, valuation, income changes,
            loan-to-value, fees and timing can affect which route is available. Ask about
            overpayment flexibility and portability if you may move home during the deal.
          </p>
          <p>
            If your income has changed or your property value has fallen, do not assume an
            external remortgage will be approved. Ask your current lender what deals and
            support are available, and consider an FCA-authorised mortgage adviser for
            your circumstances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">If the new payment looks unaffordable</h2>
          <p>
            Contact your lender before you miss a payment. Ask about the support available
            under your mortgage and how a change to the term or repayment type would affect
            both short-term payments and total interest. MoneyHelper explains options for
            borrowers worried about rising payments. An extended term can reduce a monthly
            payment while increasing interest paid over time; it is a trade-off to model,
            not a free saving.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Five questions to take to your lender</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>What exact rate and payment follow my fixed deal if I do nothing?</li>
            <li>When can I reserve a replacement deal, and can I change it before it starts?</li>
            <li>What product, exit, valuation or legal fees would I pay, and when?</li>
            <li>How would an overpayment, a move or a term change affect this offer?</li>
            <li>If my budget is tight, what support can I discuss before missing a payment?</li>
          </ul>
        </section>

        <footer className="rounded-2xl border p-5 text-sm text-muted-foreground space-y-3">
          <p>
            <strong>Sources:</strong>{" "}
            <a className="text-accent underline" href={moneyHelperRemortgage} rel="noopener noreferrer" target="_blank">
              MoneyHelper, remortgaging and comparison costs
            </a>;{" "}
            <a className="text-accent underline" href={moneyHelperSupport} rel="noopener noreferrer" target="_blank">
              MoneyHelper, help when a fixed deal ends
            </a>; and{" "}
            <a className="text-accent underline" href={fcaCharter} rel="noopener noreferrer" target="_blank">
              FCA, Mortgage Charter commitments
            </a>.
          </p>
          <p>
            General UK information, not personal mortgage or financial advice. Mortgage
            terms and eligibility vary. Confirm dates, rates and charges with your lender
            and consider regulated advice before changing a mortgage. Your home may be
            repossessed if you do not keep up repayments.
          </p>
        </footer>
      </div>
    </article>
  </SiteShell>
);

export default FixedRateEndingGuidePage;
