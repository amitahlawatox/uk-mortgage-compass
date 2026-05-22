import { SEO } from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | RepayWise"
        description="RepayWise does not collect, store or share any personal data. All mortgage calculations run locally in your browser. No cookies, no tracking, no data retention."
        path="privacy-policy"
      />
      <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: May 2026</p>

        <h2>Our commitment: zero data collection</h2>
        <p>
          RepayWise is designed to be a privacy-first tool. <strong>We do not collect, store,
          process, or transmit any personal data.</strong> All mortgage calculations are performed
          entirely within your browser — no data is sent to our servers.
        </p>

        <h2>What we do NOT collect</h2>
        <ul>
          <li>Email addresses or contact information</li>
          <li>Financial data you enter into calculators</li>
          <li>IP addresses or device identifiers</li>
          <li>Browsing history or behavioural analytics</li>
          <li>Cookies for tracking or advertising purposes</li>
          <li>Location data</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          RepayWise uses Google Analytics 4 (GA4) to understand how visitors use our calculators. This collects anonymised usage data (pages visited, session duration, general location). No personally identifiable information is collected. You can opt out via your browser settings or Google's opt-out tool.
          We may use a single session cookie to remember your preferred colour scheme (light/dark
          mode). This cookie does not identify you personally and is not shared with any third party.
        </p>

        <h2>Third-party services</h2>
        <p>
          RepayWise does not embed third-party advertising scripts, social media tracking pixels,
          RepayWise uses Google Analytics 4 for anonymised usage statistics. No data is shared with advertisers
          or data brokers.
        </p>

        <h2>Independence notice</h2>
        <p>
          RepayWise is an independent financial calculation tool. We are not affiliated with,
          endorsed by, or acting on behalf of any bank, building society, or mortgage lender.
          Lender names are used for descriptive identification purposes only.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at{" "}
          <a href="mailto:hello@repaywise.co.uk">hello@repaywise.co.uk</a>.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The date at the top of this page
          reflects the most recent revision.
        </p>
      </div>
    </>
  );
}
