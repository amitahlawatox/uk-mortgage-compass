import { LENDER_CONTENT, getGenericContent, type LenderContent } from "@/lib/uk/lenderContent";

interface Props {
  slug: string;
  name: string;
  maxLtv: number;
  svr: number;
}

export function LenderInsight({ slug, name, maxLtv, svr }: Props) {
  const content: LenderContent = LENDER_CONTENT[slug] ?? getGenericContent(name, maxLtv, svr);

  return (
    <section className="mt-8 space-y-6">
      {/* Unique lender overview */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-3">About {name} Mortgages</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{content.overview}</p>
      </div>

      {/* Key features */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-base font-semibold mb-3">{name} Key Features</h3>
        <ul className="space-y-2">
          {content.keyFeatures.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1 size-1.5 rounded-full bg-accent shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overpayment policy + best for — side by side on desktop */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold mb-3">{name} Overpayment Rules</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{content.overpaymentPolicy}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold mb-3">Best For</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{content.bestFor}</p>
        </div>
      </div>

      {/* What makes them different */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-base font-semibold mb-3">What Makes {name} Different</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{content.whatMakesThemDifferent}</p>
      </div>

      {/* Typical products */}
      <div className="flex flex-wrap gap-2 px-1">
        {content.typicalProducts.map((product, i) => (
          <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border">
            {product}
          </span>
        ))}
      </div>

      {/* Independence disclaimer — required for legal protection */}
      <p className="text-xs text-muted-foreground/60 px-1 leading-relaxed">
        RepayWise is an independent third-party calculator. We are not affiliated with, endorsed by, or
        partnered with {name}. All calculations use standard UK amortisation mathematics and publicly
        available data. Always verify rates and terms directly with {name} before making financial decisions.
      </p>
    </section>
  );
}
