import type { Region } from "@/lib/finance/stampDuty";

const officialCalculators: Record<Region, { label: string; url: string }> = {
  england: {
    label: "HMRC SDLT calculator (England and Northern Ireland)",
    url: "https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/",
  },
  northern_ireland: {
    label: "HMRC SDLT calculator (England and Northern Ireland)",
    url: "https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/",
  },
  scotland: {
    label: "Revenue Scotland LBTT calculator",
    url: "https://revenue.scot/calculate-tax/calculate-property-transactions",
  },
  wales: {
    label: "Welsh Revenue Authority LTT calculator",
    url: "https://www.gov.wales/land-transaction-tax-calculator",
  },
};

export const PropertyTaxVerificationNotice = ({ region }: { region: Region }) => {
  const official = officialCalculators[region];

  return (
    <aside className="rounded-2xl border border-amber-500/50 bg-amber-500/10 p-4 sm:p-5" aria-label="Property tax estimate warning">
      <p className="font-semibold">Verify property tax before relying on this estimate</p>
      <p className="mt-2 text-sm leading-relaxed">
        Some SDLT and Welsh LTT calculations use outdated rates and can produce incorrect results.
        The tax figure and any cash-needed total that includes it could be wrong. Check your transaction using the{" "}
        <a className="font-semibold underline" href={official.url} target="_blank" rel="noopener noreferrer">{official.label}</a>{" "}
        and confirm the amount with your conveyancer before making a purchase decision.
      </p>
    </aside>
  );
};
