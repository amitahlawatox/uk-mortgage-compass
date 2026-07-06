/**
 * For Mortgage Brokers — Embed Widget Landing Page
 * This page enables the B2B outreach channel.
 * Target: independent mortgage brokers wanting a free calculator tool.
 */
import { Link } from "react-router-dom";
import {
  Calculator, Shield, Users, Code2, CheckCircle,
  ArrowRight, Building2, Lock, Zap, Globe
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";

const BENEFITS = [
  {
    icon: Calculator,
    title: "147 UK lenders in one tool",
    text: "Your clients can calculate overpayments, repayments, affordability and stamp duty for any UK lender — from Barclays to Atom Bank to Leek United. All in one place.",
  },
  {
    icon: Lock,
    title: "No data captured — ever",
    text: "RepayWise collects zero client data. No email, no phone number, no credit check. Calculations run entirely in the browser. Your clients' information stays private.",
  },
  {
    icon: Shield,
    title: "FCA-compliant positioning",
    text: "Every page carries independence disclaimers, FCA risk warnings, and 'not affiliated with [Lender]' badges. We are a calculator tool, not a financial adviser — clearly stated.",
  },
  {
    icon: Zap,
    title: "One line to embed",
    text: "Adding RepayWise to your website takes under 5 minutes. No developer needed. Just copy one line of HTML and paste it into your site's content area.",
  },
  {
    icon: Globe,
    title: "Always up to date",
    text: "Stamp duty rates, LBTT, LTT, lender SVRs — we keep everything current. When rates change, your embedded calculator updates automatically.",
  },
  {
    icon: Users,
    title: "Completely free",
    text: "No subscription, no trial, no premium tier. The embed is free for independent mortgage brokers. We ask for nothing in return.",
  },
];

const CALCULATORS = [
  { name: "Mortgage Overpayment Calculator", desc: "Shows interest saved and years removed", path: "/calculators/overpayment", hot: true },
  { name: "Mortgage Repayment Calculator", desc: "Monthly payment breakdown by lender", path: "/calculators/repayment", hot: false },
  { name: "Stamp Duty Calculator", desc: "SDLT, LBTT (Scotland) and LTT (Wales)", path: "/calculators/stamp-duty", hot: false },
  { name: "Affordability Calculator", desc: "Income multiples and stress test", path: "/calculators/affordability", hot: false },
  { name: "How Much Can I Borrow?", desc: "Maximum borrowing by lender", path: "/calculators/max-borrowing", hot: false },
  { name: "Interest-Only Calculator", desc: "IO vs repayment cost comparison", path: "/calculators/interest-only", hot: true },
  { name: "Buy-to-Let Calculator", desc: "Rental yield and BTL repayments", path: "/calculators/buy-to-let", hot: false },
  { name: "Remortgage Calculator", desc: "Compare current deal vs new rate", path: "/calculators/remortgage", hot: false },
];

const EMBED_CODE = `<iframe
  src="https://repaywise.co.uk/calculators/overpayment"
  width="100%"
  height="700"
  frameborder="0"
  title="Mortgage Overpayment Calculator — RepayWise"
  loading="lazy">
</iframe>`;

const ForBrokersPage = () => (
  <SiteShell>
    <SEO
      title="Free Mortgage Calculator for Mortgage Brokers | RepayWise"
      description="Free embeddable mortgage calculator for independent mortgage brokers. Covers 147 UK lenders. No client data captured, no login required. One line of code to add to your website."
      path="/for-brokers"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Free Mortgage Calculator for Mortgage Brokers",
        url: "https://repaywise.co.uk/for-brokers",
        description: "Free embeddable mortgage calculator tool for independent UK mortgage brokers. 147 lenders, no data capture, FCA-compliant.",
      }}
    />

    <article className="px-4 pt-16 pb-24">
      <div className="max-w-4xl mx-auto">

        {/* HERO */}
        <div className="mb-16">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">For Independent Mortgage Brokers</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            A free mortgage calculator<br />
            <span className="text-gradient-velocity">your clients will actually use</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[60ch] leading-relaxed mb-8">
            RepayWise covers 147 UK lenders in one place. Embed it on your website in under 5 minutes — free, forever. No email capture. No credit checks. No commission.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#embed"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Get the embed code <ArrowRight className="size-4" />
            </a>
            <Link
              to="/calculators/overpayment"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent/50 transition-colors"
            >
              See the calculator <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { value: "147", label: "UK lenders" },
            { value: "8", label: "Calculator types" },
            { value: "0", label: "Data collected" },
            { value: "Free", label: "Forever" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="text-3xl font-bold text-accent">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* BENEFITS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Why brokers use RepayWise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="size-9 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <b.icon className="size-4 text-accent" />
                </div>
                <h3 className="font-bold text-sm mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALCULATORS LIST */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">8 calculators in one embed</h2>
          <p className="text-muted-foreground text-sm mb-8">Each calculator works for any of the 147 lenders — your clients pick their lender and get results instantly.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {CALCULATORS.map((c) => (
              <Link
                key={c.name}
                to={c.path}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:border-accent/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Calculator className="size-4 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      {c.name}
                      {c.hot && <span className="text-[10px] font-bold bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">Popular</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
                <ArrowRight className="size-3 text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* EMBED SECTION */}
        <section id="embed" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-2">Add it to your website</h2>
          <p className="text-muted-foreground text-sm mb-8">Copy and paste one line of HTML. Works with any website builder — WordPress, Squarespace, Wix, Webflow, custom HTML.</p>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <Code2 className="size-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Embed code — overpayment calculator</span>
            </div>
            <pre className="p-5 text-xs text-accent overflow-x-auto leading-relaxed">
              <code>{EMBED_CODE}</code>
            </pre>
          </div>

          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            {[
              { label: "Repayment", url: "https://repaywise.co.uk/calculators/repayment" },
              { label: "Stamp Duty", url: "https://repaywise.co.uk/calculators/stamp-duty" },
              { label: "Affordability", url: "https://repaywise.co.uk/calculators/affordability" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-card p-3 text-xs">
                <p className="font-semibold text-foreground mb-1">{c.label} calculator</p>
                <p className="text-muted-foreground break-all">{c.url}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Swap the <code className="text-accent bg-accent/10 px-1 rounded">src</code> URL for any RepayWise calculator. You can also link directly to a specific lender — e.g. <code className="text-accent bg-accent/10 px-1 rounded">/calculators/overpayment/nationwide</code>.
          </p>
        </section>

        {/* COMPLIANCE NOTE */}
        <section className="mb-16 rounded-2xl border border-border bg-card p-6">
          <div className="flex gap-3">
            <Building2 className="size-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm mb-2">FCA compliance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                RepayWise is a calculator tool — not a financial adviser and not FCA-authorised. Every page carries the FCA mortgage warning (<em>"Your home may be repossessed..."</em>), states independence from all lenders, and includes no buy or apply functionality. Embedding RepayWise as an information tool on your website is consistent with standard broker website practice. Always ensure your own website's regulatory disclosures are correct for your FCA authorisation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to add it to your site?</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-[50ch] mx-auto">
            Copy the embed code above and paste it into your website. If you need help or have a question about the embed, get in touch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#embed"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
            >
              Get embed code <ArrowRight className="size-4" />
            </a>
            <a
              href="mailto:hello@repaywise.co.uk?subject=Broker embed enquiry"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold"
            >
              Email us
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No contract. No account. No cost.</p>
        </section>

        {/* TRUST */}
        <div className="mt-8 flex flex-wrap gap-6 justify-center text-xs text-muted-foreground">
          {["No email required", "No phone number", "No data captured", "Not affiliated with any bank", "Free forever"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle className="size-3 text-accent" /> {t}
            </span>
          ))}
        </div>

      </div>
    </article>
  </SiteShell>
);

export default ForBrokersPage;
