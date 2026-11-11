import { SiteShell } from "@/components/layout/SiteShell";
import { SEO } from "@/components/SEO";

const CookiePolicy = () => (
  <SiteShell>
    <SEO
      title="Cookie Policy | RepayWise"
      description="The cookies RepayWise uses, what they do, and how to manage them under UK PECR and GDPR."
      path="/cookie-policy"
    />
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-invert prose-sm sm:prose-base">
      <h1>Cookie Policy</h1>
      <p className="text-muted-foreground">Last updated: 11 November 2026</p>

      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored by your browser. We use them, plus similar technologies (localStorage,
        pixels), under the UK Privacy and Electronic Communications Regulations (PECR) and UK GDPR.</p>

      <h2>Categories we use</h2>
      <table>
        <thead>
          <tr><th>Category</th><th>Purpose</th><th>Examples</th><th>Lifetime</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Strictly necessary</td>
            <td>Site function, consent state</td>
            <td><code>velocity-cookie-consent</code> (stored in localStorage)</td>
            <td>Until you clear site data</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Aggregate usage, page performance</td>
            <td>Google Analytics 4, Ahrefs analytics</td>
            <td>Varies by provider and your browser settings</td>
          </tr>
        </tbody>
      </table>

      <h2>How consent works on RepayWise today</h2>
      <p>
        RepayWise currently asks you to choose between <strong>Essential only</strong> and{" "}
        <strong>Accept analytics</strong>. Analytics tools are only loaded after you opt in.
        If we introduce advertising cookies or personalised ads in future, we will update this
        policy and request any additional consent required under PECR and the UK GDPR.
      </p>

      <h2>Managing cookies</h2>
      <p>You can change your choice using the Cookie settings button on any page. You can also clear site data in your browser.</p>
      <ul>
        <li><a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">Google Ads Settings</a></li>
        <li><a href="https://www.youronlinechoices.com" rel="noopener noreferrer" target="_blank">YourOnlineChoices.com</a></li>
        <li>Your browser's cookie controls (Chrome, Safari, Firefox, Edge).</li>
      </ul>

      <h2>Contact</h2>
      <p>Cookie questions: <a href="mailto:privacy@repaywise.co.uk">privacy@repaywise.co.uk</a>.</p>
    </article>
  </SiteShell>
);

export default CookiePolicy;
