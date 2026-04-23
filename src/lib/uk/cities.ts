import type { Region } from "@/lib/finance/stampDuty";

export interface CityData {
  slug: string;
  name: string;
  region: Region;
  taxName: "SDLT" | "LBTT" | "LTT";
  avgPrice: number;
  ftbPrice: number;
  yoyChange: number;
  rentMonthly: number;
  intro: string;
  neighbourhoods: { name: string; avg: number; vibe: string }[];
  postcodePrefixes: string[];
}

export const cities: CityData[] = [
  {
    slug: "london",
    name: "London",
    region: "england",
    taxName: "SDLT",
    avgPrice: 523_376,
    ftbPrice: 460_000,
    yoyChange: 0.6,
    rentMonthly: 2_121,
    intro:
      "London is the UK's most expensive housing market and the deepest mortgage market in Europe. SDLT now starts above GBP 125,000, and many central purchases hit the 5% and 10% bands quickly. First-time buyer relief now ends above GBP 500,000.",
    neighbourhoods: [
      { name: "Hackney", avg: 612_000, vibe: "Creative, family, strong rental yield" },
      { name: "Wandsworth", avg: 689_000, vibe: "Young professionals, outstanding schools" },
      { name: "Walthamstow", avg: 498_000, vibe: "Up-and-coming, Victoria line, FTB favourite" },
      { name: "Greenwich", avg: 467_000, vibe: "Riverside, regenerating docklands" },
    ],
    postcodePrefixes: ["E", "EC", "N", "NW", "SE", "SW", "W", "WC"],
  },
  {
    slug: "manchester",
    name: "Manchester",
    region: "england",
    taxName: "SDLT",
    avgPrice: 244_910,
    ftbPrice: 215_000,
    yoyChange: 2.1,
    rentMonthly: 1_268,
    intro:
      "Manchester is the UK's fastest-growing major city economy, with rental yields routinely above 6% and a buy-to-let market unmatched outside London. Most first-time buyer purchases sit under the GBP 300,000 nil-rate SDLT threshold, so a typical first home still pays no SDLT.",
    neighbourhoods: [
      { name: "Ancoats", avg: 312_000, vibe: "Loft conversions, foodie, walk to city centre" },
      { name: "Chorlton", avg: 365_000, vibe: "Family, leafy, independent shops" },
      { name: "Didsbury", avg: 428_000, vibe: "Premium suburb, top schools" },
      { name: "Salford Quays", avg: 248_000, vibe: "MediaCity, young renters, BTL hotspot" },
    ],
    postcodePrefixes: ["M", "WA"],
  },
  {
    slug: "edinburgh",
    name: "Edinburgh",
    region: "scotland",
    taxName: "LBTT",
    avgPrice: 332_500,
    ftbPrice: 268_000,
    yoyChange: 3.4,
    rentMonthly: 1_490,
    intro:
      "Edinburgh runs on Scotland's Land and Buildings Transaction Tax, not SDLT. The nil-rate band is GBP 145,000, or GBP 175,000 for first-time buyers, and purchases above GBP 325,000 move into the 10% band. Closing dates and offers-over pricing are the norm.",
    neighbourhoods: [
      { name: "Stockbridge", avg: 478_000, vibe: "Georgian, village-feel, Sunday market" },
      { name: "Leith", avg: 268_000, vibe: "Regenerated waterfront, strong yield" },
      { name: "Morningside", avg: 412_000, vibe: "Family, schools, leafy" },
      { name: "Newington", avg: 345_000, vibe: "Student-adjacent, BTL friendly" },
    ],
    postcodePrefixes: ["EH"],
  },
  {
    slug: "cardiff",
    name: "Cardiff",
    region: "wales",
    taxName: "LTT",
    avgPrice: 261_300,
    ftbPrice: 222_000,
    yoyChange: 1.2,
    rentMonthly: 1_180,
    intro:
      "Cardiff sits inside the Welsh Land Transaction Tax regime. Wales has no first-time buyer relief, but its GBP 225,000 main-rate nil band still covers many typical first-home purchases. Capital regeneration around the Bay continues to push values north.",
    neighbourhoods: [
      { name: "Pontcanna", avg: 412_000, vibe: "Edwardian, cafe culture, premium FTB" },
      { name: "Roath", avg: 268_000, vibe: "Period terraces, students, BTL" },
      { name: "Cardiff Bay", avg: 245_000, vibe: "New-build apartments, waterside" },
      { name: "Whitchurch", avg: 318_000, vibe: "Family, schools, suburban" },
    ],
    postcodePrefixes: ["CF"],
  },
];

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}
