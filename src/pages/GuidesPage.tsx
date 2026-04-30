import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, Home, TrendingDown } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { trackIntentClick } from "@/lib/analytics";
import { buildLenderGuidePath, lenders } from "@/lib/uk/lenders";

const guides = [
  {
    slug: "help-to-buy-repayment",
    title: "Help to Buy Equity Loan Repayment Calculator",
    summary:
      "Calculate what you owe on your Help to Buy equity loan, including the escalating annual fees from year 6 and the repayment amount based on your home's current market value.",
    keyword: "help to buy repayment calculator",
    to: "/guides/help-to-buy-repayment",
    cta: "Open calculator",
    icon: Home,
  },
  {
    slug: "svr-cliff-strategy-2026",
    title: "The 2026 SVR Cliff Strategy",
    summary:
      "Explain the payment shock facing households leaving cheap fixed deals, when to review remortgage options, and how to model the jump before the fixed rate ends.",
    keyword: "mortgage fixed rate ending 2026",
    to: "/calculators/repayment",
    cta: "Use repayment calculator",
    icon: BookOpen,
  },
  {
    slug: "isa-vs-mortgage-overpayment-2026",
    title: "ISA vs Mortgage Overpayment (The 2026 Math)",
    summary:
      "Compare savings rates, mortgage rates, tax treatment, and liquidity so homeowners can decide whether to keep cash accessible or reduce long-term interest costs.",
    keyword: "overpay mortgage or ISA 2026",
    to: "/calculators/overpayment",
    cta: "Use overpayment calculator",
    icon: TrendingDown,
  },
  {
    slug: "first-time-buyer-stamp-duty-guide-post-2025",
    title: "First-Time Buyer's Stamp Duty Guide (Post-2025)",
    summary:
      "Cover the post-April 2025 threshold landscape, budgeting for tax with a tight deposit, and how to negotiate seller contributions when every pound matters.",
    keyword: "stamp duty thresholds 2026",
    to: "/calculators/stamp-duty",
    cta: "Use stamp duty calculator",
    icon: Home,
  },
];

const GuidesPage = () => (
  <SiteShell>
    <SEO
      title="Mortgage Guides & Homebuying Strategy - RepayWise"
      description="RepayWise editorial hub for UK mortgage strategy, stamp duty planning, overpayments, and first-time buyer decision guides."
      path="/guides"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "RepayWise Guides",
        url: "https://repaywise.co.uk/guides",
        description: "Editorial hub for UK mortgage guides, homebuying strategy, and calculator-led decision support.",
      }}
    />

    <section className="px-4 pt-16 pb-8 sm:pt-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
          Editorial Hub
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
          Mortgage guides built around real decisions
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-[64ch]">
          This section is where RepayWise turns calculator traffic into long-form trust. Each guide is designed
          to answer a specific UK homeowner or homebuyer question, then connect that advice to a calculator that
          helps the reader act on it immediately.
        </p>
      </div>
    </section>

    <section className="px-4 pb-16">
      <div className="max-w-5xl mx-auto grid gap-5">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <article key={guide.slug} className="rounded-3xl border glass-card p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="size-11 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="size-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Target keyword: {guide.keyword}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">{guide.title}</h2>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[62ch]">
                    {guide.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to={guide.to}
                      onClick={() => trackIntentClick("guides_hub", guide.to, guide.cta)}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:ring-2 ring-accent ring-offset-2 ring-offset-background transition-all"
                    >
                      {guide.cta} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>

    <section className="px-4 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
            Programmatic lender guides
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Lender-specific pages built for high-intent search
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed">
            These pages turn broad mortgage demand into specific planning journeys. Each lender guide connects
            into repayment, overpayment, and borrowing calculators with lender-context SEO built in.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lenders.slice(0, 12).map((lender) => (
            <Link
              key={lender.slug}
              to={buildLenderGuidePath(lender.slug)}
              onClick={() => trackIntentClick("guides_lender_grid", buildLenderGuidePath(lender.slug), lender.name)}
              className="rounded-2xl border glass-card p-5 hover:border-foreground transition-colors"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                {lender.category}
              </p>
              <h3 className="text-lg font-semibold tracking-tight">{lender.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Indicative SVR {lender.estimatedSvr.toFixed(2)}% · Max LTV {lender.maxLtv}% · Trust {lender.trustRating.toFixed(1)}/5
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                Open lender guide <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 pb-24">
      <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-card-muted p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="size-4 text-accent" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
            Editorial rule
          </p>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[64ch]">
          Every guide should link directly into a relevant calculator, explain the trade-offs in plain English,
          and avoid generic filler. The goal is not just traffic. The goal is search traffic that converts into
          calculator use, repeat visits, and eventually monetisable intent.
        </p>
      </div>
    </section>
  </SiteShell>
);

export default GuidesPage;
