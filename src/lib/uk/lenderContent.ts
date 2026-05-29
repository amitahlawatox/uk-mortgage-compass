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
