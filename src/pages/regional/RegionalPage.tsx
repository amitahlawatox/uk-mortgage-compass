import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Calculator, Home, MapPin, TrendingUp, Wallet } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";
import { cities, getCity } from "@/lib/uk/cities";
import { calculateStampDuty } from "@/lib/finance/stampDuty";
import { calculateRepayment } from "@/lib/finance/repayment";
import { formatGBP, formatPercent } from "@/lib/finance/decimal";

const RegionalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const city = slug ? getCity(slug) : undefined;
  if (!city) return <Navigate to="/" replace />;

  const sdlt = useMemo(
    () => calculateStampDuty({ price: city.avgPrice, region: city.region, firstTimeBuyer: false }),
    [city],
  );
  const sdltFtb = useMemo(
    () => calculateStampDuty({ price: city.ftbPrice, region: city.region, firstTimeBuyer: true }),
    [city],
  );
  const repay = useMemo(
    () =>
      calculateRepayment({
        principal: city.avgPrice * 0.85, // 15% deposit assumption
        annualRate: 4.5,
        termYears: 25,
      }),
    [city],
  );

  const otherCities = cities.filter((c) => c.slug !== city.slug);

  return (
    <SiteShell>
      <SEO
        title={`${city.name} Mortgage & Stamp Duty Guide 2024 | Velocity`}
        description={`Average house prices, ${city.taxName} examples, and mortgage repayment estimates for ${city.name}. Updated UK Land Registry data with first-time buyer relief.`}
        path={`/uk/${city.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: city.name,
          address: { "@type": "PostalAddress", addressCountry: "GB", addressLocality: city.name },
          description: city.intro,
        }}
      />

      <article className="px-4 pt-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
          >
            ← Back home
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-4">
            <MapPin className="size-3 text-accent" />
            <span className="text-[11px] font-bold tracking-wider uppercase">
              {city.region === "scotland" ? "Scotland · LBTT" : city.region === "wales" ? "Wales · LTT" : "England · SDLT"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
            Buying in <span className="text-gradient-velocity">{city.name}</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[62ch] leading-relaxed">
            {city.intro}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            <StatCard
              icon={Home}
              label="Average price"
              value={formatGBP(city.avgPrice)}
              sub={`${city.yoyChange >= 0 ? "+" : ""}${city.yoyChange}% YoY`}
            />
            <StatCard icon={Wallet} label="Typical FTB price" value={formatGBP(city.ftbPrice)} sub="First-time buyer" />
            <StatCard
              icon={Calculator}
              label={`${city.taxName} on average`}
              value={formatGBP(sdlt.total)}
              sub={`Effective ${formatPercent(sdlt.effectiveRate)}`}
              highlight
            />
            <StatCard icon={TrendingUp} label="Avg rent / mo" value={formatGBP(city.rentMonthly)} sub="2-bed" />
          </div>

          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Worked example: a typical {city.name} purchase
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-[60ch]">
              Numbers below assume an 85% LTV mortgage at 4.5% over 25 years on an average-priced
              home in {city.name}. Stamp duty is calculated against {city.taxName} {city.region === "scotland" ? "(Scottish)" : city.region === "wales" ? "(Welsh)" : "(English)"} bands.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <ExampleCard
                title={`Standard buyer · ${formatGBP(city.avgPrice)}`}
                rows={[
                  { label: "Property price", value: formatGBP(city.avgPrice) },
                  { label: "Deposit (15%)", value: formatGBP(city.avgPrice * 0.15) },
                  { label: "Loan", value: formatGBP(city.avgPrice * 0.85) },
                  { label: `${city.taxName}`, value: formatGBP(sdlt.total), accent: true },
                  { label: "Monthly payment", value: formatGBP(repay.monthlyPayment, { decimals: 2 }), highlight: true },
                ]}
                cta={`/calculators/repayment`}
              />
              <ExampleCard
                title={`First-time buyer · ${formatGBP(city.ftbPrice)}`}
                rows={[
                  { label: "Property price", value: formatGBP(city.ftbPrice) },
                  { label: "Deposit (10%)", value: formatGBP(city.ftbPrice * 0.10) },
                  { label: "Loan", value: formatGBP(city.ftbPrice * 0.90) },
                  { label: `${city.taxName} (FTB relief)`, value: formatGBP(sdltFtb.total), accent: true },
                  {
                    label: "Monthly payment",
                    value: formatGBP(
                      calculateRepayment({ principal: city.ftbPrice * 0.9, annualRate: 4.5, termYears: 30 }).monthlyPayment,
                      { decimals: 2 },
                    ),
                    highlight: true,
                  },
                ]}
                cta="/calculators/affordability"
              />
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              {city.name} neighbourhoods
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {city.neighbourhoods.map((n) => (
                <div key={n.name} className="glass-card rounded-2xl p-5">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-2">
                    {n.name}
                  </p>
                  <p className="text-xl font-bold tabular-nums tracking-tight mb-2">
                    {formatGBP(n.avg)}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.vibe}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 glass-card rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Run your own {city.name} numbers
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-[50ch] mx-auto">
              Plug your own price, deposit and rate into our calculators — built on the same {city.taxName} bands used here.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/calculators/repayment"
                className="bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:shadow-glow-cyan transition-all"
              >
                Repayment calculator <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/calculators/stamp-duty"
                className="bg-secondary px-5 py-3 rounded-xl text-sm font-semibold hover:bg-secondary/70 transition-all"
              >
                {city.taxName} calculator
              </Link>
            </div>
          </section>

          <section className="mt-14">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Other cities
            </p>
            <div className="grid grid-cols-3 gap-3">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/uk/${c.slug}`}
                  className="group p-4 rounded-2xl border border-border hover:border-foreground transition-colors"
                >
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                    {formatGBP(c.avgPrice)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </SiteShell>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  highlight,
}: {
  icon: typeof Home;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-2xl p-5 ${
      highlight ? "bg-primary text-primary-foreground" : "glass-card"
    }`}
  >
    <Icon className={`size-4 mb-3 ${highlight ? "text-accent" : "text-muted-foreground"}`} />
    <p
      className={`text-[10px] uppercase tracking-widest font-semibold mb-1 ${
        highlight ? "text-primary-foreground/60" : "text-muted-foreground"
      }`}
    >
      {label}
    </p>
    <p className="text-xl sm:text-2xl font-bold tabular-nums tracking-tight">{value}</p>
    {sub && (
      <p className={`text-[11px] mt-1 ${highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
        {sub}
      </p>
    )}
  </div>
);

const ExampleCard = ({
  title,
  rows,
  cta,
}: {
  title: string;
  rows: { label: string; value: string; highlight?: boolean; accent?: boolean }[];
  cta: string;
}) => (
  <div className="glass-card rounded-2xl p-6">
    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
      {title}
    </p>
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className={`flex items-baseline justify-between py-2 ${
            r.highlight ? "border-t border-border pt-3 mt-2" : ""
          }`}
        >
          <span className={`text-sm ${r.highlight ? "font-semibold" : "text-muted-foreground"}`}>
            {r.label}
          </span>
          <span
            className={`tabular-nums font-semibold ${
              r.highlight ? "text-2xl" : r.accent ? "text-accent-foreground bg-accent px-2 py-0.5 rounded text-sm" : "text-sm"
            }`}
          >
            {r.value}
          </span>
        </div>
      ))}
    </div>
    <Link
      to={cta}
      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
    >
      Run my numbers <ArrowRight className="size-3.5" />
    </Link>
  </div>
);

export default RegionalPage;
