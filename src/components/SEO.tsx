import { useEffect } from "react";

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
}

const BASE = "https://repaywise.co.uk";

export function SEO({ title, description, path, jsonLd, lender, calculatorType, faqItems }: SEOProps) {
  const canonical = path ? (path.startsWith("http") ? path : `${BASE}/${path.replace(/^\//, "")}`) : BASE;

  // Build schema array
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

  // FAQPage schema - auto-generate for lender pages or use provided items
  const faqs: FAQItem[] = faqItems ?? (lender ? [
    { question: `How much can I borrow with ${lender.name}?`, answer: `${lender.name} typically lends up to ${lender.maxLtv ?? 95}% LTV. Most borrowers can obtain 4–4.5× gross annual income depending on credit profile and commitments.` },
    { question: `What is ${lender.name}'s standard variable rate?`, answer: `${lender.name}'s estimated SVR is around ${lender.estimatedSvr ?? "7.49"}%. Your actual rate depends on the product and your personal circumstances. Always confirm with ${lender.name} directly.` },
    { question: `Does ${lender.name} offer mortgages up to ${lender.maxLtv ?? 95}% LTV?`, answer: `Yes, ${lender.name} offers products up to ${lender.maxLtv ?? 95}% LTV, requiring a minimum ${100 - (lender.maxLtv ?? 95)}% deposit. Higher LTV products typically carry higher rates.` },
    { question: `Is ${lender.name} a good mortgage lender?`, answer: `${lender.description ?? lender.name + " is a regulated UK mortgage lender."} RepayWise gives ${lender.name} a trust rating of ${lender.trustRating ?? 4}/5 based on product range, rates, and service.` },
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
    crumbs.push({ name: calculatorType, item: `${BASE}/calculators/${calculatorType.toLowerCase().replace(/ /g,'-')}` });
    crumbs.push({ name: lender.name, item: canonical });
  }
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  });

  // Custom jsonLd override still supported
  if (jsonLd) schemas.push(jsonLd);

  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "RepayWise", "property");
    setMeta("og:locale", "en_GB", "property");
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("geo.region", "GB");

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;

    // Remove old schema scripts then add new ones
    document.querySelectorAll('script[data-repaywise-schema]').forEach(s => s.remove());
    schemas.forEach(schema => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-repaywise-schema", "true");
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    });
  }, [title, description, canonical, JSON.stringify(schemas)]);

  return null;
}
