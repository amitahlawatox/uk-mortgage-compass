import { Head } from "vite-react-ssg";

interface FAQItem { question: string; answer: string; }
interface LenderMeta { name: string; maxLtv?: number; estimatedSvr?: number | string; description?: string; trustRating?: number; }

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  jsonLd?: object;
  lender?: LenderMeta;
  calculatorType?: string;
  faqItems?: FAQItem[];
  noindex?: boolean;
}

const BASE = "https://repaywise.co.uk";
const OG_IMAGE = `${BASE}/og-image.jpg`;

export function SEO({ title, description, path, jsonLd, lender, calculatorType, faqItems, noindex }: SEOProps) {
  const canonical = path
    ? path.startsWith("http") ? path : `${BASE}/${path.replace(/^\//, "")}`
    : BASE;

  const schemas: object[] = [];

  // WebApplication schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: lender && calculatorType ? `${lender.name} ${calculatorType}` : title,
    url: canonical,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    provider: { "@type": "Organization", name: "RepayWise", url: BASE },
  });

  // FAQPage schema
  const faqs: FAQItem[] = faqItems ?? (lender ? [
    {
      question: `How much can I borrow with ${lender.name}?`,
      answer: `${lender.name} typically lends up to ${lender.maxLtv ?? 95}% LTV. Most borrowers can obtain 4–4.5× gross annual income depending on credit profile and financial commitments. RepayWise is not affiliated with ${lender.name}.`,
    },
    {
      question: `What is ${lender.name}'s standard variable rate?`,
      answer: `${lender.name}'s estimated SVR is around ${lender.estimatedSvr ?? "7.49"}%. Your actual rate depends on the product and your personal circumstances. Always confirm current rates directly with ${lender.name}. This is an independent third-party calculator.`,
    },
    {
      question: `Does ${lender.name} offer mortgages up to ${lender.maxLtv ?? 95}% LTV?`,
      answer: `${lender.name} offers products up to ${lender.maxLtv ?? 95}% LTV, requiring a minimum ${100 - (lender.maxLtv ?? 95)}% deposit. Higher LTV products typically carry higher rates. RepayWise is an independent comparison tool, not affiliated with ${lender.name}.`,
    },
    {
      question: `Do I need to log in to use this ${lender.name} calculator?`,
      answer: `No. The RepayWise ${lender.name} calculator requires no login, no email address, and no phone number. It is a completely free, independent third-party tool. No credit check is run.`,
    },
    {
      question: `Is RepayWise affiliated with ${lender.name}?`,
      answer: `No. RepayWise is completely independent and not affiliated with ${lender.name} or any other lender. We are a free third-party mortgage calculator tool. Always verify figures directly with ${lender.name}.`,
    },
  ] : []);

  if (faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  // Breadcrumb schema
  const crumbs: { name: string; item: string }[] = [{ name: "Home", item: BASE }];
  if (calculatorType) crumbs.push({ name: "Calculators", item: `${BASE}/calculators` });
  if (lender && calculatorType) {
    crumbs.push({ name: calculatorType, item: `${BASE}/calculators/${calculatorType.toLowerCase().replace(/ /g, "-")}` });
    crumbs.push({ name: lender.name, item: canonical });
  }
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  });

  if (jsonLd) schemas.push(jsonLd);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RepayWise" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`RepayWise — ${title}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:site" content="@repaywise" />

      {/* Geo / regional */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <meta name="language" content="en-GB" />

      {/* Schema JSON-LD blocks */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" data-repaywise-schema="true">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
}
