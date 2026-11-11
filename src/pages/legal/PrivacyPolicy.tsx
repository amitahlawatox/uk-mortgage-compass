import { SEO } from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | RepayWise"
        description="How RepayWise handles mortgage calculator values and optional site analytics."
        path="privacy-policy"
      />
      <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: 11 November 2026</p>

        <h2>Mortgage calculations</h2>
        <p>
          Our mortgage calculators run in your browser. We do not send the financial values you
          enter into a calculator to our analytics tools. We do not ask you for an email address
          to use the calculators.
        </p>

        <h2>Optional analytics</h2>
        <p>
          If you choose Accept analytics, we load Google Analytics 4 and Ahrefs analytics to
          understand visits and page use. These services can receive usage information, such as
          pages visited and device information. We send calculator event names and page paths,
          without the financial values entered into calculators. If you choose Essential only,
          these analytics scripts are not loaded.
        </p>
        <p>
          You can change your choice using the Cookie settings button on any page. See our
          <a href="/cookie-policy"> cookie policy</a> for more detail about local storage and
          optional analytics.
        </p>

        <h2>Site operation</h2>
        <p>
          Your browser connects to our hosting provider to load the site. Like other web hosts,
          it may process technical request information needed to serve the pages and protect the
          site. Your theme and cookie choice are stored locally in your browser.
        </p>

        <h2>Independence notice</h2>
        <p>
          RepayWise is an independent financial calculation tool. We are not affiliated with,
          endorsed by, or acting on behalf of any bank, building society, or mortgage lender.
          Lender names are used for descriptive identification purposes only.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, contact us at{" "}
          <a href="mailto:hello@repaywise.co.uk">hello@repaywise.co.uk</a>.
        </p>
      </div>
    </>
  );
}
