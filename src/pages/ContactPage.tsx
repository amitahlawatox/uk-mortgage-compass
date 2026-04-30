import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";

const ContactPage = () => (
  <SiteShell>
    <SEO
      title="Contact Us | RepayWise"
      description="Get in touch with the RepayWise team. Questions about our UK mortgage calculators, privacy requests, or feedback — we're here to help."
      path="/contact"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact RepayWise",
        url: "https://repaywise.co.uk/contact",
        mainEntity: {
          "@type": "Organization",
          name: "RepayWise",
          url: "https://repaywise.co.uk",
          email: "hello@repaywise.co.uk",
          areaServed: { "@type": "Country", name: "United Kingdom" },
        },
      }}
    />

    <article className="px-4 pt-16 pb-24 sm:pt-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">Contact</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
          Get in touch
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-[58ch] leading-relaxed">
          Whether you have a question about our calculators, a feature request, or a privacy enquiry,
          we are happy to help.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mt-12">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Mail className="size-5 text-accent mb-3" />
            <h2 className="text-base font-bold mb-1">General enquiries</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Questions, feedback, partnership ideas, or press enquiries.
            </p>
            <a
              href="mailto:hello@repaywise.co.uk"
              className="text-sm text-accent font-semibold hover:underline"
            >
              hello@repaywise.co.uk
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <ShieldCheck className="size-5 text-accent mb-3" />
            <h2 className="text-base font-bold mb-1">Privacy & data requests</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              UK GDPR data subject access requests, deletion requests, or cookie questions.
            </p>
            <a
              href="mailto:privacy@repaywise.co.uk"
              className="text-sm text-accent font-semibold hover:underline"
            >
              privacy@repaywise.co.uk
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <MessageSquare className="size-5 text-accent mb-3" />
            <h2 className="text-base font-bold mb-1">Bug reports</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Found a calculation error or something broken? Let us know and we will fix it.
            </p>
            <a
              href="mailto:hello@repaywise.co.uk?subject=Bug%20report"
              className="text-sm text-accent font-semibold hover:underline"
            >
              hello@repaywise.co.uk
            </a>
          </div>
        </div>

        <section className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold mb-3">Frequently asked</h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-foreground">Is RepayWise free?</dt>
              <dd className="text-muted-foreground mt-1">
                Yes. All calculators are free to use with no sign-up required. We plan to support the
                site through non-intrusive advertising.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Do you store my mortgage details?</dt>
              <dd className="text-muted-foreground mt-1">
                No. All calculations happen in your browser. We do not send your inputs to any server.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Are you a mortgage broker or adviser?</dt>
              <dd className="text-muted-foreground mt-1">
                No. RepayWise is an information tool, not a regulated financial service. We are not
                authorised by the FCA to provide mortgage advice. Always speak to a qualified adviser
                before making borrowing decisions.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">How do I delete my data?</dt>
              <dd className="text-muted-foreground mt-1">
                If you have submitted any information through our site, email{" "}
                <a href="mailto:privacy@repaywise.co.uk" className="text-accent hover:underline">privacy@repaywise.co.uk</a>{" "}
                and we will process your request within 30 days as required by UK GDPR.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-12">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[58ch]">
            RepayWise is operated from England & Wales. All enquiries are typically answered within
            two working days.
          </p>
        </section>
      </div>
    </article>
  </SiteShell>
);

export default ContactPage;
