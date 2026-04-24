import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingDown, Wallet, LineChart, MapPin } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { cities } from "@/lib/uk/cities";
import { formatGBP } from "@/lib/finance/decimal";

const calculators = [
  {
    to: "/calculators/repayment",
    title: "Repayment",
    blurb: "Three quick steps to your exact monthly payment, total interest and balance over time.",
    icon: LineChart,
    accent: "none" as const,
  },
  {
    to: "/calculators/stamp-duty",
    title: "Stamp Duty",
    blurb: "SDLT, LBTT & LTT — covers England, Scotland, Wales. First-time buyer relief and second-home surcharges.",
    icon: Calculator,
    accent: "cyan" as const,
  },
  {
    to: "/calculators/overpayment",
    title: "Overpayment",
    blurb: "See exactly how much interest and time you save with monthly or lump-sum overpayments.",
    icon: TrendingDown,
    accent: "lime" as const,
  },
  {
    to: "/calculators/max-borrowing",
    title: "Affordability",
    blurb: "Lender-style 4.5× income multiplier with stress test — find out how much you can borrow.",
    icon: Wallet,
    accent: "none" as const,
  },
];

const Index = () => (
  <SiteShell>
    <SEO
      title="UK Mortgage Calculator | Stamp Duty, Repayment & Affordability — RepayWise"
      description="Free UK mortgage calculators: monthly repayments, Stamp Duty (SDLT/LBTT/LTT), overpayment savings and affordability. Decimal-precision, FCA-aligned."
      path="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "RepayWise",
        url: "https://www.repaywise.co.uk",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      }}
    />

    <section className="px-4 pt-16 pb-20 sm:pt-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-6 animate-fade-up">
          <span className="size-1.5 rounded-full bg-accent-secondary animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider uppercase">
            Decimal-precision · Updated 2m ago
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-6 animate-fade-up">
          Mortgages,
          <br />
          <span className="text-gradient-velocity">Upgraded.</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-[52ch] mx-auto animate-fade-up">
          Real-time intelligence for the UK property market. Calculate stamp duty, repayments,
          overpayment savings and affordability in one place — with sub-second precision.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-up">
          <Link
            to="/calculators/repayment"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:ring-2 ring-accent ring-offset-2 ring-offset-background transition-all inline-flex items-center gap-2"
          >
            Calculate my mortgage <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/calculators/affordability"
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:bg-secondary/70 transition-all"
          >
            Total cost to buy
          </Link>
        </div>
      </div>
    </section>

    <section className="px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/calculators/affordability"
          className="group block rounded-3xl bg-primary text-primary-foreground p-8 sm:p-10 shadow-glow-cyan hover:shadow-glow-lime transition-all border border-primary"
        >
          <div className="grid sm:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center">
            <div className="size-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
              <Wallet className="size-7 text-accent" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
                ★ Featured · All-in-one planner
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Total Cost to Buy a Home
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/70 max-w-[60ch] leading-relaxed">
                Property + deposit + stamp duty + monthly EMI + optional legal/survey/lender fees.
                The full picture of cash you actually need before completion — in one calculator.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-xl text-sm font-semibold group-hover:gap-3 transition-all shrink-0">
              Open planner <ArrowRight className="size-4" />
            </span>
          </div>
        </Link>
      </div>
    </section>

    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {calculators.map(c => {
          const Icon = c.icon;
          const glow =
            c.accent === "cyan"
              ? "hover:shadow-glow-cyan hover:border-accent"
              : c.accent === "lime"
                ? "hover:shadow-glow-lime hover:border-accent-secondary"
                : "";
          const iconColor =
            c.accent === "cyan"
              ? "text-accent"
              : c.accent === "lime"
                ? "text-accent-secondary"
                : "text-foreground";
          return (
            <Link
              to={c.to}
              key={c.to}
              className={`group p-6 rounded-3xl border glass-card hover:border-foreground transition-all duration-300 ${glow}`}
            >
              <div className="size-10 rounded-xl flex items-center justify-center mb-6 bg-secondary">
                <Icon className={`size-5 ${iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-sm mb-6 leading-relaxed text-muted-foreground">{c.blurb}</p>
              <span className="inline-flex items-center gap-1 font-semibold text-sm group-hover:gap-2 transition-all">
                Open tool <ArrowRight className="size-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>

    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
              UK city guides
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Local mortgage & stamp duty intel
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cities.map((c) => (
            <Link
              key={c.slug}
              to={`/uk/${c.slug}`}
              className="group p-5 rounded-2xl border border-border hover:border-foreground transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-3.5 text-accent" />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                  {c.taxName}
                </span>
              </div>
              <p className="text-lg font-semibold mb-1">{c.name}</p>
              <p className="text-xs text-muted-foreground mb-3 tabular-nums">
                Avg {formatGBP(c.avgPrice)}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all">
                Open guide <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 pb-24">
      <div className="max-w-6xl mx-auto pt-12 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <Stat label="Calculations / day" value="120k+" />
        <Stat label="UK regions covered" value="3" />
        <Stat label="Decimal precision" value="28 dp" />
        <Stat label="Lighthouse target" value="95+" />
      </div>
    </section>
  </SiteShell>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums">{value}</div>
    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-semibold">
      {label}
    </div>
  </div>
);

export default Index;
