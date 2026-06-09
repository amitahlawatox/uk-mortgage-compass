import { SEO } from "@/components/SEO";

export default function Methodology() {
  return (
    <>
      <SEO
        title="Methodology — How RepayWise Calculators Work | RepayWise"
        description="RepayWise uses standard UK mortgage amortisation formulas. All calculations are based on publicly available mathematics. We are not affiliated with any bank or lender."
        path="methodology"
      />
      <div className="container max-w-3xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl font-bold">How Our Calculators Work</h1>
        <p className="text-muted-foreground leading-relaxed">
          RepayWise calculators use standard, publicly documented mathematical formulas that have been used in
          mortgage finance for decades. We do not scrape, copy or reverse-engineer any bank's proprietary
          calculator. All our calculations are based on the standard UK amortisation formula.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">The Amortisation Formula</h2>
          <p className="text-muted-foreground leading-relaxed">
            Monthly mortgage repayments are calculated using the standard annuity formula:
          </p>
          <div className="bg-card rounded-xl border border-border p-6 font-mono text-sm">
            <p className="mb-2"><strong>M = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> - 1)</strong></p>
            <p className="text-muted-foreground mt-4">Where:</p>
            <ul className="text-muted-foreground space-y-1 mt-2">
              <li><strong>M</strong> = Monthly payment</li>
              <li><strong>P</strong> = Principal (loan amount)</li>
              <li><strong>r</strong> = Monthly interest rate (annual rate / 12)</li>
              <li><strong>n</strong> = Total number of payments (years × 12)</li>
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This formula is published in standard finance textbooks and is freely available from sources
            including the Bank of England, the Financial Conduct Authority, and academic institutions.
            No bank owns this mathematics.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Stamp Duty Calculations</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our stamp duty calculator uses the official SDLT (England and Northern Ireland), LBTT (Scotland)
            and LTT (Wales) tax bands as published by HMRC, Revenue Scotland and the Welsh Revenue Authority
            respectively. These are public government data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Data Sources</h2>
          <p className="text-muted-foreground leading-relaxed">
            RepayWise does not use any proprietary bank data, APIs or scraping tools. The indicative
            Standard Variable Rates (SVRs) shown on lender pages are approximate figures based on publicly
            available market information. Users should always confirm actual rates, terms and eligibility
            directly with their chosen lender.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Independence Statement</h2>
          <p className="text-muted-foreground leading-relaxed">
            RepayWise is a completely independent platform. We are not affiliated with, endorsed by, or
            partnered with any bank, building society, or financial institution. We do not sell mortgages,
            provide financial advice, or act as a mortgage broker. We are not regulated by the Financial
            Conduct Authority because we provide calculators for educational and informational purposes only.
          </p>
        </section>

        <div className="border-t border-border pt-6 text-xs text-muted-foreground/60">
          <p>
            Your home may be repossessed if you do not keep up repayments on your mortgage.
            Always consult a qualified, FCA-authorised mortgage adviser before making financial decisions.
          </p>
        </div>
      </div>
    </>
  );
}
