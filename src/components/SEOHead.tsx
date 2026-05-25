import { Head } from "vite-react-ssg";
import type { LenderData } from "@/lib/uk/lenders";

export type CalculatorType =
  | "repayment"
  | "overpayment"
  | "max-borrowing"
  | "stamp-duty"
  | "affordability"
  | "equity"
  | "buy-to-let"
  | "compare";

interface SEOHeadProps {
  calculatorType: CalculatorType;
  lender?: LenderData;
  canonicalPath: string;
  titleOverride?: string;
  descriptionOverride?: string;
}

const BASE_URL = "https://repaywise.co.uk";

const CALC_META: Record<CalculatorType, { label: string; description: string; schemaName: string }> = {
  repayment: { label: "Mortgage Repayment Calculator", description: "Calculate your exact monthly mortgage repayments. Enter your loan amount, interest rate, and term to see your payments instantly.", schemaName: "Mortgage Repayment Calculator" },
  overpayment: { label: "Mortgage Overpayment Calculator", description: "See how much interest and time you can save by overpaying your mortgage. Free UK overpayment savings calculator.", schemaName: "Mortgage Overpayment Calculator" },
  "max-borrowing": { label: "Maximum Mortgage Borrowing Calculator", description: "Find out exactly how much you can borrow. Free UK mortgage borrowing calculator based on your income, deposit, and commitments.", schemaName: "Maximum Mortgage Borrowing Calculator" },
  "stamp-duty": { label: "Stamp Duty Calculator", description: "Calculate stamp duty land tax (SDLT) in England, LBTT in Scotland, and LTT in Wales. Covers first-time buyers, home movers, and second homes. Free UK 2025/26 tool.", schemaName: "Stamp Duty Calculator" },
  affordability: { label: "Mortgage Affordability Calculator", description: "How much mortgage can you afford? Calculate your borrowing power based on income, outgoings, and deposit size. Free UK affordability tool.", schemaName: "Mortgage Affordability Calculator" },
  equity: { label: "Home Equity Calculator", description: "Calculate the equity in your home and track how it grows over your mortgage term. Free UK home equity calculator.", schemaName: "Home Equity Calculator" },
  "buy-to-let": { label: "Buy-to-Let Mortgage Calculator", description: "Calculate buy-to-let mortgage repayments, rental yield, and stress-test your investment at higher rates. Free UK BTL calculator.", schemaName: "Buy-to-Let Mortgage Calculator" },
  compare: { label: "Mortgage Comparison Calculator", description: "Compare two mortgage deals side-by-side. See the true cost difference between fixed rates, terms, and lenders. Free UK comparison tool.", schemaName: "Mortgage Comparison Calculator" },
};

export function SEOHead({ calculatorType, lender, canonicalPath, titleOverride, descriptionOverride }: SEOHeadProps) {
  const meta = CALC_META[calculatorType];
  const canonicalUrl = `${BASE_URL}/${canonicalPath}`;

  const title = titleOverride ?? (lender ? `${lender.name} ${meta.label} – Free UK Tool | RepayWise` : `${meta.label} – Free UK Tool | RepayWise`);
  const description = descriptionOverride ?? (lender ? `Free ${lender.name} ${meta.label.toLowerCase()}. ${meta.description}` : `${meta.description} Powered by RepayWise.`);

  const webAppSchema = {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: lender ? `${lender.name} ${meta.schemaName}` : meta.schemaName,
    url: canonicalUrl, applicationCategory: "FinanceApplication", operatingSystem: "All", description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    provider: { "@type": "Organization", name: "RepayWise", url: BASE_URL },
  };

  const faqSchema = lender ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `How much can I borrow with ${lender.name}?`, acceptedAnswer: { "@type": "Answer", text: `${lender.name} typically lends up to ${lender.maxLtv}% LTV. Most borrowers can obtain 4–4.5× their gross annual income, though your exact amount depends on credit profile, income type, and existing financial commitments.` } },
      { "@type": "Question", name: `What is ${lender.name}'s standard variable rate?`, acceptedAnswer: { "@type": "Answer", text: `${lender.name}'s estimated standard variable rate (SVR) is currently around ${lender.estimatedSvr}%. Your actual mortgage rate will depend on the product you choose and your personal circumstances.` } },
      { "@type": "Question", name: `Does ${lender.name} offer mortgages up to ${lender.maxLtv}% LTV?`, acceptedAnswer: { "@type": "Answer", text: `Yes, ${lender.name} offers mortgage products up to ${lender.maxLtv}% LTV, meaning you could borrow with a minimum ${100 - lender.maxLtv}% deposit.` } },
      { "@type": "Question", name: `Is ${lender.name} a good mortgage lender?`, acceptedAnswer: { "@type": "Answer", text: `${lender.description ?? lender.name + " is a UK mortgage lender."} RepayWise gives ${lender.name} a trust rating of ${lender.trustRating ?? "4"}/5.` } },
    ]
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${BASE_URL}/calculators` },
      ...(lender
        ? [{ "@type": "ListItem", position: 3, name: meta.label, item: `${BASE_URL}/calculators/${calculatorType}` }, { "@type": "ListItem", position: 4, name: lender.name, item: canonicalUrl }]
        : [{ "@type": "ListItem", position: 3, name: meta.label, item: canonicalUrl }]
      ),
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RepayWise" />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="geo.region" content="GB" />
      <meta httpEquiv="content-language" content="en-GB" />
      <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Head>
  );
}
