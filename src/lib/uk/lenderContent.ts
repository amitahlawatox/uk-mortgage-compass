// Unique lender content for defeating Google's duplicate content filter
// Each entry adds 3-4 paragraphs of genuinely unique, lender-specific text
// that appears on the calculator page alongside the tool.

export interface LenderContent {
  /** 2-3 sentence overview unique to this lender */
  overview: string;
  /** Key product features this lender is known for */
  keyFeatures: string[];
  /** Overpayment policy specific to this lender */
  overpaymentPolicy: string;
  /** What makes this lender different from others */
  whatMakesThemDifferent: string;
  /** Who this lender is best suited for */
  bestFor: string;
  /** Typical fixed rate products offered */
  typicalProducts: string[];
}

export const LENDER_CONTENT: Record<string, LenderContent> = {
  "barclays": {
    overview: "Barclays is one of the UK\'s Big Six high-street banks, consistently ranking among the top five mortgage lenders by volume. Founded in 1690, Barclays offers mortgages through its branch network, online portal and intermediary channels. Their mortgage range covers first-time buyers, home movers and remortgagers with LTVs up to 95%.",
    keyFeatures: [
      "Existing Barclays current account holders may qualify for preferential rates",
      "Cashback offers available on selected fixed-rate products",
      "Porting available if you move home during your fixed-rate period",
      "Family Springboard mortgage available for first-time buyers with parental support"
    ],
    overpaymentPolicy: "Barclays typically allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Unlimited overpayments are usually permitted on tracker and variable-rate mortgages. Always confirm current terms directly with Barclays before overpaying.",
    whatMakesThemDifferent: "Barclays is known for competitive two-year and five-year fixed rates, particularly for borrowers with 25%+ deposits. Their Family Springboard product, which allows parents to use their savings as security, has been particularly popular with first-time buyers unable to save a full deposit.",
    bestFor: "Existing Barclays customers seeking loyalty rates, first-time buyers with parental support, and borrowers with 25%+ deposits looking for competitive fixed rates.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Family Springboard", "Buy-to-let fixed"]
  },
  "nationwide": {
    overview: "Nationwide Building Society is the world\'s largest building society and the UK\'s second-largest mortgage provider. As a mutual, Nationwide is owned by its members rather than shareholders, which often translates to more competitive rates and lower fees. They offer mortgages up to 95% LTV for first-time buyers.",
    keyFeatures: [
      "Member-owned mutual — profits reinvested into better rates and service",
      "Helping Hand mortgage offers up to 95% LTV for first-time buyers",
      "No arrangement fees on many standard products",
      "FlexAccount current account mortgage available for flexible overpayments"
    ],
    overpaymentPolicy: "Nationwide generally permits overpayments of up to 10% of the outstanding mortgage balance per calendar year on fixed-rate mortgages without incurring early repayment charges. Their FlexAccount mortgage allows unlimited overpayments and the ability to borrow back overpaid amounts.",
    whatMakesThemDifferent: "As a building society, Nationwide consistently offers some of the lowest fees in the market. Their Helping Hand range specifically targets first-time buyers with smaller deposits, and their FlexAccount mortgage is one of the most flexible overpayment products available in the UK.",
    bestFor: "First-time buyers with smaller deposits, borrowers who want low fees, and homeowners who plan to make regular overpayments and want the flexibility to borrow back.",
    typicalProducts: ["2-year fixed", "5-year fixed", "10-year fixed", "Tracker", "FlexAccount", "Helping Hand 95% LTV"]
  },
  "hsbc": {
    overview: "HSBC UK is one of the Big Six lenders and part of the global HSBC Group. Known for competitive rates especially for customers with larger deposits, HSBC offers mortgages through branches, online and via brokers. They are particularly competitive in the 60% LTV bracket where they frequently lead best-buy tables.",
    keyFeatures: [
      "Often market-leading rates at 60% LTV — ideal for borrowers with 40%+ deposits",
      "Premier customers may access exclusive mortgage rates",
      "Green Home mortgages with cashback for energy-efficient properties",
      "International mortgage options for overseas buyers"
    ],
    overpaymentPolicy: "HSBC allows overpayments of up to 10% of the original loan amount per year on fixed-rate mortgages without early repayment charges. Overpayments on their variable or tracker products are typically unlimited. Once overpaid, funds cannot be borrowed back.",
    whatMakesThemDifferent: "HSBC frequently tops best-buy tables for borrowers with larger deposits (40%+). Their Premier banking customers often get exclusive mortgage rates not available to the general public. They also offer competitive international mortgage products for expats and overseas investors.",
    bestFor: "Borrowers with 40%+ deposits seeking the lowest possible rate, HSBC Premier banking customers, expats buying UK property, and buyers of energy-efficient homes.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Premier exclusive", "Green Home", "International buyer"]
  },
  "halifax": {
    overview: "Halifax is the UK\'s largest mortgage lender by volume, part of Lloyds Banking Group. Known for consistent availability and straightforward products, Halifax serves first-time buyers, home movers and remortgagers through its extensive branch network and online platform. They process more mortgage applications than any other UK lender.",
    keyFeatures: [
      "UK\'s largest mortgage lender by volume — extensive processing capacity",
      "Cashback on completion available on selected products",
      "Shared Equity scheme available for new-build properties",
      "Speed Promise guarantees on mortgage application processing times"
    ],
    overpaymentPolicy: "Halifax permits overpayments of up to 10% of the outstanding balance per year on fixed-rate mortgages without early repayment charges. Their Standard Variable Rate mortgage allows unlimited overpayments at any time.",
    whatMakesThemDifferent: "Halifax\'s scale means they can process applications faster than many competitors. Their cashback offers on completion can offset moving costs, and their dedicated first-time buyer range makes them one of the most accessible lenders for new entrants to the property market.",
    bestFor: "First-time buyers wanting a straightforward application process, borrowers who value cashback on completion, and anyone who wants the security of the UK\'s largest mortgage lender.",
    typicalProducts: ["2-year fixed", "5-year fixed", "10-year fixed", "Tracker", "Shared Equity new-build"]
  },
  "lloyds": {
    overview: "Lloyds Bank is one of the UK\'s oldest and most established banks, part of Lloyds Banking Group alongside Halifax and Scottish Widows. Lloyds offers a comprehensive mortgage range with competitive rates, particularly for existing banking customers. They are a major force in both residential and buy-to-let lending.",
    keyFeatures: [
      "Existing Lloyds current account holders may access preferential rates",
      "Lend a Hand mortgage allows family members to use savings as security",
      "Competitive buy-to-let products through specialist division",
      "Green Living Reward offers reduced rates for energy-efficient homes"
    ],
    overpaymentPolicy: "Lloyds allows overpayments of up to 10% of the outstanding balance per calendar year on fixed-rate products without incurring ERCs. Tracker and variable rate mortgages typically allow unlimited overpayments.",
    whatMakesThemDifferent: "Lloyds\'s Green Living Reward offers a rate reduction for borrowers buying or remortgaging energy-efficient properties. Their Lend a Hand product is popular with first-time buyers whose parents want to help without gifting a deposit outright.",
    bestFor: "Existing Lloyds customers, buyers of energy-efficient homes, first-time buyers with family financial support, and buy-to-let investors.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Green Living", "Lend a Hand", "Buy-to-let"]
  },
  "santander": {
    overview: "Santander UK is a major mortgage lender offering competitive products across the LTV spectrum. Part of the global Banco Santander group, their UK operation has grown to become one of the top six mortgage providers. Santander is known for competitive tracker rates and their 123 World loyalty programme.",
    keyFeatures: [
      "123 World customers may access exclusive mortgage rate discounts",
      "Competitive tracker mortgage rates — often among the cheapest available",
      "Help to Buy and Shared Ownership mortgages available",
      "Follow-on rate typically lower than standard SVR"
    ],
    overpaymentPolicy: "Santander allows overpayments of up to 10% of the outstanding balance per year on fixed-rate mortgages. Their tracker and Follow-on Rate products allow unlimited overpayments without charges.",
    whatMakesThemDifferent: "Santander\'s tracker rates are frequently among the most competitive in the UK market. Their Follow-on Rate, which kicks in after a fixed deal ends, is typically lower than the full SVR — saving borrowers money if they don\'t remortgage immediately.",
    bestFor: "Borrowers who prefer tracker rates, Santander 123 World account holders, and homeowners who might not remortgage immediately when their fixed deal expires.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Follow-on rate", "Help to Buy", "Shared Ownership"]
  },
  "danske": {
    overview: "Danske Bank is Northern Ireland\'s largest bank and a significant mortgage lender in the region, operating under the wider Danske Bank Group headquartered in Denmark. While primarily serving Northern Ireland, Danske offers competitive mortgage products including fixed rates, trackers and buy-to-let products through their branch network and intermediary channel.",
    keyFeatures: [
      "Northern Ireland\'s largest bank with deep local market knowledge",
      "Competitive fixed rates often beating mainland UK high-street lenders",
      "Dedicated local branch network across Northern Ireland",
      "Business banking customers may access preferential mortgage terms"
    ],
    overpaymentPolicy: "Danske Bank typically permits overpayments of up to 10% of the outstanding balance per year on fixed-rate products. Terms vary by product, so always confirm current overpayment limits directly with Danske Bank before making additional payments.",
    whatMakesThemDifferent: "As Northern Ireland\'s dominant lender, Danske Bank has unmatched local knowledge of the NI property market. Their rates are frequently competitive with or below mainland UK alternatives, making them the go-to lender for many Northern Irish buyers.",
    bestFor: "Northern Ireland property buyers and remortgagers, Danske Bank existing customers, and anyone buying property in NI who wants a lender with deep local market expertise.",
    typicalProducts: ["2-year fixed", "3-year fixed", "5-year fixed", "Tracker", "Buy-to-let"]
  },
  "virgin-money": {
    overview: "Virgin Money is a digital-first bank offering competitive mortgage products online and through intermediaries. Formed from the merger of Virgin Money and Clydesdale Bank, they have grown to become a significant mortgage lender known for straightforward products and competitive pricing, particularly in the 75-90% LTV range.",
    keyFeatures: [
      "Competitive rates in the 75-90% LTV bracket",
      "Fully digital application process — no branch visit required",
      "Offset mortgage available — use savings to reduce interest",
      "Cashback on completion for selected products"
    ],
    overpaymentPolicy: "Virgin Money allows overpayments of up to 10% of the outstanding balance per year on fixed-rate mortgages without ERCs. Their offset mortgage allows you to use savings to reduce interest charges without formally overpaying.",
    whatMakesThemDifferent: "Virgin Money\'s offset mortgage is one of their standout products — by holding savings in a linked account, borrowers effectively reduce their mortgage interest without losing access to their money. Their digital-first approach also means faster processing for straightforward applications.",
    bestFor: "Tech-comfortable borrowers who prefer a digital application, savers who want an offset mortgage, and borrowers in the 75-90% LTV range seeking competitive rates.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Offset", "Buy-to-let"]
  },
  "natwest": {
    overview: "NatWest is one of the UK\'s Big Six banks, part of the NatWest Group alongside Royal Bank of Scotland and Ulster Bank. A major mortgage provider, NatWest offers products across the full LTV range with competitive rates for both residential and buy-to-let borrowers. Their digital mortgage application process has been significantly improved in recent years.",
    keyFeatures: [
      "Large Deposit Mortgage offers competitive rates at 60% LTV and below",
      "Family Deposit Mortgage allows parents to support without gifting",
      "Green Mortgage offers reduced rates for energy-efficient homes",
      "Existing NatWest current account holders may access loyalty rates"
    ],
    overpaymentPolicy: "NatWest permits overpayments of up to 10% of the outstanding balance per calendar year on fixed-rate mortgages without early repayment charges. Variable and tracker products typically allow unlimited overpayments.",
    whatMakesThemDifferent: "NatWest\'s Green Mortgage is increasingly popular, offering reduced rates for properties with high EPC ratings. Their Family Deposit Mortgage provides an alternative to gifted deposits, allowing parents to support their children\'s purchase while retaining ownership of their savings.",
    bestFor: "Existing NatWest customers, buyers of energy-efficient properties, first-time buyers with parental financial support, and borrowers with large deposits (40%+).",
    typicalProducts: ["2-year fixed", "5-year fixed", "10-year fixed", "Tracker", "Green Mortgage", "Family Deposit"]
  },
  "coventry": {
    overview: "Coventry Building Society is the UK\'s second-largest building society by assets, known for consistently offering some of the most competitive mortgage rates in the market. As a mutual owned by its members, Coventry reinvests profits into better rates rather than shareholder dividends, which is reflected in their regularly appearing at the top of best-buy tables.",
    keyFeatures: [
      "Frequently tops best-buy rate tables across multiple LTV brackets",
      "No arrangement fees on many standard products",
      "Member-owned mutual — profits go to better rates, not shareholders",
      "Strong intermediary presence — widely available through mortgage brokers"
    ],
    overpaymentPolicy: "Coventry Building Society typically allows overpayments of up to 10% of the outstanding mortgage balance per year on fixed-rate deals without early repayment charges. Contact Coventry directly for current terms on your specific product.",
    whatMakesThemDifferent: "Coventry BS is remarkable for the consistency of their competitive pricing. While other lenders occasionally appear in best-buy tables, Coventry is almost always there. Their low-fee, low-rate model makes them particularly attractive for remortgagers who want a clean, competitive deal without hidden costs.",
    bestFor: "Rate-sensitive borrowers who want the cheapest deal, remortgagers looking for low fees, and anyone who prefers dealing with a mutual rather than a shareholder-owned bank.",
    typicalProducts: ["2-year fixed", "3-year fixed", "5-year fixed", "Tracker", "Buy-to-let fixed"]
  },
  "atom-bank": {
    overview: "Atom Bank is a UK app-only bank based in Durham, launched in 2016 as one of Britain's first mobile-only banks. They offer mortgages exclusively through intermediary channels — you cannot apply directly, only through a mortgage broker. Atom has grown rapidly in the mortgage market by consistently offering some of the most competitive fixed rates in the UK.",
    keyFeatures: [
      "App-only bank — all account management through the Atom Bank mobile app",
      "Broker-only distribution — apply through a mortgage adviser, not directly",
      "Consistently competitive fixed rates, often appearing in best-buy tables",
      "Residential mortgages up to 90% LTV with competitive rates at 60% and 75% brackets"
    ],
    overpaymentPolicy: "Atom Bank allows overpayments of up to 10% of the original loan amount per year on fixed-rate mortgages without incurring early repayment charges. Overpayments beyond this threshold may attract an ERC. The overpayment allowance resets on each anniversary of your mortgage start date.",
    whatMakesThemDifferent: "As a digital-only challenger bank, Atom keeps overheads low and passes savings to customers through competitive rates. Their absence from the high street means everything is managed through their app, which some borrowers find refreshingly simple. They've carved out a niche as one of the consistently cheapest fixed-rate providers in the UK market.",
    bestFor: "Tech-comfortable borrowers who want the lowest possible fixed rate and are happy managing their mortgage through an app. Particularly strong for remortgagers with 25-40% equity.",
    typicalProducts: ["2-year fixed", "5-year fixed", "10-year fixed"]
  },
  "bluestone": {
    overview: "Bluestone Mortgages is a specialist lender focused on borrowers who don't fit mainstream lending criteria. Established in Australia and now operating in the UK since 2016, Bluestone specialises in near-prime and specialist mortgages for people with adverse credit history, complex income, or non-standard circumstances.",
    keyFeatures: [
      "Specialist lender for adverse credit — accepts CCJs, defaults, and missed payments",
      "Self-employed friendly with flexible income verification",
      "Available through intermediaries (mortgage brokers) only",
      "Products available up to 85% LTV even with credit issues"
    ],
    overpaymentPolicy: "Bluestone Mortgages typically allows overpayments of up to 10% of the outstanding balance per year without early repayment charges on their fixed-rate products. Given their specialist nature, overpayment terms may vary by product — always confirm directly with Bluestone or your broker.",
    whatMakesThemDifferent: "Bluestone fills a crucial gap in the UK market for borrowers rejected by mainstream lenders. Their underwriting takes a more holistic view of creditworthiness, considering the story behind adverse credit rather than just the numbers. They use a tiered pricing model where rates improve as your credit situation recovers.",
    bestFor: "Borrowers with CCJs, defaults or missed payments in the last 1-6 years who need a mortgage. Also suitable for self-employed borrowers with complex income who struggle with mainstream affordability assessments.",
    typicalProducts: ["2-year fixed (prime)", "2-year fixed (near-prime)", "5-year fixed", "Specialist BTL"]
  },
  "kensington": {
    overview: "Kensington Mortgages has been one of the UK's leading specialist mortgage lenders since 1995. Now owned by Barclays, Kensington focuses on borrowers with complex circumstances — those who are self-employed, have irregular income, or have had past credit difficulties. They lend through intermediaries only.",
    keyFeatures: [
      "30+ years of specialist lending experience in the UK market",
      "Complex income accepted — contractors, freelancers, multiple income streams",
      "Lending available with adverse credit from day 1 of registration",
      "Products available up to 85% LTV with recent adverse credit"
    ],
    overpaymentPolicy: "Kensington allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Their tracker and variable-rate products typically allow unlimited overpayments. Contact Kensington for specific terms on your product.",
    whatMakesThemDifferent: "Kensington's underwriters manually review complex cases rather than relying purely on automated scoring. This human-touch approach means they can often find solutions for borrowers who've been declined elsewhere. Their longevity in the specialist market (since 1995) means they have deep experience with non-standard lending.",
    bestFor: "Self-employed borrowers with 1-2 years of accounts, contractors on day rates, and borrowers with recent adverse credit who need a competitively-priced specialist mortgage.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Interest-only", "Specialist BTL"]
  },
  "kent-reliance": {
    overview: "Kent Reliance is the trading name of OneSavings Bank (OSB), a specialist lender listed on the London Stock Exchange. Originally a Kent-based building society founded in 1898, Kent Reliance now operates as a specialist buy-to-let and residential lender available exclusively through mortgage brokers.",
    keyFeatures: [
      "Strong BTL proposition — one of the UK's largest specialist BTL lenders",
      "Residential mortgages available up to 85% LTV",
      "Lending to limited companies for BTL portfolio landlords",
      "Flexible criteria for self-employed and contract workers"
    ],
    overpaymentPolicy: "Kent Reliance allows overpayments of up to 10% of the outstanding mortgage balance per year on fixed-rate products without ERCs. On BTL products, overpayment terms may differ. Always verify current terms with your mortgage broker or directly with Kent Reliance.",
    whatMakesThemDifferent: "Kent Reliance is particularly strong in the BTL and specialist residential space. Their underwriting is pragmatic for portfolio landlords managing multiple properties through limited companies, and they offer competitive rates in brackets where high-street banks often won't lend.",
    bestFor: "Buy-to-let investors (including limited company purchases), portfolio landlords, and residential borrowers with slightly complex circumstances who want a mid-market specialist lender.",
    typicalProducts: ["2-year fixed BTL", "5-year fixed BTL", "2-year fixed residential", "Limited company BTL"]
  },
  "precise": {
    overview: "Precise Mortgages is a specialist lending brand within the Charter Court Financial Services group (now part of OSB Group). They focus on the near-prime residential and buy-to-let market, serving borrowers who fall just outside mainstream lending criteria — such as those with a small blip on their credit file or complex employment.",
    keyFeatures: [
      "Near-prime specialist — lending to borrowers just outside mainstream criteria",
      "Large landlord products for borrowers with 4+ BTL properties",
      "Available through mortgage brokers only",
      "Lending up to 80% LTV with recent adverse credit"
    ],
    overpaymentPolicy: "Precise Mortgages allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products. Tracker products typically permit unlimited overpayments. Their BTL products may have different overpayment allowances — confirm with your broker.",
    whatMakesThemDifferent: "Precise sits in the sweet spot between high-street and deep specialist. They handle cases that mainstream lenders reject but don't require the heavy pricing of full specialist lenders. Their processing times are generally faster than many specialist competitors, and their criteria are clearly documented.",
    bestFor: "Borrowers with minor credit issues (a missed payment or two, a small default) who don't want to pay full specialist rates. Also strong for experienced landlords with larger BTL portfolios.",
    typicalProducts: ["2-year fixed (near-prime)", "5-year fixed", "BTL 2-year fixed", "Large landlord BTL", "HMO/multi-unit"]
  },
  "vida": {
    overview: "Vida Homeloans is a specialist mortgage lender based in Watford, focused on self-employed borrowers and those with complex income. Part of the Belmont Green group, Vida has carved out a reputation for flexible income assessment, accepting 1 year of accounts for self-employed applicants where most lenders require 2-3.",
    keyFeatures: [
      "Self-employed lending with just 1 year of accounts",
      "Day-rate contractor income accepted at gross daily rate × 5 × 46 weeks",
      "Complex income combinations — salary plus dividends, rental income, bonus",
      "Available through intermediaries only"
    ],
    overpaymentPolicy: "Vida typically allows overpayments of up to 10% of the outstanding mortgage balance per year on fixed-rate products. Overpayments are tracked from the mortgage anniversary date. Their variable-rate products may allow unlimited overpayments — confirm with your broker.",
    whatMakesThemDifferent: "Vida's income calculation methodology is notably generous. Their willingness to accept 1 year of self-employed accounts, use gross contractor rates, and combine multiple income sources means they can often approve borrowers who've been turned down by 2-3 other lenders. Processing is generally straightforward with clear criteria.",
    bestFor: "Self-employed borrowers with only 1 year of trading history, IT contractors paid day rates, and anyone with complex income who needs a pragmatic lender.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Interest-only"]
  },
  "progressive": {
    overview: "Progressive Building Society is Northern Ireland's largest locally-headquartered building society, based in Belfast since 1914. As a mutual, Progressive is owned by its members and focuses primarily on the Northern Irish property market, though they also lend in England, Scotland and Wales through intermediaries.",
    keyFeatures: [
      "Northern Ireland's largest independent building society",
      "Strong local market knowledge for NI property",
      "Member-owned mutual — competitive rates and personal service",
      "Residential and buy-to-let products up to 90% LTV"
    ],
    overpaymentPolicy: "Progressive Building Society generally allows overpayments of up to 10% per year on fixed-rate products without early repayment charges. As a mutual, they tend to be flexible with overpayment arrangements — contact them directly for your specific product terms.",
    whatMakesThemDifferent: "Progressive's deep understanding of the Northern Irish property market makes them stand out for NI-based borrowers. Mainland UK lenders sometimes apply conservative valuations to NI properties, whereas Progressive understands local pricing dynamics. Their mutual status means competitive pricing without shareholder pressure.",
    bestFor: "Borrowers purchasing or remortgaging in Northern Ireland who want a lender with genuine local expertise. Also suitable for NI-based first-time buyers seeking competitive rates from a mutual.",
    typicalProducts: ["2-year fixed", "3-year fixed", "5-year fixed", "BTL fixed", "Tracker"]
  },
  "aldermore": {
    overview: "Aldermore is a UK specialist bank founded in 2009, now owned by FirstRand Group. Listed on the London Stock Exchange before going private, Aldermore focuses on under-served segments of the mortgage market — particularly self-employed borrowers, landlords, and those with complex financial situations. They lend exclusively through intermediaries.",
    keyFeatures: [
      "Self-employed lending with 1 year of accounts accepted",
      "Buy-to-let lending up to 80% LTV including HMOs and multi-unit blocks",
      "Residential mortgages available with light adverse credit",
      "Available through mortgage brokers only — no direct applications"
    ],
    overpaymentPolicy: "Aldermore allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Overpayments above 10% will incur ERCs at the rate specified in your mortgage offer. Tracker rate products typically allow unlimited overpayments.",
    whatMakesThemDifferent: "Aldermore bridges the gap between mainstream and specialist lending. They're often the first port of call for brokers when a case is slightly too complex for high-street banks but doesn't need a full specialist lender. Their processing times and service levels are generally more consistent than smaller specialist lenders.",
    bestFor: "Self-employed borrowers with shorter trading histories, buy-to-let landlords with HMO or multi-unit properties, and borrowers who fall just outside mainstream criteria but want reasonable pricing.",
    typicalProducts: ["2-year fixed", "5-year fixed", "BTL 2-year fixed", "BTL 5-year fixed", "HMO specialist"]
  },
  "leek-united": {
    overview: "Leek United Building Society is a Staffordshire-based mutual founded in 1863. One of the smaller building societies in the UK, Leek United offers a focused range of residential mortgage products. Their size means decisions are often made locally by experienced underwriters rather than through automated scoring systems.",
    keyFeatures: [
      "Local underwriting — decisions made by experienced staff, not algorithms",
      "Competitive rates for borrowers in the 60-80% LTV range",
      "Member-owned building society — profits benefit members",
      "Available both directly and through selected intermediaries"
    ],
    overpaymentPolicy: "Leek United Building Society typically permits overpayments of up to 10% of the outstanding balance per year on fixed-rate products. As a building society, they tend to be accommodating with overpayment requests — contact them directly to discuss your options.",
    whatMakesThemDifferent: "Leek United's strength is personal service. As a smaller society, borrowers deal with real people who know their case, not call centres. Their underwriters have discretion to look beyond the numbers, which can help borderline cases that automated systems would reject.",
    bestFor: "Borrowers who value personal service over the cheapest rate, those in the Midlands who want a local lender, and anyone who appreciates dealing with a traditional building society.",
    typicalProducts: ["2-year fixed", "3-year fixed", "5-year fixed", "Tracker", "Discounted variable"]
  },
  "skipton": {
    overview: "Skipton Building Society is the UK's fourth-largest building society, headquartered in Skipton, North Yorkshire since 1853. A major mutual, Skipton is known for competitive mortgage pricing and was the first lender to launch a 100% mortgage (Track Record) for renters with a strong payment history but no deposit savings.",
    keyFeatures: [
      "Track Record mortgage — 100% LTV for renters with 12+ months of on-time rent payments",
      "Competitive fixed rates across all LTV brackets",
      "Direct and intermediary channels available",
      "Member-owned mutual with strong financial ratings"
    ],
    overpaymentPolicy: "Skipton Building Society allows overpayments of up to 10% of the outstanding mortgage balance per year on fixed-rate products without early repayment charges. The allowance resets annually on the anniversary of your mortgage completion date.",
    whatMakesThemDifferent: "Skipton's Track Record mortgage broke new ground in 2023 by offering 100% LTV to renters who could demonstrate 12 months of on-time rent payments — addressing the 'trapped renter' problem where people can afford mortgage payments but can't save a deposit. Beyond this headline product, Skipton consistently offers competitive rates.",
    bestFor: "Renters with no deposit but a strong rent payment history (Track Record), rate-conscious borrowers who want mutual benefits, and first-time buyers in Yorkshire and the North.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Track Record 100% LTV", "Tracker", "BTL fixed"]
  },
  "yorkshire": {
    overview: "Yorkshire Building Society (YBS) is the UK's third-largest building society, founded in 1864 and headquartered in Bradford. Trading under the Yorkshire, Chelsea and Accord brands, YBS serves borrowers directly and through intermediaries. As a mutual, they consistently offer competitive rates and have won numerous awards for customer service.",
    keyFeatures: [
      "Third-largest UK building society — strong financial stability",
      "Available directly and through intermediaries (Accord is the broker brand)",
      "Competitive rates, particularly at 60% and 75% LTV",
      "Joint Borrower Sole Proprietor mortgages — parents can support without being on the title"
    ],
    overpaymentPolicy: "Yorkshire Building Society allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Their variable-rate and tracker products typically allow unlimited overpayments.",
    whatMakesThemDifferent: "YBS's multi-brand strategy (Yorkshire direct, Accord through brokers, Chelsea for remortgages) means they cover a wide range of borrowers without compromising on pricing. Their Joint Borrower Sole Proprietor product is particularly useful for first-time buyers whose parents want to help with affordability without being named on the property title.",
    bestFor: "First-time buyers needing parental income support (JBSP), rate-conscious borrowers with 25%+ deposits, and anyone who values the security and ethos of a large mutual.",
    typicalProducts: ["2-year fixed", "5-year fixed", "JBSP", "Tracker", "Offset"]
  },
  "co-op": {
    overview: "The Co-operative Bank offers mortgages as part of its ethical banking proposition. Despite its name, the Co-op Bank has been a PLC since 2013 (separate from the Co-operative Group), but maintains its ethical policy which screens how the bank invests its money. They offer mortgages directly and through intermediaries.",
    keyFeatures: [
      "Ethical banking policy — the bank commits to not investing in certain industries",
      "Competitive fixed rates, particularly for existing current account holders",
      "Preferential rates for Co-op Bank current account holders",
      "Mortgages available up to 95% LTV for residential borrowers"
    ],
    overpaymentPolicy: "The Co-operative Bank allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Their flexible mortgage products may allow unlimited overpayments — check your specific product terms.",
    whatMakesThemDifferent: "The Co-op Bank is the UK's only high-street bank with a customer-led ethical policy. For borrowers who care about where their mortgage payments end up being invested, this provides unique peace of mind. Despite the ethical focus, their rates remain competitive with mainstream lenders.",
    bestFor: "Ethically-minded borrowers who want their banking to align with their values, existing Co-op Bank customers seeking preferential rates, and first-time buyers looking for a 95% LTV product from a recognisable brand.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Offset", "Green mortgage"]
  },
  "accord": {
    overview: "Accord Mortgages is the intermediary-only lending brand of Yorkshire Building Society, one of the UK's largest mutual lenders. Available exclusively through mortgage brokers, Accord offers a comprehensive range of residential products and is known for competitive pricing, fast processing, and pragmatic underwriting.",
    keyFeatures: [
      "Intermediary-only brand backed by Yorkshire Building Society",
      "Consistently competitive rates across all LTV bands",
      "Fast processing times — typically faster than the parent brand",
      "Flexible criteria including overtime, bonus and commission income"
    ],
    overpaymentPolicy: "Accord Mortgages allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. The overpayment window resets annually from your completion date. Tracker products allow unlimited overpayments.",
    whatMakesThemDifferent: "Accord is often the first choice for mortgage brokers when a mainstream case needs competitive pricing with reliable service. Their criteria are clearly published, processing is fast, and underwriter communication is straightforward. Being backed by YBS gives them financial stability while maintaining the agility of a focused intermediary brand.",
    bestFor: "Borrowers working with a mortgage broker who want competitive rates with fast, reliable processing. Strong for employed borrowers with bonus or overtime income.",
    typicalProducts: ["2-year fixed", "5-year fixed", "10-year fixed", "Tracker", "Green additional borrowing"]
  },
  "tsb": {
    overview: "TSB (originally Trustee Savings Bank) re-launched as an independent bank in 2013 after splitting from Lloyds Banking Group, and is now owned by Sabadell Group. TSB offers mortgages through branches, online and through intermediaries. They position themselves as a straightforward, community-focused bank with competitive mortgage products.",
    keyFeatures: [
      "High-street presence with local branch support for mortgage queries",
      "Competitive rates at higher LTV brackets (85-90%)",
      "Available directly and through intermediaries",
      "TSB current account holders may access preferential rates"
    ],
    overpaymentPolicy: "TSB allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Their standard variable rate mortgage allows unlimited overpayments at any time.",
    whatMakesThemDifferent: "TSB often offers competitive rates at higher LTV brackets (85-90%) where many lenders become less competitive. Their branch network provides face-to-face mortgage advice that purely digital lenders can't match, making them a good choice for borrowers who value in-person service alongside competitive pricing.",
    bestFor: "First-time buyers with 10-15% deposits who want branch-based support, borrowers who value face-to-face advice, and existing TSB customers seeking loyalty rates.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "First-time buyer products"]
  },
  "first-direct": {
    overview: "First Direct is HSBC's telephone and online banking subsidiary, consistently rated the UK's best bank for customer service. Founded in 1989, First Direct offers mortgages through phone, online and selected intermediaries. They're known for exceptional service quality, competitive rates, and a loyal customer base.",
    keyFeatures: [
      "Consistently rated #1 for UK customer satisfaction",
      "Competitive rates backed by HSBC's funding strength",
      "24/7 telephone banking with UK-based call centres",
      "Existing current account holders may access exclusive rates"
    ],
    overpaymentPolicy: "First Direct allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Their Offset Mortgage allows unlimited overpayments through the linked offset account, providing maximum flexibility.",
    whatMakesThemDifferent: "First Direct's service quality is genuinely exceptional in UK banking — they've won 'Best Bank' awards for over 30 consecutive years. Their mortgage team is UK-based, knowledgeable, and accessible 24/7. The service premium doesn't come at a rate premium either, as HSBC's balance sheet means competitive funding costs.",
    bestFor: "Borrowers who prioritise service quality, existing First Direct customers, night owls who need 24/7 support, and those who want the security of HSBC backing with First Direct's personal touch.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Offset", "First-time buyer"]
  },
  "metro-bank": {
    overview: "Metro Bank launched in 2010 as the first new high-street bank in the UK in over 100 years. Known for their 'stores' (not branches) with extended opening hours including weekends, Metro Bank offers mortgages through their store network, online and through intermediaries. They focus on convenience and customer experience.",
    keyFeatures: [
      "Extended store hours — open 7 days a week, including early mornings and evenings",
      "Same-day mortgage decisions available for straightforward cases",
      "Available directly in-store, online and through intermediaries",
      "Residential mortgages up to 90% LTV"
    ],
    overpaymentPolicy: "Metro Bank allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Their stores can process overpayment requests in person, which some borrowers find more convenient than phone-only services.",
    whatMakesThemDifferent: "Metro Bank's 7-day-a-week stores with extended hours make them uniquely accessible. While other banks close at 4pm on weekdays, Metro Bank stores are typically open until 8pm on weekdays and open all weekend. This convenience factor, combined with competitive rates, makes them popular with busy professionals.",
    bestFor: "Borrowers who need face-to-face support outside traditional banking hours, London and South East based buyers (where most stores are located), and those who value the convenience of weekend banking.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "First-time buyer"]
  },
  "west-brom": {
    overview: "West Bromwich Building Society (the West Brom) is a Midlands-based mutual founded in 1849. One of the UK's top 10 building societies by asset size, the West Brom offers residential and buy-to-let mortgages both directly and through intermediaries. They're known for competitive rates and pragmatic underwriting.",
    keyFeatures: [
      "Top 10 UK building society by assets — strong financial stability",
      "Competitive buy-to-let proposition including HMO and multi-unit lending",
      "Available directly and through intermediaries",
      "Flexible income assessment for self-employed borrowers"
    ],
    overpaymentPolicy: "West Bromwich Building Society typically allows overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Contact the West Brom directly for your specific product terms.",
    whatMakesThemDifferent: "The West Brom punches above its weight in the BTL and specialist space, offering landlord-friendly products that rival much larger lenders. Their Midlands roots mean strong local knowledge, but they lend nationwide. As a mutual, profits go to better member rates rather than shareholders.",
    bestFor: "BTL investors in the Midlands and nationwide, self-employed borrowers seeking flexible underwriting, and rate-conscious residential borrowers who want mutual benefits.",
    typicalProducts: ["2-year fixed", "5-year fixed", "BTL 2-year fixed", "BTL 5-year fixed", "HMO"]
  },
};

// Generic template for lenders without custom content
export function getGenericContent(lenderName: string, maxLtv: number, svr: number): LenderContent {
  return {
    overview: "Use the RepayWise independent calculator below to estimate monthly repayments, total interest and potential overpayment savings for a " + lenderName + " mortgage. This tool uses standard UK amortisation mathematics and is not affiliated with " + lenderName + ".",
    keyFeatures: [
      "Maximum LTV of " + maxLtv + "% — minimum deposit required is " + (100 - maxLtv) + "%",
      "Estimated standard variable rate of " + svr.toFixed(2) + "%",
      "Always confirm actual rates and terms directly with " + lenderName
    ],
    overpaymentPolicy: "Overpayment terms vary by product. Most UK lenders allow overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. Contact " + lenderName + " directly to confirm your specific overpayment allowance.",
    whatMakesThemDifferent: "RepayWise provides this calculator as an independent estimation tool. For the most accurate and up-to-date information about " + lenderName + " mortgage products, rates and eligibility criteria, please visit their official website or speak to a qualified mortgage adviser.",
    bestFor: "Borrowers researching " + lenderName + " mortgage options who want a quick, independent estimate before approaching the lender directly.",
    typicalProducts: ["Fixed rate", "Tracker", "Variable rate"]
  };
}
