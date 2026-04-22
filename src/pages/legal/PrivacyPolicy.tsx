import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";

const PrivacyPolicy = () => (
  <SiteShell>
    <SEO
      title="Privacy Policy | RepayWise"
      description="How RepayWise collects, uses, and protects your data, including cookies, analytics, and third-party advertising under UK GDPR."
      path="/privacy-policy"
    />
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-invert prose-sm sm:prose-base">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

      <h2>1. Who we are</h2>
      <p>
        RepayWise ("we", "us", "our") operates <strong>www.repaywise.co.uk</strong>, an information portal
        providing UK mortgage and stamp-duty calculators. We are the data controller for personal information
        you provide through this site, in the meaning of the UK GDPR and the Data Protection Act 2018.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Calculator inputs</strong> (loan amount, rate, term, postcode) — processed in your browser, not stored on our servers unless you submit a lead form.</li>
        <li><strong>Lead form data</strong> (name, email, optional context) — only when you voluntarily submit it.</li>
        <li><strong>Technical data</strong> — IP address (truncated), user-agent, pages visited, session duration.</li>
        <li><strong>Cookies</strong> — see our <a href="/cookie-policy">Cookie Policy</a> for the full list.</li>
      </ul>

      <h2>3. Lawful basis</h2>
      <p>We rely on: (a) <em>consent</em> for non-essential cookies and marketing emails, (b) <em>legitimate interest</em>
        for analytics and fraud prevention, and (c) <em>contract</em> where you request a service.</p>

      <h2>4. Third-party advertising</h2>
      <p>
        Once approved, this site uses <strong>Google AdSense</strong> to serve advertisements. Google and its
        partners may use cookies to personalise ads based on your visits to this and other sites. You can opt out
        of personalised advertising via <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>
        or <a href="https://www.youronlinechoices.com" rel="noopener noreferrer" target="_blank">YourOnlineChoices.com</a>.
      </p>

      <h2>5. Analytics</h2>
      <p>We use PostHog and Vercel Analytics to understand aggregate usage. IP addresses are pseudonymised. We do
        not sell or share personal data with data brokers.</p>

      <h2>6. Data retention</h2>
      <p>Lead-form submissions are retained for 24 months unless you request earlier deletion. Anonymous analytics
        is retained for 14 months.</p>

      <h2>7. Your rights</h2>
      <p>Under the UK GDPR you have the right to access, rectify, erase, restrict, or object to processing of your
        personal data, and the right to data portability. Contact <a href="mailto:privacy@repaywise.co.uk">privacy@repaywise.co.uk</a>.
        You may also complain to the <a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">Information Commissioner's Office</a>.</p>

      <h2>8. Security</h2>
      <p>Data in transit is protected with TLS 1.3. Lead data at rest is encrypted with AES-256 on managed infrastructure.</p>

      <h2>9. Changes</h2>
      <p>We may update this policy from time to time. Material changes will be notified on the homepage.</p>
    </article>
  </SiteShell>
);

export default PrivacyPolicy;
