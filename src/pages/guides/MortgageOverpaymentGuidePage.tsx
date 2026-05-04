import { Link } from "react-router-dom";
import { ArrowRight, Calculator, CheckCircle2, AlertTriangle, PoundSterling, TrendingDown } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { trackIntentClick } from "@/lib/analytics";

const seoTitle = "Mortgage Overpayment Guide UK 2026 | How Much Can You Save? | RepayWise";
const seoDescription =
  "Complete guide to overpaying your UK mortgage in 2026. Learn how overpayments cut years off your term, save thousands in interest, and when it makes more sense to save instead.";

const MortgageOverpaymentGuidePage = () => (
  <SiteShell>
    <SEO
      title={seoTitle}
      description={seoDescription}
      path="/guides/mortgage-overpayment-guide"
      jsonLd={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: "Mortgage Overpayment Guide UK 2026",
            description: seoDescription,
            url: "https://repaywise.co.uk/guides/mortgage-overpayment-guide",
            datePublished: "2026-04-30",
            dateModified: "2026-04-30",
            author: {
              "@type": "Organization",
              name: "RepayWise",
              url: "https://repaywise.co.uk",
            },
            publisher: {
              "@type": "Organization",
              name: "RepayWise",
              url: "https://repaywise.co.uk",
            },
          },
          {
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much can I overpay on my mortgage without penalty?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most UK lenders allow you to overpay up to 10% of your outstanding mortgage balance per year without incurring early repayment charges. Some lenders offer higher allowances (15-20%), while tracker and variable rate mortgages often have no overpayment limits at all. Always check your specific mortgage terms.",
                },
              },
              {
                "@type": "Question",
                name: "Is it better to overpay my mortgage or put money into savings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Compare your mortgage interest rate against the best available savings rate after tax. If your mortgage rate is 4.5% and the best savings rate is 3.8% (before tax), overpaying your mortgage gives a guaranteed, tax-free return of 4.5%. However, maintaining an emergency fund of 3-6 months' expenses should come first.",
                },
              },
              {
                "@type": "Question",
                name: "Should I reduce my mortgage term or monthly payment when overpaying?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Keeping the same term and reducing payments gives flexibility — your required payment drops but you can continue overpaying voluntarily. Reducing the term saves slightly more interest overall but commits you to higher payments. Most financial advisers recommend maintaining the term for flexibility unless you have very stable income.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get my overpayments back if I need the money?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Some lenders offer a 'borrow-back' facility that lets you withdraw previous overpayments, but many do not. Once money is overpaid, it typically reduces your balance permanently. Check whether your lender offers this feature before relying on it as a savings strategy.",
                },
              },
              {
                "@type": "Question",
                name: "How much interest can I save by overpaying £200 a month?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "On a typical £250,000 mortgage at 4.5% over 25 years, overpaying £200 per month could save approximately £30,000-£40,000 in total interest and reduce your term by around 5-6 years. Use the RepayWise overpayment calculator to model your exact figures.",
                },
              },
            ],
          },
        ],
      }}
    />

    <BreadcrumbJsonLd
      items={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Mortgage Overpayment Guide", href: "/guides/mortgage-overpayment-guide" },
      ]}
    />

    <article className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
          Guide
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
          Mortgage Overpayment Guide UK 2026
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-[62ch]">
          Everything you need to know about overpaying your UK mortgage — how it works, how much
          you can save, the risks to watch for, and when saving elsewhere makes more sense.
        </p>
        <LastUpdated date="30 April 2026" />

        {/* CTA */}
        <div className="mt-8 mb-12 rounded-2xl border glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Calculator className="size-10 text-accent shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Want to see your exact savings?</p>
            <p className="text-sm text-muted-foreground">
              Use our overpayment calculator to model monthly or lump-sum overpayments against your
              specific mortgage terms.
            </p>
          </div>
          <Link
            to="/calculators/overpayment"
            onClick={() => trackIntentClick("overpayment_guide", "/calculators/overpayment", "open_calculator")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:ring-2 ring-accent ring-offset-2 ring-offset-background transition-all shrink-0"
          >
            Open calculator <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-4">What is a mortgage overpayment?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A mortgage overpayment is any payment you make above your required monthly amount. If your
            mortgage payment is £1,200 per month and you pay £1,400, the extra £200 is an overpayment
            that goes directly toward reducing your outstanding balance.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Because your interest is calculated on the remaining balance, every overpayment reduces the
            total interest you pay over the life of the mortgage. This creates a compounding effect —
            the earlier you overpay, the more interest you save.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            There are three main ways to overpay: <strong>regular monthly overpayments</strong> (adding
            a fixed amount each month), <strong>lump-sum payments</strong> (e.g. using a bonus or
            inheritance), or a combination of both. Most UK homeowners who overpay choose regular
            monthly overpayments because they're easier to budget for.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-4">How much can you save?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The savings from overpaying depend on three factors: your outstanding balance, your
            interest rate, and how much you overpay. Here are some realistic examples based on a
            £250,000 mortgage at 4.5% over 25 years:
          </p>
          <div className="rounded-2xl border overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold">Monthly overpayment</th>
                  <th className="text-right px-4 py-3 font-semibold">Interest saved</th>
                  <th className="text-right px-4 py-3 font-semibold">Years saved</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3">£100/month</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">~£18,000</td>
                  <td className="text-right px-4 py-3">~3 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">£200/month</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">~£33,000</td>
                  <td className="text-right px-4 py-3">~5.5 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">£500/month</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">~£60,000</td>
                  <td className="text-right px-4 py-3">~10 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">£10,000 lump sum (year 1)</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">~£12,000</td>
                  <td className="text-right px-4 py-3">~1.5 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground italic">
            These figures are illustrative. Use the{" "}
            <Link to="/calculators/overpayment" className="text-accent underline">
              overpayment calculator
            </Link>{" "}
            to model your exact mortgage terms.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-4">UK lender overpayment rules</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Before overpaying, check your lender's terms. Most UK mortgage products have an
            overpayment allowance — typically 10% of the outstanding balance per year for fixed-rate
            mortgages. Exceeding this triggers an <strong>early repayment charge (ERC)</strong>,
            which can be 1-5% of the amount overpaid.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="rounded-2xl border glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="size-5 text-green-500" />
                <h3 className="font-semibold">Usually penalty-free</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tracker rate mortgages</li>
                <li>• Variable rate (SVR) mortgages</li>
                <li>• Offset mortgages</li>
                <li>• Most fixed-rate deals (up to 10%/year)</li>
              </ul>
            </div>
            <div className="rounded-2xl border glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="size-5 text-amber-500" />
                <h3 className="font-semibold">Watch for ERCs</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fixed-rate deals over 10% limit</li>
                <li>• Discounted rate products</li>
                <li>• Cashback mortgages</li>
                <li>• Some introductory deals</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            If you're on an SVR (standard variable rate) after your fixed deal ends, you can
            usually overpay without limit. This is actually one of the few advantages of being
            on an SVR — use it as an opportunity to reduce your balance before remortgaging to
            a new fixed deal.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Overpay or save? The 2026 decision framework
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The decision between overpaying your mortgage and putting money into savings (like a
            Cash ISA) comes down to comparing rates after tax. Here's a simple framework:
          </p>
          <div className="rounded-2xl border glass-card p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <PoundSterling className="size-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold">The rate comparison rule</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Overpaying your mortgage gives a <strong>guaranteed, tax-free return</strong> equal
                  to your mortgage interest rate. A savings account return is taxable (unless in an
                  ISA) and variable. Compare like-for-like:
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-secondary/50 p-4 text-sm space-y-2">
              <p>
                <strong>Mortgage rate:</strong> 4.5% → overpaying saves 4.5% guaranteed
              </p>
              <p>
                <strong>Best easy-access ISA:</strong> ~3.8% → tax-free but variable
              </p>
              <p>
                <strong>Best easy-access savings:</strong> ~4.2% → taxable at your marginal rate
              </p>
              <p className="text-accent font-medium pt-2">
                In this scenario, overpaying wins by 0.7% (vs ISA) or more (vs taxable savings)
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-3">When saving is better than overpaying</h3>
          <ul className="text-muted-foreground space-y-3 mb-4">
            <li className="flex items-start gap-2">
              <TrendingDown className="size-4 mt-1 text-accent shrink-0" />
              <span>
                <strong>You don't have an emergency fund.</strong> Build 3-6 months of expenses
                in accessible savings before overpaying. Once mortgage money is paid, you generally
                can't get it back.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <TrendingDown className="size-4 mt-1 text-accent shrink-0" />
              <span>
                <strong>You have high-interest debt.</strong> Credit cards (18-30% APR), personal
                loans, or car finance should be cleared before overpaying a mortgage at 4-5%.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <TrendingDown className="size-4 mt-1 text-accent shrink-0" />
              <span>
                <strong>Employer pension match.</strong> If your employer matches pension
                contributions, that's an instant 100% return — always prioritise this over
                overpaying.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <TrendingDown className="size-4 mt-1 text-accent shrink-0" />
              <span>
                <strong>Your mortgage rate is very low.</strong> If you locked in a rate below
                2% (some 2021-2022 deals), savings or investments may outperform overpaying
                until the fixed period ends.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            How to start overpaying your mortgage
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <p>
                <strong>Check your mortgage terms.</strong> Log in to your lender's portal or call
                them to confirm your overpayment allowance and any early repayment charges. Ask
                specifically: "What is my annual overpayment limit without incurring an ERC?"
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <p>
                <strong>Model the savings.</strong> Use the{" "}
                <Link to="/calculators/overpayment" className="text-accent underline">
                  RepayWise overpayment calculator
                </Link>{" "}
                to see exactly how much interest and time you'd save with different overpayment
                amounts.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <p>
                <strong>Set up a standing order.</strong> Most lenders let you set up a separate
                standing order for overpayments alongside your regular direct debit. This keeps
                overpayments voluntary — you can stop them any time without affecting your
                contractual payment.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <p>
                <strong>Choose your approach.</strong> You can either reduce your monthly payment
                (lower commitment, same term) or reduce your term (same payment, finish sooner).
                Reducing the term saves slightly more interest overall.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="size-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold shrink-0">5</span>
              <p>
                <strong>Review at remortgage time.</strong> When your fixed deal ends, your lower
                balance (thanks to overpayments) may qualify you for a better loan-to-value band,
                unlocking lower rates on your next deal.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            The LTV benefit: how overpaying unlocks better rates
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            UK mortgage rates are priced in loan-to-value (LTV) bands. The lower your LTV, the
            better rate you get when you remortgage. Overpaying can push you into a lower LTV
            band faster than regular payments alone.
          </p>
          <div className="rounded-2xl border overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold">LTV band</th>
                  <th className="text-right px-4 py-3 font-semibold">Typical 5yr fixed rate</th>
                  <th className="text-right px-4 py-3 font-semibold">Rate saving vs 90% LTV</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3">90% LTV</td>
                  <td className="text-right px-4 py-3">5.10%</td>
                  <td className="text-right px-4 py-3 text-muted-foreground">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">85% LTV</td>
                  <td className="text-right px-4 py-3">4.70%</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">-0.40%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">80% LTV</td>
                  <td className="text-right px-4 py-3">4.40%</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">-0.70%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">75% LTV</td>
                  <td className="text-right px-4 py-3">4.15%</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">-0.95%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">60% LTV</td>
                  <td className="text-right px-4 py-3">3.90%</td>
                  <td className="text-right px-4 py-3 text-accent font-medium">-1.20%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Rates are illustrative based on April 2026 market averages. Actual rates vary by lender
            and product type.
          </p>
        </section>

        {/* Summary CTA */}
        <section className="rounded-2xl border glass-card p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to see your savings?</h2>
          <p className="text-muted-foreground mb-5">
            Enter your mortgage details into the RepayWise overpayment calculator to see exactly
            how much interest you could save and how many years you could cut from your term.
          </p>
          <Link
            to="/calculators/overpayment"
            onClick={() => trackIntentClick("overpayment_guide_bottom", "/calculators/overpayment", "calculate_now")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:ring-2 ring-accent ring-offset-2 ring-offset-background transition-all"
          >
            Calculate your overpayment savings <ArrowRight className="size-4" />
          </Link>
        </section>

        <RelatedCalculators current="overpayment" />
      </div>
    </article>
  </SiteShell>
);

export default MortgageOverpaymentGuidePage;
