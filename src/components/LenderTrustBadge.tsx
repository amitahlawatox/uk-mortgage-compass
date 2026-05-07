import { ExternalLink, Info, ShieldCheck } from "lucide-react";

interface LenderTrustBadgeProps {
  lenderName: string;
  lenderWebsite?: string;
  calculatorType?: string;
}

const LENDER_WEBSITES: Record<string, string> = {
  "lloyds-bank": "https://www.lloydsbank.com/mortgages.html",
  "halifax": "https://www.halifax.co.uk/mortgages/",
  "nationwide": "https://www.nationwide.co.uk/mortgages/",
  "barclays": "https://www.barclays.co.uk/mortgages/",
  "hsbc": "https://www.hsbc.co.uk/mortgages/",
  "natwest": "https://www.natwest.com/mortgages.html",
  "santander": "https://www.santander.co.uk/personal/mortgages",
  "virgin-money": "https://uk.virginmoney.com/mortgages/",
  "tsb": "https://www.tsb.co.uk/mortgages/",
  "coventry": "https://www.coventrybuildingsociety.co.uk/customer/mortgage.html",
  "yorkshire": "https://www.ybs.co.uk/mortgages/",
  "skipton": "https://www.skipton.co.uk/mortgages/",
  "accord": "https://www.accordmortgages.com/",
  "bm-solutions": "https://www.bmsolutions.co.uk/",
  "danske": "https://www.danskebank.co.uk/personal/mortgages/",
  "tmw": "https://www.themortgageworks.co.uk/",
  "landbay": "https://www.landbay.co.uk/",
  "metro-bank": "https://www.metrobankonline.co.uk/mortgages/",
  "atom-bank": "https://www.atombank.co.uk/mortgages/",
  "first-direct": "https://www.firstdirect.com/mortgages/",
};

export function LenderTrustBadge({ lenderName, lenderWebsite, calculatorType = "repayment" }: LenderTrustBadgeProps) {
  const slug = lenderName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const officialUrl = lenderWebsite ?? LENDER_WEBSITES[slug];
  const month = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="space-y-3 my-4">
      {/* Anti-phishing disclaimer — mandatory per NCSC guidance */}
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 px-4 py-3">
        <ShieldCheck className="size-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>Independent Tool Notice:</strong> This calculator is an independent research tool
          provided by RepayWise. We are <strong>not affiliated</strong> with, endorsed by, or
          associated with {lenderName}. We will <strong>never</strong> ask for your bank login,
          account details, or personal financial credentials.
        </p>
      </div>

      {/* Official lender link — E-E-A-T trust signal */}
      {officialUrl && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="size-4 shrink-0" />
          <span>
            For live rates and official products, visit{" "}
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary underline underline-offset-2 hover:no-underline inline-flex items-center gap-1"
            >
              the {lenderName} official website
              <ExternalLink className="size-3" />
            </a>
          </span>
        </div>
      )}

      {/* How this calculator works */}
      <details className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm">
        <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between">
          How this calculation works
          <span className="text-muted-foreground text-xs">▾</span>
        </summary>
        <div className="mt-2 text-muted-foreground space-y-1 leading-relaxed">
          <p>
            This tool uses standard UK mortgage mathematics to model monthly repayments. It applies
            the compound interest formula used by UK lenders: monthly rate = annual rate ÷ 12,
            applied over the term in months.
          </p>
          <p>
            Results are estimates only. Actual payments will depend on {lenderName}'s current
            product rates, arrangement fees, and your personal credit assessment.
          </p>
          <p className="text-xs mt-1">Updated for {month}.</p>
        </div>
      </details>
    </div>
  );
}

export function CityTrustBadge({ cityName }: { cityName: string }) {
  const month = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });
  return (
    <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20 px-4 py-3 my-4">
      <Info className="size-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
      <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
        Average house price data for <strong>{cityName}</strong> is sourced from UK Land Registry
        statistics. Pre-filled values are illustrative — adjust them to match your actual
        property and mortgage. Updated for {month}.
      </p>
    </div>
  );
}
