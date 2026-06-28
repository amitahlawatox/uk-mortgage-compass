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
  "lloyds-bank": {
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
  },,

  "accord": {
    overview: "Accord Mortgages is the intermediary-only lending arm of Yorkshire Building Society, one of the UK's largest building societies. Operating exclusively through mortgage brokers rather than direct to consumers, Accord offers competitive residential and buy-to-let products with underwriting that is often described as pragmatic and borrower-friendly. Their strong broker relationships mean faster processing for eligible cases.",
    keyFeatures: [
      "Broker-only lender — only accessible through an FCA-authorised mortgage broker",
      "Flexible income assessment including complex employment structures",
      "Buy-to-let products available for individual and portfolio landlords",
      "Part of Yorkshire Building Society — mutually owned with no shareholder pressure"
    ],
    overpaymentPolicy: "Accord Mortgages typically permits overpayments of up to 10% of the outstanding balance per year on fixed-rate products without early repayment charges. On tracker and variable-rate deals, unlimited overpayments are usually allowed. Always confirm current terms with your broker or Accord directly.",
    whatMakesThemDifferent: "Accord's exclusivity to the broker channel means their products are rarely compared directly against high-street lenders, yet they frequently offer rates competitive with the best in the market. Their underwriting approach tends to be more flexible for borrowers with non-standard income, making them a go-to choice for brokers with complex cases.",
    bestFor: "Borrowers working through a mortgage broker, those with complex income structures such as contractors or self-employed, and buy-to-let investors.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Buy-to-let fixed", "Remortgage"]
  },
  "leeds": {
    overview: "Leeds Building Society is one of the UK's largest building societies, with over 150 years of history serving members across the UK. As a mutual organisation, Leeds Building Society is owned by its members rather than external shareholders, which allows it to focus on delivering competitive mortgage products and strong service. They offer a comprehensive range of residential mortgages with particular strength in higher LTV lending.",
    keyFeatures: [
      "Specialist products for first-time buyers including 95% LTV deals",
      "Shared ownership mortgages with competitive rates",
      "Holiday let mortgages — one of few lenders in this specialist niche",
      "Offset mortgages allowing savings to reduce interest charges"
    ],
    overpaymentPolicy: "Leeds Building Society typically allows overpayments of up to 10% of the outstanding mortgage balance per year on fixed-rate products without incurring early repayment charges. Tracker and variable-rate mortgage holders can usually overpay without limit. Check your specific mortgage offer document for your exact terms.",
    whatMakesThemDifferent: "Leeds Building Society stands out for its willingness to lend in specialist areas that larger banks avoid — most notably holiday let mortgages and shared ownership. Their mutual structure means policy decisions are made with members in mind, which often translates into more sensible underwriting decisions for borrowers in unusual situations.",
    bestFor: "First-time buyers with smaller deposits, shared ownership purchasers, holiday let investors, and savers interested in offset mortgages.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Offset", "Holiday let", "Shared ownership"]
  },
  "precise": {
    overview: "Precise Mortgages is a specialist lending brand operated by Charter Court Financial Services, now part of OneSavings Bank Group. Designed for borrowers who fall outside mainstream lender criteria, Precise serves customers with complex credit histories, multiple income sources, or non-standard property types. All applications are processed through FCA-authorised mortgage brokers.",
    keyFeatures: [
      "Adverse credit mortgages — serves borrowers with CCJs, defaults or missed payments",
      "Complex buy-to-let including HMOs and multi-unit freehold blocks",
      "Self-employed borrowers assessed on flexible income criteria",
      "Broker-only — not available direct to consumers"
    ],
    overpaymentPolicy: "Precise Mortgages allows overpayments on their products, though the specific terms vary by product type and when the mortgage was taken out. Fixed-rate products typically allow up to 10% per year without ERCs. Contact your broker or Precise Mortgages directly to confirm current overpayment terms.",
    whatMakesThemDifferent: "Precise Mortgages fills a gap in the market for borrowers who have experienced financial difficulties or have complex circumstances. Rather than a straight decline, Precise uses experienced underwriters who assess each case on its merits — making them one of the most important lenders for borrowers who have been turned down elsewhere.",
    bestFor: "Borrowers with adverse credit history, landlords with complex portfolios or HMOs, self-employed applicants with variable income, and those with non-standard property types.",
    typicalProducts: ["Adverse credit residential", "Buy-to-let complex", "HMO", "Let-to-buy", "Self-employed"]
  },
  "cumberland": {
    overview: "Cumberland Building Society is a regional mutual serving the North of England and southern Scotland, with over 145 years of history. Based in Carlisle, Cumberland operates through its branch network and intermediaries, offering competitive mortgage products with a strong focus on personal service and local underwriting. As a mutual, Cumberland is owned by its members rather than external shareholders.",
    keyFeatures: [
      "Regional focus on Cumbria, North England and Scottish borders",
      "Personal underwriting — decisions made by local staff who know the area",
      "Self-build mortgages available for unique projects",
      "New build mortgage products including Help to Build scheme"
    ],
    overpaymentPolicy: "Cumberland Building Society typically permits overpayments of up to 10% of the outstanding balance per year on their fixed-rate mortgage products without early repayment charges. Variable and tracker rate mortgages usually allow unlimited overpayments. Contact Cumberland directly to confirm the terms for your specific product.",
    whatMakesThemDifferent: "Cumberland's regional focus is both its strength and its differentiator — their underwriters genuinely understand the local property market and are more willing to lend on rural or unusual properties that London-based lenders might decline. Their self-build mortgage offering is also notably competitive for borrowers undertaking complex projects.",
    bestFor: "Buyers in Cumbria and the North of England, self-build project borrowers, rural property purchasers, and those seeking personal service from a local lender.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Self-build", "New build", "Help to Build"]
  },
  "metro-bank": {
    overview: "Metro Bank launched in 2010 as the first new high-street bank to open in the UK in over 100 years, known for its store-based model and extended opening hours seven days a week. Metro Bank offers residential mortgages with a distinctive approach to underwriting — using human decision-making rather than fully automated credit scoring, which makes them more accessible for borrowers with complex situations.",
    keyFeatures: [
      "Seven-day branch banking with extended opening hours",
      "Manual underwriting — real people assess complex applications",
      "Specialist lending for later life borrowers and interest-only",
      "Retained interest option for certain borrower profiles"
    ],
    overpaymentPolicy: "Metro Bank mortgage customers can typically make overpayments on their mortgages, though the specific allowance depends on the product type. Fixed-rate mortgages generally allow up to 10% overpayment per year without early repayment charges. Contact Metro Bank directly to confirm the exact terms for your current product.",
    whatMakesThemDifferent: "Metro Bank's human underwriting approach is their defining advantage. Where high-street banks and building societies rely heavily on automated systems that struggle with non-standard income or complex situations, Metro Bank involves experienced staff in the decision — resulting in approvals for customers who might otherwise be declined.",
    bestFor: "Borrowers with complex income or employment history, later life lending, interest-only applicants, and customers who value in-person banking seven days a week.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Interest-only", "Later life", "Buy-to-let"]
  },
  "principality": {
    overview: "Principality Building Society is Wales' largest building society and one of the UK's top 10 building societies by asset size. With over 165 years of history and headquarters in Cardiff, Principality serves borrowers across Wales and England with a strong mutual ethos. As a member-owned organisation, Principality focuses on long-term value for borrowers rather than short-term profit maximisation.",
    keyFeatures: [
      "Wales' largest building society with a strong regional presence",
      "Competitive rates for Welsh property buyers",
      "Offset mortgage option available",
      "Shared ownership and Help to Buy Wales products"
    ],
    overpaymentPolicy: "Principality Building Society typically allows overpayments on fixed-rate mortgages without early repayment charges up to a set annual limit, usually 10% of the outstanding balance. Tracker and variable-rate customers can usually overpay without restriction. Confirm the terms for your specific Principality mortgage by contacting them directly.",
    whatMakesThemDifferent: "Principality's deep roots in Wales give it a genuine advantage for buyers of Welsh property — their underwriters understand the Welsh market, Welsh property types, and Welsh leasehold law in a way that London-based lenders often do not. Their products are also available through Help to Buy Wales, making them a natural first port of call for Welsh first-time buyers.",
    bestFor: "Welsh property buyers especially first-time buyers, borrowers using Help to Buy Wales, those seeking an offset mortgage, and buyers of shared ownership properties in Wales.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Offset", "Help to Buy Wales", "Shared ownership"]
  },
  "suffolk": {
    overview: "Suffolk Building Society is a regional mutual lender based in Ipswich, serving borrowers across East Anglia and the UK with bespoke mortgage products. Known for its flexible, manual underwriting approach, Suffolk Building Society specialises in cases that require a more thoughtful assessment than automated systems allow. Maximum LTV is typically 80%, reflecting their cautious and considered lending philosophy.",
    keyFeatures: [
      "Manual underwriting for every application — no automated declines",
      "Specialist lending for self-employed and complex income borrowers",
      "Lending on non-standard property types including thatched and listed buildings",
      "Maximum 80% LTV — cautious approach with robust underwriting"
    ],
    overpaymentPolicy: "Suffolk Building Society typically permits overpayments on its mortgage products, with fixed-rate mortgages generally allowing up to 10% of the outstanding balance per year without early repayment charges. Contact Suffolk Building Society directly to confirm the specific overpayment allowance on your mortgage product.",
    whatMakesThemDifferent: "Suffolk Building Society's willingness to lend on properties that mainstream lenders decline — thatched properties, listed buildings, flats above commercial premises — makes them invaluable for buyers of characterful or unusual East Anglian properties. Their manual underwriting means every application gets genuine human attention.",
    bestFor: "East Anglian property buyers, those purchasing non-standard or listed property, self-employed borrowers with complex income, and buyers needing a lender that takes a considered rather than algorithmic approach.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Self-employed", "Non-standard property"]
  },
  "clydesdale": {
    overview: "Clydesdale Bank is a Scottish high-street bank that now operates as part of Virgin Money UK following their 2018 merger. Offering mortgages across Scotland and the UK, Clydesdale combines its traditional Scottish banking heritage with Virgin Money's digital capabilities and product range. Clydesdale Bank mortgages are available both directly and through mortgage brokers.",
    keyFeatures: [
      "Strong Scottish market presence with nationwide coverage",
      "Part of Virgin Money UK following 2018 merger",
      "Green mortgage products available for energy-efficient properties",
      "Offset mortgage option available through Virgin Money range"
    ],
    overpaymentPolicy: "Clydesdale Bank mortgage customers can typically make overpayments on their mortgages. Fixed-rate products generally allow overpayments of up to 10% of the outstanding balance per year without early repayment charges. As part of Virgin Money UK, exact product terms may align with the wider Virgin Money range — contact Clydesdale directly to confirm your specific overpayment allowance.",
    whatMakesThemDifferent: "Clydesdale Bank's Scottish heritage gives it particular relevance for buyers in Scotland, where property law operates under Scots law rather than English law. Their branch network across Scotland provides local support that London-centric digital lenders cannot match, while the Virgin Money merger has modernised their product range and digital capabilities.",
    bestFor: "Scottish property buyers and remortgagers, existing Clydesdale customers, those seeking offset mortgages, and buyers of energy-efficient properties looking for green mortgage rates.",
    typicalProducts: ["2-year fixed", "5-year fixed", "Tracker", "Offset", "Green mortgage", "Buy-to-let"]
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
