import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";

const TermsOfService = () => (
  <SiteShell>
    <SEO
      title="Terms of Service | RepayWise"
      description="The terms under which RepayWise provides UK mortgage calculators and informational content."
      path="/terms-of-service"
    />
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-invert prose-sm sm:prose-base">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: 30 April 2026</p>

      <h2>1. About RepayWise</h2>
      <p>RepayWise (<strong>repaywise.co.uk</strong>) is an information service. We are <strong>not</strong> a
        lender, mortgage broker, or FCA-authorised financial adviser. Nothing on this site constitutes regulated
        financial advice within the meaning of the Financial Services and Markets Act 2000.</p>

      <h2>2. Use of calculators</h2>
      <p>Calculators are illustrative tools using publicly available formulas (standard amortisation, HMRC SDLT
        bands, Revenue Scotland LBTT bands, WRA LTT bands). Results are estimates and may differ from a lender's
        formal offer due to product fees, MMR stress tests, or rounding conventions.</p>

      <h2>3. No advice disclaimer</h2>
      <p><strong>Your home may be repossessed if you do not keep up repayments on your mortgage.</strong> Always
        consult an FCA-authorised mortgage adviser before making borrowing decisions.</p>

      <h2>4. Acceptable use</h2>
      <p>You agree not to (a) scrape or systematically extract data from the site, (b) attempt to interfere with
        the site's operation, or (c) use the site for unlawful purposes.</p>

      <h2>5. Intellectual property</h2>
      <p>All content, branding, calculator implementations and design elements are © RepayWise. The underlying
        mathematical formulas are public domain.</p>

      <h2>6. Liability</h2>
      <p>To the maximum extent permitted by law, RepayWise excludes liability for any decision made in reliance on
        the calculators or content. Statutory rights as a consumer are not affected.</p>

      <h2>7. Third-party links and ads</h2>
      <p>The site may display advertisements via Google AdSense and link to third-party services. We are not
        responsible for the content or practices of third parties.</p>

      <h2>8. Paid services and subscriptions</h2>
      <p>
        RepayWise does not currently offer paid consumer subscriptions. If we introduce paid or auto-renewing
        services in future, we will provide the required pre-contract information, reminder notices, and a simple
        cancellation route in line with applicable UK consumer law.
      </p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction
        of the courts of England and Wales.</p>

      <h2>10. Contact</h2>
      <p>Questions about these terms: <a href="mailto:hello@repaywise.co.uk">hello@repaywise.co.uk</a>.</p>
    </article>
  </SiteShell>
);

export default TermsOfService;
