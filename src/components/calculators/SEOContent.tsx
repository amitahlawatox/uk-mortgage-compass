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

const topLenders = ["barclays", "hsbc", "santander", "natwest", "nationwide", "halifax", "lloyds", "coventry", "tsb", "aldermore", "skipton", "yorkshire"];

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
            to={`/calculators/${calculatorType}/${l!.slug}`}
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
