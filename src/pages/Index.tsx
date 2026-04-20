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
    accent: "dark" as const,
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
    to: "/calculators/affordability",
    title: "Affordability",
    blurb: "4.5× income multiplier with stress-test at +3%. Open Banking ready for Phase 2.",
    icon: Wallet,
    accent: "none" as const,
  },
];

const Index = () => (
  <SiteShell>
    <SEO
      title="Velocity — UK Mortgage Intelligence Platform"
      description="Real-time UK mortgage calculators built on decimal-precision math: Stamp Duty (SDLT/LBTT/LTT), repayment, overpayment and affordability. Trust-first, FCA-aligned."
      path="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Velocity Mortgage Intelligence",
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
            Check affordability
          </Link>
        </div>
      </div>
    </section>

    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {calculators.map(c => {
          const Icon = c.icon;
          const cardCls =
            c.accent === "dark"
              ? "bg-primary text-primary-foreground border-primary"
              : "glass-card hover:border-foreground";
          const glow =
            c.accent === "cyan"
              ? "hover:shadow-glow-cyan hover:border-accent"
              : c.accent === "lime"
                ? "hover:shadow-glow-lime hover:border-accent-secondary"
                : c.accent === "dark"
                  ? "hover:shadow-glow-cyan"
                  : "";
          const iconBg =
            c.accent === "dark" ? "bg-primary-foreground/10" : "bg-secondary";
          const iconColor =
            c.accent === "cyan"
              ? "text-accent"
              : c.accent === "lime"
                ? "text-accent-secondary"
                : c.accent === "dark"
                  ? "text-accent"
                  : "text-foreground";
          const subColor = c.accent === "dark" ? "text-primary-foreground/60" : "text-muted-foreground";
          return (
            <Link
              to={c.to}
              key={c.to}
              className={`group p-6 rounded-3xl border transition-all duration-300 ${cardCls} ${glow}`}
            >
              <div className={`size-10 rounded-xl flex items-center justify-center mb-6 ${iconBg}`}>
                <Icon className={`size-5 ${iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <p className={`text-sm mb-6 leading-relaxed ${subColor}`}>{c.blurb}</p>
              <span className={`inline-flex items-center gap-1 font-semibold text-sm ${c.accent === "dark" ? "text-accent" : "group-hover:gap-2 transition-all"}`}>
                Open tool <ArrowRight className="size-4" />
              </span>
            </Link>
          );
        })}
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
