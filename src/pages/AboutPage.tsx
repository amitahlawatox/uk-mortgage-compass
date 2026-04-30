import { Link } from "react-router-dom";
import { Calculator, ShieldCheck, Lock, TrendingUp } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";

const values = [
  {
    icon: Calculator,
    title: "Precision first",
    text: "Every calculator uses 28-digit decimal arithmetic and follows the standard UK amortisation formula. We never round early or hide assumptions.",
  },
  {
    icon: ShieldCheck,
    title: "No advice, no conflicts",
    text: "RepayWise is an information tool, not a brokerage. We are not FCA-authorised and do not recommend products. We believe the best financial decisions start with clear numbers, not sales pressure.",
  },
  {
    icon: Lock,
    title: "Privacy by design",
    text: "Calculator inputs stay in your browser. We do not store your mortgage details on our servers. Analytics are consent-only and IP-anonymised under UK GDPR.",
  },
  {
    icon: TrendingUp,
    title: "Built for the UK market",
    text: "Stamp duty covers SDLT, LBTT, and LTT across England, Scotland, and Wales. Regional pages reflect local average prices and tax rules. Everything is tailored to the UK property landscape.",
  },
];

const AboutPage = () => (
  <SiteShell>
    <SEO
      title="About RepayWise | Free UK Mortgage Calculators"
      description="RepayWise provides free, privacy-first UK mortgage calculators for repayments, stamp duty, overpayments, and affordability. Learn about our mission and values."
      path="/about"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About RepayWise",
        url: "https://repaywise.co.uk/about",
        description: "RepayWise provides free, privacy-first UK mortgage calculators.",
        mainEntity: {
          "@type": "Organization",
          name: "RepayWise",
          url: "https://repaywise.co.uk",
          foundingDate: "2026",
          areaServed: { "@type": "Country", name: "United Kingdom" },
        },
      }}
    />

    <article className="px-4 pt-16 pb-24 sm:pt-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">About</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
          Mortgage maths,{" "}
          <span className="text-gradient-velocity">made simple.</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-[62ch] leading-relaxed">
          RepayWise is a free, independent UK mortgage calculator platform. We help homebuyers,
          homeowners, and first-time buyers understand their numbers before they speak to a lender
          or adviser — with no sign-up, no data collection, and no sales agenda.
        </p>

        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Why we built this</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed mt-4">
            Buying a home is the biggest financial commitment most people make, yet the tools available
            online are often buried behind lead-generation forms, cluttered with upsells, or designed to
            push you toward a specific product. We wanted to build something different: a set of
            calculators that are fast, transparent, and genuinely useful — without asking for your
            phone number first.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed mt-4">
            RepayWise covers the full spectrum of UK mortgage planning: monthly repayments, stamp duty
            across all three UK tax systems (SDLT, LBTT, LTT), overpayment strategies, affordability
            checks, home equity tracking, buy-to-let modelling, and side-by-side mortgage comparisons.
            Every result is calculated in your browser with decimal precision.
          </p>
        </section>

        <section className="mt-16 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <v.icon className="size-5 text-accent mb-3" />
              <h3 className="text-base font-bold mb-1">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Our tools</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed mt-4 mb-6">
            All calculators are free to use without creating an account.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm">
            <li><Link to="/calculators/repayment" className="text-accent hover:underline">Mortgage Repayment Calculator</Link></li>
            <li><Link to="/calculators/stamp-duty" className="text-accent hover:underline">Stamp Duty Calculator (SDLT/LBTT/LTT)</Link></li>
            <li><Link to="/calculators/overpayment" className="text-accent hover:underline">Overpayment Visualiser</Link></li>
            <li><Link to="/calculators/affordability" className="text-accent hover:underline">Total Cost to Buy</Link></li>
            <li><Link to="/calculators/max-borrowing" className="text-accent hover:underline">Affordability — How Much Can I Borrow?</Link></li>
            <li><Link to="/calculators/equity" className="text-accent hover:underline">Home Equity Calculator</Link></li>
            <li><Link to="/calculators/buy-to-let" className="text-accent hover:underline">Buy-to-Let Calculator</Link></li>
            <li><Link to="/calculators/compare" className="text-accent hover:underline">Compare Mortgages</Link></li>
          </ul>
        </section>

        <section className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold mb-2">Important notice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            RepayWise provides financial information, not advice. We are not a lender, broker, or
            FCA-authorised financial adviser. Nothing on this site constitutes regulated financial
            advice within the meaning of the Financial Services and Markets Act 2000.{" "}
            <strong className="text-foreground font-semibold">
              Your home may be repossessed if you do not keep up repayments on your mortgage.
            </strong>{" "}
            Always consult a qualified, FCA-authorised mortgage adviser before making any financial
            decisions.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Get in touch</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed mt-4">
            Have a question, suggestion, or found a bug? We would love to hear from you.
            Visit our <Link to="/contact" className="text-accent hover:underline">contact page</Link> or
            email us at{" "}
            <a href="mailto:hello@repaywise.co.uk" className="text-accent hover:underline">hello@repaywise.co.uk</a>.
          </p>
        </section>
      </div>
    </article>
  </SiteShell>
);

export default AboutPage;
