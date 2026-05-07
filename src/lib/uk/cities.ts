export interface CityData {
  name: string;
  slug: string;
  region: string;
  avgHousePrice: number;
  avgDeposit: number;
  monthlySearches: number;
  description: string;
}

export const cities: CityData[] = [
  { name: "London", slug: "london", region: "Greater London", avgHousePrice: 523000, avgDeposit: 52300, monthlySearches: 8100, description: "London has the UK's highest property prices, averaging around £523,000 in 2024." },
  { name: "Manchester", slug: "manchester", region: "North West England", avgHousePrice: 242000, avgDeposit: 24200, monthlySearches: 2400, description: "Manchester has seen strong price growth, averaging around £242,000 in 2024." },
  { name: "Birmingham", slug: "birmingham", region: "West Midlands", avgHousePrice: 232000, avgDeposit: 23200, monthlySearches: 1900, description: "Birmingham is the UK's second city with average prices around £232,000." },
  { name: "Bristol", slug: "bristol", region: "South West England", avgHousePrice: 363000, avgDeposit: 36300, monthlySearches: 1600, description: "Bristol commands premium prices in the South West, averaging £363,000." },
  { name: "Leeds", slug: "leeds-city", region: "Yorkshire", avgHousePrice: 231000, avgDeposit: 23100, monthlySearches: 1500, description: "Leeds offers good value in Yorkshire with average prices of £231,000." },
  { name: "Edinburgh", slug: "edinburgh", region: "Scotland", avgHousePrice: 310000, avgDeposit: 31000, monthlySearches: 1400, description: "Edinburgh is Scotland's most expensive city, averaging £310,000." },
  { name: "Sheffield", slug: "sheffield", region: "Yorkshire", avgHousePrice: 194000, avgDeposit: 19400, monthlySearches: 900, description: "Sheffield offers affordable options in Yorkshire, averaging around £194,000." },
  { name: "Liverpool", slug: "liverpool", region: "North West England", avgHousePrice: 190000, avgDeposit: 19000, monthlySearches: 950, description: "Liverpool has competitive city-centre prices averaging around £190,000." },
  { name: "Newcastle", slug: "newcastle-city", region: "North East England", avgHousePrice: 172000, avgDeposit: 17200, monthlySearches: 750, description: "Newcastle upon Tyne offers great value in the North East, averaging £172,000." },
  { name: "Glasgow", slug: "glasgow", region: "Scotland", avgHousePrice: 185000, avgDeposit: 18500, monthlySearches: 1100, description: "Glasgow is Scotland's largest city with average prices of £185,000." },
  { name: "Cardiff", slug: "cardiff", region: "Wales", avgHousePrice: 248000, avgDeposit: 24800, monthlySearches: 850, description: "Cardiff is the Welsh capital with average property prices around £248,000." },
  { name: "Nottingham", slug: "nottingham-city", region: "East Midlands", avgHousePrice: 202000, avgDeposit: 20200, monthlySearches: 700, description: "Nottingham offers good value in the East Midlands, averaging £202,000." },
  { name: "Leicester", slug: "leicester", region: "East Midlands", avgHousePrice: 216000, avgDeposit: 21600, monthlySearches: 650, description: "Leicester is a growing Midlands city with average prices of £216,000." },
  { name: "Bradford", slug: "bradford", region: "Yorkshire", avgHousePrice: 158000, avgDeposit: 15800, monthlySearches: 500, description: "Bradford is one of the most affordable cities in Yorkshire, averaging £158,000." },
  { name: "Southampton", slug: "southampton", region: "South East England", avgHousePrice: 267000, avgDeposit: 26700, monthlySearches: 600, description: "Southampton averages £267,000 on the South Coast." },
  { name: "Portsmouth", slug: "portsmouth", region: "South East England", avgHousePrice: 255000, avgDeposit: 25500, monthlySearches: 500, description: "Portsmouth is an island city with average prices around £255,000." },
  { name: "Oxford", slug: "oxford", region: "South East England", avgHousePrice: 471000, avgDeposit: 47100, monthlySearches: 900, description: "Oxford commands high prices due to university demand, averaging £471,000." },
  { name: "Cambridge", slug: "cambridge-city", region: "East of England", avgHousePrice: 497000, avgDeposit: 49700, monthlySearches: 950, description: "Cambridge has seen exceptional growth, averaging £497,000 in 2024." },
  { name: "Brighton", slug: "brighton", region: "South East England", avgHousePrice: 393000, avgDeposit: 39300, monthlySearches: 900, description: "Brighton is a highly desirable coastal city averaging £393,000." },
  { name: "Reading", slug: "reading", region: "South East England", avgHousePrice: 365000, avgDeposit: 36500, monthlySearches: 700, description: "Reading is a key commuter hub west of London, averaging £365,000." },
  { name: "Milton Keynes", slug: "milton-keynes", region: "South East England", avgHousePrice: 298000, avgDeposit: 29800, monthlySearches: 550, description: "Milton Keynes is a well-connected planned city averaging £298,000." },
  { name: "Derby", slug: "derby", region: "East Midlands", avgHousePrice: 196000, avgDeposit: 19600, monthlySearches: 500, description: "Derby is an industrial city in the East Midlands averaging £196,000." },
  { name: "Stoke-on-Trent", slug: "stoke", region: "West Midlands", avgHousePrice: 149000, avgDeposit: 14900, monthlySearches: 450, description: "Stoke-on-Trent is one of England's most affordable cities at £149,000 average." },
  { name: "Plymouth", slug: "plymouth", region: "South West England", avgHousePrice: 228000, avgDeposit: 22800, monthlySearches: 500, description: "Plymouth is a naval city in Devon with average prices around £228,000." },
  { name: "Exeter", slug: "exeter", region: "South West England", avgHousePrice: 320000, avgDeposit: 32000, monthlySearches: 500, description: "Exeter is a thriving university city in Devon averaging £320,000." },
  { name: "York", slug: "york", region: "Yorkshire", avgHousePrice: 333000, avgDeposit: 33300, monthlySearches: 600, description: "York is one of England's most desirable historic cities, averaging £333,000." },
  { name: "Bournemouth", slug: "bournemouth", region: "South West England", avgHousePrice: 335000, avgDeposit: 33500, monthlySearches: 550, description: "Bournemouth is a coastal resort town averaging £335,000." },
  { name: "Aberdeen", slug: "aberdeen", region: "Scotland", avgHousePrice: 183000, avgDeposit: 18300, monthlySearches: 550, description: "Aberdeen is Scotland's oil capital with average prices of £183,000." },
  { name: "Belfast", slug: "belfast", region: "Northern Ireland", avgHousePrice: 195000, avgDeposit: 19500, monthlySearches: 700, description: "Belfast is the capital of Northern Ireland with average prices around £195,000." },
  { name: "Bath", slug: "bath-city", region: "South West England", avgHousePrice: 431000, avgDeposit: 43100, monthlySearches: 500, description: "Bath is a UNESCO World Heritage city with average prices of £431,000." },
  { name: "Guildford", slug: "guildford", region: "South East England", avgHousePrice: 498000, avgDeposit: 49800, monthlySearches: 550, description: "Guildford is a premium Surrey commuter town averaging £498,000." },
  { name: "Cheltenham", slug: "cheltenham", region: "South West England", avgHousePrice: 355000, avgDeposit: 35500, monthlySearches: 450, description: "Cheltenham is an affluent Regency town in Gloucestershire averaging £355,000." },
  { name: "Peterborough", slug: "peterborough", region: "East of England", avgHousePrice: 236000, avgDeposit: 23600, monthlySearches: 400, description: "Peterborough offers good value in the East of England, averaging £236,000." },
  { name: "Norwich", slug: "norwich", region: "East of England", avgHousePrice: 261000, avgDeposit: 26100, monthlySearches: 450, description: "Norwich is East Anglia's main city, with average property prices of £261,000." },
  { name: "Swansea", slug: "swansea", region: "Wales", avgHousePrice: 196000, avgDeposit: 19600, monthlySearches: 450, description: "Swansea is Wales' second city with average prices around £196,000." },
  { name: "Sunderland", slug: "sunderland", region: "North East England", avgHousePrice: 143000, avgDeposit: 14300, monthlySearches: 400, description: "Sunderland is one of the UK's most affordable cities at around £143,000 average." },
  { name: "Wolverhampton", slug: "wolverhampton", region: "West Midlands", avgHousePrice: 187000, avgDeposit: 18700, monthlySearches: 450, description: "Wolverhampton offers competitive West Midlands prices averaging £187,000." },
  { name: "Dundee", slug: "dundee", region: "Scotland", avgHousePrice: 163000, avgDeposit: 16300, monthlySearches: 400, description: "Dundee is a growing Scottish city with regeneration driving prices to £163,000." },
  { name: "Luton", slug: "luton", region: "East of England", avgHousePrice: 295000, avgDeposit: 29500, monthlySearches: 450, description: "Luton benefits from proximity to London, averaging around £295,000." },
  { name: "Northampton", slug: "northampton", region: "East Midlands", avgHousePrice: 241000, avgDeposit: 24100, monthlySearches: 400, description: "Northampton is a growing town in the East Midlands averaging £241,000." },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export const allCitySlugs: string[] = cities.map((c) => c.slug);




