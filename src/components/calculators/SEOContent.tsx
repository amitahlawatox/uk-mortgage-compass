import { Link } from "react-router-dom";
import { lenders } from "@/lib/uk/lenders";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => (
  <details className="group border-b border-border last:border-0">
    <summary className="flex items-center justify-between py-4 cursor-pointer text-sm font-semibold hover:text-accent transition-colors">
      {question}
      <span className="text-muted-foreground group-open:rotate-45 transition-transform text-lg">+</span>
    </summary>
    <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{answer}</p>
  </details>
);

interface LenderLinkGridProps {
  calculatorType: string;
  title: string;
  description: string;
}

const topLenders = ["barclays","nationwide","hsbc","halifax","lloyds-bank","santander","danske","virgin-money","natwest","coventry","accord","leeds","precise","cumberland","metro-bank","principality","suffolk","clydesdale"];

export const LenderLinkGrid = ({ calculatorType, title, description }: LenderLinkGridProps) => {
  const featured = topLenders
    .map((slug) => lenders.find((l) => l.slug === slug))
    .filter(Boolean);

  return (
    <section className="mt-10 pt-8 border-t border-border">
      <h2 className="text-lg font-bold tracking-tight mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {featured.map((l) => (
          <Link
            key={l!.slug}
            to={`/calculators/overpayment/${l!.slug}`}
            className="text-xs font-medium px-3 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors text-center"
          >
            {l!.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export const MaxBorrowingSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How Much Can I Borrow for a Mortgage in the UK?</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>
          Most UK mortgage lenders will offer between 4 and 4.5 times your gross annual household income. A single applicant earning £55,000 could typically borrow £220,000–£247,500, while joint applicants earning £55,000 and £35,000 combined could borrow £360,000–£405,000.
        </p>
        <p>
          However, the actual amount you can borrow depends on more than just your income multiple. Lenders run affordability assessments that factor in your monthly outgoings, existing debts (credit cards, car finance, student loans), number of dependants, and whether you pass the stress test — usually calculated at 3% above the product rate.
        </p>
        <p>
          Our mortgage borrowing calculator uses the same methodology as high-street lenders: income multiple cap, disposable income check, and a +3% stress test. Enter your figures above to see a personalised estimate in seconds — no login, no credit check, no data stored.
        </p>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">What Affects Your Maximum Mortgage Amount?</h2>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Gross income</strong> — the primary driver. Joint applications combine both incomes.</li>
          <li><strong>Deposit size</strong> — a larger deposit means lower LTV, unlocking better rates and higher multiples (some lenders offer 5× at ≤75% LTV).</li>
          <li><strong>Monthly commitments</strong> — credit cards, loans, childcare costs, and other outgoings reduce what lenders will offer.</li>
          <li><strong>Interest rate &amp; term</strong> — longer terms reduce monthly payments, potentially allowing a larger loan.</li>
          <li><strong>Employment type</strong> — self-employed applicants may need 2–3 years of accounts; contractors are assessed on day-rate.</li>
          <li><strong>Credit history</strong> — missed payments, CCJs, or defaults can restrict borrowing or require specialist lenders.</li>
        </ul>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem
          question="How much can I borrow for a mortgage with a £40,000 deposit?"
          answer="With a £40,000 deposit and a single income of £55,000, you could typically borrow around £220,000–£247,500 (4–4.5× income), giving a property budget of £260,000–£287,500. Joint applicants earning more can borrow significantly more. Use the calculator above with your exact figures."
        />
        <FAQItem
          question="Can I borrow more than 4.5 times my salary?"
          answer="Some lenders offer enhanced multiples (up to 5–5.5×) for higher earners, professionals (doctors, solicitors, accountants), or borrowers with large deposits (≤75% LTV). These deals typically require a minimum income of £75,000+ and clean credit history."
        />
        <FAQItem
          question="How do lenders stress-test my mortgage application?"
          answer="Lenders calculate whether you could still afford repayments if interest rates rise — typically testing at 3% above the product rate, or at a minimum threshold (often 7–8%). If your stressed monthly payment exceeds approximately 40–50% of net income, the loan is likely to be declined."
        />
        <FAQItem
          question="Does a second income help me borrow more?"
          answer="Yes. Joint applications combine both incomes for the multiplier calculation. Two applicants earning £40,000 and £30,000 could borrow 4.5× £70,000 = £315,000, compared to £180,000 on the higher income alone."
        />
        <FAQItem
          question="How much mortgage can I get for £1,000 a month?"
          answer="At a 4.75% rate over 25 years, £1,000/month supports approximately a £178,000 mortgage. At 5.5% it drops to around £165,000. Use the calculator above with your specific rate and term to get an exact figure."
        />
        <FAQItem
          question="What is the maximum mortgage I can get in the UK?"
          answer="There is no hard legal maximum, but most high-street lenders cap individual mortgages at £1–2 million. Your personal maximum is determined by the affordability assessment — typically 4–4.5× income minus commitments, subject to passing the stress test."
        />
      </div>
    </div>

    <LenderLinkGrid
      calculatorType="max-borrowing"
      title="Check Borrowing by Lender"
      description="Each lender has different income multiples, LTV caps, and affordability criteria. Select a lender for a tailored estimate."
    />
  </section>
);

export const EquitySEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How to Calculate Home Equity in the UK</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>
          Your home equity is the difference between your property's current market value and your outstanding mortgage balance. If your home is worth £350,000 and you owe £200,000, you have £150,000 in equity — or about 43% of the property's value.
        </p>
        <p>
          Equity grows in two ways: as you make mortgage repayments (reducing the loan balance) and as property prices rise (increasing the value). In the UK, average house prices have risen approximately 4–5% annually over the last 30 years, though this varies significantly by region and time period.
        </p>
        <p>
          Knowing your equity is essential for remortgaging (lenders offer better rates at lower LTVs), releasing equity for home improvements, understanding your net proceeds if selling, or calculating whether you have enough for a second property deposit.
        </p>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">What Can You Do With Home Equity?</h2>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Remortgage to a better rate</strong> — lower LTV bands (60%, 75%) unlock the cheapest mortgage deals.</li>
          <li><strong>Release equity</strong> — remortgage for a higher amount to fund renovations, debt consolidation, or a deposit on a second property.</li>
          <li><strong>Sell and downsize</strong> — know your net proceeds after selling costs (typically 2–3% agent fees + legal).</li>
          <li><strong>Buy-to-let deposit</strong> — many BTL lenders require 25% deposit, so you need at least 25% of the target property's value in accessible equity.</li>
          <li><strong>Equity loan repayment</strong> — if you used Help to Buy, you'll need to understand your current equity to plan the equity loan repayment.</li>
        </ul>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem
          question="How much equity do I have in my home?"
          answer="Enter your original purchase price, current property value, deposit, mortgage term, interest rate, and years owned into the calculator above. It calculates your outstanding balance using standard amortisation and shows your equity in pounds and as a percentage."
        />
        <FAQItem
          question="How much equity do I need to remortgage?"
          answer="Most lenders require at least 5–10% equity to remortgage (90–95% LTV). However, the best rates are available at 60% LTV or below. If you're in negative equity (owe more than the home is worth), you'll typically need to stay with your current lender or wait for values to recover."
        />
        <FAQItem
          question="How much equity will I have in 5 years?"
          answer="This depends on your repayment schedule and property value growth. On a £250,000 repayment mortgage at 4.5% over 25 years, you'd pay off roughly £30,000 in capital over 5 years. Add property appreciation (e.g. 3% p.a. = ~£45,000) and you could have ~£75,000 more equity than today."
        />
        <FAQItem
          question="Can I release equity without selling my home?"
          answer="Yes — remortgaging to a higher loan amount is the most common way to release equity. Some homeowners aged 55+ can also use lifetime mortgages (equity release). Both options let you access cash without selling, though they increase your debt."
        />
        <FAQItem
          question="How do I calculate equity in my house after renovations?"
          answer="Update the 'current property value' field to reflect the post-renovation value (a local estate agent can provide a free valuation). Your equity is then: new value minus outstanding mortgage. Renovations that add more value than they cost create instant equity."
        />
        <FAQItem
          question="What is loan-to-value (LTV) and why does it matter?"
          answer="LTV is your outstanding mortgage as a percentage of your property's value. Lower LTV means more equity and unlocks better mortgage rates. For example, 60% LTV means you own 40% of your home's value outright. Each 5% LTV improvement typically reduces available rates by 0.1–0.2%."
        />
      </div>
    </div>

    <LenderLinkGrid
      calculatorType="equity"
      title="Equity Calculator by Lender"
      description="See how your equity position compares against specific lender LTV bands and remortgage thresholds."
    />
  </section>
);

export const RepaymentSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How UK Mortgage Repayments Are Calculated</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>
          Monthly mortgage repayments in the UK are calculated using standard amortisation: each payment covers that month's interest charge plus a portion of the capital. Early payments are mostly interest; later payments are mostly capital. The formula ensures the loan is fully repaid by the end of the term.
        </p>
        <p>
          For a £250,000 mortgage at 4.75% over 25 years, the monthly repayment is approximately £1,424. Over the full term you'd pay £177,200 in total interest — more than 70% of the original loan amount. Reducing the rate by just 0.5% saves roughly £18,000 in interest over the term.
        </p>
        <p>
          This calculator uses 28-digit decimal precision to match the exact figures your lender would produce. Enter your loan amount, interest rate, and term above to see your monthly payment, total interest cost, and full amortisation breakdown.
        </p>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Understanding Your Mortgage Costs</h2>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Capital repayment</strong> — reduces your outstanding balance each month, building equity.</li>
          <li><strong>Interest charge</strong> — calculated daily or monthly on the outstanding balance.</li>
          <li><strong>Total cost of borrowing</strong> — the sum of all interest payments over the term. A lower rate or shorter term dramatically reduces this.</li>
          <li><strong>Overpayments</strong> — even small additional payments (e.g. £100/month) can save tens of thousands in interest and shorten your term by years.</li>
          <li><strong>Rate changes</strong> — if you're on a variable or tracker rate, your monthly payment can change. Fixed rates provide payment certainty for 2–5 years.</li>
        </ul>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem
          question="How much will my mortgage repayments be per month?"
          answer="Your monthly repayment depends on three factors: loan amount, interest rate, and term length. For example, a £200,000 mortgage at 5% over 25 years costs £1,169/month. Enter your own figures in the calculator above for an instant, precise result."
        />
        <FAQItem
          question="How much interest will I pay over my mortgage term?"
          answer="Total interest is typically 50–80% of the original loan for a 25-year mortgage at current rates. A £300,000 loan at 5% over 25 years costs £224,000 in interest. Shorter terms or lower rates significantly reduce total interest — a 20-year term on the same loan saves £52,000."
        />
        <FAQItem
          question="Should I choose a longer mortgage term to reduce payments?"
          answer="A longer term reduces monthly payments but increases total interest. A £250,000 mortgage at 5%: over 25 years = £1,461/month (£188,000 interest); over 35 years = £1,263/month (£280,000 interest). The 10 extra years cost £92,000 more in interest for £198/month lower payments."
        />
        <FAQItem
          question="How much can I save by overpaying my mortgage?"
          answer="Overpaying £200/month on a £250,000 mortgage at 5% over 25 years saves approximately £42,000 in interest and clears the mortgage 5 years early. Most lenders allow up to 10% overpayment per year without penalty."
        />
        <FAQItem
          question="What happens when my fixed rate ends?"
          answer="When your fixed rate expires, you'll move to your lender's standard variable rate (SVR) — typically 7–8.5%. This can increase payments by £200–500/month. Remortgaging to a new deal before the fix ends avoids the SVR. Most borrowers switch every 2–5 years."
        />
        <FAQItem
          question="Is an interest-only mortgage cheaper?"
          answer="Monthly payments are lower because you only pay interest, not capital. On a £250,000 loan at 5%, interest-only costs £1,042/month vs £1,461 for repayment. But you still owe the full £250,000 at the end of the term and need a repayment strategy (savings, investments, or selling the property)."
        />
      </div>
    </div>

    <LenderLinkGrid
      calculatorType="repayment"
      title="Repayment Calculator by Lender"
      description="See monthly payments calculated with each lender's indicative SVR — useful for stress-testing what happens after your fixed rate ends."
    />
  </section>
);

export const OverpaymentSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How Mortgage Overpayments Work in the UK</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>An overpayment is any amount you pay on top of your normal monthly mortgage payment. Because it comes straight off your outstanding balance, every pound you overpay removes all the future interest that balance would have accrued — which is why overpaying early in the term has such an outsized effect.</p>
        <p>Most UK lenders let you overpay up to 10% of your outstanding balance each year without penalty while you are in a fixed-rate deal. Go above that limit and you may face an early repayment charge (ERC), typically 1–5% of the amount overpaid. On tracker and standard variable rate mortgages, unlimited overpayments are usually allowed — but always confirm your own lender's terms first.</p>
        <p>Overpaying £150 a month on a £250,000 mortgage at 5% over 25 years can clear the loan several years early and save tens of thousands in interest. Enter your figures above to see the exact time and interest you would save.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Overpay or Save? What to Consider</h2>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Check your annual allowance</strong> — stay within the penalty-free limit (commonly 10%) unless you are on a variable rate.</li>
          <li><strong>Keep an emergency fund</strong> — overpayments are hard to get back; don't overpay money you may need soon.</li>
          <li><strong>Compare with savings rates</strong> — if a savings account pays more than your mortgage rate after tax, saving may win.</li>
          <li><strong>Clear costlier debt first</strong> — credit cards and loans usually charge far more than a mortgage.</li>
          <li><strong>Decide term vs payment</strong> — ask your lender to reduce the term (bigger interest saving) rather than lowering future payments.</li>
        </ul>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="How much can I overpay my mortgage without penalty?" answer="Most UK lenders allow overpayments of up to 10% of the outstanding balance per year on fixed-rate deals without an early repayment charge. Tracker and variable-rate mortgages often allow unlimited overpayments. Always confirm your lender's exact allowance before overpaying." />
        <FAQItem question="Is it better to overpay or reduce my mortgage term?" answer="Both save interest. Reducing the term locks in a commitment to higher payments and usually saves the most interest; regular overpayments keep flexibility because you can stop any time. If your budget is stable, cutting the term maximises savings." />
        <FAQItem question="How much could I save by overpaying £100 a month?" answer="On a £200,000 mortgage at 5% over 25 years, overpaying £100/month saves roughly £25,000 in interest and clears the mortgage around 3 years early. Enter your own balance, rate and term above for a precise figure." />
        <FAQItem question="Does overpaying reduce my monthly payment or my term?" answer="By default most lenders keep your term the same and reduce future interest, effectively shortening the term. You can usually ask them instead to lower your monthly payment. Tell your lender which outcome you want." />
        <FAQItem question="What is an early repayment charge (ERC)?" answer="An ERC is a fee some lenders charge if you overpay above your allowance or repay the mortgage in full during a fixed deal. It is typically 1–5% of the amount and decreases over the deal period. Check your mortgage offer for the exact terms." />
      </div>
    </div>
    <LenderLinkGrid calculatorType="overpayment" title="Overpayment Calculator by Lender" description="See overpayment guidance tailored to specific UK lenders and their typical allowances." />
  </section>
);

export const AffordabilitySEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How Mortgage Affordability Is Assessed in the UK</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>Affordability is how lenders decide the maximum they will lend you. It starts with an income multiple — usually 4 to 4.5 times your gross annual income — but the final figure is shaped by a detailed look at your outgoings and a stress test.</p>
        <p>Lenders subtract your regular commitments (credit cards, loans, car finance, childcare, and other dependants' costs) from your income, then check you could still afford the payments if interest rates rose — commonly stress-tested at around 3% above the product rate. If the stressed payment takes too large a share of your net income, the amount they offer falls.</p>
        <p>Our affordability calculator mirrors this approach: income multiple, commitments, deposit and a stress test. Enter your details above for a realistic estimate — no credit check and nothing stored.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">How to Increase What You Can Borrow</h2>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Reduce existing debt</strong> — clearing credit cards and loans before applying frees up affordability.</li>
          <li><strong>Grow your deposit</strong> — a lower LTV can unlock higher multiples and better rates.</li>
          <li><strong>Apply jointly</strong> — a second income is combined in the multiplier calculation.</li>
          <li><strong>Keep credit clean</strong> — avoid new borrowing and missed payments in the months before applying.</li>
          <li><strong>Consider the term</strong> — a longer term lowers the monthly payment, which can raise the amount offered.</li>
        </ul>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="How many times my salary can I borrow for a mortgage?" answer="Most UK lenders offer 4 to 4.5 times gross annual income. Some offer up to 5–5.5 times for higher earners, certain professionals, or larger deposits. Your final figure also depends on your outgoings and passing the affordability stress test." />
        <FAQItem question="What counts against me in an affordability check?" answer="Credit card balances, personal loans, car finance, student loan repayments, childcare, and the number of financial dependants all reduce what a lender will offer, because they lower your disposable income." />
        <FAQItem question="Does a bigger deposit mean I can borrow more?" answer="Often yes. A larger deposit lowers your loan-to-value, which can unlock better rates and, with some lenders, higher income multiples — increasing both what you can borrow and what you can afford." />
        <FAQItem question="How is the mortgage stress test calculated?" answer="Lenders check you could still afford repayments if rates rose, typically testing at around 3% above the product rate. If the stressed payment exceeds roughly 40–50% of your net income, the loan may be reduced or declined." />
        <FAQItem question="Can I get a mortgage if I'm self-employed?" answer="Yes. Lenders usually ask for 2–3 years of accounts or tax calculations and assess an average of your profits. A strong deposit and clean credit history help. Specialist lenders exist for newer businesses and contractors." />
      </div>
    </div>
    <LenderLinkGrid calculatorType="affordability" title="Affordability by Lender" description="Lenders differ on income multiples and criteria — explore specific UK lenders." />
  </section>
);

export const BuyToLetSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How Buy-to-Let Mortgages Work in the UK</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>Buy-to-let (BTL) mortgages are for property you intend to rent out rather than live in. They are assessed differently from residential mortgages: lenders focus less on your personal income and more on the rent the property is expected to generate.</p>
        <p>Most BTL lenders require a deposit of at least 25% and apply an interest coverage ratio (ICR) — the rent must typically cover 125–145% of the mortgage interest, stress-tested at a notional rate (often around 5.5% or higher). Many BTL mortgages are interest-only, keeping monthly payments lower, with the capital repaid when the property is sold or refinanced.</p>
        <p>Our buy-to-let calculator estimates your rental yield, monthly cash flow and whether the rent meets typical ICR requirements. Enter the purchase price, deposit, rate and expected rent above.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Key Numbers Every Landlord Should Check</h2>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Rental yield</strong> — annual rent as a percentage of the property price; gross yield ignores costs, net yield includes them.</li>
          <li><strong>Interest coverage ratio (ICR)</strong> — how far the rent exceeds the stressed mortgage interest; central to BTL approval.</li>
          <li><strong>Stamp duty surcharge</strong> — second properties carry an additional SDLT surcharge in England and Northern Ireland.</li>
          <li><strong>Tax on rental income</strong> — mortgage interest relief is now a 20% tax credit, not a deduction; factor this into net returns.</li>
          <li><strong>Void periods and costs</strong> — budget for empty months, maintenance, letting fees and insurance.</li>
        </ul>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="How much deposit do I need for a buy-to-let mortgage?" answer="Most buy-to-let lenders require at least 25% of the property value, though the best rates often need 40% or more. A larger deposit improves your interest coverage ratio and widens the deals available." />
        <FAQItem question="What is a good rental yield in the UK?" answer="Gross rental yields of around 5–8% are generally considered healthy, though this varies widely by region. Northern cities often offer higher yields than the South East. Always compare net yield after costs, not just gross." />
        <FAQItem question="What is the interest coverage ratio (ICR)?" answer="ICR is the ratio of expected rent to the mortgage interest, stress-tested by the lender. Many require rent to cover 125–145% of interest at a notional rate. If the rent falls short, you may need a larger deposit or a lower loan." />
        <FAQItem question="Do I pay extra stamp duty on a buy-to-let?" answer="Yes. Additional properties in England and Northern Ireland carry a stamp duty surcharge on top of standard rates. Scotland and Wales apply their own equivalents. Use a stamp duty calculator with the second-home option to see the exact figure." />
        <FAQItem question="Are buy-to-let mortgages usually interest-only?" answer="Many are. Interest-only keeps monthly payments lower and improves cash flow, but you still owe the full loan at the end of the term and need a plan to repay it — usually by selling or refinancing the property." />
      </div>
    </div>
  </section>
);

export const StampDutySEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How Stamp Duty Works When Buying a UK Home</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>Stamp duty is a tax you pay when you buy a property or land over a certain price. It is charged in bands — you pay a rate only on the portion of the price that falls within each band, not on the whole amount. The tax has different names and thresholds across the UK: Stamp Duty Land Tax (SDLT) in England and Northern Ireland, Land and Buildings Transaction Tax (LBTT) in Scotland, and Land Transaction Tax (LTT) in Wales.</p>
        <p>First-time buyers benefit from higher tax-free thresholds in England, Northern Ireland and Scotland (Wales has no first-time buyer relief). Buyers of additional properties, such as second homes and buy-to-lets, pay a surcharge on top of the standard rates.</p>
        <p>Because thresholds and rates are set by government and can change at fiscal events, our calculator applies the current bands for each UK nation — always confirm the latest figures on GOV.UK before you complete. Enter your price and buyer type above for an instant breakdown.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">What Affects Your Stamp Duty Bill</h2>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Where the property is</strong> — England/NI use SDLT, Scotland LBTT, Wales LTT, each with different bands.</li>
          <li><strong>Whether you're a first-time buyer</strong> — relief raises the tax-free threshold in most of the UK.</li>
          <li><strong>Whether it's an additional property</strong> — second homes and buy-to-lets carry a surcharge.</li>
          <li><strong>The purchase price</strong> — the tax is tiered, so higher prices move into higher-rate bands.</li>
          <li><strong>Non-resident status</strong> — overseas buyers may pay an extra surcharge in England and Northern Ireland.</li>
        </ul>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="How is stamp duty calculated in the UK?" answer="Stamp duty is tiered: you pay a rate only on the part of the price within each band, not the full amount. The bands and thresholds differ between England/NI (SDLT), Scotland (LBTT) and Wales (LTT). Our calculator applies the correct bands for the nation you choose." />
        <FAQItem question="Do first-time buyers pay stamp duty?" answer="First-time buyers pay less. England, Northern Ireland and Scotland offer a higher tax-free threshold for eligible first-time buyers, while Wales has no specific first-time buyer relief. The relief usually applies up to a maximum purchase price." />
        <FAQItem question="How much extra stamp duty do I pay on a second home?" answer="Additional properties carry a surcharge on top of the standard rates across the UK, though the exact percentage varies by nation and can change at fiscal events. Select the additional-property option in the calculator to see the surcharge applied." />
        <FAQItem question="When do I have to pay stamp duty?" answer="Stamp duty is normally due within 14 days of completion in England and Northern Ireland (30 days in Scotland and Wales). Your solicitor or conveyancer usually files the return and pays it on your behalf from your completion funds." />
        <FAQItem question="Is stamp duty different in Scotland and Wales?" answer="Yes. Scotland charges Land and Buildings Transaction Tax (LBTT) and Wales charges Land Transaction Tax (LTT), each with their own bands and thresholds that differ from England's SDLT. Use the matching calculator for an accurate figure." />
      </div>
    </div>
  </section>
);

export const RemortgageSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">When Does Remortgaging Make Sense?</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>Remortgaging means switching your existing mortgage to a new deal, either with your current lender (a product transfer) or a new one. Most people remortgage when a fixed rate is about to end, to avoid slipping onto the lender's standard variable rate (SVR), which is usually far more expensive.</p>
        <p>The saving from remortgaging depends on the new rate, any arrangement fees, and how long you'll keep the deal. A lower rate can cut hundreds off your monthly payment, but fees and legal costs mean it's the total cost over the deal period — not just the headline rate — that matters. Building equity also helps: a lower loan-to-value can move you into a cheaper rate band.</p>
        <p>Use the calculator above to compare your current deal against a new rate and see the break-even point once fees are included.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="When should I start looking to remortgage?" answer="Most lenders let you lock in a new deal up to six months before your current rate ends. Starting early means you can secure a rate and avoid dropping onto the standard variable rate when your fix expires." />
        <FAQItem question="Does remortgaging cost money?" answer="It can. Watch for arrangement/product fees, valuation and legal costs, and any early repayment charge on your current deal. Many remortgage products include free valuation and legals. Always compare the total cost over the deal period, not just the rate." />
        <FAQItem question="Is a product transfer the same as remortgaging?" answer="A product transfer is switching to a new deal with your existing lender, which is usually quicker with less paperwork. A full remortgage moves to a new lender and may offer a better rate but involves affordability checks and legal work." />
        <FAQItem question="Can I remortgage to release equity?" answer="Yes. You can remortgage for a higher amount than you currently owe and take the difference as cash, provided you have enough equity and pass affordability. Common uses include home improvements or consolidating debt — though it increases your borrowing." />
      </div>
    </div>
  </section>
);

export const InterestOnlySEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How Interest-Only Mortgages Work</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>On an interest-only mortgage your monthly payment covers just the interest, not the capital. Payments are lower than a repayment mortgage, but the full loan amount is still owed at the end of the term — so you need a credible plan to repay it, such as savings, investments, or selling the property.</p>
        <p>On a £250,000 loan at 5%, interest-only costs around £1,042 a month, compared with roughly £1,461 on a repayment basis. The difference is that with repayment you own the home outright at the end; with interest-only you still owe £250,000. Lenders apply stricter criteria to interest-only deals and usually want evidence of your repayment strategy.</p>
        <p>Use the calculator above to compare interest-only and repayment side by side and see the long-term cost of each.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="Is an interest-only mortgage cheaper?" answer="The monthly payment is lower because you only pay interest. But you still owe the full loan at the end of the term, so the total cost of owning the home outright is usually higher unless your repayment plan performs well." />
        <FAQItem question="How do I repay an interest-only mortgage?" answer="Common strategies include savings and ISAs, investments, pensions, or selling the property. Lenders will want to see a credible plan before approving an interest-only mortgage and may review it during the term." />
        <FAQItem question="Can I switch from interest-only to repayment?" answer="Usually yes, subject to affordability. Switching to repayment increases your monthly payment but steadily clears the balance. Some borrowers switch part of the loan to repayment to reduce the amount owed at the end." />
        <FAQItem question="Who are interest-only mortgages suitable for?" answer="They can suit landlords, higher earners with irregular income, or those with a clear repayment vehicle. They carry more risk than repayment mortgages because the capital does not reduce automatically." />
      </div>
    </div>
  </section>
);

export const SalaryToMortgageSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How Much Mortgage Can You Get From Your Salary?</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>Lenders translate salary into borrowing using an income multiple, typically 4 to 4.5 times gross annual income, then refine it with an affordability and stress test. A £45,000 salary usually supports a mortgage of around £180,000–£202,500 before other factors are considered.</p>
        <p>Your take-home pay, existing commitments and deposit all influence the final figure. Joint applications combine both incomes, which can substantially increase borrowing. The calculator above turns your salary into an estimated mortgage and property budget in seconds.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="What mortgage can I get on a £30,000 salary?" answer="At 4–4.5 times income, a £30,000 salary typically supports a mortgage of around £120,000–£135,000, before accounting for your deposit, outgoings and the affordability stress test. A joint application would increase this." />
        <FAQItem question="Do lenders use gross or net salary?" answer="Income multiples are based on gross (pre-tax) annual salary. However, the affordability assessment then looks at your net income and outgoings to check the payments are sustainable." />
        <FAQItem question="Does overtime or bonus count towards a mortgage?" answer="Many lenders include a proportion of regular overtime, bonus or commission, often 50–100% if it is consistent and evidenced on payslips. Policies vary between lenders." />
        <FAQItem question="How can I borrow more on the same salary?" answer="Clear existing debts, increase your deposit, apply jointly, keep your credit record clean, and consider a longer term. Each can improve the amount a lender is willing to offer." />
      </div>
    </div>
  </section>
);

export const FixOrTrackSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">Fixed vs Tracker Mortgages: Which Is Right for You?</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>A fixed-rate mortgage keeps your interest rate — and monthly payment — the same for a set period, usually 2 or 5 years. A tracker follows the Bank of England base rate plus a set margin, so your payment moves up or down as the base rate changes.</p>
        <p>Fixed rates give certainty and protect you if rates rise, but you may pay more if rates fall and there are usually early repayment charges. Trackers can be cheaper when rates are stable or falling, but your payments can increase. The right choice depends on your budget's sensitivity to change and your view on where rates are heading. The calculator above models different base-rate scenarios so you can compare.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="Should I fix my mortgage or go with a tracker?" answer="Fix if you value certainty and want protection from rate rises; choose a tracker if you can absorb payment changes and expect rates to stay flat or fall. Consider how tight your budget is and how long you want the deal for." />
        <FAQItem question="What happens to a tracker if the base rate rises?" answer="Your rate and monthly payment rise by the same amount as the base rate, because a tracker is base rate plus a fixed margin. If the base rate falls, your payment falls too." />
        <FAQItem question="Can I switch from a tracker to a fixed rate later?" answer="Often yes. Some trackers have no early repayment charges, letting you switch to a fix if rates start rising. Check your deal's terms, as some trackers do carry ERCs." />
        <FAQItem question="Are 2-year or 5-year fixes better?" answer="A 2-year fix offers flexibility to remortgage sooner; a 5-year fix gives longer certainty and usually lower fees per year, but locks you in for longer with potential ERCs. It depends on your plans and rate outlook." />
      </div>
    </div>
  </section>
);

export const RateCompareSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">How to Compare Mortgage Deals on True Cost</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>The lowest headline rate is not always the cheapest deal. Arrangement fees, cashback, and the length of the deal all change the true cost. A slightly higher rate with no fee can beat a market-leading rate that carries a large product fee, especially on smaller loans.</p>
        <p>The best way to compare is over the deal period: add the total interest for the fixed term to the fees, and subtract any cashback. The calculator above lets you line up several deals side by side and see the real cost of each, so you can pick the one that's cheapest for your situation.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="Is the lowest mortgage rate always the best deal?" answer="No. A low rate with a high arrangement fee can cost more than a slightly higher rate with no fee, particularly on smaller loans. Compare the total cost over the deal period, including fees and any cashback." />
        <FAQItem question="How do arrangement fees affect the cost?" answer="Fees are often £999–£1,499 and can be added to the loan (where you pay interest on them) or paid upfront. On smaller mortgages, a fee can outweigh the saving from a lower rate, so always include it in your comparison." />
        <FAQItem question="Should I add the mortgage fee to the loan?" answer="Adding the fee keeps upfront costs down but means you pay interest on it over the whole term. Paying it upfront avoids that interest. If you plan to remortgage soon, adding it can occasionally make sense — compare both." />
        <FAQItem question="How often should I compare mortgage deals?" answer="Review the market whenever your current deal is within about six months of ending, and any time your circumstances change. Rates move regularly, so comparing before each remortgage can save a significant amount." />
      </div>
    </div>
  </section>
);

export const HomeImprovementSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">Financing Home Improvements: Loan vs Remortgage</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>There are two common ways to fund renovations: an unsecured personal loan, or borrowing more against your home by remortgaging or taking a further advance. A personal loan is quicker and keeps your mortgage untouched, but rates are usually higher and terms shorter. Borrowing against your home typically has a lower rate but spreads the cost over a long term, so the total interest can be higher, and the debt is secured on your property.</p>
        <p>The right choice depends on the amount, how quickly you can repay, and your current mortgage deal. The calculator above compares the total cost of each route so you can see which is cheaper for your project.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="Is it better to get a loan or remortgage for home improvements?" answer="A personal loan suits smaller amounts repaid quickly, with no risk to your home. Remortgaging or a further advance suits larger sums, usually at a lower rate but over a longer term, secured against your property. Compare the total cost of each." />
        <FAQItem question="Can I add home improvement costs to my mortgage?" answer="Yes, by remortgaging for a higher amount or taking a further advance from your lender, if you have enough equity and pass affordability. This spreads the cost but adds it to your secured borrowing." />
        <FAQItem question="Do home improvements add value to my property?" answer="Some do more than others. Kitchens, bathrooms, and extra usable space often add value, while very personal or over-specified work may not. Improvements that add more value than they cost create additional equity." />
        <FAQItem question="Will borrowing more affect my mortgage rate?" answer="Possibly. Borrowing more raises your loan-to-value, which can move you into a higher rate band. If your home has risen in value, though, your LTV may still be low enough to keep a good rate." />
      </div>
    </div>
  </section>
);

export const CompareSEOContent = () => (
  <section className="mt-12 pt-10 border-t border-border space-y-8">
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-3">Comparing Mortgage Scenarios Side by Side</h2>
      <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
        <p>Small differences in rate, term or deposit can add up to tens of thousands of pounds over the life of a mortgage. Comparing scenarios side by side makes those trade-offs visible: a shorter term raises the monthly payment but slashes total interest; a larger deposit lowers your loan-to-value and can unlock a cheaper rate.</p>
        <p>Use the comparison above to test different combinations — for example a 25-year versus a 30-year term, or a 4.5% versus a 5% rate — and see the impact on both your monthly payment and the total cost of borrowing before you commit.</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
      <div className="rounded-2xl border border-border p-4">
        <FAQItem question="Does a shorter mortgage term save money?" answer="Yes. A shorter term means higher monthly payments but far less total interest, because you clear the balance faster. Comparing a 25-year and a 30-year term on the same loan often shows a difference of tens of thousands in interest." />
        <FAQItem question="How much difference does the interest rate make?" answer="A large one. On a £250,000 mortgage, a 0.5% lower rate can save roughly £18,000 in interest over 25 years. Even small rate differences are worth comparing over the full term." />
        <FAQItem question="Is it better to increase my deposit or my term?" answer="A bigger deposit lowers your loan-to-value and can unlock cheaper rates, reducing cost. A longer term lowers monthly payments but increases total interest. Compare both against your budget and goals." />
      </div>
    </div>
  </section>
);
