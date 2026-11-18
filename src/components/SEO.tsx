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
  noIndex?: boolean;
}

const BASE = "https://repaywise.co.uk";
const OG_IMAGE = `${BASE}/og-image.jpg`;

export function SEO({ title, description, path, jsonLd, lender, calculatorType, faqItems, noIndex }: SEOProps) {
  const canonical = path
    ? path.startsWith("http") ? path : `${BASE}/${path.replace(/^\//, "")}`
    : BASE;

  const schemas: object[] = [];

  if (calculatorType) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: lender ? `${lender.name} ${calculatorType}` : title,
      url: canonical,
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      provider: { "@type": "Organization", name: "RepayWise", url: BASE },
    });
  }

  // FAQPage schema
  const faqs: FAQItem[] = faqItems ?? [];

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

  if (jsonLd) schemas.push(jsonLd);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
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
