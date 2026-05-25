/**
 * Lender slugs with zero search impressions in GSC (28-day window ending May 25, 2026).
 * Pages for these lenders are noindexed to avoid thin content penalties.
 * Review quarterly — remove from this list when a lender starts getting impressions.
 */
export const NOINDEX_LENDER_SLUGS = new Set([
  "ahli-united",
  "april",
  "bank-of-ireland",
  "bucks",
  "bucks-remortgage",
  "cambridge-bs",
  "castle-trust",
  "chorley",
  "clydesdale",
  "dudley",
  "earl-shilton",
  "family-bs",
  "fleet",
  "foundation",
  "generation-home",
  "habito",
  "hanley-economic",
  "harpenden",
  "hinckley-rugby",
  "hodge",
  "holmesdale",
  "ipswich",
  "ipswich-bs",
  "ipswich-suffolk",
  "landbay",
  "market-harborough",
  "marsden",
  "masthaven",
  "mojo",
  "national-counties",
  "newbury",
  "newcastle-bs",
  "octane",
  "onesavings",
  "penrith",
  "penrith-remortgage",
  "pepper",
  "perenna",
  "platform",
  "post-office",
  "proportunity",
  "quantum",
  "shawbrook",
  "spring-finance",
  "stafford-railway",
  "swansea-bs",
  "zephyr",
]);

export function shouldNoindexLender(slug: string | undefined): boolean {
  if (!slug) return false;
  return NOINDEX_LENDER_SLUGS.has(slug);
}
