import type { Region } from "@/lib/finance/stampDuty";

export interface CityData {
  slug: string;
  name: string;
  region: Region;
  taxName: "SDLT" | "LBTT" | "LTT";
  // Land Registry / ONS averages, late 2024
  avgPrice: number;
  ftbPrice: number;
  yoyChange: number; // %
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
      "London is the UK's most expensive housing market and the deepest mortgage market in Europe. Stamp Duty (SDLT) bites hard above £250k — most central purchases pay the 5% and 10% bands. First-time buyer relief is preserved up to £625k.",
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
      "Manchester is the UK's fastest-growing major city economy, with rental yields routinely above 6% and a buy-to-let market unmatched outside London. Most FTB purchases sit comfortably under the £425k SDLT threshold — meaning zero stamp duty on a typical first home.",
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
      "Edinburgh runs on Scotland's Land and Buildings Transaction Tax (LBTT), not SDLT. The nil-rate band is lower (£145k, or £175k for first-time buyers) and the top bands kick in earlier — purchases above £325k pay 10%. Closing dates and offers-over pricing are the norm.",
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
      "Cardiff sits inside the Welsh Land Transaction Tax (LTT) regime — the only UK system with no first-time buyer relief, but a generous £225k nil-rate band that already covers many FTB purchases. Capital regeneration around the Bay continues to push values north.",
    neighbourhoods: [
      { name: "Pontcanna", avg: 412_000, vibe: "Edwardian, café culture, premium FTB" },
      { name: "Roath", avg: 268_000, vibe: "Period terraces, students, BTL" },
      { name: "Cardiff Bay", avg: 245_000, vibe: "New-build apartments, waterside" },
      { name: "Whitchurch", avg: 318_000, vibe: "Family, schools, suburban" },
    ],
    postcodePrefixes: ["CF"],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
