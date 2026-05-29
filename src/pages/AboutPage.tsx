import { Link } from "react-router-dom";
import {
  Calculator,
  ShieldCheck,
  Lock,
  TrendingUp,
  Mail,
  Phone,
  Database,
  BadgePoundSterling,
  Building2,
  Users,
  MapPin,
  Wrench,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";

const promises = [
  {
    icon: Mail,
    title: "No email required",
    text: "Never. Not to use a calculator, not to see your results, not ever. We do not have a mailing list.",
  },
  {
    icon: Phone,
    title: "No phone number",
    text: "We will never ask for your phone number. There is no account to create, no profile to fill in.",
  },
  {
    icon: Database,
    title: "No data captured",
    text: "Every calculation runs entirely in your browser. Your mortgage balance, salary, and deposit never leave your device.",
  },
  {
    icon: Building2,
    title: "Not affiliated with any bank",
    text: "RepayWise is 100% independent. No lender pays us, owns us, or influences our calculators in any way.",
  },
  {
    icon: BadgePoundSterling,
    title: "Free forever",
    text: "No freemium. No trial. No premium tier. Every calculator, every lender, every city — free.",
  },
];

const stats = [
  { value: "147", label: "UK lenders covered" },
  { value: "7", label: "calculator types" },
  { value: "40", label: "UK cities" },
  { value: "0", label: "pieces of data collected" },
];

const tools = [
  { to: "/calculators/overpayment", label: "Mortgage Overpayment Calculator" },
  { to: "/calculators/repayment", label: "Mortgage Repayment Calculator" },
  { to: "/calculators/stamp-duty", label: "Stamp Duty Calculator (SDLT / LBTT / LTT)" },
  { to: "/calculators/affordability", label: "Affordability & Total Cost to Buy" },
  { to: "/calculators/max-borrowing", label: "How Much Can I Borrow?" },
  { to: "/calculators/equity", label: "Home Equity Calculator" },
  { to: "/calculators/buy-to-let", label: "Buy-to-Let Mortgage Calculator" },
  { to: "/calculators/compare", label: "Side-by-Side Mortgage Comparison" },
];

const AboutPage = () => (
  <SiteShell>
    <SEO
      title="About RepayWise | Free Independent UK Mortgage Calculators"
      description="RepayWise is a free, independent UK mortgage calculator covering 147 lenders. No email, no phone, no data captured — ever. Built by a UK startup with one mission: honest mortgage maths."
      path="/about"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About RepayWise",
        url: "https://repaywise.co.uk/about",
        description:
          "RepayWise is a free independent UK mortgage calculator platform covering 147 lenders. No email, no phone number, no data captured.",
        mainEntity: {
          "@type": "Organization",
          name: "RepayWise",
          url: "https://repaywise.co.uk",
          foundingDate: "2026",
          areaServed: { "@type": "Country", name: "United Kingdom" },
          slogan: "Honest mortgage maths. No strings attached.",
        },
      }}
    />

    <article className="px-4 pt-16 pb-24 sm:pt-24">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
          About RepayWise
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
          Honest mortgage maths.{" "}
          <span className="text-gradient-velocity">No strings attached.</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-[62ch] leading-relaxed">
          RepayWise is a free, independent UK mortgage calculator built by a small startup with one
          goal: give every homeowner and first-time buyer access to the same maths their bank uses
          — without handing over their email address to get it.
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5 text-center"
            >
              <p className="text-3xl font-bold text-accent">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* The 5 Promises */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            The RepayWise promise
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed mt-3 mb-8">
            Most financial websites ask for your contact details before showing you anything useful.
            We think that is backwards. Here is what we commit to — no small print.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3"
              >
                <div className="size-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <p.icon className="size-4 text-accent" />
                </div>
                <h3 className="text-base font-bold">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why we built this */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Why we built RepayWise
          </h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed">
            <p>
              We are a small UK startup. When we started looking into mortgages we kept running into
              the same frustration: every calculator online either belonged to a bank (which would
              only show you their own products), required you to create an account, or quietly
              handed your details to a broker who would call you three times a day.
            </p>
            <p>
              The overpayment calculator was the worst offender. Banks have a financial incentive
              not to show you how much you save by paying off your mortgage early — so their tools
              are either hidden, broken, or designed to discourage you. We wanted one that was
              honest, worked for every lender, and did not require you to hand over anything to
              use it.
            </p>
            <p>
              RepayWise covers <strong className="text-foreground">147 UK lenders</strong> —
              including all the specialist and regional ones that comparison sites ignore. Whether
              you are with Barclays or Atom Bank, Nationwide or Leek United, you can run the same
              calculation in seconds.
            </p>
          </div>
        </section>

        {/* What makes us different */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            What makes us different
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Genuinely independent",
                text: "We are not owned by a bank, a comparison site, or a mortgage broker. Nobody pays us to feature their products. Our calculators have one job: give you the right number.",
              },
              {
                icon: Lock,
                title: "Privacy by design",
                text: "Your numbers never leave your browser. We do not store your mortgage balance, your salary, or your deposit anywhere on our servers. Analytics are anonymised under UK GDPR.",
              },
              {
                icon: MapPin,
                title: "Built for the whole UK",
                text: "Stamp duty calculators cover all three tax systems — SDLT in England, LBTT in Scotland, and LTT in Wales. City pages include local average prices and first-time buyer relief.",
              },
              {
                icon: Wrench,
                title: "Precision maths",
                text: "Every calculator uses the standard UK amortisation formula. We never round early, hide assumptions, or simplify figures in ways that change your decision.",
              },
              {
                icon: Users,
                title: "For all buyers",
                text: "From first-time buyers calculating stamp duty to landlords modelling buy-to-let returns to existing homeowners planning overpayments — RepayWise covers every stage.",
              },
              {
                icon: TrendingUp,
                title: "Always improving",
                text: "We are a startup. We ship updates regularly based on user feedback. If a calculator is wrong, or a lender is missing, tell us and we will fix it fast.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <item.icon className="size-5 text-accent mb-3" />
                <h3 className="text-base font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Our calculators</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed mt-3 mb-6">
            All free. All without an account. All without giving us your contact details.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm">
            {tools.map((t) => (
              <li key={t.to}>
                <Link to={t.to} className="text-accent hover:underline">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Legal */}
        <section className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold mb-2">Important notice</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            RepayWise provides financial information, not regulated financial advice. We are not a
            lender, mortgage broker, or FCA-authorised financial adviser. Nothing on this site
            constitutes regulated financial advice within the meaning of the Financial Services and
            Markets Act 2000.{" "}
            <strong className="text-foreground font-semibold">
              Your home may be repossessed if you do not keep up repayments on your mortgage.
            </strong>{" "}
            Always consult a qualified, FCA-authorised mortgage adviser before making any financial
            decisions.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Get in touch</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[62ch] leading-relaxed mt-4">
            Found a bug, missing a lender, or have a suggestion? We read everything.{" "}
            <Link to="/contact" className="text-accent hover:underline">
              Contact us here
            </Link>{" "}
            or email{" "}
            <a href="mailto:hello@repaywise.co.uk" className="text-accent hover:underline">
              hello@repaywise.co.uk
            </a>
            .
          </p>
        </section>

      </div>
    </article>
  </SiteShell>
);

export default AboutPage;
