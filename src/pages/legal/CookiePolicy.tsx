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
      <p className="text-muted-foreground">Last updated: 30 April 2026</p>

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
            <td><code>rw_consent</code></td>
            <td>12 months</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Aggregate usage, page performance</td>
            <td>PostHog, Vercel Analytics</td>
            <td>up to 14 months</td>
          </tr>
          <tr>
            <td>Advertising</td>
            <td>Personalised ads via Google AdSense</td>
            <td><code>__gads</code>, <code>__gpi</code>, <code>NID</code></td>
            <td>up to 13 months</td>
          </tr>
        </tbody>
      </table>

      <h2>Managing cookies</h2>
      <p>You can withdraw consent at any time by clearing site data or by visiting:</p>
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
