/**
 * Scotland LBTT (Land and Buildings Transaction Tax) Calculator
 * Target keyword: "stamp duty calculator scotland" — 3,600/mo, KD 29
 */
import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { SiteShell } from "@/components/layout/SiteShell";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { calculateStampDuty } from "@/lib/finance/stampDuty";
import { formatGBP } from "@/lib/finance/decimal";

const LBTT_BANDS = [
  { band: "Up to £145,000", rate: "0%", note: "Nil rate" },
  { band: "£145,001 – £250,000", rate: "2%", note: "" },
  { band: "£250,001 – £325,000", rate: "5%", note: "" },
  { band: "£325,001 – £750,000", rate: "10%", note: "" },
  { band: "Over £750,000", rate: "12%", note: "" },
];

const FAQ_ITEMS = [
  {
    question: "What is LBTT in Scotland?",
    answer:
      "Land and Buildings Transaction Tax (LBTT) is the Scottish equivalent of Stamp Duty Land Tax (SDLT). It applies to property purchases in Scotland and is administered by Revenue Scotland, not HMRC. The rates and thresholds differ from SDLT in England.",
  },
  {
    question: "Do first-time buyers get LBTT relief in Scotland?",
    answer:
      "Yes. In Scotland, first-time buyers pay no LBTT on the first £175,000 of a property purchase. Above £175,000, standard LBTT rates apply. This is different from England where the FTB nil-rate threshold is £425,000.",
  },
  {
    question: "What is the Additional Dwelling Supplement (ADS)?",
    answer:
      "The Additional Dwelling Supplement is an 8% surcharge applied to the total purchase price when buying a second home or buy-to-let property in Scotland. It applies to residential property purchases over £40,000 where you already own another dwelling.",
  },
  {
    question: "When do I pay LBTT?",
    answer:
      "LBTT must be paid within 30 days of the effective date of a property transaction in Scotland — typically the date of settlement (completion). Your solicitor will normally handle the LBTT return and payment on your behalf.",
  },
  {
    question: "Is LBTT the same as stamp duty?",
    answer:
      "No. Scotland replaced Stamp Duty Land Tax with LBTT in 2015. While both are property transaction taxes, they have different rates, bands, and reliefs. LBTT in Scotland is managed by Revenue Scotland, whereas SDLT in England is managed by HMRC.",
  },
];

const StampDutyScotlandPage = () => {
  const [price, setPrice] = useState(200_000);
  const [ftb, setFtb] = useState(false);
  const [additional, setAdditional] = useState(false);

  const result = useMemo(
    () => calculateStampDuty({ price, region: "scotland", firstTimeBuyer: ftb, additionalProperty: additional }),
    [price, ftb, additional],
  );

  return (
    <SiteShell>
      <SEO
        title="LBTT Calculator Scotland 2026 — Land and Buildings Transaction Tax | RepayWise"
        description="Free Scotland stamp duty (LBTT) calculator. Calculate Land and Buildings Transaction Tax for any Scottish property purchase. Includes first-time buyer relief and Additional Dwelling Supplement. No login required."
        path="/calculators/stamp-duty/scotland"
        faqItems={FAQ_ITEMS}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Scotland LBTT Calculator",
          url: "https://repaywise.co.uk/calculators/stamp-duty/scotland",
          applicationCategory: "FinanceApplication",
          description: "Free LBTT calculator for Scotland property purchases. Covers first-time buyer relief and Additional Dwelling Supplement.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
          areaServed: { "@type": "AdministrativeArea", name: "Scotland" },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators/stamp-duty" },
          { name: "Scotland LBTT Calculator", href: "/calculators/stamp-duty/scotland" },
        ]}
      />

      <CalculatorShell
        eyebrow="Scotland Property Tax"
        title="Scotland Stamp Duty (LBTT) Calculator"
        intro="Calculate Land and Buildings Transaction Tax for any Scottish property purchase. Covers first-time buyer relief and the Additional Dwelling Supplement. Free, independent, no login."
        leadCalculator="stamp_duty_scotland"
      >
        {/* INPUTS */}
        <div className="space-y-5">
          <CurrencyInput
            label="Property price"
            value={price}
            onChange={setPrice}
            min={0}
            max={10_000_000}
          />

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFtb((v) => !v)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                ftb
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-muted-foreground hover:border-accent/50"
              }`}
            >
              {ftb ? "✓ " : ""}First-time buyer
            </button>
            <button
              type="button"
              onClick={() => setAdditional((v) => !v)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                additional
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-muted-foreground hover:border-accent/50"
              }`}
            >
              {additional ? "✓ " : ""}Additional property
            </button>
          </div>
        </div>

        {/* RESULT */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">LBTT due</p>
          <p className="text-5xl font-bold text-accent">{formatGBP(result.total)}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Effective rate: {result.effectiveRate.toFixed(2)}%
          </p>
          {result.notes.length > 0 && (
            <div className="mt-3 space-y-1">
              {result.notes.map((n, i) => (
                <p key={i} className="text-xs text-muted-foreground">{n}</p>
              ))}
            </div>
          )}
        </div>

        {/* BREAKDOWN */}
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
                      <span className="ml-2 text-muted-foreground">@ {(row.rate * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{formatGBP(row.taxable)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatGBP(row.tax)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-accent/30 bg-accent/5">
                  <td className="px-4 py-3 font-bold">Total LBTT</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{formatGBP(price)}</td>
                  <td className="px-4 py-3 text-right font-bold text-accent">{formatGBP(result.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CalculatorShell>

      {/* CONTENT SECTION */}
      <article className="max-w-3xl mx-auto px-4 pb-20 mt-4 space-y-10 text-sm sm:text-base leading-relaxed text-muted-foreground">

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">LBTT rates in Scotland 2026</h2>
          <p className="mb-4">
            Land and Buildings Transaction Tax (LBTT) replaced Stamp Duty Land Tax in Scotland on 1 April 2015. It is administered by Revenue Scotland and applies to all residential and commercial property purchases in Scotland. The rates and thresholds differ significantly from SDLT in England and LTT in Wales.
          </p>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Purchase price</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">LBTT rate</th>
                </tr>
              </thead>
              <tbody>
                {LBTT_BANDS.map((b, i) => (
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
          <h2 className="text-xl font-bold text-foreground mb-3">First-time buyer relief in Scotland</h2>
          <p>
            First-time buyers in Scotland benefit from an enhanced nil-rate threshold of <strong className="text-foreground">£175,000</strong> — meaning no LBTT is payable on the first £175,000 of the purchase price. Above this threshold, standard LBTT rates apply. This is notably different from England, where the FTB nil-rate threshold is £425,000.
          </p>
          <p className="mt-3">
            The first-time buyer relief in Scotland applies to purchases up to £175,000 in value. For purchases above this, the relief still applies to the first £175,000, with standard rates on the remainder.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Additional Dwelling Supplement (ADS)</h2>
          <p>
            If you are purchasing an additional residential property in Scotland — such as a buy-to-let or second home — you must pay the Additional Dwelling Supplement on top of standard LBTT rates. As of December 2024, the ADS rate is <strong className="text-foreground">8%</strong> applied to the total purchase price (not just the amount above a threshold). It applies to purchases over £40,000.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">How LBTT differs from SDLT</h2>
          <p>
            Scotland's LBTT has different thresholds from England's SDLT. The nil-rate band in Scotland starts at a lower level (£145,000 vs £250,000 in England), and the top rates apply at lower thresholds. For many mid-range Scottish property purchases, LBTT can be higher than SDLT would be for an equivalent English property.
          </p>
        </section>

        {/* FAQ */}
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
          RepayWise is independent and not affiliated with Revenue Scotland or any lender. LBTT rates are correct as of 2026 but may change. Always confirm with a solicitor or Revenue Scotland before completing a transaction.
        </p>
      </article>
    </SiteShell>
  );
};

export default StampDutyScotlandPage;
