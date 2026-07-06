/**
 * Wales LTT (Land Transaction Tax) Calculator
 * Target keyword: "stamp duty calculator wales" — 2,900/mo, KD 20
 */
import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { SiteShell } from "@/components/layout/SiteShell";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { calculateStampDuty } from "@/lib/finance/stampDuty";
import { formatGBP } from "@/lib/finance/decimal";

const LTT_BANDS = [
  { band: "Up to £225,000", rate: "0%", note: "Nil rate" },
  { band: "£225,001 – £400,000", rate: "6%", note: "" },
  { band: "£400,001 – £750,000", rate: "7.5%", note: "" },
  { band: "£750,001 – £1,500,000", rate: "10%", note: "" },
  { band: "Over £1,500,000", rate: "12%", note: "" },
];

const FAQ_ITEMS = [
  {
    question: "What is LTT in Wales?",
    answer:
      "Land Transaction Tax (LTT) is the Welsh equivalent of Stamp Duty Land Tax (SDLT). It replaced SDLT in Wales on 1 April 2018 and is administered by the Welsh Revenue Authority (WRA). LTT applies to all residential and non-residential property purchases in Wales.",
  },
  {
    question: "Do first-time buyers get LTT relief in Wales?",
    answer:
      "No. Unlike England and Scotland, Wales does not currently offer a first-time buyer relief for LTT. All buyers pay LTT at the same standard rates, regardless of whether it is their first property purchase.",
  },
  {
    question: "What surcharge applies to second homes in Wales?",
    answer:
      "In Wales, purchasing a second home or buy-to-let property attracts a 5% Higher Residential Rates (HRR) surcharge on top of standard LTT rates. This applies to the total purchase price and is paid in addition to the standard LTT calculation.",
  },
  {
    question: "When do I pay LTT?",
    answer:
      "LTT must be paid within 30 days of completion of the property purchase in Wales. Your solicitor or conveyancer will typically file the LTT return and pay the tax on your behalf as part of the conveyancing process.",
  },
  {
    question: "Is LTT higher or lower than SDLT in England?",
    answer:
      "It depends on the purchase price. At lower price points (under £225,000), LTT is zero — the same nil-rate threshold as England's standard SDLT. Between £225,000 and £925,000, LTT can be higher than SDLT because Welsh rates start at 6% above the nil-rate band versus 5% in England.",
  },
];

const StampDutyWalesPage = () => {
  const [price, setPrice] = useState(200_000);
  const [additional, setAdditional] = useState(false);

  const result = useMemo(
    () => calculateStampDuty({ price, region: "wales", firstTimeBuyer: false, additionalProperty: additional }),
    [price, additional],
  );

  return (
    <SiteShell>
      <SEO
        title="LTT Calculator Wales 2026 — Land Transaction Tax | RepayWise"
        description="Free Wales stamp duty (LTT) calculator. Calculate Land Transaction Tax for any Welsh property purchase. Includes Higher Residential Rates for second homes and buy-to-let. No login required."
        path="/calculators/stamp-duty/wales"
        faqItems={FAQ_ITEMS}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Wales LTT Calculator",
          url: "https://repaywise.co.uk/calculators/stamp-duty/wales",
          applicationCategory: "FinanceApplication",
          description: "Free LTT calculator for Wales property purchases. Covers Higher Residential Rates surcharge.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
          areaServed: { "@type": "AdministrativeArea", name: "Wales" },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://repaywise.co.uk/" },
          { name: "Calculators", url: "https://repaywise.co.uk/calculators/stamp-duty" },
          { name: "Wales LTT Calculator", url: "https://repaywise.co.uk/calculators/stamp-duty/wales" },
        ]}
      />

      <CalculatorShell
        eyebrow="Wales Property Tax"
        title="Wales Stamp Duty (LTT) Calculator"
        intro="Calculate Land Transaction Tax for any Welsh property purchase. Covers the Higher Residential Rates surcharge for second homes and buy-to-let. Free, independent, no login."
        leadCalculator="stamp_duty_wales"
      >
        <div className="space-y-5">
          <CurrencyInput label="Property price" value={price} onChange={setPrice} min={0} max={10_000_000} />
          <button
            type="button"
            onClick={() => setAdditional((v) => !v)}
            className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold transition-colors text-left ${
              additional
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-card text-muted-foreground hover:border-accent/50"
            }`}
          >
            {additional ? "✓ " : ""}Additional property / buy-to-let (+5% Higher Residential Rates)
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">LTT due</p>
          <p className="text-5xl font-bold text-accent">{formatGBP(result.total)}</p>
          <p className="text-sm text-muted-foreground mt-2">Effective rate: {result.effectiveRate.toFixed(2)}%</p>
          {result.notes.length > 0 && (
            <div className="mt-3 space-y-1">
              {result.notes.map((n, i) => <p key={i} className="text-xs text-muted-foreground">{n}</p>)}
            </div>
          )}
        </div>

        {result.breakdown.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Band</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-semibold">Taxable</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-semibold">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3">
                      <span className="font-medium">{row.band}</span>
                      <span className="ml-2 text-muted-foreground">@ {(row.rate * 100).toFixed(1)}%</span>
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{formatGBP(row.taxable)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatGBP(row.tax)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-accent/30 bg-accent/5">
                  <td className="px-4 py-3 font-bold">Total LTT</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{formatGBP(price)}</td>
                  <td className="px-4 py-3 text-right font-bold text-accent">{formatGBP(result.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CalculatorShell>

      <article className="max-w-3xl mx-auto px-4 pb-20 mt-4 space-y-10 text-sm sm:text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">LTT rates in Wales 2026</h2>
          <p className="mb-4">
            Land Transaction Tax (LTT) replaced Stamp Duty Land Tax in Wales on 1 April 2018. Administered by the Welsh Revenue Authority (WRA), LTT has different rates and thresholds from both SDLT in England and LBTT in Scotland. Crucially, Wales does not offer first-time buyer relief — all buyers pay at the standard rates.
          </p>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Purchase price</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">LTT rate</th>
                </tr>
              </thead>
              <tbody>
                {LTT_BANDS.map((b, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3">{b.band}</td>
                    <td className="px-4 py-3 text-right font-semibold text-accent">{b.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">No first-time buyer relief in Wales</h2>
          <p>
            Unlike England (£425,000 nil-rate for FTBs) and Scotland (£175,000 FTB threshold), Wales does not offer any first-time buyer relief on LTT. All buyers in Wales pay LTT at the same standard rates regardless of whether it is their first property purchase.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Higher Residential Rates in Wales</h2>
          <p>
            Buying a second home, holiday home, or buy-to-let property in Wales attracts the Higher Residential Rates — a 5% surcharge added to standard LTT rates on the total purchase price. This applies where you already own a residential property anywhere in the world and the new purchase is residential.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQ_ITEMS.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs text-muted-foreground border-t border-border pt-6">
          RepayWise is independent and not affiliated with the Welsh Revenue Authority or any lender. LTT rates are correct as of 2026 but may change. Always confirm with a solicitor or the WRA before completing a transaction.
        </p>
      </article>
    </SiteShell>
  );
};

export default StampDutyWalesPage;
