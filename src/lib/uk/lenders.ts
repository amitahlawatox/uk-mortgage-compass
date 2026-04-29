export interface LenderData {
  name: string;
  slug: string;
  estimatedSvr: number;
  maxLtv: number;
  category: string;
  trustRating: number;
}

export const lenders: LenderData[] = [
  { name: "Lloyds Bank", slug: "lloyds-bank", estimatedSvr: 7.5, maxLtv: 95, category: "Big Six", trustRating: 4.8 },
  { name: "Halifax", slug: "halifax", estimatedSvr: 7.73, maxLtv: 95, category: "Big Six", trustRating: 4.7 },
  { name: "Nationwide Building Society", slug: "nationwide", estimatedSvr: 7.99, maxLtv: 95, category: "Big Six", trustRating: 4.9 },
  { name: "Barclays", slug: "barclays", estimatedSvr: 7.74, maxLtv: 90, category: "Big Six", trustRating: 4.6 },
  { name: "HSBC UK", slug: "hsbc", estimatedSvr: 6.99, maxLtv: 90, category: "Big Six", trustRating: 4.5 },
  { name: "NatWest", slug: "natwest", estimatedSvr: 7.74, maxLtv: 95, category: "Big Six", trustRating: 4.6 },
  { name: "Santander UK", slug: "santander", estimatedSvr: 7.5, maxLtv: 95, category: "Major", trustRating: 4.6 },
  { name: "Virgin Money", slug: "virgin-money", estimatedSvr: 8.24, maxLtv: 90, category: "Major", trustRating: 4.3 },
  { name: "TSB Bank", slug: "tsb", estimatedSvr: 7.74, maxLtv: 95, category: "Major", trustRating: 4.2 },
  { name: "Coventry Building Society", slug: "coventry", estimatedSvr: 7.49, maxLtv: 90, category: "Building Society", trustRating: 4.8 },
  { name: "Yorkshire Building Society", slug: "yorkshire", estimatedSvr: 7.74, maxLtv: 90, category: "Building Society", trustRating: 4.7 },
  { name: "Skipton Building Society", slug: "skipton", estimatedSvr: 6.79, maxLtv: 90, category: "Building Society", trustRating: 4.8 },
  { name: "Leeds Building Society", slug: "leeds", estimatedSvr: 7.74, maxLtv: 95, category: "Building Society", trustRating: 4.6 },
  { name: "Principality Building Society", slug: "principality", estimatedSvr: 7.5, maxLtv: 90, category: "Regional", trustRating: 4.5 },
  { name: "Newcastle Building Society", slug: "newcastle", estimatedSvr: 7.69, maxLtv: 95, category: "Regional", trustRating: 4.4 },
  { name: "Nottingham Building Society", slug: "nottingham", estimatedSvr: 7.5, maxLtv: 95, category: "Regional", trustRating: 4.3 },
  { name: "West Bromwich Building Society", slug: "west-brom", estimatedSvr: 8.19, maxLtv: 90, category: "Regional", trustRating: 4.2 },
  { name: "Cumberland Building Society", slug: "cumberland", estimatedSvr: 7.24, maxLtv: 90, category: "Regional", trustRating: 4.7 },
  { name: "Suffolk Building Society", slug: "suffolk", estimatedSvr: 7.74, maxLtv: 90, category: "Regional", trustRating: 4.5 },
  { name: "Cambridge Building Society", slug: "cambridge", estimatedSvr: 7.19, maxLtv: 90, category: "Regional", trustRating: 4.6 },
  { name: "Bath Building Society", slug: "bath", estimatedSvr: 7.2, maxLtv: 95, category: "Boutique", trustRating: 4.5 },
  { name: "Buckinghamshire Building Society", slug: "bucks", estimatedSvr: 7.49, maxLtv: 90, category: "Boutique", trustRating: 4.4 },
  { name: "Dudley Building Society", slug: "dudley", estimatedSvr: 7.74, maxLtv: 90, category: "Boutique", trustRating: 4.3 },
  { name: "Melton Mowbray Building Society", slug: "melton", estimatedSvr: 7.99, maxLtv: 90, category: "Boutique", trustRating: 4.2 },
  { name: "Mansfield Building Society", slug: "mansfield", estimatedSvr: 7.5, maxLtv: 95, category: "Boutique", trustRating: 4.3 },
  { name: "The Mortgage Works", slug: "tmw", estimatedSvr: 7.74, maxLtv: 80, category: "Specialist", trustRating: 4.4 },
  { name: "Precise Mortgages", slug: "precise", estimatedSvr: 8.25, maxLtv: 85, category: "Specialist", trustRating: 4.1 },
  { name: "Kensington Mortgages", slug: "kensington", estimatedSvr: 8.49, maxLtv: 85, category: "Specialist", trustRating: 4.0 },
  { name: "Pepper Money", slug: "pepper", estimatedSvr: 8.74, maxLtv: 85, category: "Specialist", trustRating: 3.9 },
  { name: "Foundation Home Loans", slug: "foundation", estimatedSvr: 8.24, maxLtv: 80, category: "Specialist", trustRating: 4.1 },
  { name: "Fleet Mortgages", slug: "fleet", estimatedSvr: 7.74, maxLtv: 80, category: "Specialist", trustRating: 4.2 },
  { name: "Landbay", slug: "landbay", estimatedSvr: 7.49, maxLtv: 80, category: "Specialist", trustRating: 4.3 },
  { name: "Paragon Bank", slug: "paragon", estimatedSvr: 7.75, maxLtv: 80, category: "Specialist", trustRating: 4.4 },
  { name: "Aldermore Bank", slug: "aldermore", estimatedSvr: 7.74, maxLtv: 90, category: "Challenger", trustRating: 4.2 },
  { name: "Shawbrook Bank", slug: "shawbrook", estimatedSvr: 8.25, maxLtv: 85, category: "Challenger", trustRating: 4.3 },
  { name: "Metro Bank", slug: "metro-bank", estimatedSvr: 7.5, maxLtv: 95, category: "Challenger", trustRating: 4.1 },
  { name: "Co-operative Bank", slug: "co-op", estimatedSvr: 7.74, maxLtv: 95, category: "Challenger", trustRating: 4.4 },
  { name: "Atom Bank", slug: "atom-bank", estimatedSvr: 7.24, maxLtv: 90, category: "Challenger", trustRating: 4.6 },
  { name: "Perenna", slug: "perenna", estimatedSvr: 5.75, maxLtv: 95, category: "Innovator", trustRating: 4.8 },
  { name: "Habito", slug: "habito", estimatedSvr: 6.5, maxLtv: 90, category: "Innovator", trustRating: 4.7 },
  { name: "Gen H", slug: "gen-h", estimatedSvr: 7.24, maxLtv: 95, category: "Innovator", trustRating: 4.9 },
  { name: "Mojo Mortgages", slug: "mojo", estimatedSvr: 7.74, maxLtv: 95, category: "Innovator", trustRating: 4.6 },
  { name: "Accord Mortgages", slug: "accord", estimatedSvr: 7.74, maxLtv: 90, category: "Broker-Only", trustRating: 4.5 },
  { name: "BM Solutions", slug: "bm-solutions", estimatedSvr: 7.74, maxLtv: 75, category: "Broker-Only", trustRating: 4.4 },
  { name: "Clydesdale Bank", slug: "clydesdale", estimatedSvr: 7.74, maxLtv: 90, category: "Regional", trustRating: 4.1 },
  { name: "Danske Bank", slug: "danske", estimatedSvr: 7.5, maxLtv: 90, category: "Regional", trustRating: 4.3 },
  { name: "Bank of Ireland UK", slug: "boi", estimatedSvr: 7.74, maxLtv: 90, category: "Regional", trustRating: 4.2 },
  { name: "Post Office Money", slug: "post-office", estimatedSvr: 7.74, maxLtv: 90, category: "White-Label", trustRating: 4.4 },
  { name: "Scottish Widows", slug: "scottish-widows", estimatedSvr: 7.74, maxLtv: 90, category: "Insurance-Led", trustRating: 4.5 },
  { name: "Standard Life", slug: "standard-life", estimatedSvr: 7.74, maxLtv: 90, category: "Insurance-Led", trustRating: 4.4 },
];

export function getLenderBySlug(slug: string) {
  return lenders.find((lender) => lender.slug === slug);
}

export function buildLenderPath(
  calculator: "repayment" | "overpayment" | "max-borrowing",
  slug: string,
) {
  return `/calculators/${calculator}/${slug}`;
}

export function buildLenderGuidePath(slug: string) {
  return `/guides/lenders/${slug}`;
}
