import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, Home, Info, PoundSterling } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { formatGBP } from "@/lib/finance/decimal";
import { BigStat, SliderField } from "@/pages/calculators/RepaymentPage";
import { trackIntentClick } from "@/lib/analytics";

/**
 * Help to Buy equity loan repayment calculator.
 *
 * The UK Help to Buy scheme (2013-2023) provided equity loans of up to 20%
 * (40% in London) of the purchase price. Interest-free for the first 5 years,
 * then 1.75% in year 6, rising annually by RPI + 1%. The loan must be repaid
 * on sale or at the end of the mortgage term (max 25 years).
 *
 * Repayment amount is based on the *current market value* of the property,
 * not the original purchase price.
 */

interface YearRow {
  year: number;
  feeRate: number;
  annualFee: number;
  cumulativeFees: number;
  outstandingLoan: number;
}

function buildHtbSchedule(
  purchasePrice: number,
  equityPct: number,
  currentValue: number,
  rpiRate: number,
): YearRow[] {
  const loanPct = equityPct / 100;
  const outstandingLoan = currentValue * loanPct;
  const rows: YearRow[] = [];
  let cumulative = 0;
  let feeRate = 0;

  for (let year = 1; year <= 25; year++) {
    if (year <= 5) {
      feeRate = 0;
    } else if (year === 6) {
      feeRate = 1.75;
    } else {
      feeRate = feeRate * (1 + (rpiRate + 1) / 100);
    }

    const annualFee = (feeRate / 100) * purchasePrice * loanPct;
    cumulative += annualFee;

    rows.push({
      year,
      feeRate: Math.round(feeRate * 100) / 100,
      annualFee: Math.round(annualFee * 100) / 100,
      cumulativeFees: Math.round(cumulative * 100) / 100,
      outstandingLoan: Math.round(outstandingLoan * 100) / 100,
    });
  }

  return rows;
}

const HelpToBuyRepaymentPage = () => {
  const [purchasePrice, setPurchasePrice] = useState(300_000);
  const [equityPct, setEquityPct] = useState(20);
  const [currentValue, setCurrentValue] = useState(340_000);
  const [rpiRate, setRpiRate] = useState(3.0);
  const [yearsOwned, setYearsOwned] = useState(8);

  const equityLoan = purchasePrice * (equityPct / 100);
  const repaymentAmount = currentValue * (equityPct / 100);
  const capitalGainOnLoan = repaymentAmount - equityLoan;

  const schedule = useMemo(
    () => buildHtbSchedule(purchasePrice, equityPct, currentValue, rpiRate),
    [purchasePrice, equityPct, currentValue, rpiRate],
  );

  const currentYearRow = schedule[Math.min(yearsOwned, 25) - 1];
  const totalFeesPaid = currentYearRow?.cumulativeFees ?? 0;
  const currentFeeRate = currentYearRow?.feeRate ?? 0;
  const annualFeeNow = currentYearRow?.annualFee ?? 0;

  const chartData = schedule.map((row) => ({
    year: row.year,
    annualFee: row.annualFee,
    cumulativeFees: row.cumulativeFees,
  }));

  const seoTitle = "Help to Buy Repayment Calculator 2026 | Equity Loan Costs | RepayWise";
  const seoDescription =
    "Calculate your Help to Buy equity loan repayment amount, annual fees after year 5, and total cost over time. Free UK calculator with RPI-linked fee projections.";

  return (
    <CalculatorShell
      eyebrow="Help to Buy"
      title="Help to Buy Equity Loan Repayment Calculator"
      intro="Calculate exactly what you owe on your Help to Buy equity loan — including the rising annual fees after year 5 and the repayment amount based on your home's current market value."
      leadCalculator="help-to-buy"
      leadContext={{ purchasePrice, equityPct, currentValue, repaymentAmount, totalFeesPaid }}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path="/guides/help-to-buy-repayment"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "RepayWise Help to Buy Repayment Calculator",
              url: "https://repaywise.co.uk/guides/help-to-buy-repayment",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              description: seoDescription,
              offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
              provider: {
                "@type": "Organization",
                name: "RepayWise",
                url: "https://repaywise.co.uk",
                areaServed: "GB",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How much do I have to repay on Help to Buy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You repay the same percentage of your home's current market value that you originally borrowed. For example, if you took a 20% equity loan and your home is now worth £340,000, you repay £68,000 — not the original loan amount.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When do Help to Buy fees start?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The equity loan is interest-free for the first 5 years. From year 6, you pay an annual fee of 1.75% of the original loan amount. This fee rises each year by RPI inflation plus 1%.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I make partial repayments on Help to Buy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can make partial repayments (called 'staircasing') in chunks of at least 10% of the current market value. Each partial repayment reduces both the outstanding loan percentage and the annual fees.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens if my house price falls?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Because the repayment is based on current market value, if your home's value falls below the purchase price, your repayment amount also falls. The government shares both the upside and downside of property price changes.",
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
          { name: "Help to Buy Repayment Calculator", href: "/guides/help-to-buy-repayment" },
        ]}
      />

      {/* Calculator inputs */}
      <div className="grid lg:grid-cols-5 gap-6 mt-8">
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-bold mb-6">Your Help to Buy details</h2>
          <div className="space-y-5">
            <SliderField
              label="Original purchase price"
              prefix="£"
              value={purchasePrice}
              min={100_000}
              max={600_000}
              step={5_000}
              onChange={setPurchasePrice}
            />
            <SliderField
              label="Equity loan percentage"
              suffix="%"
              value={equityPct}
              min={5}
              max={40}
              step={5}
              onChange={setEquityPct}
            />
            <SliderField
              label="Current property value"
              prefix="£"
              value={currentValue}
              min={50_000}
              max={1_000_000}
              step={5_000}
              onChange={setCurrentValue}
            />
            <SliderField
              label="Years since purchase"
              value={yearsOwned}
              min={1}
              max={25}
              step={1}
              onChange={setYearsOwned}
            />
            <SliderField
              label="Assumed RPI inflation"
              suffix="%"
              value={rpiRate}
              min={0}
              max={8}
              step={0.5}
              decimals={1}
              onChange={setRpiRate}
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <BigStat label="Equity loan repayment" value={formatGBP(repaymentAmount)} highlight />
          <BigStat label="Original equity loan" value={formatGBP(equityLoan)} />
          <BigStat
            label={capitalGainOnLoan >= 0 ? "Extra you owe (growth)" : "Saving (price fell)"}
            value={formatGBP(Math.abs(capitalGainOnLoan))}
          />
          <BigStat label="Current annual fee" value={`${formatGBP(annualFeeNow)}/yr`} />
          <BigStat label="Fee rate now" value={`${currentFeeRate.toFixed(2)}%`} />
          <BigStat label="Total fees paid to date" value={formatGBP(totalFeesPaid)} />
        </div>
      </div>

      {/* Fee projection chart */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 mt-6">
        <h2 className="text-lg font-bold mb-1">Annual fee projection</h2>
        <p className="text-sm text-muted-foreground mb-6">
          How the annual management fee escalates from year 6 onward (assumes {rpiRate}% RPI)
        </p>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="htbFeeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              label={{ value: "Year", position: "insideBottomRight", offset: -5, fontSize: 11 }}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
              formatter={(value: number) => [formatGBP(value), ""]}
              labelFormatter={(label: number) => `Year ${label}`}
            />
            <Area
              type="monotone"
              dataKey="annualFee"
              stroke="hsl(var(--accent))"
              fill="url(#htbFeeGrad)"
              strokeWidth={2}
              name="Annual fee"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed schedule table */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 mt-6">
        <h2 className="text-lg font-bold mb-1">Year-by-year fee schedule</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Fees are interest-free for years 1-5, then escalate by RPI + 1% annually
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="py-2 pr-4">Year</th>
                <th className="py-2 pr-4">Fee rate</th>
                <th className="py-2 pr-4">Annual fee</th>
                <th className="py-2">Cumulative fees</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr
                  key={row.year}
                  className={`border-b border-border/50 ${row.year === yearsOwned ? "bg-accent/10 font-semibold" : ""}`}
                >
                  <td className="py-2 pr-4 tabular-nums">{row.year}</td>
                  <td className="py-2 pr-4 tabular-nums">{row.feeRate.toFixed(2)}%</td>
                  <td className="py-2 pr-4 tabular-nums">{formatGBP(row.annualFee)}</td>
                  <td className="py-2 tabular-nums">{formatGBP(row.cumulativeFees)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO content section */}
      <article className="glass-card rounded-3xl p-6 sm:p-8 mt-6 prose prose-sm prose-invert max-w-none">
        <h2 className="text-xl font-bold tracking-tight mb-4">
          How does Help to Buy repayment work?
        </h2>
        <p>
          The <strong>Help to Buy equity loan scheme</strong> ran from 2013 to March 2023, helping
          over 383,000 households buy a new-build home with just a 5% deposit. The government
          provided an equity loan of up to <strong>20% of the purchase price</strong> (40% in
          London), which is interest-free for the first five years.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">Key rules for repaying your equity loan</h3>
        <ul className="space-y-2">
          <li>
            <strong>Repayment is based on current market value</strong> — not your original purchase
            price. If you borrowed 20% and your home is now worth £340,000, you repay £68,000.
          </li>
          <li>
            <strong>Fees start in year 6</strong> at 1.75% of the original loan amount, then rise
            each year by the Retail Price Index (RPI) plus 1%.
          </li>
          <li>
            <strong>Partial repayments (staircasing)</strong> are allowed in blocks of at least 10%
            of the property's current value, requiring a new valuation each time.
          </li>
          <li>
            <strong>Full repayment</strong> is required when you sell the property, remortgage to
            repay, or reach the end of your main mortgage term (maximum 25 years).
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-3">When should you repay early?</h3>
        <p>
          Many homeowners consider repaying before the fees erode their equity. As the chart above
          shows, annual fees can escalate significantly after year 10 — particularly in
          high-inflation environments. If you have built sufficient equity through house price
          growth, remortgaging to repay the equity loan can save thousands in cumulative fees.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">Help to Buy vs shared ownership</h3>
        <p>
          Unlike shared ownership, Help to Buy does not involve paying rent on the government's
          share. However, the annual management fees from year 6 function similarly to an
          escalating cost. Use our calculator above to compare the total cost of keeping the loan
          versus repaying early through remortgage.
        </p>

        <div className="mt-6 rounded-2xl border border-border p-5 not-prose">
          <div className="flex items-start gap-3">
            <Info className="size-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Important</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Help to Buy scheme closed to new applications on 31 October 2022, with completions
                ending 31 March 2023. This calculator is designed for existing Help to Buy borrowers
                planning their repayment. RepayWise provides financial information, not regulated
                financial advice. Speak to a qualified mortgage adviser before making repayment decisions.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ section */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 mt-6">
        <h2 className="text-xl font-bold tracking-tight mb-6">
          Frequently asked questions
        </h2>
        <div className="space-y-5">
          {[
            {
              q: "How much do I have to repay on Help to Buy?",
              a: "You repay the same percentage of your home's current market value that you originally borrowed. For example, if you took a 20% equity loan and your home is now worth £340,000, you repay £68,000 — not the original loan amount. You'll need a RICS valuation to confirm the current value.",
            },
            {
              q: "When do Help to Buy fees start?",
              a: "The equity loan is interest-free for the first 5 years. From year 6, you pay an annual management fee of 1.75% of the original loan amount. This fee rises each year by the Retail Price Index (RPI) plus 1%, compounding annually.",
            },
            {
              q: "Can I make partial repayments on Help to Buy?",
              a: "Yes, you can make partial repayments (called 'staircasing') in chunks of at least 10% of the current market value. Each partial repayment requires a new RICS valuation (at your cost) and reduces both the outstanding loan percentage and the annual fees.",
            },
            {
              q: "What happens if my house price falls?",
              a: "Because the repayment is percentage-based on current market value, if your home's value drops, your repayment amount falls too. The government shares both the upside and downside of house price movements proportionally.",
            },
          ].map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex items-start gap-3 cursor-pointer list-none">
                <HelpCircle className="size-4 text-accent shrink-0 mt-0.5" />
                <span className="text-sm font-semibold group-open:text-accent transition-colors">
                  {faq.q}
                </span>
              </summary>
              <p className="text-sm text-muted-foreground mt-2 ml-7 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA to other calculators */}
      <div className="mt-8 rounded-3xl bg-primary text-primary-foreground p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
              Next step
            </p>
            <h3 className="text-xl font-bold">Ready to remortgage?</h3>
            <p className="text-sm text-primary-foreground/70 mt-1">
              If you're planning to repay your equity loan by remortgaging, check what your new monthly payments would be.
            </p>
          </div>
          <Link
            to="/calculators/repayment"
            onClick={() => trackIntentClick("htb_cta", "/calculators/repayment", "Calculate repayments")}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-xl text-sm font-semibold hover:gap-3 transition-all shrink-0"
          >
            Calculate repayments <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <LastUpdated date="30 April 2026" />
      <RelatedCalculators currentPath="/guides/help-to-buy-repayment" />
    </CalculatorShell>
  );
};

export default HelpToBuyRepaymentPage;
